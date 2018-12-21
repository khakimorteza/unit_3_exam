const { db } = require("./connection.js");

const getAllTaggings = (req, res, next) => {
  db.any("SELECT * FROM taggings")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "you got all taggings",
        taggings: data
      });
    })
    .catch(err => next(err));
};

const getSingleTagging = (req, res, next) => {
  let taggingId = parseInt(req.params.id);
  db.one("SELECT * FROM taggings WHERE id=$1", [taggingId])
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Received ONE Tagging!"
      });
    })
    .catch(err => next(err));
};

const getAllTaggingsForAresearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.any("SELECT * FROM taggings WHERE researcher_id=$1", researcherId)
    .then(data => {
      res.status(200).json({
        status: "success",
        taggings: data,
        message: "all taggings for this Researcher"
      });
    })
    .catch(err => next(err));
};

const getAllTaggingsForAnAnimall = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.any("SELECT * FROM taggings WHERE animal_id=$1", animalId)
    .then(data => {
      res.status(200).json({
        status: "success",
        taggings: data,
        message: "all taggings for this animal"
      });
    })
    .catch(err => next(err));
};

const addTagging = (req, res, next) => {
  db.result(
    "INSERT INTO taggings(animal_id, researcher_id) VALUES (${animal_id}, ${researcher_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "YOU add another Tagging"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllTaggings,
  getSingleTagging,
  getAllTaggingsForAnAnimall,
  getAllTaggingsForAresearcher,
  addTagging
};
