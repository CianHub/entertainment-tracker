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

module.exports = Entry;