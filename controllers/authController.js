// Auth Controller
// contains the functions to register and login a user
// The registerUser function creates a new user in the database and returns a JWT token
// The loginUser function checks if the user exists and the password is correct, then returns a JWT token
// The generateToken function creates a JWT token with the user's ID

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => 
{
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// @desc Register a new user
// @route POST /api/auth/register
const registerUser = async (req, res) => 
{
  const { name, email, password } = req.body;
  try 
  {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, active: true });

    res.status(201).json
    ({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) 
  {
    res.status(500).json({ message: 'Error registering user' });
  }
};

// @desc Login a user
// @route POST /api/auth/login
const loginUser = async (req, res) => 
{
  const { email, password } = req.body;   // use email for login
  try 
  {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) 
    {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json
    ({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) 
  {
    res.status(500).json({ message: 'Error logging in' });
  }
};

module.exports = { registerUser, loginUser };