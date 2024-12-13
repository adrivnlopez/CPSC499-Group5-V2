const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware'); // Import protect middleware (for authentication)
const router = express.Router();

// Authentication routes
router.post('/register', registerUser);   // user registration
router.post('/login', loginUser);         // user login

// Fetch authenticated user data
router.get('/user', protect, (req, res) => {
  try {
    // req.user is set by the protect middleware
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

module.exports = router;