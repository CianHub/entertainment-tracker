const express = require('express');
const passport = require('passport');
const { ensureUserIsAuthenticated, ensureUserIsNotAuthenticated } = require('../middleware/auth-middleware')
const jwt = require('jsonwebtoken')

// Create router
const router = express.Router();

// Authenticate user with Google
router.get('/auth/google', ensureUserIsNotAuthenticated, passport.authenticate('google', { scope: ['profile'] }))

// Google authentication callback
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google/login-failure' }),
    (req, res) => {
        res.status(200)
        jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) {
                throw err
            }
            return res.json({ 'success': true, 'message': "Successfully logged in", "username": req.user.name, token })
        })
    })

// Google user authentication failure
router.get('/auth/google/login-failure', ensureUserIsNotAuthenticated,
    (req, res) => {
        res.status(401)
        return res.json({ 'success': false, 'message': "Login failed" })
    })

// Authenticate user with Facebook
router.get('/auth/facebook', ensureUserIsNotAuthenticated, passport.authenticate('facebook'))

// Facebook authentication callback
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/auth/facebook/login-failure' }),
    (req, res) => {
        res.status(200)
        jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) {
                throw err
            }
            return res.json({ 'success': true, 'message': "Successfully logged in", "username": req.user.name, token })
        })
    })

// Facebook user authentication failure
router.get('/auth/facebook/login-failure', ensureUserIsNotAuthenticated,
    (req, res) => {
        res.status(401)
        return res.json({ 'success': false, 'message': "Login failed" })
    })

// Authenticate a local user
router.post('/auth/local',
    passport.authenticate('local', { failureRedirect: '/auth/local/login-failure' }),
    (req, res) => {
        res.status(200)
        jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) {
                throw err
            }
            return res.json({ 'success': true, 'message': "Successfully logged in", "userId": req.user._id, token })
        })
    })

// Local user authentication failure
router.get('/auth/local/login-failure', ensureUserIsNotAuthenticated,
    (req, res) => {
        res.status(401)
        return res.json({ 'success': false, 'message': "Invalid username or password" })
    })

// Logout User
router.get('/auth/logout', ensureUserIsAuthenticated, (req, res) => {
    req.logout()
    return res.json({ 'success': true, 'message': "Successfully logged out" })
})

module.exports = router;