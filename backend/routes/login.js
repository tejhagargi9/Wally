const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if password matches
    if (password !== existingUser.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Login successful
    res.status(200).json({ id: existingUser._id, message: "Login successful", username : existingUser.username });
    console.log("User logged in successfully");

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
