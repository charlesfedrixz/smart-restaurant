const Food = require("../models/foodModels");
const fs = require("fs");

const uploadFood = async (req, res) => {
  try {
    let imagePath = req.file.filename; // File path after upload

    // Save food details to MongoDB
    const newFood = new Food({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      image: imagePath,
    });
    await newFood.save();

    res.status(201).json({ message: "Food uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//list food
const listFood = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json({ success: true, Data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};
//remove food
const removedFood = async (req, res) => {
  try {
    const food = await Food.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await Food.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

module.exports = {
  uploadFood: uploadFood,
  listFood: listFood,
  removedFood: removedFood,
};
