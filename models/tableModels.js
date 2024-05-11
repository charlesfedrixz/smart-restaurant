const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  cartData: {
    type: Map,
    of: Number, // Key-value pairs of food item ID and quantity
    default: {},
  },
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;
