const jwt = require("jsonwebtoken");
const customer = require("../models/userModel");
//const { createTable } = require("../controller/tableController");

const register = async (req, res) => {
  const { userName, mobileNumber } = req.body;

  // Validate request body
  if (!mobileNumber || !mobileNumber.number) {
    return res.status(400).json({ error: "Mobile number is required" });
  }

  try {
    // Check if the mobile number is already registered
    const existingUser = await customer.findOne({
      "mobileNumber.number": mobileNumber.number,
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Mobile number already registered" });
    }

    // Create a new user
    const newUser = new customer({
      userName,
      mobileNumber,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ TableId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      success: true,
      message: "Customer is registered successfully",
      newUser,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = { register };
