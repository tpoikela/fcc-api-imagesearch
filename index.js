
const express = require("express");

const qs = require("querystring");
const url = require("url");

const BingSearch = require("src/bing_search");

var app = express();

var bing_key = process.env.BING_KEY || "false_key";
var port = process.env.PORT || 8080;
var db_url = process.env.MONGOLAB_URI;// || "mongodb://localhost:27017/urlshortener";

var bing_search = new BingSearch(bing_key);

// Routes for the server

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/imagesearch", (req, res) => {
    
    // Extract offset parameter (if any)

    
    // Send a request to Bing 
    
    // Format output json
    
    // Store search to the DB

    // Return results as JSON
    res.json({});
});

app.get("/api/latest/imagesearch", (req, res) => {
    
    // Fetch latest searches from DB
    
    // Return the results as json

});

app.listen(port, () => {
    console.log("ImageSearch server on port " + port);
});


module.exports = app;