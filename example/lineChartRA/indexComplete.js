var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

var Norris = require('norris-nrti');
var norris = new Norris(app,io,'/norris','localhost:3000');


var page1 = norris.createPage({
    ID:'page1',
    name: 'Example page',
    description: 'This page contains the example Line Chart'
});

var line1 = page1.createLineChart({
    ID: 'line1',
    title: 'Example line chart',
	viewFinder: true
});

var lineflow1 = line1.createLineChartFlow({
	ID:'flow1',
	name: 'time-temperature',
	xKey: 'time',
	yKey: 'temperature',
	flowColor: '#FF0000',
	marker: 'triangle'
});

var rec1 = lineflow1.addRecord({time:1, temperature:21});

for(var i=2; i < 25; i++) {
	var value = Math.round(Math.random()*20 + 10);
	lineflow1.addRecord({time:i, temperature:value});
}

line1.updateProperties({viewFinder: false});

lineflow1.updateRecord(rec1, {time:1, temperature: 10});

var port = process.env.PORT || 3000;
server.listen(port);