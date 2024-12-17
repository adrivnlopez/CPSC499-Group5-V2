const WorkoutPlan = require('../models/WorkoutPlan');
const mongoose = require('mongoose');
const User = require('../models/User'); // Import the User model

const createWorkoutPlan = async (req, res) => {
  const { name, exercises } = req.body;
  let { userId } = req.params;

  try {
    // Validate userId
    userId = userId.trim();
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Fetch user name from the User model
    const user = await User.findById(userObjectId).select('name');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const formattedExercises = exercises.map((exercise) => {
      const dropSets = (exercise.dropSets || []).map((dropSet, index) => ({
        setNumber: exercise.sets + index + 1,
        reps: dropSet.reps,
        weight: dropSet.weight,
      }));

      return {
        exerciseName: exercise.exerciseName,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        dropSets,
      };
    });

    // Create workout plan with userName
    const workoutPlan = await WorkoutPlan.create({
      user: userObjectId,
      userName: user.name, // Store the user's actual name
      name,
      exercises: formattedExercises,
    });

    res.status(201).json(workoutPlan);
  } catch (error) {
    console.error(`[CREATE] Error creating workout plan: ${error.message}`);
    res.status(500).json({ message: 'Error creating workout plan', error: error.message });
  }
};



const getWorkoutPlans = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const plans = await WorkoutPlan.find({ user: userId })
      .populate('user', 'name') // Populate user name dynamically
      .sort({ createdAt: -1 });

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

    // Process exercises and append new ones, avoiding duplicates
    if (exercises && Array.isArray(exercises)) {
      const formattedExercises = exercises.flatMap((exercise) => {
        const allSets = [];
        let setCounter = 1;

        // Add base sets
        for (let i = 0; i < exercise.sets; i++) {
          allSets.push({
            setNumber: setCounter++,
            exerciseName: exercise.exerciseName,
            reps: exercise.reps,
            weight: exercise.weight,
          });
        }

        // Add drop sets
        if (exercise.dropSets && Array.isArray(exercise.dropSets)) {
          exercise.dropSets.forEach((dropSet) => {
            allSets.push({
              setNumber: setCounter++,
              exerciseName: `${exercise.exerciseName} (Drop Set)`,
              reps: dropSet.reps,
              weight: dropSet.weight,
            });
          });
        }

        return allSets;
      });

      plan.exercises = formattedExercises;
    }

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
