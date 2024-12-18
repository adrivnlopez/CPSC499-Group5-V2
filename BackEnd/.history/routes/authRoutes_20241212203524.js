const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Authentication routes
router.post('/register', registerUser); // User registration
router.post('/login', loginUser);       // User login

// Fetch authenticated user data
router.get('/user', protect, (req, res) => {
  try {
    // req.user is set by the protect middleware
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user data', error: err.message });
  }
});

module.exports = router;
