// Import MongoDB models
const Entry = require('../models/entry');

// GET all Entry Documents in the Collection
module.exports.getEntries = (res) => Entry.getEntries()
    .then((entries) => res.json({ 'success': true, "entries": entries }))
    .catch((err) => console.log(err))

// GET single Entry Document from the Collection
module.exports.getEntry = (req, res) => Entry.getEntry(req.params.id)
    .then((entry) => res.json(entry))
    .catch((err) => console.log(err))

// POST new Entry Document to the Collection
module.exports.postEntry = (req, res) => Entry.postEntry(req.body)
    .then((entry) => res.json({ 'success': true, "entry": entry }))
    .catch((err) => console.log(err))

// PUT existing Entry Document from the Collection
module.exports.putEntry = (req, res) =>
    Entry.getEntry(req.params.id)
        .then((entry) => Entry.putEntry(req.params.id, { ...entry._doc, ...req.body })
            .then(() => res.json({ 'success': true, "updatedEntry": { ...entry._doc, ...req.body } }))
            .catch((err) => console.log(err))
        ).catch((err) => console.log(err))