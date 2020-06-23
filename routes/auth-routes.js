const express = require('express');
const passport = require('passport');
const { ensureUserIsAuthenticated, ensureUserIsNotAuthenticated } = require('../middleware/auth-middleware')

// Create router
const router = express.Router();

// Authenticate user with Google
router.get('/auth/google', ensureUserIsNotAuthenticated, passport.authenticate('google', { scope: ['profile'] }))

// Google authentication callback
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google/login-failure' }),
    (req, res) => {
        res.setStatus(200)
        return res.json({ 'success': true, 'message': "Successfully logged in", "username": req.user.name })
    })

// Google user authentication failure
router.get('/auth/google/login-failure', ensureUserIsNotAuthenticated,
    (req, res) => {
        res.setStatus(401)
        return res.json({ 'success': false, 'message': "Login failed" })
    })

// Authenticate a local user
router.post('/auth/local', ensureUserIsNotAuthenticated,
    passport.authenticate('local', { failureRedirect: '/auth/local/login-failure' }),
    (req, res) => {
        res.setStatus(200)
        return res.json({ 'success': true, 'message': "Successfully logged in", "username": req.user.name })
    })

// Local user authentication failure
router.get('/auth/local/login-failure', ensureUserIsNotAuthenticated,
    (req, res) => {
        res.setStatus(401)
        return res.json({ 'success': false, 'message': "Invalid username or password" })
    })

// Logout User
router.get('/auth/logout', ensureUserIsAuthenticated, (req, res) => {
    req.logout()
    return res.json({ 'success': true, 'message': "Successfully logged out" })
})

module.exports = router;