const express = require('express');

// Import controller
const controller = require('../controllers/entries-controller')

// Create router
const router = express.Router();

// Return single document from entries collections
router.get('/api/entries/:id', (req, res) => controller.getEntry(req, res));

// Deletes single document from entries collections
router.delete('/api/entries/:id', (req, res) => controller.deleteEntry(req, res));

// Update document from the entries collection
router.put('/api/entries/:id', (req, res) => controller.putEntry(req, res))

// Return data from the entries collection
router.get('/api/entries', (req, res) => controller.getEntries(res));

// Send new document to the entries collection
router.post('/api/entries', (req, res) => controller.postEntry(req, res))

module.exports = router;