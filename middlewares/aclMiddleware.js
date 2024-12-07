// aclMiddleware.js
// Middleware to check if user has the required permissions for the action on the resource

const acl = require('../models/ACL');

const aclMiddleware = (resource, action) => 
{
  return (req, res, next) => 
  {
    const userRole = req.user.role;

    // Check if user's role has the required permission for the action on the resource
    if (acl[userRole] && acl[userRole][resource] && acl[userRole][resource].includes(action)) 
    {
      return next();
    } else 
    {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
  };
};

module.exports = aclMiddleware;