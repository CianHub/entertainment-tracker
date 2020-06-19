const express = require('express');

// Import controller
const controller = require('../controllers/items-controller')

// Create router
const router = express.Router();

// Return data from the items collection
router.get('/api/items', (req, res) => controller.getItems(res));

module.exports.itemsRouter = router;