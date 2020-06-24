const crypto = require("crypto");
const csprng = require('csprng');

// Import MongoDB models
const User = require('../models/user');

// Hashes password with sha256 bit encryption
// Creates a hash instance with SHA256 algorithim
// Updates the hash content with the password string
// finalizes the created hash with base64 encoding
const hash = (password) => crypto
    .createHash("sha256")
    .update(password)
    .digest("base64");

// GET all Users Documents in the Collection
module.exports.getUsers = (res) => User.find({})
    .then((users) => res.json({ 'success': true, "users": users }))
    .catch((err) => console.log(err))

// GET single User Document from the Collection
module.exports.getUser = (req, res) => User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => console.log(err))

// POST new User Document to the Collection
module.exports.postUser = (req, res) => {
    // If creating new local user
    // Generates a salt
    // Creates a salted hash of the password
    // Sets accountType to local and stores the salt for validation
    const data = req.body;
    if ('password' in data) {
        const salt = csprng(160, 36);
        data.salt = salt;
        data.password = hash(`${salt}${data.password}`);
        data.accountType = 'Local'
    }
    return User.create(data)
        .then((user) => res.json({ 'success': true, "user": user }))
        .catch((err) => console.log(err))
}

// PUT existing User Document from the Collection
module.exports.putUser = (req, res) =>
    User.findById(req.params.id)
        .then((user) => User.updateOne({ _id: req.params.id }, { ...user._doc, ...req.body })
            .then(() => res.json({ 'success': true, "updatedUser": { ...user._doc, ...req.body } }))
            .catch((err) => console.log(err))
        ).catch((err) => console.log(err))

// DELETE single User Document from the Collection
module.exports.deleteUser = (req, res) => User.deleteOne({ _id: req.params.id })
    .then(() => res.json({ "success": true }))
    .catch((err) => console.log(err))

// Check validity of local user password
// Gets the salt generated when the password was saved
// Compares the hashed salt of the entered password with the saved password
module.exports.checkLocalUserPasswordIsValid = (salt, enteredPassword, existingPassword) => hash(`${salt}${enteredPassword}`) === existingPassword