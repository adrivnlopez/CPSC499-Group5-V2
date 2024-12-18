const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes by verifying JWT
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
      const user = await User.findById(decoded.id).select('-password'); // Get user from token

      if (!user) {
        return res.status(401).json({ message: 'User not found, token invalid' });
      }

      // Attach user info to request
      req.user = user;

      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      console.error(`Token verification failed: ${error.message}`);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired, please log in again' });
      }
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
