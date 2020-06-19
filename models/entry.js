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
    year: { type: Number, required: true, default: new Date().getFullYear() },
    user: {
        userId: { type: String, required: true },
    },
    rating: { type: Number, required: true }
});

// define MongoDB Model
const Entry = mongoose.model('entries', EntrySchema);

// GET all MongoDB Documents in the MongoDB Collection
module.exports.getEntries = () => Entry.find({})

// GET single MongoDB Document in the MongoDB Collection
module.exports.getEntry = (id) => Entry.findById(id)

// POST new MongoDB Document to the MongoDB Collection
module.exports.postEntry = (data) => Entry.create(data)

// PUT single MongoDB Document from the MongoDB Collection
module.exports.putEntry = (id, data) => Entry.updateOne({ _id: id }, data)

// DELETE single MongoDB Document in the MongoDB Collection
module.exports.deleteEntry = (id) => Entry.deleteOne({ _id: id })