const express = require('express');

// Import controller
const controller = require('../controllers/user-controller')

// Create router
const router = express.Router();

// Return single document from users collections
router.get('/api/users/:id', (req, res) => controller.getUser(req, res));

// Return data from the users collection
router.get('/api/users', (req, res) => controller.getUsers(res));

// Send new document to the users collection
router.post('/api/users', (req, res) => controller.postUser(req, res))

module.exports = router;