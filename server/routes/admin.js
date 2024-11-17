const express = require('express');
const checkRole = require('../middleware/authMiddleware'); // Import the middleware
const router = express.Router();

// Admin route: Only admin users can access
router.get('/admin', checkRole('admin'), (req, res) => {
  res.send('Welcome to the Admin Dashboard');
});

// Editor route: Only editor or admin users can access
router.get('/editor', checkRole('editor'), (req, res) => {
  res.send('Welcome to the Editor Dashboard');
});

module.exports = router;
