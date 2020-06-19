const express = require('express');

// Import controller
const controller = require('../controllers/entries-controller')

// Create router
const router = express.Router();

// Return single document from entries collections
router.get('/api/entries/:id', (req, res) => controller.getEntry(req, res));

// Return data from the entries collection
router.get('/api/entries', (req, res) => controller.getEntries(res));

module.exports = router;