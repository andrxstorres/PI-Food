const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Recipe, Diet } = require("../db.js");

router.get("/", (req, res) => {
  const searchByName = req.query.name;

  if (searchByName) {
    //fetch a la API buscando coincidencias de nombre
    axios
      .get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=6bc475026bcd455186559e57512957ee&addRecipeInformation=true&number=100&titleMatch=${searchByName}`)
      .then((response) => {
        const results = response.data.results;
        const allNameMatchedAPIRecipes = results.map((recipe) => {
          const { id, image, title, healthScore, dishTypes, diets, summary, analyzedInstructions } = recipe;
          const instructions = analyzedInstructions[0];
          // const stepsString = ``;
          // instructions.steps.map((s) => console.log(s.step));

          const nameMatchedAPIRecipe = {
            id,
            image,
            title,
            dishTypes,
            diets,
            summary,
            healthScore,
            stepsObj: instructions,
          };
          return nameMatchedAPIRecipe;
        });

        //busqueda en la DB por coincidencia de nombre
        Recipe.findAll({
          where: {
            name: {
              [Op.iLike]: `%${searchByName}%`,
            },
          },
        });
        res.send(allNameMatchedAPIRecipes);
      })
      .catch((err) => res.status(400).send({ m: "Something went wrong when seraching by name in '/recipes'", err }));
  } else {
    // fetch de 100 resultados a la API
    axios
      .get("https://api.spoonacular.com/recipes/complexSearch?apiKey=6bc475026bcd455186559e57512957ee&addRecipeInformation=true&number=100")
      .then((response) => {
        const results = response.data.results;
        const allAPIRecipes = results.map((recipe) => {
          const { image, title, healthScore, dishTypes, diets, summary, analyzedInstructions } = recipe;
          const instructions = analyzedInstructions[0];

          const apiRecipeToHome = {
            image,
            title,
            dishTypes,
            diets,
            summary,
            healthScore,
            instructions,
          };
          return apiRecipeToHome;
        });

        //busqueda de recipes en la DB
        Recipe.findAll({
          include: [
            {
              model: Diet,
              through: { diets: [] },
            },
          ],
        })
          .then((allDBRecipes) => {
            if (allDBRecipes !== []) {
              const allRecipes = [...allAPIRecipes, ...allDBRecipes];
              res.send(allRecipes);
            } else {
              res.send(allAPIRecipes);
            }
          })
          .catch((err) => res.status(400).send({ m: "An error ocurred when querying all DB recipes", from: "GET /recipes", err }));

        // res.send(allRecipes);
      })
      .catch((err) => res.status(400).send({ m: "Something went wrong when loading the recipes to Home", from: " POST /recipes", err }));
  }
});

router.post("/", (req, res) => {
  const { name, description, healthScore, steps, diets } = req.body;
  //healthScore no puede exceder a 999999999, debe ser menor o SQL no guarda los datos.
  if (typeof name === `string` && name !== `` && typeof description === `string` && description !== ``) {
    Recipe.create({
      name,
      description,
      healthScore,
      steps,
    })
      .then((newRecipe) => {
        if (diets && diets[0]) {
          const dietPromises = diets.map((diet) => {
            return Diet.findOne({ where: { name: diet } })
              .then((dietInDB) => newRecipe.addDiet(dietInDB))
              .catch((err) => res.status(400).send({ m: `Something went wrong when relating the diets to ${newRecipe.name}'s recipe`, from: "POST /recipes", err }));
          });

          Promise.all(dietPromises)
            .then(() => {
              Recipe.findByPk(newRecipe.id, {
                include: [
                  {
                    model: Diet,
                    through: { diets: [] },
                  },
                ],
              })
                .then((recipeWithRelatedDiets) => {
                  const { id, name, description, healthScore, steps, diets } = recipeWithRelatedDiets;

                  const filteredDiets = diets.map((dbDiet) => dbDiet.name);

                  const finalResponseRecipe = {
                    id,
                    name,
                    description,
                    healthScore,
                    steps,
                    diets: filteredDiets,
                  };
                  res.status(201).send({ m: `${finalResponseRecipe.name}'s recipe has been created!`, finalResponseRecipe });
                })
                .catch((err) => res.status(400).send({ m: `An error ocurred when querying the final recipe with related diets from the DB`, from: "POST /recipes", err }));
            })
            .catch((err) => res.status(400).send({ m: `An error ocurred while working whit promised diet querys`, from: "POST /recipes", err }));
        } else {
          res.status(201).send(newRecipe);
        }
      })
      .catch((err) => res.status(400).send({ m: `Error when creating ${name}'s recipe in DB`, from: "POST /recipes", err }));
  } else {
    res.status(400).send({ m: `'/recipes' POST route received a wrong or empty name or description.` });
  }
});

module.exports = router;
