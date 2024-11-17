const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');
const User = require('../models/userSchema'); // Assuming this model is for user data
const { log } = require('console');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Multer configuration for storing images in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// Route for uploading the wallpaper
router.post('/uploadWallpaper', upload.single('file'), async (req, res) => {
  try { 
    // Check if file is present
    log(req.file);a
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded!' });
    }

    // Convert buffer to stream
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      async (error, result) => {
        if (error) {
          return res.status(500).send({ message: 'Cloudinary upload failed', error });
        }

        // Save the image URL in the user's profile
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }

        // Add the new wallpaper URL to the user's wallpaperUrls array
        user.wallpaperUrls.push(result.secure_url);  // Push the new wallpaper URL
        await user.save();

        // Send the response with the Cloudinary URL of the uploaded image
        return res.status(200).send({
          message: 'Wallpaper uploaded successfully!',
          url: result.secure_url,  // Return the Cloudinary URL of the uploaded image
        });
      }
    );

    // Create a readable stream from the buffer and pipe it to Cloudinary
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);  // End of stream
    bufferStream.pipe(uploadStream);

  } catch (err) {
    console.error('Error during file upload:', err);
    res.status(500).send({ message: 'Server error during file upload' });
  }
});

module.exports = router;
