const WorkoutPlan = require('../models/WorkoutPlan');

// @desc Create a new workout plan
// @route POST /api/workout-plans/:userId
const createWorkoutPlan = async (req, res) => {
  const { name, exercises } = req.body;

  try {
    const workoutPlan = await WorkoutPlan.create({
      user: req.params.userId, // Associate the workout plan with the user
      name,
      exercises,
    });

    res.status(201).json(workoutPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating workout plan', error: error.message });
  }
};

// @desc Get all workout plans for a user
// @route GET /api/workout-plans/:userId
const getWorkoutPlans = async (req, res) => {
  try {
    const workoutPlans = await WorkoutPlan.find({ user: req.params.userId });
    res.status(200).json(workoutPlans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workout plans', error: error.message });
  }
};

module.exports = { createWorkoutPlan, getWorkoutPlans };
