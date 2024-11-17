const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

router.get("/getUserData", async (req, res) => {
  const { email } = req.query; // Access email from query parameters

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Format the createdAt date to "Month Year"
    const createdAtDate = new Date(user.createdAt);
    const options = { year: 'numeric', month: 'long' };
    const formattedDate = createdAtDate.toLocaleDateString('en-US', options);

    // Send response with email, username, and formatted creation date
    res.status(200).json({
      email: user.email,
      username: user.username,
      profileImage: user.profilePhotoUrl,  
      createdDate: formattedDate
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
