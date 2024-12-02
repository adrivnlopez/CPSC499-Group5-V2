const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define allowed roles
const roles = ['Citizen', 'Health Worker', 'Education Worker', 'Finance Worker', 'Admin', 'Super Admin', 'Deus'];

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: roles, // Ensure the role is one of the allowed values
    default: 'Citizen', // Default role is Citizen
  },
  consent: {
    type: Boolean,
    default: false, // Track whether the user has given consent
  },
});

// Password hashing before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash the password if it has been modified
  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with the hashed password
};

// Ensure the model is defined only once
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;