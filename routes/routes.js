// Import MongoDB models
const Item = require('../models/item');
const User = require('../models/user');
const ItemCategory = require('../models/item-category');
const entry = require('../models/entry');

// Import common functions
const common = require('./common/functions');

module.exports.getItems = (res) => Item.getItems((error, items) => common.handleAllDocuments(res, error, items))

module.exports.getUsers = (res) => User.getUsers((error, items) => common.handleAllDocuments(res, error, items))


module.exports.getEntries = (res) => entry.getEntries((error, items) => common.handleAllDocuments(res, error, items))


module.exports.getItemCategories = (res) => ItemCategory.getItemCategories((error, items) => common.handleAllDocuments(res, error, items))
