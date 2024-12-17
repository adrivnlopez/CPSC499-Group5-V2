const WorkoutPlan = require('../models/WorkoutPlan');
const mongoose = require('mongoose');

// Create a new workout plan
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

    // Format exercises to include set numbers and drop sets
    const formattedExercises = exercises.flatMap((exercise) => {
      let setCounter = 1; // Start the set counter for each exercise
      const allSets = [];

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
            setNumber: setCounter++, // Increment set number for drop sets
            exerciseName: `${exercise.exerciseName} (Drop Set)`,
            reps: dropSet.reps,
            weight: dropSet.weight,
          });
        });
      }

      return allSets; // Return all sets (regular and drop sets)
    });

    // Create workout plan
    const workoutPlan = await WorkoutPlan.create({
      user: userObjectId,
      name,
      exercises: formattedExercises,
    });

    res.status(201).json(workoutPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating workout plan', error: error.message });
  }
};

// Update a workout plan
const updateWorkoutPlan = async (req, res) => {
  const { planId } = req.params;
  const { name, exercises } = req.body;

  try {
    // Validate planId
    if (!mongoose.isValidObjectId(planId)) {
      return res.status(400).json({ message: 'Invalid plan ID format' });
    }

    const plan = await WorkoutPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    // Update fields
    if (name) plan.name = name;

    // Reformat exercises with set numbers and drop sets
    if (exercises && Array.isArray(exercises)) {
      const formattedExercises = exercises.flatMap((exercise) => {
        let setCounter = 1;
        const allSets = [];

        // Regular sets
        for (let i = 0; i < exercise.sets; i++) {
          allSets.push({
            setNumber: setCounter++,
            exerciseName: exercise.exerciseName,
            reps: exercise.reps,
            weight: exercise.weight,
          });
        }

        // Drop sets
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

      plan.exercises = formattedExercises; // Update exercises
    }

    await plan.save();
    res.json({ message: 'Workout plan updated successfully', plan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating workout plan', error: error.message });
  }
};

// Get all workout plans for a user
const getWorkoutPlans = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const plans = await WorkoutPlan.find({ user: userId })
      .populate('user', 'name') // Populate user name for clarity
      .sort({ createdAt: -1 });

    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout plans', error: error.message });
  }
};

// Delete a workout plan
const deleteWorkoutPlan = async (req, res) => {
  const { planId } = req.params;

  try {
    if (!mongoose.isValidObjectId(planId)) {
      return res.status(400).json({ message: 'Invalid plan ID format' });
    }

    const plan = await WorkoutPlan.findByIdAndDelete(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    res.json({ message: 'Workout plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout plan', error: error.message });
  }
};

module.exports = { createWorkoutPlan, getWorkoutPlans, updateWorkoutPlan, deleteWorkoutPlan };
