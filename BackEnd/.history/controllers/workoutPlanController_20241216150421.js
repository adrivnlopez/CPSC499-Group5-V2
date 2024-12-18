const WorkoutPlan = require('../models/WorkoutPlan');
const mongoose = require('mongoose');

// Create a new workout plan
const createWorkoutPlan = async (req, res) => {
  const { name, exercises } = req.body;
  let { userId } = req.params;

  try {
    // Validate and convert userId
    userId = userId.trim();
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Format exercises: include all sets (regular + drop sets) sequentially
    const formattedExercises = exercises.map((exercise) => {
      let setCount = 0;
      const allSets = [];

      // Add regular sets
      for (let i = 0; i < exercise.sets; i++) {
        setCount += 1;
        allSets.push({
          setNumber: setCount,
          reps: exercise.reps,
          weight: exercise.weight,
        });
      }

      // Add drop sets (if they exist)
      if (exercise.dropSets && Array.isArray(exercise.dropSets)) {
        exercise.dropSets.forEach((dropSet) => {
          setCount += 1;
          allSets.push({
            setNumber: setCount,
            reps: dropSet.reps,
            weight: dropSet.weight,
          });
        });
      }

      return {
        exerciseName: exercise.exerciseName,
        sets: allSets, // Store all sets as an array
      };
    });

    // Create the workout plan
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

// Get all workout plans for a user
const getWorkoutPlans = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const plans = await WorkoutPlan.find({ user: userId })
      .populate('user', 'name')
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
    if (!mongoose.isValidObjectId(planId)) {
      return res.status(400).json({ message: 'Invalid plan ID format' });
    }

    const plan = await WorkoutPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: 'Workout plan not found' });

    if (name) plan.name = name;

    if (exercises && Array.isArray(exercises)) {
      plan.exercises = exercises.map((exercise) => {
        let setCount = 0;
        const allSets = [];

        for (let i = 0; i < exercise.sets; i++) {
          setCount += 1;
          allSets.push({
            setNumber: setCount,
            reps: exercise.reps,
            weight: exercise.weight,
          });
        }

        if (exercise.dropSets && Array.isArray(exercise.dropSets)) {
          exercise.dropSets.forEach((dropSet) => {
            setCount += 1;
            allSets.push({
              setNumber: setCount,
              reps: dropSet.reps,
              weight: dropSet.weight,
            });
          });
        }

        return {
          exerciseName: exercise.exerciseName,
          sets: allSets,
        };
      });
    }

    await plan.save();
    res.json({ message: 'Workout plan updated successfully', plan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating workout plan', error: error.message });
  }
};

module.exports = { createWorkoutPlan, getWorkoutPlans, updateWorkoutPlan };
