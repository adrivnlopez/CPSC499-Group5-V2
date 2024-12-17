const mongoose = require('mongoose');

const WorkoutPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  exercises: [
    {
      exerciseName: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      weight: { type: Number, required: true },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('WorkoutPlan', WorkoutPlanSchema);
