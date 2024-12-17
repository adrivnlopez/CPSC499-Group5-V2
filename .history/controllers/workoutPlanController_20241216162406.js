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

const updateWorkoutPlan = async (req, res) => {
  const { planId } = req.params;
  const { name, exercises } = req.body;

  try {
    // Validate planId
    if (!mongoose.isValidObjectId(planId)) {
      return res.status(400).json({ message: 'Invalid plan ID format' });
    }

    // Find the workout plan
    const plan = await WorkoutPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    // Update the workout plan name
    if (name) plan.name = name;

    // Process exercises with drop sets
    if (exercises && Array.isArray(exercises)) {
      const formattedExercises = exercises.map((exercise) => {
        const regularSets = [];

        // Add regular sets
        for (let i = 1; i <= exercise.sets; i++) {
          regularSets.push({
            exerciseName: exercise.exerciseName,
            sets: exercise.sets, // Only add sets for regular sets
            reps: exercise.reps,
            weight: exercise.weight,
          });
        }

        // Add drop sets
        const dropSets = exercise.dropSets?.map((dropSet, index) => ({
          setNumber: exercise.sets + index + 1,
          reps: dropSet.reps,
          weight: dropSet.weight,
        })) || [];

        return {
          exerciseName: exercise.exerciseName,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
          dropSets: dropSets,
        };
      });

      // Replace exercises in the plan
      plan.exercises = formattedExercises;
    }

    // Save the updated plan
    await plan.save();
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
