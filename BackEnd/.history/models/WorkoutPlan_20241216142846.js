const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  setNumber: { type: Number, required: true }, // Sequential set number
  reps: { type: Number, required: true },      // Reps for the set
  weight: { type: Number, required: true },    // Weight for the set
  type: { type: String, default: "Regular Set" }, // Set type: Regular Set or Drop Set
});

const exerciseSchema = new mongoose.Schema({
  exerciseName: { type: String, required: true },
  sets: [setSchema], // List of all sets (regular and drop sets)
});

const WorkoutPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true },
    exercises: [exerciseSchema],
  },
  { timestamps: true }
);

const WorkoutPlan = mongoose.model('WorkoutPlan', WorkoutPlanSchema);

module.exports = WorkoutPlan;
