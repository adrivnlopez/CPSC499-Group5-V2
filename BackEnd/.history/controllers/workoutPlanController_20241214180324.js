const WorkoutPlan = require('../models/WorkoutPlan');
const mongoose = require('mongoose');

// Create a new workout plan
const createWorkoutPlan = async (req, res) => {
  const { name, exercises } = req.body;
  const { userId } = req.params;

  try {
    // Log the received userId
    console.log(`Raw userId received: ${userId}`);

    userId = userId.trim();
    console.log(`Trimmed userId: '${userId}'`);


    // Check length and content of userId
    console.log(`Length of userId: ${userId.length}`);
    console.log(`Is userId hex: ${/^[0-9a-fA-F]{24}$/.test(userId)}`);

    // Validate userId
    if (!mongoose.isValidObjectId(userId)) {
      console.error(`Invalid userId: ${userId}`);
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);
    console.log(`Validated and converted userId: ${userObjectId}`);

    // Create the workout plan
    const workoutPlan = await WorkoutPlan.create({
      user: userObjectId,
      name,
      exercises,
    });

    // Log success and send response
    console.log(`Workout plan created successfully: ${JSON.stringify(workoutPlan)}`);
    res.status(201).json(workoutPlan);
  } catch (error) {
    console.error(`Error creating workout plan: ${error.message}`);
    res.status(500).json({ message: 'Error creating workout plan', error: error.message });
  }
};

// Get all workout plans for a user
const getWorkoutPlans = async (req, res) => {
  const { userId } = req.params;

  try {
    // Log the received userId
    console.log(`Fetching workout plans for userId: ${userId}`);

    const plans = await WorkoutPlan.find({ user: userId }).sort({ createdAt: -1 });

    console.log(`Workout plans retrieved: ${JSON.stringify(plans)}`);
    res.json(plans);
  } catch (error) {
    console.error(`Error retrieving workout plans: ${error.message}`);
    res.status(500).json({ message: 'Error retrieving workout plans', error: error.message });
  }
};

// Update a workout plan
const updateWorkoutPlan = async (req, res) => {
  const { planId } = req.params;
  const { name, exercises } = req.body;

  try {
    // Log the received planId
    console.log(`Updating workout plan with planId: ${planId}`);

    const plan = await WorkoutPlan.findById(planId);
    if (!plan) {
      console.error(`Workout plan not found: ${planId}`);
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    if (name) plan.name = name;
    if (exercises) plan.exercises = exercises;

    await plan.save();
    console.log(`Workout plan updated successfully: ${JSON.stringify(plan)}`);
    res.json({ message: 'Workout plan updated successfully', plan });
  } catch (error) {
    console.error(`Error updating workout plan: ${error.message}`);
    res.status(500).json({ message: 'Error updating workout plan', error: error.message });
  }
};

// Delete a workout plan
const deleteWorkoutPlan = async (req, res) => {
  const { planId } = req.params;

  try {
    // Log the received planId
    console.log(`Deleting workout plan with planId: ${planId}`);

    const plan = await WorkoutPlan.findByIdAndDelete(planId);
    if (!plan) {
      console.error(`Workout plan not found: ${planId}`);
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    console.log(`Workout plan deleted successfully`);
    res.json({ message: 'Workout plan deleted successfully' });
  } catch (error) {
    console.error(`Error deleting workout plan: ${error.message}`);
    res.status(500).json({ message: 'Error deleting workout plan', error: error.message });
  }
};

module.exports = { createWorkoutPlan, getWorkoutPlans, updateWorkoutPlan, deleteWorkoutPlan };
