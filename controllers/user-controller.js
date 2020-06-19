// Import MongoDB models
const User = require('../models/user');

// Import common functions
const common = require('./common/functions');

// GET all Users Documents in the Collection
module.exports.getUsers = (res) => User.getUsers((error, items) => common.handleAllDocuments(res, error, items))
