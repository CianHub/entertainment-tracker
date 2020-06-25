const crypto = require("crypto");
const csprng = require('csprng');

// Import MongoDB models
const User = require('../models/user');

// Hashes password with sha256 bit encryption
// Creates a hash instance with SHA256 algorithim
// Updates the hash content with the password string
// finalizes the created hash with base64 encoding
module.exports.hash = (password) => crypto
    .createHash("sha256")
    .update(password)
    .digest("base64");

// GET all Users Documents in the Collection
module.exports.getUsers = async (res) => {
    try {
        const users = await User.find({})
        res.json({ 'success': true, "users": users })
    } catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}

// GET single User Document from the Collection
module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200)
        res.json({ 'success': true, "user": user })
    } catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}

// POST new User Document to the Collection
module.exports.postUser = async (req, res) => {
    // If creating new local user
    // Generates a salt
    // Creates a salted hash of the password
    // Sets accountType to local and stores the salt for validation
    const data = req.body;
    if ('password' in data) {
        const salt = csprng(160, 36);
        data.salt = salt;
        data.password = this.hash(`${salt}${data.password}`);
        data.accountType = 'Local'
    }
    try {
        const user = await User.create(data)
        res.status(200)
        res.json({ 'success': true, "user": user })

    } catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }

}

// PUT existing User Document from the Collection
module.exports.putUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        try {
            const updatedUser = await User.updateOne({ _id: req.params.id }, { ...user._doc, ...req.body })
            res.json({ 'success': true, "updatedUser": updatedUser })
        } catch (err) {
            res.status(400);
            res.json({ 'success': false, "message": 'Request failed' });
        }
    } catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}

// DELETE single User Document from the Collection
module.exports.deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.status(200)
        res.json({ "success": true })
    } catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}

// Check validity of local user password
// Gets the salt generated when the password was saved
// Compares the hashed salt of the entered password with the saved password
module.exports.checkLocalUserPasswordIsValid = (salt, enteredPassword, existingPassword) => this.hash(`${salt}${enteredPassword}`) === existingPassword