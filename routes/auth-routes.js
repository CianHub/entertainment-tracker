const express = require('express');
const passport = require('passport');


// Create router
const router = express.Router();

// Authenticate user with Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

// Google authentication callback
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google' }),
    (req, res) => {
        res.json({ 'success': true, 'message': "Authetication Successful" })
    })

// Logout User
router.get('/auth/logout', (req, res) => {
    req.logout()
    return res.json({ 'success': true, 'message': "logged out" })
})

module.exports = router;