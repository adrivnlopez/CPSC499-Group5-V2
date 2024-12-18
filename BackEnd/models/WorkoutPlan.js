const mongoose = require('mongoose');

const DropSetSchema = new mongoose.Schema({
  setNumber: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
});

const ExerciseSchema = new mongoose.Schema({
  exerciseName: { type: String, required: true },
  sets: { type: Number, required: false }, // Only required for regular sets
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  dropSets: { type: [DropSetSchema], default: [] }, // Array of drop sets
});

const WorkoutPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: { type: String, required: true },
    name: { type: String, required: true },
    exercises: { type: [ExerciseSchema], required: true },
  },
  { timestamps: true }
);

const WorkoutPlan = mongoose.model('WorkoutPlan', WorkoutPlanSchema);
module.exports = WorkoutPlan;
