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

setInterval(function () {
    norris.createPage({
        ID:'page1',
        name: 'Pagina 1',
        description: 'Questa è una bella pagina',
        graphsPerRow: 2,
        graphsPerCol: 10
    });
}, 5000);



app.get('/', function (req, res) {
	var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log(' HOME APS - expressEsempio.js '+ fullUrl);
	res.send(' HOME APS - expressEsempio.js 

[  
   {  
      "0":835,
      "IdMezzo":835,
      "1":45.427917480469,
      "WGS84Fi":45.427917480469,
      "2":11.914072990417,
      "WGS84La":11.914072990417,
      "3":258,
      "Girometro":258,
      "4":0,
      "StatoPorte":0,
      "capolinea":"Capolinea Mandria via Monselice"
   },
   {  
      "0":819,
      "IdMezzo":819,
      "1":45.419208526611,
      "WGS84Fi":45.419208526611,
      "2":11.878604888916,
      "WGS84La":11.878604888916,
      "3":264,
      "Girometro":264,
      "4":0,
      "StatoPorte":0,
      "capolinea":"Capolinea Mandria via Monselice"
   },
   {  
      "0":803,
      "IdMezzo":803,
      "1":45.429512023926,
      "WGS84Fi":45.429512023926,
      "2":11.940833091736,
      "WGS84La":11.940833091736,
      "3":219,
      "Girometro":219,
      "4":1,
      "StatoPorte":1,
      "capolinea":"Capolinea Mandria via Monselice"
   },
   {  
      "0":879,
      "IdMezzo":879,
      "1":45.370708465576,
      "WGS84Fi":45.370708465576,
      "2":11.831760406494,
      "WGS84La":11.831760406494,
      "3":144,
      "Girometro":144,
      "4":1,
      "StatoPorte":1,
      "capolinea":"Capolinea Torre"
   },
   {  
      "0":856,
      "IdMezzo":856,
      "1":45.421226501465,
      "WGS84Fi":45.421226501465,
      "2":11.881805419922,
      "WGS84La":11.881805419922,
      "3":41,
      "Girometro":41,
      "4":0,
      "StatoPorte":0,
      "capolinea":"Capolinea Torre"
   },
   {  
      "0":811,
      "IdMezzo":811,
      "1":45.370956420898,
      "WGS84Fi":45.370956420898,
      "2":11.84206199646,
      "WGS84La":11.84206199646,
      "3":42,
      "Girometro":42,
      "4":0,
      "StatoPorte":0,
      "capolinea":"Capolinea Torre"
   },
   {  
      "0":858,
      "IdMezzo":858,
      "1":45.395050048828,
      "WGS84Fi":45.395050048828,
      "2":11.872590065002,
      "WGS84La":11.872590065002,
      "3":245,
      "Girometro":245,
      "4":0,
      "StatoPorte":0,
      "capolinea":"Capolinea Mandria via Monselice"
   }
]

        '+ fullUrl);
});

// questo middleware non permetterà di raggiungere altre richieste scritte al di sotto di questa funzione
// utilizzabile come 404
app.use(function(req, res, next) {
	res.status(404).send('404 Not Found');
});

//app.listen(3000); // si mette in ascolto su http://127.0.0.1:3000/
var port = process.env.PORT || 3000;
server.listen(port);