const order = require("../models/orderModels"); // Assuming your order model is named Order
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  if (req.customer) {
    req.body.customer = req.customer._id;
    const newOrder = await order.create(req.body); // Changed 'order' to 'Order'
    if (!newOrder) {
      return res
        .status(500)
        .json({ success: false, message: "Failed in creating order" }); // Added return
    }
    return res.status(201).json(newOrder); // Added return
  } else {
    return res
      .status(403)
      .json({ success: false, message: "Not allowed to place order" }); // Added return
  }
});

module.exports = {
  createOrder, // Simplified this line as ES6 allows shorthand when key and value have the same name
};
