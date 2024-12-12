const express = require('express');
const { protect } = require('../middlewares/authMiddleware'); // Middleware for authentication
const { 
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
} = require('../controllers/nutritionLogController');
const router = express.router();

// route to fetch the goals for a user
router.get('/user/:userId/goals', getGoals);
// route to create a new goal for the user
router.post('/user/:userId/goals', createGoal);
//route to update an existing goal
router.put('/goals/:goalId', updateGoal);
// route to delete an existing goal
router.delete('/goals/:goalId', deleteGoal);

module.express = router;