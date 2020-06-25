// Import MongoDB models
const Item = require('../models/item');

// GET all Item Documents in the Collection
module.exports.getItems = async (res) => {
    try {
        const items = await Item.find({});
        res.status(200)
        res.json({ 'success': true, "items": items });
    } catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }

}

// GET single Item Document from the Collection
module.exports.getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.status(200)
        res.json({ 'success': true, "item": item })
    } catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}

// POST new Item Document to the Collection
module.exports.postItem = async (req, res) => {
    try {
        const item = await Item.create(req.body)
        res.status(200)
        res.json({ 'success': true, "item": item })
    }
    catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}

// PUT existing Item Document from the Collection
module.exports.putItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        try {
            const updatedItem = await Item.updateOne({ _id: req.params.id }, { ...item._doc, ...req.body })
            res.json({ 'success': true, "updatedItem": updatedItem })
        } catch (err) {
            res.status(400);
            res.json({ 'success': false, "message": 'Request failed' });
        }
    }
    catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}

// DELETE single Item Document from the Collection
module.exports.deleteItem = async (req, res) => {
    try {
        await Item.deleteOne({ _id: req.params.id })
        res.status(200)
        res.json({ "success": true })
    }
    catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}