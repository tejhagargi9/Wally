const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/userSchema'); // Adjust the path to your User model

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads'); // Adjust relative path to avoid overwriting route folder
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Create folder if it doesn't exist
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const cleanFilename = file.originalname.replace(/\s+/g, '_'); // Sanitize filename
    cb(null, `${timestamp}-${cleanFilename}`);
  },
});

const upload = multer({ storage });

// Profile photo upload endpoint
router.post('/updateProfilePhoto', upload.single('profileImage'), async (req, res) => {
  const { email } = req.body;

  // Validate request
  if (!email || !req.file) {
    return res.status(400).json({ error: 'Invalid request. Email and image are required.' });
  }

  try {
    // Generate URL for the uploaded image
    const profileImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    console.log('Uploaded profile image URL:', profileImageUrl);

    // Update user profile photo in the database
    const user = await User.findOneAndUpdate(
      { email },
      { profilePhotoUrl: profileImageUrl },
      { new: true }
    );

    // If the user is not found
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Respond with updated profile image URL
    res.json({ profileImage: user.profilePhotoUrl });
  } catch (error) {
    console.error('Error updating profile photo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
