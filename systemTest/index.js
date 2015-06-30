/*jshint node: true, -W106 */
'use strict';

/*
* Name : index.js
* Module : SystemTest
* Location : /SystemTest
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-06-27   Filippo Rampado    Initial code
* =========================================================
*/
var Helper=require('./helper.js');

console.log('Hello Norris');

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

// Includo e creo l'ustanza di Norris
var Norris = require('../norris-nrti.js');
var norris = new Norris(app,io,'/norris','http://norris-nrti-dev.herokuapp.com');

var page1=Helper.newPage(norris, 'page1', 'Pagina creazione grafici');
var page2=Helper.newPage(norris, 'page2', 'Pagina aggiornamento grafici');

//var barChart=Helper.newBarChart(page2, 'Test aggiornamento dati Bar Chart');
var lineChart=Helper.newLineChart(page2, 'Test aggiornamento dati Line Chart');
//var mapChart=Helper.newMapChart(page2, 'Test aggiornamento dati Map Chart');
var table=Helper.newTable(page2, 'Test aggiornamento dati Table');

var TS1 = require('./TS1.js');
var TS2 = require('./TS2.js');
var TS3 = require('./TS3.js');
var TS4 = require('./TS4.js');
var TS5 = require('./TS5.js');
var TS6 = require('./TS6.js');
var TS7 = require('./TS7.js');
var TS8 = require('./TS8.js');
var TS9 = require('./TS9.js');

/*TS1(norris);
TS2(page1);
TS3(page1);
TS4(page1);
TS5(page1);
TS6(barChart);*/
TS7(lineChart);
TS8(mapChart);
//TS9(table);

///////////////////////////////////////////// 
app.get('/', function (req, res) {
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log(' Test di sistema '+ fullUrl);
	res.send(' Test di sistema '+ fullUrl);
});

var port = process.env.PORT || 3000;
server.listen(port);