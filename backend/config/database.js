const config = require("./index");
require('dotenv').config();
const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

console.log("DATABASE!!!!!!!!!!!!!!!!!", database)

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "postgres",
    seederStorage: "sequelize",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    seederStorage: "sequelize",
  },
};

