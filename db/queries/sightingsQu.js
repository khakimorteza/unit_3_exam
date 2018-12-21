const { db } = require("./connection.js");

const getAllSightings = (req, res, next) => {
  db.any("SELECT * FROM sightings")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "you got all sightings",
        sightings: data
      });
    })
    .catch(err => next(err));
};

const sightingsForAspecie = (req, res, next) => {
  let specieId = parseInt(req.params.id);
  db.any("SELECT * FROM sightings WHERE species_id=$1", specieId).then(data => {
    res.status(200).json({
      status: "success",
      sightings: data,
      message: "sighting(s) for this specie"
    });
  });
};

const sightingsForAresearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.any("SELECT * FROM sightings WHERE researcher_id=$1", researcherId)
    .then(data => {
      res.status(200).json({
        status: "success",
        sightings: data,
        message: "sighting(s) for this researcher"
      });
    })
    .catch(err => next(err));
};

const sightingsForAnHabitat = (req, res, next) => {
  let habitatId = parseInt(req.params.id);
  db.any("SELECT * FROM sightings WHERE habitat_id=$1", habitatId)
    .then(data => {
      res.status(200).json({
        status: "success",
        sightings: data,
        message: "sighting(s) for this habitat"
      });
    })
    .catch(err => next(err));
};

const addSightings = (req, res, next) => {
  db.result(
    "INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES (${researcher_id}, ${species_id}, ${habitat_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "YOU add another Sightings"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteSightings = (req, res, next) => {
  let sightingsId = parseInt(req.params.id);
  db.result("DELETE FROM sightings WHERE id=$1", sightingsId)
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "You delete a sighting"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllSightings,
  sightingsForAspecie,
  sightingsForAresearcher,
  sightingsForAnHabitat,
  addSightings,
  deleteSightings
};
