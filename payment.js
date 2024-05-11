const express = require("express");
const paymentRoutes = express.Router();
const Razorpay = require("razorpay");

// Payment route handler
paymentRoutes.post("/pay", async (req, res) => {
  try {
    //Initialize Razorpay instance with your API keys
    const razorpay = new Razorpay({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret,
    });
    const options = {
      amount: req.body.amount * 100, // Amount in smallest currency unit (e.g., paisa)
      currency: "INR", // Currency code (e.g., INR for Indian Rupees)
      receipt: "order_receipt_" + Math.random().toString(36).substring(7), // Unique order receipt ID
      payment_capture: "1", // Auto capture payment
    };

    // Create a new Razorpay order
    const neworder = await razorpay.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
      }
      res.status(200).json({ order });
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = paymentRoutes;
