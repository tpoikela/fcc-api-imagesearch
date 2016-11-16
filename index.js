
const express = require("express");

const qs = require("querystring");
const url = require("url");

const BingSearch = require("./src/bing_search");
const Database = require("./src/database");

var app = express();

var bing_key = process.env.BING_KEY || "false_key";
var port = process.env.PORT || 8080;
var db_url = process.env.MONGOLAB_URI;// ||

db_url = "mongodb://localhost:27017/imagesearch";

var bing_search = new BingSearch(bing_key);
var db = new Database(db_url);

// Routes for the server

app.get("/", (req, res) => {
    console.log("ImageSearch got request to /");
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/imagesearch", (req, res) => {
    console.log("ImageSearch got request to /api/imagesearch");


    // Extract the keyword from req
    var keyword = "lolcats";

    // Add search to DB
    db.add(keyword, (err) => {
        if (err) throw err;
        res.json({});
    });

    // Extract offset parameter (if any)

    // Send a request to Bing

    // Format output json

    // Store search to the DB

    // Return results as JSON
});

app.get("/api/latest/imagesearch", (req, res) => {

    // Fetch latest searches from DB
    db.getN(10, (err, docs) => {
        if (err) throw err;

        var json = JSON.stringify(docs);
        res.json(json);
    });

    // Return the results as json

});

app.listen(port, () => {
    console.log("ImageSearch server on port " + port);
});


module.exports = app;
