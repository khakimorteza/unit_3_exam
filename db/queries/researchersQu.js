const { db } = require("./connection.js");

const getAllResearchers = (req, res, next) => {
  db.any("SELECT * FROM researchers")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "you got all researchers",
        researchers: data
      });
    })
    .catch(err => next(err));
};

const getSingleResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.one("SELECT * FROM researchers WHERE id=$1", [researcherId])
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Received ONE Researcher!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addNewResearcher = (req, res, next) => {
  db.result(
    "INSERT INTO researchers(name, job_title) VALUES (${name}, ${job_title})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "YOU add a Researcher"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const updateSingleResearcher = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ");
  db.none(
    "UPDATE researchers SET " + queryString + " WHERE id=" + req.params.id,
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Updated a Researcher!"
      });
    })
    .catch(err => next(err));
};

const deleteResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.result("DELETE FROM researchers WHERE id=$1", researcherId)
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "You Need a Researcher",
        result: result
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllResearchers,
  getSingleResearcher,
  addNewResearcher,
  updateSingleResearcher,
  deleteResearcher
};
