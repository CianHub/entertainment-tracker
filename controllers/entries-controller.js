// Import MongoDB models
const Entry = require('../models/entry');
const User = require('../models/user');

// GET all Entry Documents in the Collection
module.exports.getEntries = (res) => Entry.getEntries()
    .then((entries) => res.json({ 'success': true, "entries": entries }))
    .catch((err) => console.log(err))

// GET single Entry Document from the Collection
module.exports.getEntry = (req, res) => Entry.getEntry(req.params.id)
    .then((entry) => res.json(entry))
    .catch((err) => console.log(err))

// POST new Entry Document to the Collection
// Update with PUT logged in users points 
module.exports.postEntry = (req, res) => {
    const data = { ...req.body, user: { "name": req.user.name, "points": req.user.points } }
    return Entry.postEntry(data)
        .then((entry) => {
            const updatedPoints = req.user.points + entry.item.itemCategory.points;
            User.putUser(req.user._id, { points: updatedPoints })
                .then(() => console.log(`${req.user.name}'s points have been updated.`))
                .catch((err) => console.log(err))

            return res.json({ 'success': true, "entry": entry })
        })
        .catch((err) => console.log(err))
}

// PUT existing Entry Document from the Collection
module.exports.putEntry = (req, res) =>
    Entry.getEntry(req.params.id)
        .then((entry) => Entry.putEntry(req.params.id, { ...entry._doc, ...req.body })
            .then(() => res.json({ 'success': true, "updatedEntry": { ...entry._doc, ...req.body } }))
            .catch((err) => console.log(err))
        ).catch((err) => console.log(err))

// DELETE single Entry Document from the Collection
module.exports.deleteEntry = (req, res) => Entry.deleteEntry(req.params.id)
    .then(() => res.json({ "success": true }))
    .catch((err) => console.log(err))