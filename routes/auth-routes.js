const express = require('express');
const passport = require('passport');
const { ensureUserIsAuthenticated, ensureUserIsNotAuthenticated } = require('../auth/auth-middleware')

// Create router
const router = express.Router();

// Authenticate user with Google
router.get('/auth/google', ensureUserIsNotAuthenticated, passport.authenticate('google', { scope: ['profile'] }))

// Google authentication callback
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google' }),
    (req, res) => {
        return res.json({ 'success': true, 'message': "Successfully logged in" })
    })

// Logout User
router.get('/auth/logout', ensureUserIsAuthenticated, (req, res) => {
    req.logout()
    return res.json({ 'success': true, 'message': "Successfully logged out" })
})

module.exports = router;