const WorkoutPlan = require('../models/WorkoutPlan');
const mongoose = require('mongoose');

// Create a new workout plan
const createWorkoutPlan = async (req, res) => {
  const { name, exercises } = req.body;
  let { userId } = req.params; // Changed to `let` to allow reassignment

  try {
    // Trim and log the userId
    userId = userId.trim();
    console.log(`[CREATE] Trimmed userId: '${userId}'`);

    // Validate userId
    if (!mongoose.isValidObjectId(userId)) {
      console.error(`[CREATE] Invalid userId: '${userId}'`);
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Convert userId to ObjectId using `new`
    const userObjectId = new mongoose.Types.ObjectId(userId);
    console.log(`[CREATE] Validated and converted userId: ${userObjectId}`);

    // Create the workout plan
    const workoutPlan = await WorkoutPlan.create({
      user: userObjectId,
      name,
      exercises,
    });

    console.log(`[CREATE] Workout plan created successfully: ${JSON.stringify(workoutPlan)}`);
    res.status(201).json(workoutPlan);
  } catch (error) {
    console.error(`[CREATE] Error creating workout plan: ${error.message}`);
    res.status(500).json({ message: 'Error creating workout plan', error: error.message });
  }
};

// Get all workout plans for a user
const getWorkoutPlans = async (req, res) => {
  const { userId } = req.params;

  try {
    // Validate userId
    if (!mongoose.isValidObjectId(userId)) {
      console.error(`[GET] Invalid userId: '${userId}'`);
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    console.log(`[GET] Fetching workout plans for userId: ${userId}`);
    const plans = await WorkoutPlan.find({ user: userId }) .populate('user', 'name').sort({ createdAt: -1 });

    console.log(`[GET] Retrieved plans: ${JSON.stringify(plans)}`);
    res.json(plans);
  } catch (error) {
    console.error(`[GET] Error retrieving workout plans: ${error.message}`);
    res.status(500).json({ message: 'Error retrieving workout plans', error: error.message });
  }
};

// Update a workout plan
const updateWorkoutPlan = async (req, res) => {
  const { planId } = req.params;
  const { name, exercises } = req.body;

  try {
    // Validate planId
    if (!mongoose.isValidObjectId(planId)) {
      console.error(`[UPDATE] Invalid planId: '${planId}'`);
      return res.status(400).json({ message: 'Invalid plan ID format' });
    }

    console.log(`[UPDATE] Updating workout plan with planId: ${planId}`);
    const plan = await WorkoutPlan.findById(planId);
    if (!plan) {
      console.error(`[UPDATE] Workout plan not found: '${planId}'`);
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    // Update fields
    if (name) plan.name = name;
    if (exercises) plan.exercises = exercises;

    await plan.save();
    console.log(`[UPDATE] Workout plan updated: ${JSON.stringify(plan)}`);
    res.json({ message: 'Workout plan updated successfully', plan });
  } catch (error) {
    console.error(`[UPDATE] Error updating workout plan: ${error.message}`);
    res.status(500).json({ message: 'Error updating workout plan', error: error.message });
  }
};

// Delete a workout plan
const deleteWorkoutPlan = async (req, res) => {
  const { planId } = req.params;

  try {
    // Validate planId
    if (!mongoose.isValidObjectId(planId)) {
      console.error(`[DELETE] Invalid planId: '${planId}'`);
      return res.status(400).json({ message: 'Invalid plan ID format' });
    }

    console.log(`[DELETE] Deleting workout plan with planId: ${planId}`);
    const plan = await WorkoutPlan.findByIdAndDelete(planId);
    if (!plan) {
      console.error(`[DELETE] Workout plan not found: '${planId}'`);
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    console.log(`[DELETE] Workout plan deleted: '${planId}'`);
    res.json({ message: 'Workout plan deleted successfully' });
  } catch (error) {
    console.error(`[DELETE] Error deleting workout plan: ${error.message}`);
    res.status(500).json({ message: 'Error deleting workout plan', error: error.message });
  }
};

module.exports = { createWorkoutPlan, getWorkoutPlans, updateWorkoutPlan, deleteWorkoutPlan };
