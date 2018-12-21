const express = require("express");
const router = express.Router();
const {
  getAllSightings,
  sightingsForAspecie,
  sightingsForAresearcher,
  sightingsForAnHabitat,
  addSightings,
  deleteSightings
} = require("../db/queries/sightingsQu.js");

router.get("/", getAllSightings);
router.get("/species/:id", sightingsForAspecie);
router.get("/researchers/:id", sightingsForAresearcher);
router.get("/habitats/:id", sightingsForAnHabitat);
router.post("/", addSightings);
router.delete("/:id", deleteSightings);

module.exports = router;
