const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], // Validate email format
    },
    password: { type: String, required: true },
    active: { type: Boolean, default: true }, // Active or inactive status
    nutritionLogs: [
      { type: mongoose.Schema.Types.ObjectId, ref: "NutritionLog" },
    ], // Reference to nutrition logs
    workoutPlans: [
      { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutPlan" },
    ], // Reference to workout plans
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Password hashing before saving the user
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash password if it's modified
  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash password
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with hashed password
};

// Ensure the model is defined only once
const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
