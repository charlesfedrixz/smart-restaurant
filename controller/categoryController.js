const categoryModal = require("../models/categoryModels");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const category = new categoryModal({
      name: name,
    });
    await category.save();
    if (category) {
      res.status(201).send({
        success: true,
        message: "Created Category",
        category,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = createCategory;
