// Import MongoDB models
const User = require('../models/user');

// GET all Users Documents in the Collection
module.exports.getUsers = (res) => User.getUsers()
    .then((users) => res.json({ 'success': true, "users": users }))
    .catch((err) => console.log(err))

// GET single User Document from the Collection
module.exports.getUser = (req, res) => User.getUser(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => console.log(err))

// POST new User Document to the Collection
module.exports.postUser = (req, res) => User.postUser(req.body)
    .then((user) => res.json({ 'success': true, "user": user }))
    .catch((err) => console.log(err))

// PUT existing User Document from the Collection
module.exports.putUser = (req, res) =>
    User.getUser(req.params.id)
        .then((user) => User.putUser(req.params.id, { ...user._doc, ...req.body })
            .then(() => res.json({ 'success': true, "updatedUser": { ...user._doc, ...req.body } }))
            .catch((err) => console.log(err))
        ).catch((err) => console.log(err))