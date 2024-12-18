const mongoose = require('mongoose');

const WorkoutPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Links the workout plan to a specific user
    },
    name: {
      type: String,
      required: true, // Workout plan name (e.g., "Leg Day", "Chest Day")
    },
    exercises: [
      {
        exerciseName: { type: String, required: true }, // e.g., "Squats", "Bench Press"
        sets: { type: Number, required: true },         // Number of regular sets
        reps: { type: Number, required: true },         // Number of repetitions
        weight: { type: Number, required: true },       // Weight for each set
        dropSets: [
          {
            setNumber: { type: Number, required: true }, // Sequential set number for drop sets
            reps: { type: Number, required: true },      // Reps for the drop set
            weight: { type: Number, required: true },    // Weight for the drop set
          },
        ],
      },
    ],
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const WorkoutPlan = mongoose.model('WorkoutPlan', WorkoutPlanSchema);

module.exports = WorkoutPlan;