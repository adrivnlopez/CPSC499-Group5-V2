const express = require('express');
const { protect } = require('../middlewares/authMiddleware');       // middleware for authentication
const { deleteProfile, getProfile, updateProfile } = require('../controllers/profileController');
const router = express.Router();

// general user profile routes
router.get('/:userId', protect, getProfile);        // get user profile
router.put('/:userId', protect, updateProfile);     // update user profile
router.delete('/:userId', protect, deleteProfile);     // delete user Profile

module.exports = router;