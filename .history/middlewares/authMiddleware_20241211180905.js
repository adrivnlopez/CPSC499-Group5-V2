const jwt = require('jsonwebtoken');
const User = require('../models/User');

// middleware to protect routes by verifying JWT
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token
      
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);          // verify the token
      const user = await User.findById(decoded.id).select('-password');   // attach authenitcated user to request

      if (!user) {
        return res.status(401).json({ message: 'User not found, token invalid' });
      }

      // Attach user info to request
      req.user = user;

      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      console.error('Token verification failed:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };