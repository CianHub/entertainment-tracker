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
module.exports.getEntries = (callback) => {
    return Entry.find({}, callback);
};

// GET single MongoDB Document in the MongoDB Collection
module.exports.getEntry = (id) => Entry.findById(id)
