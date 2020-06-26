const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)

// Enable env variables to be read from .env file
require('dotenv').config();

// Passport config
require('./auth/google-strategy')(passport)
require('./auth/local-strategy')(passport)
require('./auth/facebook-strategy')(passport)

// Import routes
const itemRoutes = require('./routes/item-routes')
const userRoutes = require('./routes/user-routes')
const itemCategoriesRoutes = require('./routes/item-category-routes')
const entriesRoutes = require('./routes/entries-routes')
const authRoutes = require('./routes/auth-routes')

// Initialise the server
const app = express();

// Enable CORS
app.use(cors());

// Config app to parse incoming requests in diff formats
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Config app to allow sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Init authentication with Passport.js and store login session
app.use(passport.initialize())
app.use(passport.session())

// Assign directory for static files where front-end will live
app.use(express.static(path.join(__dirname, 'public')));

// Assign routes
app.use(itemRoutes)
app.use(itemCategoriesRoutes)
app.use(entriesRoutes)
app.use(userRoutes)
app.use(authRoutes)

module.exports = app;