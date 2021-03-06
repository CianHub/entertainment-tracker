const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user');

// Config Google strategy
module.exports = (passport) => {
    passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                googleId: profile.id,
                name: profile.displayName,
                points: 0,
                profilePicture: profile.photos[0].value,
                accountType: 'Google'
            }

            try {
                let user = await User.findOne({ googleId: profile.id });
                if (user) {
                    done(null, user)
                } else {
                    user = await User.create(newUser)
                    done(null, user)
                }
            }
            catch (err) {
                console.log(err)
            }
        })
    )
    passport.serializeUser((user, done) => {
        return done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await User.findById(id);
        return done(null, user)
    })

}


