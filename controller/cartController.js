const Table = require("../models/tableModels");
//add cart to the table item
const addToCart = async (req, res) => {
  try {
    // Find the table data by ID
    let tableData = await Table.findById(req.body.tableId);

    // Get the cartData from the table
    let cartData = tableData.cartData;

    // Increment the quantity of the specified item in the cart
    if (!cartData[req.body.foodId]) {
      cartData[req.body.foodId] = 1;
    } else {
      cartData[req.body.foodId] += 1;
    }

    // Update the cartData in the table document and save changes
    tableData.cartData = cartData;
    await tableData.save();
    await Table.findByIdAndUpdate(req.body.tableId, { cartData });

    // Send response with updated tableData and cartData
    res.json({
      success: true,
      message: "Added to cart.. ",
      tableData,
      cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

//remove from cart
const removeFromCart = async (req, res) => {
  try {
    let tableData = await Table.findById(req.body.tableId);
    let cartData = await tableData.cartData;
    if (cartData[req.body.foodId] > 0) {
      cartData[req.body.foodId] -= 1;
    }
    await Table.findByIdAndUpdate(req.body.tableId, { cartData });
    res.json({ success: true, message: "Removed from cart.." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};
//fetch table cartdata
const getCart = async (req, res) => {
  try {
    let tableData = await Table.findById(req.body.tableId);
    let cartData = await tableData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

module.exports = {
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  getCart: getCart,
};
