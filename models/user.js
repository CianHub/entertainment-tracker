const mongoose = require('mongoose');
const crypto = require("crypto");
const csprng = require('csprng');

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

// GET all MongoDB Documents in the MongoDB Collection
module.exports.getUsers = () => User.find({});

// GET single MongoDB Document in the MongoDB Collection
module.exports.getUser = (id) => User.findById(id)

// GET single MongoDB Document in the MongoDB Collection by googleId
module.exports.getUserByGoogleId = (id) => User.findOne({ googleId: id })

// GET single MongoDB Document in the MongoDB Collection by name and accountType
module.exports.getLocalUser = (name) => User.findOne({ name: name, accountType: 'Local' })

// POST new MongoDB Document to the MongoDB Collection
module.exports.postUser = (data) => {

    // If creating new local user
    // Generates a salt
    // Creates a salted hash of the password
    // Sets accountType to local and stores the salt for validation
    if ('password' in data) {
        const salt = csprng(160, 36);
        data.salt = salt;
        data.password = hash(`${salt}${data.password}`);
        data.accountType = 'Local'
    }
    return User.create(data)
}

// PUT single MongoDB Document from the MongoDB Collection
module.exports.putUser = (id, data) => User.updateOne({ _id: id }, data)

// DELETE single MongoDB Document in the MongoDB Collection
module.exports.deleteUser = (id) => User.deleteOne({ _id: id })

// Hashes password with sha256 bit encryption
// Creates a hash instance with SHA256 algorithim
// Updates the hash content with the password string
// finalizes the created hash with base64 encoding
const hash = (password) => crypto
    .createHash("sha256")
    .update(password)
    .digest("base64");


// Check validity of local user password
// Gets the salt generated when the password was saved
// Compares the hashed salt of the entered password with the saved password
module.exports.checkLocalUserPasswordIsValid = (salt, enteredPassword, existingPassword) => hash(`${salt}${enteredPassword}`) === existingPassword