

const express = require("express");

const qs = require("querystring");
const url = require("url");
const path = require("path");

const BingSearch = require("./src/bing_search");
const Database = require("./src/database");


var app = express();

var bing_key = process.env.BING_KEY || "false_key";
var port = process.env.PORT || 8080;
var db_url = process.env.MONGOLAB_URI;

if (process.env.NODE_ENV === "test") {
    db_url = "mongodb://localhost:27017/imagesearch";
}

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

    // Send a request to Bing
    var results = bing_search.search({keyword: keyword, offset: offset},
        (err, results) => {
            if (err) {
                console.error(err);
                res.json({error: "Couldn't complete the search."});
            }
            else {
                // Add search to DB
                db.add(keyword, (err) => {
                    if (err) {
                        console.error(err);
                        console.error("There was an error adding to DB.");
                    }
                    res.json(results);
                });
            }

    });

});

app.get("/api/latest/imagesearch", (req, res) => {

    // Fetch latest searches from DB
    db.getN(10, (err, docs) => {
        if (err) {
            res.json({error: "Couldn't access the database for searches."});
        }
        res.json(docs);
    });

    // Return the results as json

});

app.listen(port, () => {
    console.log("ImageSearch server on port " + port);
});


module.exports = app;
