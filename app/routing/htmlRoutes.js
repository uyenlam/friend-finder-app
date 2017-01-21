var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

module.exports = {
	home: function(req, res){
			res.sendFile(path.join(__dirname, "../public/home.html"));
	},


	survey: function(req, res){
			res.sendFile(path.join(__dirname, "../public/survey.html"));
	},

}
