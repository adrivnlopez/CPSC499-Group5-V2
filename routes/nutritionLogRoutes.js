const express = require('express');
const { protect } = require('../middlewares/authMiddleware'); // Middleware for authentication
const {
  createNutritionLog,
  getNutritionLogs,
  updateNutritionLog,
  deleteNutritionLog,
} = require('../controllers/nutritionLogController');
const router = express.Router();

// Nutrition log routes
router.post('/:userId', protect, createNutritionLog);           // Create a new nutrition log
router.get('/:userId', protect, getNutritionLogs);              // Get all nutrition logs for a user
router.put('/:logId', protect, updateNutritionLog);             // Update a specific nutrition log
router.delete('/:logId', protect, deleteNutritionLog);          // Delete a specific nutrition log

module.exports = router;
