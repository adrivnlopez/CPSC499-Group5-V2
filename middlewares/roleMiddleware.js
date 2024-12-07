// roleMiddleware.js
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      // Check if user is authenticated and has a valid role
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient privileges' });
      }
      next();
    };
  };
  
  module.exports = roleMiddleware;