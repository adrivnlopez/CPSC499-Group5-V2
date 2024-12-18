const express = require('express');
const { protect } = require('../middlewares/authMiddleware'); // Middleware for authentication
const { 
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
} = require('../controllers/goalTrackerController');
const router = express.Router();

// route to fetch the goals for a user
router.get('/user/:userId/goals', protect, getGoals);
// route to create a new goal for the user
router.post('/user/:userId/goals', protect, createGoal);
//route to update an existing goal
router.put('/goals/:goalId', protect, updateGoal);
// route to delete an existing goal
router.delete('/goals/:goalId', protect, deleteGoal);

module.exports = router;