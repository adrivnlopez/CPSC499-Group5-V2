const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AccessLog = require('../models/AccessLog'); // Import AccessLog model
const { logAccessEvent } = require('../controllers/logController'); // Import log function from logController

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token
      
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        // Log failed access for deleted users
        await logAccessEvent(null, 'failed', req.originalUrl, 'User not found');
        return res.status(401).json({ message: 'User not found, token invalid' });
      }

      // Attach user info to request
      req.user = user;

      // Log successful access event
      await logAccessEvent(user._id, 'access', req.originalUrl);

      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      console.error('Token verification failed:', error.message);

      // Log token failure
      await logAccessEvent(null, 'failed', req.originalUrl, 'Invalid token');

      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // Log missing token attempts
    await logAccessEvent(null, 'failed', req.originalUrl, 'No token provided');

    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };