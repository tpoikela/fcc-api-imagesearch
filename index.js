
const express = require("express");

var app = express();

var bing_key = process.env.BING_KEY || "false_key";


// Routes for the server

app.get("/api/latest/imagesearch", (req, res) => {

});


app.get("/api/imagesearch", (req, res) => {

});
