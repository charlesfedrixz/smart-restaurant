const express = require("express");
const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../controller/cartController");
//const { authMiddleware } = require("../middleware/authUser");

const cartRoutes = express.Router();

cartRoutes.post("/add", addToCart);
cartRoutes.post("/remove", removeFromCart);
cartRoutes.post("/list", getCart);
module.exports = {
  cartRoutes: cartRoutes,
};
