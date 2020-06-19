const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const path = require('path');

// Enable env variables to be read from .env file
require('dotenv').config();

// Import GraphQL schemas
const schema = require('./graphql/schema')

// Import routes
const itemRoutes = require('./routes/item-routes')
const userRoutes = require('./routes/user-routes')
const itemCategoriesRoutes = require('./routes/item-category-routes')
const entriesRoutes = require('./routes/entries-routes')

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

// Assign directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// Assign routes
app.use(itemRoutes)
app.use(itemCategoriesRoutes)
app.use(entriesRoutes)
app.use(userRoutes)

// Connect to DB
mongoose
    .connect(
        `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0-puzya.mongodb.net/${process.env.MONGO_DBNAME}`,
        { useUnifiedTopology: true, useNewUrlParser: true }
    )
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));

// Start the server
app.listen(process.env.PORT, () => console.log(`app running on PORT: ${process.env.PORT}`));