// Define allowed roles and their permissions
const acl = {
    'Citizen': {
      'profile': ['read', 'update'],
    },
    'Health Worker': {
      'healthProfile': ['read', 'update'],
    },
    'Education Worker': {
      'educationProfile': ['read', 'update'],
    },
    'Finance Worker': {
      'financeProfile': ['read', 'update'],
    },
    'Admin': {
      'govEmployee': ['create', 'update', 'delete'],
    },
    'Super Admin': {
      'admin': ['create', 'update', 'delete'],
    },
    'Deus': {
      'superAdmin': ['create', 'update', 'delete'],
    },
  };
  
  module.exports = acl;