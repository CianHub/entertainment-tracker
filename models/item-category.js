const mongoose = require('mongoose');

// define MongoDB Schema
const ItemCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    points: { type: Number, required: true },
});

// define MongoDB Model
const ItemCategory = mongoose.model('itemCategories', ItemCategorySchema);

module.exports = ItemCategory