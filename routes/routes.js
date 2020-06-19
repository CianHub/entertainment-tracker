const express = require('express');

// Import routes
const itemRoutes = require('./item-routes')
const userRoutes = require('./user-routes')
const itemCategoriesRoutes = require('./item-category-routes')
const entriesRoutes = require('./entries-routes')

// Create router
const router = express.Router();

// Merge routes
router.use('/api/items', itemRoutes)
router.use('/api/item-categories', itemCategoriesRoutes)
router.use('/api/entries', entriesRoutes)
router.use('/api/users', userRoutes)

modules.export.router = router;