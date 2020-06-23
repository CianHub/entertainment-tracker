const express = require('express');

// Import route guard middleware
const routeGuard = require('../middleware/auth-middleware')

// Import controller
const controller = require('../controllers/items-controller')

// Create router
const router = express.Router();

// Return single document from items collections
router.get('/api/items/:id', routeGuard.ensureUserIsAuthenticated, (req, res) => controller.getItem(req, res));

// Deletes single document from items collections
router.delete('/api/items/:id', routeGuard.ensureUserIsAuthenticated, (req, res) => controller.deleteItem(req, res));

// Update document from the items collection
router.put('/api/items/:id', routeGuard.ensureUserIsAuthenticated, (req, res) => controller.putItem(req, res))

// Return data from the items collection
router.get('/api/items', routeGuard.ensureUserIsAuthenticated, (req, res) => controller.getItems(res));

// Send new document to the items collection
router.post('/api/items', routeGuard.ensureUserIsAuthenticated, (req, res) => controller.postItem(req, res))

module.exports = router;