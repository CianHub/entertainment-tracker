const express = require('express');

// Import controller
const controller = require('../controllers/items-controller')

// Create router
const router = express.Router();

// Return single document from items collections
router.get('/api/items/:id', (req, res) => controller.getItem(req, res));

// Return data from the items collection
router.get('/api/items', (req, res) => controller.getItems(res));

module.exports = router;