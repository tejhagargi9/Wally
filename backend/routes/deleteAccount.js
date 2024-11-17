const express = require('express');
const router = express.Router();
const User = require('../models/userSchema'); // Assuming you have a User model for your database

// Delete User Account
router.post('/deleteAccount', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required to delete account.' });
    }

    // Find and delete the user by email
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'Account deleted successfully.', deletedUser });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'An error occurred while deleting the account.', error });
  }
});

module.exports = router;
