const express = require("express");
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");
const configPath = path.join(__dirname, "..", "config", ".env");
require("colors");

require("dotenv").config({ path: configPath });

const connectDB = require("../config/connectDB");

// console.log("Hello".yellow.underline);
// console.log("Hello".red.bold);

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use('/api/v1', require('./routes/carsRoutes'));

app.use(errorHandler);

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server on port: ${process.env.PORT}`.bold.green.italic);
});
