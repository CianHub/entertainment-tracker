const express = require('express');

// Import controller
const controller = require('../controllers/item-categories-controller')

// Create router
const router = express.Router();

// Return single document from itemCategories collections
router.get('/api/item-categories/:id', (req, res) => controller.getItemCategory(req, res));

/// Return data from the itemCategories collection
router.get('/api/item-categories', (req, res) => controller.getItemCategories(res));

// Send new document to the itemCategories collection
router.post('/api/item-categories', (req, res) => controller.postItemCategory(req, res))

module.exports = router;