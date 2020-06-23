module.exports = {
    ensureUserIsAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(403)
            res.json({ success: false, message: "You must be logged in to access this path." })
        }
    },
    ensureUserIsNotAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.status(200)
            res.json({ success: false, message: "You are already logged in." })
        } else {
            next();
        }
    },
}