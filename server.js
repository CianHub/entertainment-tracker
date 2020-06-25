const expressApp = require("./app");
const mongoose = require('mongoose');

// Enable env variables to be read from .env file
require('dotenv').config();

// Connect to DB
mongoose
    .connect(
        `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0-puzya.mongodb.net/${process.env.MONGO_DBNAME}`,
        { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        })
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err))

// Start the server
const startServer = async (app) => app.listen(process.env.PORT, () => console.log(`app running on PORT: ${process.env.PORT}`));

module.exports = startServer(expressApp)
