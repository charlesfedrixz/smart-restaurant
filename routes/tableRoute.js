const express = require("express");
const { createTable } = require("../controller/tableController");

const tableRoutes = express.Router();
tableRoutes.post("/create", createTable);

module.exports = {
  tableRoutes: tableRoutes,
};
