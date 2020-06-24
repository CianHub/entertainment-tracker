const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user');

module.exports = (passport) => {
    passport.use('facebook', new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:5000/auth/facebook/callback"
    },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            const newUser = {
                facebookId: profile.id,
                name: profile.displayName,
                points: 0,
                profilePicture: profile.photos[0].value,
                accountType: 'Facebook'
            }

            try {
                let user = await User.getUserByFacebookId(profile.id);
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
    passport.serializeUser((user, done) => {
        return done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await User.getUser(id);
        return done(null, user)
    })

}
