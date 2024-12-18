const mongoose = require('mongoose');

const WorkoutPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Links the workout plan to a specific user
  },
  userName: {
    type: String, // New field to store the user's name
    required: true, // Ensures the user's name is provided
  },
  name: {
    type: String,
    required: true, // Workout plan name (e.g., "Leg Day", "Chest Day")
  },
  exercises: [
    {
      exerciseName: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      weight: { type: Number, required: true },
      dropSets: [
        {
          setNumber: { type: Number, required: true },
          reps: { type: Number, required: true },
          weight: { type: Number, required: true },
        },
      ],
    },
  ],
}, { timestamps: true });

const WorkoutPlan = mongoose.model('WorkoutPlan', WorkoutPlanSchema);

module.exports = WorkoutPlan;
