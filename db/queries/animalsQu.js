const { db } = require("./connection.js");

const getAllAnimals = (req, res, next) => {
  db.any("SELECT * FROM animals")
    .then(data => {
      res.status(200).json({
        status: "success",
        animals: data,
        message: "All animals"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSingleAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.one("SELECT * FROM animals WHERE id=$1", animalId)
    .then(data => {
      res.status(200).json({
        status: "success",
        aninal: data,
        message: "Received ONE animal"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addNewAnimal = (req, res, next) => {
  db.result(
    "INSERT INTO animals(species_id, nickname) VALUES (${species_id}, ${nickname})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "YOU add new Animal"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const updateAnAnimal = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ");
  db.none(
    "UPDATE animals SET " + queryString + " WHERE id=" + req.params.id,
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Updated an Animal!"
      });
    })
    .catch(err => next(err));
};

const deleteAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.result("DELETE FROM animals WHERE id=$1", animalId)
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "You kill an animal",
        result: result
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllAnimals,
  getSingleAnimal,
  addNewAnimal,
  deleteAnimal,
  updateAnAnimal
};
