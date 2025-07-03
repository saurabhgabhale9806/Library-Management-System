let express = require("express");
let app = express();
let cookie = require("cookie-parser");
let session = require("express-session");
const multer = require("multer");
let path = require("path");
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let router = require("../src/routes/regRoutes.js");
let conn = require("./config/db.js")
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookie());
app.use(express.static("public"));
app.use(session({
    secret:"12345df",
    resave: false,
    saveUninitialized:false
}));
app.use("/", router);
app.set('view engine', 'ejs');

module.exports = app;
