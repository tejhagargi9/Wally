const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Ensure usernames are unique
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Ensure emails are unique
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  wallpaperUrls: [{ 
    type: String 
  }],
  profilePhotoUrl : {
    default: 'https://cdn-icons-png.flaticon.com/128/10398/10398223.png',
    type : String
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const User = mongoose.model('User', userSchema);

module.exports = User;
