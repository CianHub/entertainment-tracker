// Import MongoDB models
const Item = require('../models/item');

// Import common functions
const common = require('../common/functions');

// GET all Item Documents in the Collection
module.exports.getItems = (res) => Item.getItems((error, items) => common.handleAllDocuments(res, error, items))

// GET single Item Document from the Collection
module.exports.getItem = (req, res) => Item.getItem(req.params.id).then((item) => res.json(item))

// POST new Item Document to the Collection
module.exports.postItem = (req, res) => Item.postItem(req.body).then((item) => res.json({ 'success': true, "item": item }))