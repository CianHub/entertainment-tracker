const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user');
const { checkLocalUserPasswordIsValid } = require('../controllers/user-controller')

// Create strategy for local user
module.exports = (passport) => {
    passport.use('local', new LocalStrategy({
        usernameField: "name",
        passwordField: 'password'
    }, async (name, password, done) => {
        let user = await User.findOne({ name: name, accountType: 'Local' })
        if (!user) return done(null, false)
        if (!checkLocalUserPasswordIsValid(user.salt, password, user.password)) return done(null, false)

        return done(null, user);
    }))

    passport.serializeUser((user, done) => {
        return done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await User.getUser(id);
        return done(null, user)
    })

}


