var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

var allFriends = [];

module.exports = {
	get: function(req, res){
		res.json(allFriends);
	},

	post: function(req, res){
		var user = req.body;
		allFriends.push(user);
		console.log(user);
	}
};
