// Import MongoDB models
const ItemCategory = require('../models/item-category');

// GET all ItemCategory Documents in the Collection
module.exports.getItemCategories = (res) => ItemCategory.getItemCategories()
    .then((itemCategories) => res.json({ 'success': true, "itemCategories": itemCategories }))
    .catch((err) => console.log(err))

// GET single ItemCategory Document from the Collection
module.exports.getItemCategory = (req, res) => ItemCategory.getItemCategory(req.params.id)
    .then((itemCategory) => res.json(itemCategory))
    .catch((err) => console.log(err))

// POST new ItemCategory Document to the Collection
module.exports.postItemCategory = (req, res) => ItemCategory.postItemCategory(req.body)
    .then((itemCategory) => res.json({ 'success': true, "itemCategory": itemCategory }))
    .catch((err) => console.log(err))