const mongoose = require("mongoose");

// Create Food Schema
const foodSchema = new mongoose.Schema({
  category: {
    type: mongoose.ObjectId,
    ref: "category",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;

// const mongoose = require("mongoose");
// const foodSchema = new mongoose.Schema({
//   foodName: {
//     type: String,
//     required: [true, "Food Name is required..."],
//     minilength: [2, "Minimum length is required at least 2 character..."],
//     maxlength: [100, "Maximum length is required at least 100 character..."],
//   },
//   description: {
//     type: String,
//     required: [true, "Description of the food items is required..."],
//     minilength: [
//       10,
//       "Minimum length of food description at least 10 character is required...",
//     ],
//     maxlength: [
//       200,
//       "Maximum length of food description at least 200 character is required...",
//     ],
//   },
//   price: {
//     type: Number,
//     required: [true, "Price is required..."],
//     min: [0.01, "Price should be greater than 0.01"],
//   },
//   category: {
//     type: String,
//     required: true,
//     enum: {
//       values: [
//         "Singju",
//         "Bora",
//         "Kanghou",
//         "Chak",
//         "Enjang",
//         "Desert",
//         "Beverages",
//         "Appetizer",
//         "Main Course",
//       ],
//       message: "Invalid category... ",
//     },
//   },
//   image: {
//     type: String,
//     required: [true, "Image URL is required"],
//     validate: {
//       validator: function (v) {
//         // Validate that the URL ends with .jpg, .jpeg, .png, or .gif
//         return /\.(jpg|jpeg|png|gif)$/i.test(v);
//       },
//       message: "Invalid image URL",
//     },
//   },
// });
// const FoodItem = mongoose.model("FoodItem", foodSchema);
// module.exports = {
//   FoodItem: FoodItem,
// };
