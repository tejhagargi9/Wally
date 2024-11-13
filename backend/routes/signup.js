const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res
      .status(201)
      .json({ id: newUser._id, message: "User registered successfully" });
      console.log("User registered successfully");
      
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}); 

module.exports = router;