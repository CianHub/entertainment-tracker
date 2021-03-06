const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user');

// Config facebook strategy
module.exports = (passport) => {
    passport.use('facebook', new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "/auth/facebook/callback"
    },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                facebookId: profile.id,
                name: profile.displayName,
                points: 0,
                profilePicture: profile.profileUrl,
                accountType: 'Facebook'
            }

            try {
                let user = await User.findOne({ facebookId: profile.id });
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
        let user = await User.getUser(id);
        return done(null, user)
    })
}