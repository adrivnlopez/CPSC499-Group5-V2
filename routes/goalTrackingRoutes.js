const express = require('express');
const { protect } = require('../middlewares/authMiddleware'); // Middleware for authentication
const {  } = require('../controllers/nutritionLogController');
const router = express.router();

