const express = require("express");

const { createOrder } = require("../controller/orderController");

const orderRoutes = express.Router();

orderRoutes.post("/orderFood", createOrder);
module.exports = {
  orderRoutes: orderRoutes,
};
