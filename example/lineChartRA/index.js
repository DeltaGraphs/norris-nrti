var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

var Norris = require('norris-nrti');
var norris = new Norris(app,io,'/norris','localhost:3000');

//create page

//create graph

//create flow

//add record

//remove viewfinder

//update first record

/*for(var i=2; i < 25; i++) {
	var value = Math.round(Math.random()*20 + 10);
	lineflow1.addRecord({time:i, temperature:value});
}*/

var port = process.env.PORT || 3000;
server.listen(port);