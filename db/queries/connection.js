const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost:5432/marine_lab");

module.exports = { db };
