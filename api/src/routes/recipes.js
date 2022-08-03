const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Recipe, Diet } = require("../db.js");
const { Op } = require("sequelize");
require("dotenv").config();
const { API_KEY, API_KEY_K, API_KEY_L } = process.env;

router.get("/", (req, res) => {
  const searchByName = req.query.name;

  if (searchByName === ``) {
    res.status(400).send({ m: "Trying to search by name with an empty string", from: "GET /recipes?name" });
  } else if (searchByName) {
    //fetch a la API buscando coincidencias de nombre
    axios
      .get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_K}&addRecipeInformation=true&number=100&titleMatch=${searchByName}`)
      .then((response) => {
        const { results, totalResults } = response.data;
        const allNameMatchedAPIRecipes = results.map((recipe) => {
          const { id, image, title, healthScore, dishTypes, diets, summary } = recipe;

          const nameMatchedAPIRecipe = {
            id,
            image,
            title,
            dishTypes,
            diets,
            summary,
            healthScore,
          };
          return nameMatchedAPIRecipe;
        });

        //busqueda en la DB por coincidencia de nombre sin criterio de minusculas
        Recipe.findAll({
          where: {
            name: {
              [Op.iLike]: `%${searchByName}%`,
            },
          },
          include: [
            {
              model: Diet,
              through: { diets: [] },
            },
          ],
        })
          .then((allNameMatchedDBRecipes) => {
            let totalDBResults = 0;
            allNameMatchedDBRecipes.forEach(() => {
              totalDBResults += 1;
            });
            // filtramos el objeto de la DB, principalmente el array "diets"
            const filteredNameMatchedDBRecipes = allNameMatchedDBRecipes.map((nameMatchedDbRecipe) => {
              const { id, name, diets, healthScore } = nameMatchedDbRecipe;

              const filteredDiets = diets.map((dietObj) => dietObj.name);

              return {
                id,
                title: name,
                diets: filteredDiets,
                healthScore,
              };
            });
            //construimos el objet respuesta final con todas las coincidencias
            const searchByNameResponse = {
              totalAPIResults: totalResults,
              totalDBResults,
              allNameMatchedRecipes: [...allNameMatchedAPIRecipes, ...filteredNameMatchedDBRecipes],
            };
            res.send(searchByNameResponse);
          })
          .catch((err) => res.status(400).send({ m: `An error ocurred while searching by name '${searchByName}' in DB.`, from: "GET /recipes?name", err }));
      })
      .catch((err) => res.status(400).send({ m: "Something went wrong when seraching by name in '/recipes'", err }));
  } else {
    // fetch a la API de los primeros 100 resultados
    axios
      .get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_K}&addRecipeInformation=true&number=100`)
      .then((response) => {
        const results = response.data.results;
        const allAPIRecipes = results.map((recipe) => {
          const { id, image, title, healthScore, dishTypes, diets, summary, analyzedInstructions } = recipe;
          // const instructions = analyzedInstructions[0];

          const apiRecipeToHome = {
            id,
            image,
            title,
            dishTypes,
            diets,
            // summary,
            healthScore,
            // instructions,
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
              const allFilteredDBRecipes = allDBRecipes.map((dbRecipe) => {
                const { id, name, diets, healthScore } = dbRecipe;

                const filteredDiets = diets.map((dietObj) => dietObj.name);

                return {
                  id,
                  title: name,
                  diets: filteredDiets,
                  healthScore,
                };
              });

              const allRecipes = [...allAPIRecipes, ...allFilteredDBRecipes];
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

router.get("/:id", (req, res) => {
  const searchId = req.params.id;

  const isID = Number(searchId);
  //la siguiente valdación puede hacerse tambien como !isUUID,
  // cuya logica (decir que no es un UUID)implicaría rotar de lugar los dos bloques de codigo siguientes:
  // el que corresponde a la busqeda por uuid y el que corresponde a la busqueda por id.
  if (!isID) {
    Recipe.findByPk(searchId, {
      include: [
        {
          model: Diet,
          through: { diets: [] },
        },
      ],
    })
      .then((detailedDBRecipe) => {
        if (detailedDBRecipe) {
          let filteredDietObjs = [];
          if (detailedDBRecipe.diets !== []) filteredDietObjs = detailedDBRecipe.diets.map((dbDietObj) => dbDietObj.name);

          const { id, name, healthScore, summary, steps } = detailedDBRecipe;

          const finalDbRecipeResponse = {
            id,
            title: name,
            healthScore,
            summary,
            steps,
            diets: filteredDietObjs,
          };
          return res.send(finalDbRecipeResponse);
        } else {
          res.status(400).send({ m: `The specified UUID does not match any recipe's PK in DB`, uuid: `${searchId}` });
        }
      })
      .catch((err) => res.status(400).send({ m: "An error ocurred when searching by UUID in the DB", from: "GET /recipes/:id", err }));
  } else {
    axios
      .get(`https://api.spoonacular.com/recipes/${searchId}/information?apiKey=${API_KEY_K}`)
      .then((response) => {
        const { id, image, title, dishTypes, diets, summary, healthScore, instructions } = response.data;

        const detailedRecipe = {
          id,
          image,
          title,
          dishTypes,
          diets,
          summary,
          healthScore,
          steps: instructions,
        };
        res.send(detailedRecipe);
      })
      .catch((err) => res.status(400).send({ m: `An error ocurred while querying API recipe details by '${searchId}'.`, from: "GET /recipes/:id", err }));
  }
});

router.post("/", (req, res) => {
  const { name, summary, healthScore, steps, diets } = req.body;
  //healthScore no puede exceder a 999999999, debe ser menor o SQL no guarda los datos.
  if (typeof name === `string` && name !== `` && typeof summary === `string` && summary !== ``) {
    Recipe.create({
      name,
      summary,
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
                  const { id, name, summary, healthScore, steps, diets } = recipeWithRelatedDiets;

                  const filteredDiets = diets.map((dbDiet) => dbDiet.name);

                  const finalResponseRecipe = {
                    id,
                    name,
                    summary,
                    healthScore,
                    steps,
                    diets: filteredDiets,
                  };
                  res.status(201).send(finalResponseRecipe);
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
    res.status(400).send({ m: `'/recipes' POST route received a wrong or empty name or summary.` });
  }
});

module.exports = router;
