const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user');


module.exports = (passport) => {
    passport.use('local', new LocalStrategy(async (name, password, done) => {
        let user = await User.getLocalUser(name)
        if (!user) return done(null, false)
        if (!User.checkLocalUserPasswordIsValid(password, user.password)) return done(null, false)

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


