const express = require('express');

// Import route guard middleware
const routeGuard = require('../middleware/auth-middleware')

// Import controller
const controller = require('../controllers/entries-controller')

// Create router
const router = express.Router();

// Return single document from entries collections
router.get('/api/entries/:id', routeGuard.ensureUserIsAuthenticated, (req, res) => controller.getEntry(req, res));

// Deletes single document from entries collections
router.delete('/api/entries/:id', routeGuard.ensureUserIsAuthenticated, (req, res) => controller.deleteEntry(req, res));

// Update document from the entries collection
router.put('/api/entries/:id', routeGuard.ensureUserIsAuthenticated, (req, res) => controller.putEntry(req, res))

// Return data from the entries collection
router.get('/api/entries', routeGuard.ensureUserIsAuthenticated, (req, res) => controller.getEntries(res));

// Send new document to the entries collection
router.post('/api/entries', routeGuard.ensureUserIsAuthenticated, (req, res) => controller.postEntry(req, res))

module.exports = router;