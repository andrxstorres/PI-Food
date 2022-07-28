const express = require("express");
const router = express.Router();
const { Diet } = require("../db.js");

router.get("/", (req, res) => {
  Diet.findAll()
    .then((allDiets) => {
      res.send(allDiets);
    })
    .catch((err) => res.status(400).send({ m: `An error ocurred when querying the diets on DB`, from: "GET /diets", err }));
});

module.exports = router;
