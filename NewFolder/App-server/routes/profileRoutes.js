const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const aclMiddleware = require('../middlewares/aclMiddleware');
const { getProfile, updateProfile } = require('../controllers/profileController');
const router = express.Router();

// Get health profile (restricted to Health Worker role with read permission)
router.get('/health/:userId', protect, roleMiddleware(['Health Worker']), aclMiddleware('healthProfile', 'read'), getProfile);

// Update health profile (restricted to Health Worker role with update permission)
router.put('/health/:userId', protect, roleMiddleware(['Health Worker']), aclMiddleware('healthProfile', 'update'), updateProfile);

// Similar routes can be set up for Education and Finance profiles

module.exports = router;