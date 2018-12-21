const { db } = require("./connection.js");

const getAllHabitats = (req, res, next) => {
  db.any("SELECT * FROM habitats")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "you got all habitats",
        researchers: data
      });
    })
    .catch(err => next(err));
};

const getSingleHabitat = (req, res, next) => {
  let habitatId = parseInt(req.params.id);
  db.one("SELECT * FROM habitats WHERE id=$1", [habitatId])
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Received ONE habitat!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addOneHabitat = (req, res, next) => {
  db.result("INSERT INTO habitats(category) VALUES (${category})", req.body)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "YOU add an habitat"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = { getAllHabitats, getSingleHabitat, addOneHabitat };
