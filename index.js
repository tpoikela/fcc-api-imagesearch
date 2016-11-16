

const express = require("express");

const qs = require("querystring");
const url = require("url");
const path = require("path");

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

app.get("/api/imagesearch/*", (req, res) => {
    console.log("ImageSearch got request to /api/imagesearch");

    var urlObj = url.parse(req.url);
    var query = qs.parse(urlObj.query);

    var pathName = urlObj.pathname; // Extract last name
    var pathBase = path.basename(pathName);

    console.log("app.get/api url: " + JSON.stringify(urlObj));
    console.log("app.get/api query: " + JSON.stringify(query));

    var offset = 0;
    if (query.hasOwnProperty("offset")) offset = query.offset;

    // Extract the keyword from req
    var keyword = pathBase;
    console.log("Keyword for image search: " + keyword);

    // TODO
    // Send a request to Bing
    // Format output json

    // Add search to DB
    db.add(keyword, (err) => {
        if (err) throw err;
        res.json({test: "OK"});
    });



});

app.get("/api/latest/imagesearch", (req, res) => {

    // Fetch latest searches from DB
    db.getN(10, (err, docs) => {
        if (err) throw err;
        res.json(docs);
    });

    // Return the results as json

});

app.listen(port, () => {
    console.log("ImageSearch server on port " + port);
});


module.exports = app;
