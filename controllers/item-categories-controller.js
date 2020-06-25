// Import MongoDB models
const ItemCategory = require('../models/item-category');

// GET all ItemCategory Documents in the Collection
module.exports.getItemCategories = async (res) => {
    try {
        const itemCategories = await ItemCategory.find({})
        res.status(200)
        res.json({ 'success': true, "itemCategories": itemCategories })
    } catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}

// GET single ItemCategory Document from the Collection
module.exports.getItemCategory = async (req, res) => {
    try {
        const itemCategory = await ItemCategory.findById(req.params.id)
        res.status(200)
        res.json(itemCategory)
    } catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}

// POST new ItemCategory Document to the Collection
module.exports.postItemCategory = async (req, res) => {
    try {
        const itemCategory = await ItemCategory.create(req.body)
        res.status(200)
        res.json({ 'success': true, "itemCategory": itemCategory })
    } catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}

// PUT existing ItemCategory Document from the Collection
module.exports.putItemCategory = async (req, res) => {
    try {
        const itemCategory = await ItemCategory.findById(req.params.id)

        try {
            const updatedItemCategory = await ItemCategory.updateOne(
                { _id: req.params.id }, { ...itemCategory._doc, ...req.body })
            res.json({ 'success': true, "updatedItemCategory": updatedItemCategory })
        } catch (err) {
            res.status(400);
            res.json({ 'success': false, "message": 'Request failed' });
        }
    } catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}

// DELETE single ItemCategory Document from the Collection
module.exports.deleteItemCategory = async (req, res) => {
    try {
        ItemCategory.deleteOne({ _id: req.params.id })
        res.json({ "success": true })
    } catch (err) {
        res.status(400);
        res.json({ 'success': false, "message": 'Request failed' });
    }
}
