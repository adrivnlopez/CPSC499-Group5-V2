const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { getAccessLogs, getAuditTrails } = require('../controllers/logController'); // Import logging and audit functions
const { protect } = require('../middlewares/authMiddleware'); // Import protect middleware
const roleMiddleware = require('../middlewares/roleMiddleware'); // Import role-based middleware
const router = express.Router();

// Authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Fetch authenticated user data
router.get('/user', protect, (req, res) => {
  try {
    // req.user is set by the protect middleware
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Reporting routes for Admins, Super Admins, and Deus
router.get('/access-logs', protect, roleMiddleware(['Admin', 'Super Admin', 'Deus']), getAccessLogs);
router.get('/audit-trails', protect, roleMiddleware(['Admin', 'Super Admin', 'Deus']), getAuditTrails);

module.exports = router;