const mongoose = require('mongoose');

// define MongoDB Schema
const ItemCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    points: { type: Number, required: true },
});

// define MongoDB Model
const ItemCategory = mongoose.model('itemCategories', ItemCategorySchema);

// GET all MongoDB Documents in the MongoDB Collection
module.exports.getItemCategories = () => ItemCategory.find({});

// GET single MongoDB Document in the MongoDB Collection
module.exports.getItemCategory = (id) => ItemCategory.findById(id)

// POST new MongoDB Document to the MongoDB Collection
module.exports.postItemCategory = (data) => ItemCategory.create(data)

// PUT single MongoDB Document from the MongoDB Collection
module.exports.putItemCategory = (id, data) => ItemCategory.updateOne({ _id: id }, data)

// DELETE single MongoDB Document in the MongoDB Collection
module.exports.deleteItemCategory = (id) => ItemCategory.deleteOne({ _id: id })