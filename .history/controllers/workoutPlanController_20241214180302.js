const WorkoutPlan = require('../models/WorkoutPlan');
const mongoose = require('mongoose');

// Create a new workout plan
const createWorkoutPlan = async (req, res) => {
  const { name, exercises } = req.body;
  let { userId } = req.params; // Changed to `let` to allow reassignment

  try {
    // Trim the userId to remove any spaces or extra characters
    userId = userId.trim(); // This works now because `userId` is declared as `let`
    console.log(`Trimmed userId: '${userId}'`);

    // Check length and content of userId
    console.log(`Length of userId after trim: ${userId.length}`);
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

    console.log(`Workout plan created successfully: ${JSON.stringify(workoutPlan)}`);
    res.status(201).json(workoutPlan);
  } catch (error) {
    console.error(`Error creating workout plan: ${error.message}`);
    res.status(500).json({ message: 'Error creating workout plan', error: error.message });
  }
};

module.exports = { createWorkoutPlan };
