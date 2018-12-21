const express = require("express");
const router = express.Router();
const {
  getAllSpecies,
  getSingleSpecie,
  addOneSpecie
} = require("../db/queries/speciesQu.js");

router.get("/", getAllSpecies);
router.get("/:id", getSingleSpecie);
router.post("/", addOneSpecie);

module.exports = router;
