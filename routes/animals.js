const express = require("express");
const router = express.Router();
const {
  getAllAnimals,
  getSingleAnimal,
  addNewAnimal,
  updateAnAnimal,
  deleteAnimal
} = require("../db/queries/animalsQu.js");

router.get("/", getAllAnimals);
router.get("/:id", getSingleAnimal);
router.post("/", addNewAnimal);
router.patch("/:id", updateAnAnimal);
router.delete("/:id", deleteAnimal);

module.exports = router;
