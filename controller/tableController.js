const Table = require("../models/tableModels");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const createTable = async (req, res) => {
  try {
    const { tableNumber, capacity } = req.body;
    if (!tableNumber || !capacity) {
      return res.json({
        success: false,
        message: "Please field Table Number along with capacity...",
      });
    }
    const table = await Table.create({ tableNumber, capacity });
    const token = createToken(table._id);
    res.status(201).json({
      success: true,
      token,
      message: `Table ${tableNumber} is created successfully...`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in creating Table... " });
  }
};
module.exports = {
  createTable: createTable,
};
