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