const express = require("express");
const createCategory = require("../controller/categoryController");
const categoryRoutes = express.Router();

categoryRoutes.post("/create", createCategory);
module.exports = categoryRoutes;
