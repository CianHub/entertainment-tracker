const express = require('express');

// Import controller
const controller = require('../controllers/item-categories-controller')

// Create router
const router = express.Router();

/// Return data from the itemCategories collection
router.get('/api/item-categories', (req, res) => controller.getItemCategories(res));

module.exports.itemsCategoriesRouter = router;