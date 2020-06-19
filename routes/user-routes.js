const express = require('express');

// Import controller
const controller = require('../controllers/user-controller')

// Create router
const router = express.Router();

// Return data from the users collection
router.get('/api/users', (req, res) => controller.getUsers(res));

module.exports = router;