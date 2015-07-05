var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

var Norris = require('../norris-nrti.js');
var norris = new Norris(app,io,'/norris','http://http://5.231.33.217:3000');


var page1 = norris.createPage({
    ID:'page1',
    name: 'Example page',
    description: 'This page contains the example Line Chart'
});

var line1 = page1.createLineChart({
    ID: 'line1',
    title: 'Example line chart',
    xAxis:{
        name: 'time'
    },
    yAxis:{
        name: 'temperature'
    },
    horizontalGrid: true,
    verticalGrid: true
});

var lineflow1.createLineChartFlow({
	ID:'flow1',
	name: 'time-temperature',
	xKey: 'time',
	yKey: 'temperature',
	flowColor: '#FF0000',
	marker: 'triangle'
});

lineflow1.addRecord({time:1, temperature: 21});
lineflow1.addRecord({time:2, temperature: 18});
lineflow1.addRecord({time:3, temperature: 25});

app.get('/', function (req, res) {
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log(' HOME APS - expressEsempio.js '+ fullUrl);
	res.send('HOME APS - expressEsempio.js '+ fullUrl);
});
var port = process.env.PORT || 3000;
server.listen(port);