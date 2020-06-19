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

// GET all MongoDB Documents in the MongoDB Collection
module.exports.getItems = () => {
    return Item.find({});
};

// GET single MongoDB Document in the MongoDB Collection
module.exports.getItem = (id) => Item.findById(id)

// PUT single MongoDB Document from the MongoDB Collection
module.exports.putItem = (id, data) => Item.updateOne({ _id: id }, data)

// POST new MongoDB Document to the MongoDB Collection
module.exports.postItem = (data) => Item.create(data)

// DELETE single MongoDB Document in the MongoDB Collection
module.exports.deleteItem = (id) => Item.deleteOne({ _id: id })