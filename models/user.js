const mongoose = require('mongoose');

// define MongoDB Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
});

// define MongoDB Model
const User = mongoose.model('users', UserSchema);

// GET all MongoDB Documents in the MongoDB Collection
module.exports.getUsers = () => User.find({});

// GET single MongoDB Document in the MongoDB Collection
module.exports.getUser = (id) => User.findById(id)

// POST new MongoDB Document to the MongoDB Collection
module.exports.postUser = (data) => User.create(data)