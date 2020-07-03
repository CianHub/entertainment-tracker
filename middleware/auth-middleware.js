const jwt = require('jsonwebtoken')
const User = require('../models/user')

const ensureUserIsAuthenticated = async (req, res, next) => {
    if (await checkToken(req, req.headers.token)) {
        return next();
    } else {
        res.status(403)
        res.json({ success: false, message: "You must be logged in to access this path." })
    }
}

const ensureUserIsNotAuthenticated = async (req, res, next) => {
    if (await checkToken(req, req.headers.token)) {
        res.status(200)
        res.json({ success: false, message: "You are already logged in." })
    } else {
        next();
    }
}


const checkToken = async (req, token) => {
    if (token !== null) {
        const decodedToken = jwt.decode(token)
        if (decodedToken) {
            try {
                const user = await User.findById(decodedToken.id)
                user ? req.user = user : null;
                return user !== null
            }
            catch (err) {
                console.log(err)
                return false
            }
        }
    }
    return false
}

module.exports.checkToken = checkToken
module.exports.ensureUserIsAuthenticated = ensureUserIsAuthenticated
module.exports.ensureUserIsNotAuthenticated = ensureUserIsNotAuthenticated