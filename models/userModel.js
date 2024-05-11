const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      number: { type: Number, required: true, unique: true },
    },
  },
  { timestamps: true }
);

const customer = mongoose.model("Customer", customerSchema);

module.exports = customer;
