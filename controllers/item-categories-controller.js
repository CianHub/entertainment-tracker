// Import MongoDB models
const ItemCategory = require('../models/item-category');

// GET all ItemCategory Documents in the Collection
module.exports.getItemCategories = (res) => ItemCategory.find({});
    .then((itemCategories) => res.json({ 'success': true, "itemCategories": itemCategories }))
    .catch((err) => console.log(err))

// GET single ItemCategory Document from the Collection
module.exports.getItemCategory = (req, res) => ItemCategory.findById(req.params.id)
    .then((itemCategory) => res.json(itemCategory))
    .catch((err) => console.log(err))

// POST new ItemCategory Document to the Collection
module.exports.postItemCategory = (req, res) => ItemCategory.create(req.body)
    .then((itemCategory) => res.json({ 'success': true, "itemCategory": itemCategory }))
    .catch((err) => console.log(err))

// PUT existing ItemCategory Document from the Collection
module.exports.putItemCategory = (req, res) =>
    ItemCategory.findById(req.params.id)
        .then((itemCategory) => ItemCategory.updateOne(
            { _id: req.params.id }, { ...itemCategory._doc, ...req.body })
            .then(() => res.json({ 'success': true, "updatedItemCategory": { ...itemCategory._doc, ...req.body } }))
            .catch((err) => console.log(err))
        ).catch((err) => console.log(err))

// DELETE single ItemCategory Document from the Collection
module.exports.deleteItemCategory = (req, res) => ItemCategory.deleteOne({ _id: req.params.id })
    .then(() => res.json({ "success": true }))
    .catch((err) => console.log(err))