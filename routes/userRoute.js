const express = require("express");
const { register } = require("../controller/userController");

const userRoutes = express.Router();
userRoutes.post("/register", register);

module.exports = {
  userRoutes: userRoutes,
};
