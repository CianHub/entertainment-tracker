const express = require('express');

// Import controller
const controller = require('../controllers/item-categories-controller')

// Create router
const router = express.Router();

// Return data from the entries collection
router.get('/api/entries', (req, res) => controller.getEntries(res));

module.exports = router;