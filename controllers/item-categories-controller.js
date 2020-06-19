// Import MongoDB models
const ItemCategory = require('../models/item-category');

// Import common functions
const common = require('../common/functions');

// GET all ItemCategory Documents in the Collection
module.exports.getItemCategories = (res) => ItemCategory.getItemCategories((error, items) => common.handleAllDocuments(res, error, items))

// GET single ItemCategory Document from the Collection
module.exports.getItemCategory = (req, res) => ItemCategory.getItemCategory(req.params.id).then((itemCategory) => res.json(itemCategory))