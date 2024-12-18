const mongoose = require("mongoose");

// Define the schema for fitness goals
const goalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    goalType: {
      type: String,
      enum: ["weight_loss", "muscle_gain", "endurance_improvement"],
      required: true,
    },
    targetValue: { type: Number, required: true },
    // currentProgress: { type: Number, default: 0 },
    // unit: { type: String,  required: true },
    startDate: { type: Date, default: Date.now, required: true },
    // endDate: {type: Date, required: true },
    //   notes: { type: String, maxlength: 500 },
    status: {
      type: String,
      enum: ["in_progress", "completed", "abandoned"],
      default: "in_progress",
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the model
const Goal = mongoose.model("Goal", goalSchema);
module.exports = Goal;
