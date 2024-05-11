const mongoose = require("mongoose");
const Customer = require("../models/userModel");

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.ObjectId, ref: "Customer", required: true },
  tableNumber: { type: mongoose.ObjectId, ref: "Table", required: true },
  foodItems: [
    {
      foodName: {
        type: mongoose.ObjectId,
        ref: "Food",
      },
      quantiy: {
        type: Number,
        min: 1,
      },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: [
      "Food Processing...",
      "Ready for delivered...",
      "Completed...",
      "payment pending...",
      "payment done...",
    ],
    default: "Food Processing...",
  },
  createdAt: { type: Date, default: Date.now },
  isRated: { type: Boolean, default: false },
});

const order = mongoose.model.order || mongoose.model("order", orderSchema);
module.exports = order;
