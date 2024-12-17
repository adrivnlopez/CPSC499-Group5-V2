const WorkoutPlan = require('../models/WorkoutPlan');

// Create a new workout plan
const createWorkoutPlan = async (req, res) => {
  const { userId } = req.params;
  const { name, exercises } = req.body;

  if (!userId || !name || !exercises) {
    return res.status(400).json({ message: 'User ID, name, and exercises are required.' });
  }

  try {
    const plan = await WorkoutPlan.create({ user: userId, name, exercises });
    res.status(201).json({ message: 'Workout plan created successfully', plan });
  } catch (error) {
    res.status(500).json({ message: 'Error creating workout plan', error: error.message });
  }
};

// Get all workout plans for a user
const getWorkoutPlans = async (req, res) => {
  const { userId } = req.params;

  try {
    const plans = await WorkoutPlan.find({ user: userId }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout plans', error: error.message });
  }
};

// Update a workout plan
const updateWorkoutPlan = async (req, res) => {
  const { planId } = req.params;
  const { name, exercises } = req.body;

  try {
    const plan = await WorkoutPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: 'Workout plan not found' });

    if (name) plan.name = name;
    if (exercises) plan.exercises = exercises;

    await plan.save();
    res.json({ message: 'Workout plan updated successfully', plan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating workout plan', error: error.message });
  }
};

// Delete a workout plan
const deleteWorkoutPlan = async (req, res) => {
  const { planId } = req.params;

  try {
    const plan = await WorkoutPlan.findByIdAndDelete(planId);
    if (!plan) return res.status(404).json({ message: 'Workout plan not found' });

    res.json({ message: 'Workout plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout plan', error: error.message });
  }
};

module.exports = { createWorkoutPlan, getWorkoutPlans, updateWorkoutPlan, deleteWorkoutPlan };
