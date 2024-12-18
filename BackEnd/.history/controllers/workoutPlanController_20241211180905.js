const WorkoutPlan = require('../models/WorkoutPlan');

// create new workout plan for user
const createWorkoutPlan = async (req, res) => {
  const { userId } = req.params;
  const { name, exercises } = req.body;

  try {
    const plan = await WorkoutPlan.create({
      user: userId,
      name,
      exercises,
    });

    res.status(201).json({ message: 'Workout plan created successfully', plan });
  } catch (error) {
    res.status(500).json({ message: 'Error creating workout plan', error });
  }
};

// get all workout plans for user
const getWorkoutPlans = async (req, res) => {
  const { userId } = req.params;

  try {
    const plans = await WorkoutPlan.find({ user: userId }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout plans', error });
  }
};

// update a specific workout plan
const updateWorkoutPlan = async (req, res) => {
  const { planId } = req.params;
  const { name, exercises } = req.body;

  try {
    const plan = await WorkoutPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: 'Workout plan not found' });

    plan.name = name ?? plan.name;
    plan.exercises = exercises ?? plan.exercises;
    await plan.save();

    res.json({ message: 'Workout plan updated successfully', plan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating workout plan', error });
  }
};

// delete a specific workout plan
const deleteWorkoutPlan = async (req, res) => {
  const { planId } = req.params;

  try {
    const plan = await WorkoutPlan.findByIdAndDelete(planId);
    if (!plan) return res.status(404).json({ message: 'Workout plan not found' });

    res.json({ message: 'Workout plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout plan', error });
  }
};

module.exports = {
  createWorkoutPlan,
  getWorkoutPlans,
  updateWorkoutPlan,
  deleteWorkoutPlan,
};
