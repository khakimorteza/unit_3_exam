const express = require("express");
const router = express.Router();
const {
  getAllTaggings,
  getSingleTagging,
  getAllTaggingsForAresearcher,
  getAllTaggingsForAnAnimall,
  addTagging
} = require("../db/queries/taggingsQu.js");

router.get("/", getAllTaggings);
router.get("/:id", getSingleTagging);
router.get("/researchers/:id", getAllTaggingsForAresearcher);
router.get("/animals/:id", getAllTaggingsForAnAnimall);
router.post("/", addTagging);

module.exports = router;
