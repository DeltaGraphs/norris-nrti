/*jshint node: true, -W106 */
'use strict';

/*
* Name : index.js
* Module : Example
* Location : /example
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-20   Matteo Furlan    Initial code
* =========================================================
*/

console.log('Hello Norris');

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
/*
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.configure(function() {
    app.use(allowCrossDomain);
    //some other code
});
*/

// Includo e creo l'ustanza di Norris
var Norris = require('../norris-nrti.js');
var norris = new Norris(app,io,'/norris');

var page1;
//setInterval(function () {
    page1=norris.createPage({
        ID:'page1',
        name: 'Pagina 1',
        description: 'Questa è una bella pagina',
        graphsPerRow: 2,
        graphsPerCol: 10
    });
    console.log('Pagina inserita: '+page1);
//}, 5000);

var myVar=setInterval(myTimer, 10000);

var i=1;
function myTimer() {
  page1=norris.createPage({
        ID:'page'+i,
        name: 'Pagina '+i,
        description: 'Questa è una bella pagina'+i,
        graphsPerRow: i,
        graphsPerCol: i
    });
    console.log('Pagina inserita: page'+i);
  i++;
}

page1=norris.createPage({
        ID:'page2',
        name: 'Pagina 2',
        description: 'Questa2',
        graphsPerRow: 2,
        graphsPerCol: 2
    });
    console.log('Pagina inserita: '+page1);



    page1=norris.createPage({
        ID:'page3',
        name: 'Pagina 3',
        description: 'Questa è 3',
        graphsPerRow: 4,
        graphsPerCol: 4
    });
    console.log('Pagina inserita: '+page1);


app.get('/', function (req, res) {
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log(' HOME APS - expressEsempio.js '+ fullUrl);
	res.send('HOME APS - expressEsempio.js '+ fullUrl);
});

// questo middleware non permetterà di raggiungere altre richieste scritte al di sotto di questa funzione
// utilizzabile come 404
app.use(function(req, res, next) {
	res.status(404).send('404 Not Found');
});

//app.listen(3000); // si mette in ascolto su http://127.0.0.1:3000/
var port = process.env.PORT || 3000;
server.listen(port);