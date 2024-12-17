const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
const nutritionLogRoutes = require("./routes/nutritionLogRoutes");
const workoutPlanRoutes = require("./routes/workoutPlanRoutes");
const goalTrackerRoutes = require("./routes/goalTrackingRoutes");

const session = require("express-session");
const cors = require("cors"); // Import cors

dotenv.config();

// Validate SESSION_SECRET
if (!process.env.SESSION_SECRET) {
  console.error(
    "Error: SESSION_SECRET is not set. Please check your .env file."
  );
  process.exit(1); // Exit the application if SESSION_SECRET is missing
}

// Connect to the database
connectDB();

const app = express();

// Add CORS middleware
app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:3000"], //origin of frontend updated
    credentials: true, // Allow cookies or credentials
  })
);

app.options("*", cors()); // Enable CORS preflight for all routes

// Initialize session middleware before routes
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret", // Fallback for development
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 60 * 1000, // Session expires after 30 minutes of inactivity
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      httpOnly: true, // Prevent client-side JavaScript access
    },
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Define your routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/nutrition-logs", nutritionLogRoutes);
app.use("/api/workout-plans", workoutPlanRoutes);
app.use("/api/goal-tracking", goalTrackerRoutes);

module.exports = app; // Export the app without listening to a port here
