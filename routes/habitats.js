const express = require("express");
const router = express.Router();
const {
  getAllHabitats,
  getSingleHabitat,
  addOneHabitat
} = require("../db/queries/habitatsQu.js");

router.get("/", getAllHabitats);
router.get("/:id", getSingleHabitat);
router.post("/", addOneHabitat);

module.exports = router;
