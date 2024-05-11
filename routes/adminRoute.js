const express = require("express");
const { createUser, login } = require("../controller/adminController");

const adminRoutes = express.Router();
adminRoutes.post("/create", createUser);
adminRoutes.post("/login", login);
module.exports = {
  adminRoutes: adminRoutes,
};
