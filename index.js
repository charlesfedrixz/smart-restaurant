const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const { tableRoutes } = require("./routes/tableRoute");
const { adminRoutes } = require("./routes/adminRoute");
const { cartRoutes } = require("./routes/cartRoute");
const { foodRoutes } = require("./routes/foodRoute");
const categoryRoutes = require("./routes/categoryRoute");
const { userRoutes } = require("./routes/userRoute");
// const orderRoutes = require("./routes/orderRoutes");

app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));

connectDB();

app.use("/api/admin", adminRoutes);
app.use("/api/table", tableRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/user", userRoutes);
//app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Server is running...",
  });
});
// app.get("/table/:tableno", (req, res) => {
//   console.log(req.params.tableno);
//   res.json({
//     message: "Table " + req.params.tableno,
//   });
// });

const port = 1000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
