const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },                  
  password: { type: String, required: true },
  active: { type: Boolean, default: true },               // active or inactive status
  nutritionLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NutritionLog' }], // reference to nutrion logs
  workoutPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlans' }]    // reference to workout plans
});

// Password hashing before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();          // Only hash the password if it has been modified
  const salt = await bcrypt.genSalt(10);                    // Generate salt
  this.password = await bcrypt.hash(this.password, salt);   // Hash the password
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with the hashed password
};

// Ensure the model is defined only once
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;