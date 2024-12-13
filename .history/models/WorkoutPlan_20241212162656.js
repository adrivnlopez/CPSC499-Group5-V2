const mongoose = require('mongoose');

const WorkoutPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },               // Name of the workout plan
  exercises: [
    {
      exerciseName: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      weight: { type: Number, required: true },  // Add weight field
    },
  ],
  createdAt: { type: Date, default: Date.now },         // Defaults to the current date
});

const WorkoutPlan = mongoose.model('WorkoutPlan', WorkoutPlanSchema);

module.exports = WorkoutPlan;
