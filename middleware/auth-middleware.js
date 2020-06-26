const jwt = require('jsonwebtoken')
const User = require('../models/user')
module.exports = {
    ensureUserIsAuthenticated: (req, res, next) => {
        if (checkToken(req.headers.token)) {
            return next();
        } else {
            res.status(403)
            res.json({ success: false, message: "You must be logged in to access this path." })
        }
    },
    ensureUserIsNotAuthenticated: (req, res, next) => {
        if (checkToken(req.headers.token)) {
            res.status(200)
            res.json({ success: false, message: "You are already logged in." })
        } else {
            next();
        }
    },
}

const checkToken = async (token) => {
    const decodedToken = jwt.decode(token)
    const user = await User.findById(decodedToken.id)
    console.log(user)
    return user !== null
}
