const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const cors = require('cors');

// Enable env variables to be read from .env file
require('dotenv').config();

// Import GraphQL schemas
const schema = require('./graphql/schema')

// Import route functions
const routes = require('./routes/routes');

// Initialise the server
const app = express();

// Set GraphQL endpoint
app.use(
    '/graphql',
    expressGraphQL({
        schema,
        graphiql: true,
        pretty: true,
    })
);

// Enable CORS
app.use(cors());

// Config app to parse incoming requests in diff formats
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to DB
mongoose
    .connect(
        `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0-puzya.mongodb.net/${process.env.MONGO_DBNAME}`,
        { useUnifiedTopology: true, useNewUrlParser: true }
    )
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));

// Return data from the items collection
app.get('/api/items', (req, res) => routes.getItems(res));

// Return data from the users collection
app.get('/api/users', (req, res) => routes.getUsers(res));

// Return data from the itemCategories collection
app.get('/api/item-categories', (req, res) => routes.getItemCategories(res));

// Return data from the entries collection
app.get('/api/entries', (req, res) => routes.getEntries(res));

// Start the server
app.listen(process.env.PORT, () => console.log(`app running on PORT: ${process.env.PORT}`));
