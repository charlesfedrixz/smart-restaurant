const express = require("express");
const {
  uploadFood,
  listFood,
  removedFood,
} = require("../controller/foodController");
const multer = require("multer");

const foodRoutes = express.Router();
//image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()} ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
// Route to handle food upload
foodRoutes.post("/uploadFood", upload.single("image"), uploadFood);
foodRoutes.get("/foodList", listFood);
foodRoutes.post("/remove", removedFood);
module.exports = { foodRoutes: foodRoutes };
