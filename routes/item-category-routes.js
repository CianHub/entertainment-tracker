const express = require('express');

// Import route guard middleware
const routeGuard = require('../middleware/auth-middleware')

// Import controller
const controller = require('../controllers/item-categories-controller')

// Create router
const router = express.Router();

// Return single document from itemCategories collection
router.get('/api/item-categories/:id', routeGuard.ensureUserIsAuthenticated, (req, res) => controller.getItemCategory(req, res));

// Deletes single document from itemCategories collections
router.delete('/api/item-categories/:id', routeGuard.ensureUserIsAuthenticated, (req, res) => controller.deleteItemCategory(req, res));

// Update document from the itemCategories collection
router.put('/api/item-categories/:id', routeGuard.ensureUserIsAuthenticated, (req, res) => controller.putItemCategory(req, res))

/// Return data from the itemCategories collection
router.get('/api/item-categories', routeGuard.ensureUserIsAuthenticated, (req, res) => controller.getItemCategories(res));

// Send new document to the itemCategories collection
router.post('/api/item-categories', routeGuard.ensureUserIsAuthenticated, (req, res) => controller.postItemCategory(req, res))

module.exports = router;