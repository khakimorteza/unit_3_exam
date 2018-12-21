const express = require("express");
const router = express.Router();
const {
  getAllResearchers,
  getSingleResearcher,
  addNewResearcher,
  updateSingleResearcher,
  deleteResearcher
} = require("../db/queries/researchersQu.js");

router.get("/", getAllResearchers);
router.get("/:id", getSingleResearcher);
router.post("/", addNewResearcher);
router.patch("/:id", updateSingleResearcher);
router.delete("/:id", deleteResearcher);

module.exports = router;
