const WorkoutPlan = require('../models/WorkoutPlan');
const mongoose = require('mongoose');

// Create a new workout plan
const createWorkoutPlan = async (req, res) => {
  const { name, exercises } = req.body;
  let { userId } = req.params;

  try {
    // Trim and validate userId
    userId = userId.trim();
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Format exercises and enumerate sets
    const formattedExercises = exercises.map((exercise) => {
      let setNumber = 1; // Start set numbering from 1
      const allSets = [];

      // Regular sets
      for (let i = 0; i < exercise.sets; i++) {
        allSets.push({
          setNumber: setNumber++,
          reps: exercise.reps,
          weight: exercise.weight,
          type: "Regular Set",
        });
      }

      // Drop sets
      if (exercise.dropSets) {
        exercise.dropSets.forEach((dropSet) => {
          allSets.push({
            setNumber: setNumber++,
            reps: dropSet.reps,
            weight: dropSet.weight,
            type: "Drop Set",
          });
        });
      }

      return {
        exerciseName: exercise.exerciseName,
        sets: allSets, // Sequential list of sets
      };
    });

    // Save the workout plan
    const workoutPlan = await WorkoutPlan.create({
      user: userId,
      name,
      exercises: formattedExercises,
    });

    res.status(201).json(workoutPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating workout plan', error: error.message });
  }
};

// Update workout plan
const updateWorkoutPlan = async (req, res) => {
  const { planId } = req.params;
  const { name, exercises } = req.body;

  try {
    // Validate planId
    if (!mongoose.isValidObjectId(planId)) {
      return res.status(400).json({ message: 'Invalid plan ID format' });
    }

    const plan = await WorkoutPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: 'Workout plan not found' });

    // Update name
    if (name) plan.name = name;

    // Update exercises and enumerate sets
    if (exercises && Array.isArray(exercises)) {
      exercises.forEach((exercise) => {
        let setNumber = 1;
        const allSets = [];

        for (let i = 0; i < exercise.sets; i++) {
          allSets.push({
            setNumber: setNumber++,
            reps: exercise.reps,
            weight: exercise.weight,
            type: "Regular Set",
          });
        }

        if (exercise.dropSets) {
          exercise.dropSets.forEach((dropSet) => {
            allSets.push({
              setNumber: setNumber++,
              reps: dropSet.reps,
              weight: dropSet.weight,
              type: "Drop Set",
            });
          });
        }

        // Update or add the exercise
        const existingExercise = plan.exercises.find(
          (ex) => ex.exerciseName === exercise.exerciseName
        );

        if (existingExercise) {
          existingExercise.sets = allSets;
        } else {
          plan.exercises.push({
            exerciseName: exercise.exerciseName,
            sets: allSets,
          });
        }
      });
    }

    await plan.save();
    res.json({ message: 'Workout plan updated successfully', plan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating workout plan', error: error.message });
  }
};

module.exports = { createWorkoutPlan, updateWorkoutPlan };
