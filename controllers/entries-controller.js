// Import MongoDB models
const Entry = require('../models/entry');

// Import common functions
const common = require('../common/functions');

// GET all Entry Documents in the Collection
module.exports.getEntries = (res) => Entry.getEntries((error, items) => common.handleAllDocuments(res, error, items))
