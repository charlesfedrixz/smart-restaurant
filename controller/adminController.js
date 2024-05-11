const User = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

//create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//create user
const createUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide all fields." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }
    //validation for email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email..",
      });
    }
    //validation for password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter password minimum 8 length..",
      });
    }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create a new user
    const maxAge = 3 * 24 * 60 * 60;
    const newUser = new User({ email: email, password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(user._id);
    res
      .status(201)
      .cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
      .json({ success: true, token, message: "Admin signed up successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    //res.json({ message: "Email is found", user });
    // Check if user exists
    if (!user) {
      return res.json({ success: false, message: "Admin does not exits" });
    }
    // Compare passwords
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ passwordMatch, error: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, message: "Admin Login successfull..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

module.exports = {
  createUser: createUser,
  login: login,
};
