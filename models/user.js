const mongoose = require('mongoose');

// define MongoDB Schema
const UserSchema = new mongoose.Schema({
    googleId: {
        type: String, required: true
    },
    name: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    profilePicture: {
        type: String, required: false
    },
    dateCreated: { type: Date, default: Date.now() }
});

// define MongoDB Model
const User = mongoose.model('users', UserSchema);

// GET all MongoDB Documents in the MongoDB Collection
module.exports.getUsers = () => User.find({});

// GET single MongoDB Document in the MongoDB Collection
module.exports.getUser = (id) => User.findById(id)

// GET single MongoDB Document in the MongoDB Collection by googleId
module.exports.getUserByGoogleId = (id) => User.findOne({ googleId: id })

// POST new MongoDB Document to the MongoDB Collection
module.exports.postUser = (data) => User.create(data)

// PUT single MongoDB Document from the MongoDB Collection
module.exports.putUser = (id, data) => User.updateOne({ _id: id }, data)

// DELETE single MongoDB Document in the MongoDB Collection
module.exports.deleteUser = (id) => User.deleteOne({ _id: id })