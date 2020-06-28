// Import MongoDB models
const Entry = require('../models/entry');
const User = require('../models/user');

// GET all Entry Documents in the Collection
// Only return the entries relevant to the logged in user
module.exports.getEntries = async (req, res) => {
    try {
        let entries = await Entry.find({})
        if (entries && req.user) {
            entries.filter((entry) => entry.user.userId === req.user._id)
        }
        res.status(200)
        res.json({ 'success': true, "entries": entries })
    } catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}

// GET single Entry Document from the Collection
module.exports.getEntry = async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id)
        res.status(200)
        res.json(entry)
    }
    catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}

// POST new Entry Document to the Collection
// Update with PUT logged in users points 
module.exports.postEntry = async (req, res) => {
    const data = { ...req.body, user: { "userId": req.user._id } }
    try {
        const entry = await Entry.create(data)
        const updatedPoints = req.user.points + entry.item.itemCategory.points;

        try {
            await User.updateOne({ _id: req.user._id }, { points: updatedPoints })
            res.status(200)
            res.json({ 'success': true, "entry": entry })
        }
        catch (err) {
            res.status(400);
            res.json({ 'success': false, "message": 'Update Request failed' });
        }
    } catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}

// PUT existing Entry Document from the Collection
module.exports.putEntry = async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.id)
        try {
            const updatedEntry = await Entry.updateOne({ _id: req.params.id }, { ...entry._doc, ...req.body })

            res.status(200)
            res.json({ 'success': true, "updatedEntry": updatedEntry })
        } catch (err) {
            res.status(400);
            res.json({ 'success': false, "message": 'Update Request failed' });
        }
    }
    catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}

// DELETE single Entry Document from the Collection
module.exports.deleteEntry = async (req, res) => {
    try {
        await Entry.deleteOne({ _id: req.params.id })
        res.status(200)
        res.json({ "success": true })
    } catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}