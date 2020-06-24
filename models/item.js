const mongoose = require('mongoose');

// define MongoDB Schema
const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    itemCategory: {
        name: { type: String, required: true },
        points: { type: Number, required: true },
    },
    imgLink: { type: String, required: false },
});

// define MongoDB Model
const Item = mongoose.model('items', ItemSchema);

module.exports = Item