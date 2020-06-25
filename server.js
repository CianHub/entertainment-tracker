const expressApp = require("./app");
const mongoose = require("mongoose");

// Enable env variables to be read from .env file
require('dotenv').config();

// Start the server
const configServer = async (mode) => {
    if (mode === "test") {
        try {
            // Connect to Test DB
            await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            });
        } catch (err) {
            console.log(err)
        }
    } else if (mode === 'dev') {
        try {
            // Connect to DB
            await mongoose
                .connect(
                    `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0-puzya.mongodb.net/${process.env.MONGO_DBNAME}`,
                    { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
                        if (err) {
                            console.error(err);
                            process.exit(1);
                        }
                    })
            console.log('DEV MODE: DB connected')
        } catch (err) {
            console.log(err)
        }
    }
}

const startServer = async (app, mode = 'dev') => {
    configServer(mode)
    app.listen(process.env.PORT, () => console.log(`app running on PORT: ${process.env.PORT}`));
}
module.exports = startServer(expressApp)
