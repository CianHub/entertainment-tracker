const express = require('express');

// Import controller
const controller = require('../controllers/items-controller')

// Create router
const router = express.Router();

// Return single document from items collections
router.get('/api/items/:id', (req, res) => controller.getItem(req, res));

// Update document from the items collection
router.put('/api/items/:id', (req, res) => controller.putItem(req, res))

// Return data from the items collection
router.get('/api/items', (req, res) => controller.getItems(res));

// Send new document to the items collection
router.post('/api/items', (req, res) => controller.postItem(req, res))

module.exports = router;