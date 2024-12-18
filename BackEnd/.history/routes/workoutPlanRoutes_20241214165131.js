const express = require('express');
const { protect } = require('../middlewares/authMiddleware'); // Middleware for authentication
const {
  createWorkoutPlan,
  getWorkoutPlans,
  updateWorkoutPlan,
  deleteWorkoutPlan,
} = require('../controllers/workoutPlanController');
const router = express.Router();

// Workout plan routes
router.post('/:userId', protect, createWorkoutPlan);           // Create a new workout plan
router.get('/:userId', protect, getWorkoutPlans);              // Get all workout plans for a user
router.put('/:userId', protect, updateWorkoutPlan);            // Update a specific workout plan
router.delete('/:planId', protect, deleteWorkoutPlan);         // Delete a specific workout plan

module.exports = router;
