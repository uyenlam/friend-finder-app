// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require('mysql');

//calling information from a different file
var api = require('./app/routing/apiRoutes.js');
var html = require('./app/routing/htmlRoutes.js');


// Sets up the Express App: This is where we do the routing on the front end
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(__dirname + '/app/public'));
app.use(express.static(__dirname + '/app/data'));
app.use(express.static(__dirname + '/app/routing'));
app.use(express.static(__dirname + '/node_modules'));


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});


// Basic route that sends the user first to the AJAX Page
app.get("/", html.home);

app.get("/survey", html.survey);

// app.get("/questions", function(req, res){
//   res.send(JSON.stringify(questions));
// })

// Routes that allow us to work with the API

app.get("/api/friends", api.get);

app.post("/api/friends", api.post);
