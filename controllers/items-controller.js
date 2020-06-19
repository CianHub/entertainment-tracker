// Import MongoDB models
const Item = require('../models/item');

// GET all Item Documents in the Collection
module.exports.getItems = (res) => Item.getItems()
    .then((items) => res.json({ 'success': true, "items": items }))
    .catch((err) => console.log(err))

// GET single Item Document from the Collection
module.exports.getItem = (req, res) => Item.getItem(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => console.log(err))

// POST new Item Document to the Collection
module.exports.postItem = (req, res) => Item.postItem(req.body)
    .then((item) => res.json({ 'success': true, "item": item }))
    .catch((err) => console.log(err))

// PUT existing Item Document from the Collection
module.exports.putItem = (req, res) =>
    Item.getItem(req.params.id)
        .then((item) => Item.putItem(req.params.id, { ...item._doc, ...req.body })
            .then(() => res.json({ 'success': true, "updatedItem": { ...item._doc, ...req.body } }))
            .catch((err) => console.log(err))
        ).catch((err) => console.log(err))

// DELETE single Item Document from the Collection
module.exports.deleteItem = (req, res) => Item.deleteItem(req.params.id)
    .then(() => res.json({ "success": true }))
    .catch((err) => console.log(err))