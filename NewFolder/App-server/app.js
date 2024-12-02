const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const profileRoutes = require('./routes/profileRoutes');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const cors = require('cors'); // Import cors

dotenv.config();

// Validate SESSION_SECRET
if (!process.env.SESSION_SECRET) 
{
  console.error('Error: SESSION_SECRET is not set. Please check your .env file.');
  process.exit(1); // Exit the application if SESSION_SECRET is missing
}

// Connect to the database
connectDB();

const app = express();

// Add CORS middleware
app.use(cors(
{
  origin: 'http://localhost:3000', // Allow requests from frontend
  credentials: true, // Allow cookies and other credentials
}));

// Initialize session middleware before routes
app.use(session(
{
  secret: process.env.SESSION_SECRET || 'default-secret', // Fallback for development
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000, // Session expires after 30 minutes of inactivity
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: true, // Prevent client-side JavaScript access
  },
}));

// Middleware to parse JSON requests
app.use(express.json());

// Define your routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes); // Use profile route

module.exports = app; // Export the app without listening to a port here