const express = require('express');
const { protect } = require('../middlewares/authMiddleware');       // middleware for authentication
const { getProfile, updateProfile } = require('../controllers/profileController');
const router = express.Router();

// general user profile routes
router.get('/:userId', protect, getProfile);        // get user profile
router.put('/:userId', protect, updateProfile);     // update user profile

module.exports = router;