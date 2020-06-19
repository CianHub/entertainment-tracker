const mongoose = require('mongoose');

// define MongoDB Schema
const EntrySchema = new mongoose.Schema({
    item: {
        name: { type: String, required: true },
        itemCategory: {
            name: { type: String, required: true },
            points: { type: Number, required: true },
        },
        imgLink: { type: String, required: false },
    },
    date: { type: Date, default: Date.now() },
    year: { type: Number, required: true },
    user: {
        name: { type: String, required: true },
        points: { type: Number, required: true },
    },
});

// define MongoDB Model
const Entry = mongoose.model('entries', EntrySchema);

// GET all MongoDB Documents in the MongoDB Collection
module.exports.getEntries = () => Entry.find({})

// GET single MongoDB Document in the MongoDB Collection
module.exports.getEntry = (id) => Entry.findById(id)

// POST new MongoDB Document to the MongoDB Collection
module.exports.postEntry = (data) => Entry.create(
    {
        item: {
            name: data.item.name,
            itemCategory: {
                name: data.item.itemCategory.name,
                points: data.item.itemCategory.points
            },
            imgLink: data.item.imgLink
        },
        date: Date.now(),
        year: data.year,
        user: {
            name: data.user.name,
            points: data.user.name,
        }
    })