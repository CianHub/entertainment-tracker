const mongoose = require('mongoose');

// define MongoDB Schema
const UserSchema = new mongoose.Schema({
    googleId: {
        type: String
    },
    facebookId: { type: String },
    password: { type: String },
    name: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    profilePicture: {
        type: String, required: false
    },
    salt: { type: String },
    accountType: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now() }
});

// define MongoDB Model
const User = mongoose.model('users', UserSchema);

module.exports = User