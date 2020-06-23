const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                googleId: profile.id,
                name: profile.displayName,
                points: 0,
                profilePicture: profile.photos[0].value
            }

            try {
                let user = await User.getUserByGoogleId(profile.id);
                if (user) {
                    done(null, user)
                } else {
                    user = await User.postUser(newUser)
                    done(null, user)
                }
            }
            catch (err) {
                console.log(err)
            }
        })
    )
    passport.serializeUser((user, done) => done(null, user.id))

    passport.deserializeUser(async (id, done) => {
        let user = await User.getUserByGoogleId(id);
        return done(null, user)
    })

}


