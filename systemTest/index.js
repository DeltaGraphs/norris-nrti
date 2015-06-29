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

console.log('Hello Norris');

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

// Includo e creo l'ustanza di Norris
var Norris = require('../norris-nrti.js');
var norris = new Norris(app,io,'/norris','http://norris-nrti-dev.herokuapp.com');

var page1=norris.createPage({
    ID:'page1',
    name: 'Pagina creazione grafici',
    description: 'Qui viene testata la creazione di grafici e flussi',
    graphsPerRow: 2,
    graphsPerCol: 10
});

var page2=norris.createPage({
    ID:'page2',
    name: 'Pagina aggiornamento dati',
    description: 'Qui vengono testati i vari aggiornamenti sui dati',
    graphsPerRow: 2,
    graphsPerCol: 10
});

/*var page3=norris.createPage({
    ID:'page3',
    name: 'Pagina aggiornamento parametri',
    description: 'Qui vengono testati i vari aggiornamenti sui parametri',
    graphsPerRow: 2,
    graphsPerCol: 10
});*/

var barChart2=page2.createBarChart({
	ID: 'barChart',
	title: 'Bar aggiornamento Bar Chart',
    xAxis:{name: 'tempo'},
    yAxis:{name: 'pressione'},
    headers: ['h1','h2','h3','h4','h5'],
});
/*var lineChart2=page2.createLineChart({
    ID: 'lineChart',
    title: 'Line aggiornamento Line Chart',
    xAxis:{name: 'tempo'},
    yAxis:{name: 'temperatura'}
});*/


var TS1 = require('./TS1.js');
var TS2 = require('./TS2.js');
var TS3 = require('./TS3.js');
var TS4 = require('./TS4.js');
var TS5 = require('./TS5.js');
var TS6 = require('./TS6.js');
//var TS7 = require('./TS7.js');
//var TS8 = require('./TS8.js');
//var TS9 = require('./TS9.js');

TS1(norris);
TS2(page1);
TS3(page1);
TS4(page1);
TS5(page1);
TS6(barChart2);
//TS7(lineChart2);
//TS8(mapChart2);
//TS9(table2);

/////////////////////////////////////////////
app.get('/', function (req, res) {
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log(' Test di sistema '+ fullUrl);
	res.send(' Test di sistema '+ fullUrl);
});

var port = process.env.PORT || 3000;
server.listen(port);