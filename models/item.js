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

// POST new MongoDB Document to the MongoDB Collection
module.exports.postItem = (data) => Item.create(
    {
        name: data.name,
        itemCategory: {
            name: data.itemCategory.name,
            points: data.itemCategory.points
        },
        imgLink: data.imgLink
    })

