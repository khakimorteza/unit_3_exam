const { db } = require("./connection.js");

const getAllSpecies = (req, res, next) => {
  db.any("SELECT * FROM species")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "you got all species",
        researchers: data
      });
    })
    .catch(err => next(err));
};

const getSingleSpecie = (req, res, next) => {
  let specieId = parseInt(req.params.id);
  db.one("SELECT * FROM species WHERE id=$1", [specieId])
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Received ONE specie!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addOneSpecie = (req, res, next) => {
  db.result(
    "INSERT INTO species(name, is_mammal) VALUES (${name}, ${is_mammal})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "YOU add a specie"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = { getAllSpecies, getSingleSpecie, addOneSpecie };
