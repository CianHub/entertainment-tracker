const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const cors = require('cors');

// Enable env variables to be read from .env file
require('dotenv').config();

// Import MongoDB models
const Item = require('./models/item');
const User = require('./models/user');
const ItemCategory = require('./models/item-category');
const entry = require('./models/entry');


// Import GraphQL schemas
const schema = require('./graphql/schema')

// Import common functions
const common = require('./common/functions');

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
app.get('/api/items', (req, res) =>
    Item.getItems((error, items) => common.handleAllDocuments(res, error, items))
);

// Return data from the users collection
app.get('/api/users', (req, res) =>
    User.getUsers((error, items) => common.handleAllDocuments(res, error, items))
);

// Return data from the itemCategories collection
app.get('/api/item-categories', (req, res) =>
    ItemCategory.getItemCategories((error, items) => common.handleAllDocuments(res, error, items))
);

// Return data from the entries collection
app.get('/api/entries', (req, res) =>
    entry.getEntries((error, items) => common.handleAllDocuments(res, error, items))
);

// Start the server
app.listen(process.env.PORT, () => console.log(`app running on PORT: ${process.env.PORT}`));
