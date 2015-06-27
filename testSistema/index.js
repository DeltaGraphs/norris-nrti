/*jshint node: true, -W106 */
'use strict';

/*
* Name : index.js
* Module : TestSistema
* Location : /testSistema
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

var page=norris.createPage({
    ID:'page',
    name: 'Default Page',
    description: 'Questa è una bella pagina',
    graphsPerRow: 2,
    graphsPerCol: 10
});


var TS1 = require('./TS1.js');
//var TS2 = require('./TS2.js');

TS1(norris);
//TS2(page);




/////////////////////////////////////////////
app.get('/', function (req, res) {
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log(' Test di sistema '+ fullUrl);
	res.send(' Test di sistema '+ fullUrl);
});

var port = process.env.PORT || 3000;
server.listen(port);