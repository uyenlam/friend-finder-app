var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

var allFriends = require('../data/data.js');

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
