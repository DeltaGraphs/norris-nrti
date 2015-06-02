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

var page1=norris.createPage({
    ID:'page1',
    name: 'Pagina 1',
    description: 'Questa è una bella pagina',
    graphsPerRow: 2,
    graphsPerCol: 10
});
console.log('Pagina inserita: '+page1);


/////////////////////////////////////////////////
//TEST MAP CHART
/////////////////////////////////////////////////
var mapChart=page1.createMapChart({
    ID: 'map1',
    title: 'APS',
    height: 600,
    width: 1000,
    enableLegend: true,
    legend: {
        position: 'NE',
    },
    latitude: 45.42533493042,
    longitude: 45.42533493042,
    mapType: 'roadMap',
    mapWidth: 2000,
    mapHeight: 2000,
    legendOnPoint: true
});
console.log('Grafico inserito: '+mapChart);

var mapChartFlow=mapChart.createMapChartFlow({
    ID:'flow1',
    name: 'linea 22',
    marker:{
        'type': 'shape',//shape, icon, text
        //gli attributi qui sotto dipendono dal tipo di marker!!!!!
        'shape': 'circle',//circle, triangle, square, diamond
        'icon': 'null',//path
        'text': 'null',//string
        'color' : '#000'
    },
    //trace
    latitudeKey: '1',
    longitudeKey: '2',
    objectKey: '0'
});

var data=[[{'0':875,'IdMezzo':875,'1':45.42533493042,'WGS84Fi':45.42533493042,'2':11.902134895325,'WGS84La':11.902134895325,'3':14,'Girometro':14,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.385223388672,'WGS84Fi':45.385223388672,'2':11.862413406372,'WGS84La':11.862413406372,'3':14,'Girometro':14,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'},{'0':867,'IdMezzo':867,'1':45.390911102295,'WGS84Fi':45.390911102295,'2':11.870438575745,'WGS84La':11.870438575745,'3':266,'Girometro':266,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':835,'IdMezzo':835,'1':45.424865722656,'WGS84Fi':45.424865722656,'2':11.885174751282,'WGS84La':11.885174751282,'3':188,'Girometro':188,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':814,'IdMezzo':814,'1':45.429698944092,'WGS84Fi':45.429698944092,'2':11.940545082092,'WGS84La':11.940545082092,'3':132,'Girometro':132,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.381771087646,'WGS84Fi':45.381771087646,'2':11.854724884033,'WGS84La':11.854724884033,'3':51,'Girometro':51,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':880,'IdMezzo':880,'1':45.40881729126,'WGS84Fi':45.40881729126,'2':11.878475189209,'WGS84La':11.878475189209,'3':45,'Girometro':45,'4':1,'StatoPorte':1,'capolinea':'Capolinea Torre'},{'0':837,'IdMezzo':837,'1':45.392189025879,'WGS84Fi':45.392189025879,'2':11.87103843689,'WGS84La':11.87103843689,'3':80,'Girometro':80,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}],
[{'0':837,'IdMezzo':837,'1':45.39281463623,'WGS84Fi':45.39281463623,'2':11.871248245239,'WGS84La':11.871248245239,'3':65,'Girometro':65,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.385437011719,'WGS84Fi':45.385437011719,'2':11.862988471985,'WGS84La':11.862988471985,'3':27,'Girometro':27,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'},{'0':835,'IdMezzo':835,'1':45.423889160156,'WGS84Fi':45.423889160156,'2':11.88440322876,'WGS84La':11.88440322876,'3':240,'Girometro':240,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':867,'IdMezzo':867,'1':45.390277862549,'WGS84Fi':45.390277862549,'2':11.870240211487,'WGS84La':11.870240211487,'3':263,'Girometro':263,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':875,'IdMezzo':875,'1':45.426048278809,'WGS84Fi':45.426048278809,'2':11.906834602356,'WGS84La':11.906834602356,'3':334,'Girometro':334,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':814,'IdMezzo':814,'1':45.431480407715,'WGS84Fi':45.431480407715,'2':11.937152862549,'WGS84La':11.937152862549,'3':158,'Girometro':158,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.381893157959,'WGS84Fi':45.381893157959,'2':11.854881286621,'WGS84La':11.854881286621,'3':47,'Girometro':47,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':880,'IdMezzo':880,'1':45.40881729126,'WGS84Fi':45.40881729126,'2':11.878475189209,'WGS84La':11.878475189209,'3':45,'Girometro':45,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}],
[{'0':875,'IdMezzo':875,'1':45.426074981689,'WGS84Fi':45.426074981689,'2':11.907616615295,'WGS84La':11.907616615295,'3':15,'Girometro':15,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':837,'IdMezzo':837,'1':45.394992828369,'WGS84Fi':45.394992828369,'2':11.872672080994,'WGS84La':11.872672080994,'3':60,'Girometro':60,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.390277862549,'WGS84Fi':45.390277862549,'2':11.870240211487,'WGS84La':11.870240211487,'3':263,'Girometro':263,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':835,'IdMezzo':835,'1':45.423347473145,'WGS84Fi':45.423347473145,'2':11.883943557739,'WGS84La':11.883943557739,'3':236,'Girometro':236,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':805,'IdMezzo':805,'1':45.385883331299,'WGS84Fi':45.385883331299,'2':11.865206718445,'WGS84La':11.865206718445,'3':31,'Girometro':31,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'},{'0':814,'IdMezzo':814,'1':45.433559417725,'WGS84Fi':45.433559417725,'2':11.934650421143,'WGS84La':11.934650421143,'3':133,'Girometro':133,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.381893157959,'WGS84Fi':45.381893157959,'2':11.854881286621,'WGS84La':11.854881286621,'3':47,'Girometro':47,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':880,'IdMezzo':880,'1':45.409523010254,'WGS84Fi':45.409523010254,'2':11.878451347351,'WGS84La':11.878451347351,'3':90,'Girometro':90,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}],
[{'0':805,'IdMezzo':805,'1':45.386032104492,'WGS84Fi':45.386032104492,'2':11.865413665771,'WGS84La':11.865413665771,'3':39,'Girometro':39,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'},{'0':835,'IdMezzo':835,'1':45.422840118408,'WGS84Fi':45.422840118408,'2':11.883500099182,'WGS84La':11.883500099182,'3':152,'Girometro':152,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':814,'IdMezzo':814,'1':45.434490203857,'WGS84Fi':45.434490203857,'2':11.931676864624,'WGS84La':11.931676864624,'3':176,'Girometro':176,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':837,'IdMezzo':837,'1':45.397495269775,'WGS84Fi':45.397495269775,'2':11.874231338501,'WGS84La':11.874231338501,'3':345,'Girometro':345,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':845,'IdMezzo':845,'1':45.382194519043,'WGS84Fi':45.382194519043,'2':11.855228424072,'WGS84La':11.855228424072,'3':52,'Girometro':52,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':880,'IdMezzo':880,'1':45.410202026367,'WGS84Fi':45.410202026367,'2':11.878443717957,'WGS84La':11.878443717957,'3':101,'Girometro':101,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':875,'IdMezzo':875,'1':45.426471710205,'WGS84Fi':45.426471710205,'2':11.913116455078,'WGS84La':11.913116455078,'3':331,'Girometro':331,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.39009475708,'WGS84Fi':45.39009475708,'2':11.870180130005,'WGS84La':11.870180130005,'3':293,'Girometro':293,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'}],
[{'0':837,'IdMezzo':837,'1':45.397495269775,'WGS84Fi':45.397495269775,'2':11.874231338501,'WGS84La':11.874231338501,'3':345,'Girometro':345,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':835,'IdMezzo':835,'1':45.422840118408,'WGS84Fi':45.422840118408,'2':11.883500099182,'WGS84La':11.883500099182,'3':152,'Girometro':152,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':814,'IdMezzo':814,'1':45.434185028076,'WGS84Fi':45.434185028076,'2':11.928731918335,'WGS84La':11.928731918335,'3':176,'Girometro':176,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':805,'IdMezzo':805,'1':45.38667678833,'WGS84Fi':45.38667678833,'2':11.866591453552,'WGS84La':11.866591453552,'3':36,'Girometro':36,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'},{'0':845,'IdMezzo':845,'1':45.382415771484,'WGS84Fi':45.382415771484,'2':11.855503082275,'WGS84La':11.855503082275,'3':51,'Girometro':51,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':875,'IdMezzo':875,'1':45.427074432373,'WGS84Fi':45.427074432373,'2':11.913911819458,'WGS84La':11.913911819458,'3':73,'Girometro':73,'4':1,'StatoPorte':1,'capolinea':'Capolinea Torre'},{'0':880,'IdMezzo':880,'1':45.412330627441,'WGS84Fi':45.412330627441,'2':11.878662109375,'WGS84La':11.878662109375,'3':83,'Girometro':83,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.389678955078,'WGS84Fi':45.389678955078,'2':11.870050430298,'WGS84La':11.870050430298,'3':252,'Girometro':252,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'}],
[{'0':837,'IdMezzo':837,'1':45.397689819336,'WGS84Fi':45.397689819336,'2':11.874346733093,'WGS84La':11.874346733093,'3':64,'Girometro':64,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':875,'IdMezzo':875,'1':45.427219390869,'WGS84Fi':45.427219390869,'2':11.91396522522,'WGS84La':11.91396522522,'3':72,'Girometro':72,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.389678955078,'WGS84Fi':45.389678955078,'2':11.870050430298,'WGS84La':11.870050430298,'3':252,'Girometro':252,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':835,'IdMezzo':835,'1':45.422840118408,'WGS84Fi':45.422840118408,'2':11.883500099182,'WGS84La':11.883500099182,'3':152,'Girometro':152,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':814,'IdMezzo':814,'1':45.435111999512,'WGS84Fi':45.435111999512,'2':11.924343109131,'WGS84La':11.924343109131,'3':158,'Girometro':158,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.382690429688,'WGS84Fi':45.382690429688,'2':11.855858802795,'WGS84La':11.855858802795,'3':50,'Girometro':50,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.386920928955,'WGS84Fi':45.386920928955,'2':11.86728477478,'WGS84La':11.86728477478,'3':29,'Girometro':29,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'},{'0':880,'IdMezzo':880,'1':45.412399291992,'WGS84Fi':45.412399291992,'2':11.878684997559,'WGS84La':11.878684997559,'3':76,'Girometro':76,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}],
[{'0':880,'IdMezzo':880,'1':45.412399291992,'WGS84Fi':45.412399291992,'2':11.878684997559,'WGS84La':11.878684997559,'3':76,'Girometro':76,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':875,'IdMezzo':875,'1':45.428066253662,'WGS84Fi':45.428066253662,'2':11.91420841217,'WGS84La':11.91420841217,'3':76,'Girometro':76,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.386920928955,'WGS84Fi':45.386920928955,'2':11.86728477478,'WGS84La':11.86728477478,'3':29,'Girometro':29,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'},{'0':867,'IdMezzo':867,'1':45.389678955078,'WGS84Fi':45.389678955078,'2':11.870050430298,'WGS84La':11.870050430298,'3':252,'Girometro':252,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':837,'IdMezzo':837,'1':45.397216796875,'WGS84Fi':45.397216796875,'2':11.876583099365,'WGS84La':11.876583099365,'3':344,'Girometro':344,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':835,'IdMezzo':835,'1':45.421955108643,'WGS84Fi':45.421955108643,'2':11.882584571838,'WGS84La':11.882584571838,'3':233,'Girometro':233,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':814,'IdMezzo':814,'1':45.435901641846,'WGS84Fi':45.435901641846,'2':11.921506881714,'WGS84La':11.921506881714,'3':158,'Girometro':158,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.382839202881,'WGS84Fi':45.382839202881,'2':11.856053352356,'WGS84La':11.856053352356,'3':47,'Girometro':47,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}],
[{'0':875,'IdMezzo':875,'1':45.431159973145,'WGS84Fi':45.431159973145,'2':11.914177894592,'WGS84La':11.914177894592,'3':79,'Girometro':79,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':837,'IdMezzo':837,'1':45.397003173828,'WGS84Fi':45.397003173828,'2':11.878706932068,'WGS84La':11.878706932068,'3':66,'Girometro':66,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':835,'IdMezzo':835,'1':45.42138671875,'WGS84Fi':45.42138671875,'2':11.881772994995,'WGS84La':11.881772994995,'3':219,'Girometro':219,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':814,'IdMezzo':814,'1':45.436805725098,'WGS84Fi':45.436805725098,'2':11.918263435364,'WGS84La':11.918263435364,'3':159,'Girometro':159,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':867,'IdMezzo':867,'1':45.389533996582,'WGS84Fi':45.389533996582,'2':11.870008468628,'WGS84La':11.870008468628,'3':251,'Girometro':251,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.383071899414,'WGS84Fi':45.383071899414,'2':11.856356620789,'WGS84La':11.856356620789,'3':47,'Girometro':47,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.387706756592,'WGS84Fi':45.387706756592,'2':11.868689537048,'WGS84La':11.868689537048,'3':46,'Girometro':46,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'},{'0':880,'IdMezzo':880,'1':45.413116455078,'WGS84Fi':45.413116455078,'2':11.87745475769,'WGS84La':11.87745475769,'3':116,'Girometro':116,'4':1,'StatoPorte':1,'capolinea':'Capolinea Torre'}],
[{'0':805,'IdMezzo':805,'1':45.387706756592,'WGS84Fi':45.387706756592,'2':11.868689537048,'WGS84La':11.868689537048,'3':46,'Girometro':46,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'},{'0':875,'IdMezzo':875,'1':45.433910369873,'WGS84Fi':45.433910369873,'2':11.916036605835,'WGS84La':11.916036605835,'3':78,'Girometro':78,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':814,'IdMezzo':814,'1':45.43616104126,'WGS84Fi':45.43616104126,'2':11.917216300964,'WGS84La':11.917216300964,'3':248,'Girometro':248,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':867,'IdMezzo':867,'1':45.389533996582,'WGS84Fi':45.389533996582,'2':11.870008468628,'WGS84La':11.870008468628,'3':251,'Girometro':251,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':835,'IdMezzo':835,'1':45.420539855957,'WGS84Fi':45.420539855957,'2':11.880131721497,'WGS84La':11.880131721497,'3':212,'Girometro':212,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':880,'IdMezzo':880,'1':45.414184570312,'WGS84Fi':45.414184570312,'2':11.875738143921,'WGS84La':11.875738143921,'3':143,'Girometro':143,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':845,'IdMezzo':845,'1':45.383209228516,'WGS84Fi':45.383209228516,'2':11.856530189514,'WGS84La':11.856530189514,'3':47,'Girometro':47,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':837,'IdMezzo':837,'1':45.399394989014,'WGS84Fi':45.399394989014,'2':11.877456665039,'WGS84La':11.877456665039,'3':295,'Girometro':295,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}],
[{'0':814,'IdMezzo':814,'1':45.43616104126,'WGS84Fi':45.43616104126,'2':11.917216300964,'WGS84La':11.917216300964,'3':248,'Girometro':248,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':835,'IdMezzo':835,'1':45.420539855957,'WGS84Fi':45.420539855957,'2':11.880131721497,'WGS84La':11.880131721497,'3':212,'Girometro':212,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':875,'IdMezzo':875,'1':45.43480682373,'WGS84Fi':45.43480682373,'2':11.916501998901,'WGS84La':11.916501998901,'3':68,'Girometro':68,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.388236999512,'WGS84Fi':45.388236999512,'2':11.869201660156,'WGS84La':11.869201660156,'3':57,'Girometro':57,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'},{'0':845,'IdMezzo':845,'1':45.383277893066,'WGS84Fi':45.383277893066,'2':11.85662651062,'WGS84La':11.85662651062,'3':47,'Girometro':47,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':837,'IdMezzo':837,'1':45.399394989014,'WGS84Fi':45.399394989014,'2':11.877456665039,'WGS84La':11.877456665039,'3':295,'Girometro':295,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':880,'IdMezzo':880,'1':45.414321899414,'WGS84Fi':45.414321899414,'2':11.87543296814,'WGS84La':11.87543296814,'3':261,'Girometro':261,'4':1,'StatoPorte':1,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.389533996582,'WGS84Fi':45.389533996582,'2':11.870008468628,'WGS84La':11.870008468628,'3':251,'Girometro':251,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'}],
[{'0':814,'IdMezzo':814,'1':45.43616104126,'WGS84Fi':45.43616104126,'2':11.917216300964,'WGS84La':11.917216300964,'3':248,'Girometro':248,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':875,'IdMezzo':875,'1':45.43480682373,'WGS84Fi':45.43480682373,'2':11.916501998901,'WGS84La':11.916501998901,'3':68,'Girometro':68,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.388236999512,'WGS84Fi':45.388236999512,'2':11.869201660156,'WGS84La':11.869201660156,'3':57,'Girometro':57,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'},{'0':845,'IdMezzo':845,'1':45.383277893066,'WGS84Fi':45.383277893066,'2':11.85662651062,'WGS84La':11.85662651062,'3':47,'Girometro':47,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':837,'IdMezzo':837,'1':45.399394989014,'WGS84Fi':45.399394989014,'2':11.877456665039,'WGS84La':11.877456665039,'3':295,'Girometro':295,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.389533996582,'WGS84Fi':45.389533996582,'2':11.870008468628,'WGS84La':11.870008468628,'3':251,'Girometro':251,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':835,'IdMezzo':835,'1':45.420070648193,'WGS84Fi':45.420070648193,'2':11.878535270691,'WGS84La':11.878535270691,'3':301,'Girometro':301,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':880,'IdMezzo':880,'1':45.414321899414,'WGS84Fi':45.414321899414,'2':11.87543296814,'WGS84La':11.87543296814,'3':261,'Girometro':261,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}],
[{'0':875,'IdMezzo':875,'1':45.43480682373,'WGS84Fi':45.43480682373,'2':11.916501998901,'WGS84La':11.916501998901,'3':68,'Girometro':68,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':845,'IdMezzo':845,'1':45.383277893066,'WGS84Fi':45.383277893066,'2':11.85662651062,'WGS84La':11.85662651062,'3':47,'Girometro':47,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':837,'IdMezzo':837,'1':45.399394989014,'WGS84Fi':45.399394989014,'2':11.877456665039,'WGS84La':11.877456665039,'3':295,'Girometro':295,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.389533996582,'WGS84Fi':45.389533996582,'2':11.870008468628,'WGS84La':11.870008468628,'3':251,'Girometro':251,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':835,'IdMezzo':835,'1':45.420070648193,'WGS84Fi':45.420070648193,'2':11.878535270691,'WGS84La':11.878535270691,'3':301,'Girometro':301,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':880,'IdMezzo':880,'1':45.414321899414,'WGS84Fi':45.414321899414,'2':11.87543296814,'WGS84La':11.87543296814,'3':261,'Girometro':261,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':814,'IdMezzo':814,'1':45.434600830078,'WGS84Fi':45.434600830078,'2':11.9163646698,'WGS84La':11.9163646698,'3':250,'Girometro':250,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':805,'IdMezzo':805,'1':45.388549804688,'WGS84Fi':45.388549804688,'2':11.869462013245,'WGS84La':11.869462013245,'3':60,'Girometro':60,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'}],
[{'0':837,'IdMezzo':837,'1':45.399394989014,'WGS84Fi':45.399394989014,'2':11.877456665039,'WGS84La':11.877456665039,'3':295,'Girometro':295,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':835,'IdMezzo':835,'1':45.420070648193,'WGS84Fi':45.420070648193,'2':11.878535270691,'WGS84La':11.878535270691,'3':301,'Girometro':301,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':814,'IdMezzo':814,'1':45.434600830078,'WGS84Fi':45.434600830078,'2':11.9163646698,'WGS84La':11.9163646698,'3':250,'Girometro':250,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':805,'IdMezzo':805,'1':45.388549804688,'WGS84Fi':45.388549804688,'2':11.869462013245,'WGS84La':11.869462013245,'3':60,'Girometro':60,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'},{'0':880,'IdMezzo':880,'1':45.414321899414,'WGS84Fi':45.414321899414,'2':11.875240325928,'WGS84La':11.875240325928,'3':158,'Girometro':158,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':845,'IdMezzo':845,'1':45.383331298828,'WGS84Fi':45.383331298828,'2':11.856693267822,'WGS84La':11.856693267822,'3':44,'Girometro':44,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':875,'IdMezzo':875,'1':45.436855316162,'WGS84Fi':45.436855316162,'2':11.918021202087,'WGS84La':11.918021202087,'3':333,'Girometro':333,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.389385223389,'WGS84Fi':45.389385223389,'2':11.869937896729,'WGS84La':11.869937896729,'3':252,'Girometro':252,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'}],
[{'0':835,'IdMezzo':835,'1':45.420070648193,'WGS84Fi':45.420070648193,'2':11.878535270691,'WGS84La':11.878535270691,'3':301,'Girometro':301,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':880,'IdMezzo':880,'1':45.414321899414,'WGS84Fi':45.414321899414,'2':11.875240325928,'WGS84La':11.875240325928,'3':158,'Girometro':158,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':845,'IdMezzo':845,'1':45.383331298828,'WGS84Fi':45.383331298828,'2':11.856693267822,'WGS84La':11.856693267822,'3':44,'Girometro':44,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.388656616211,'WGS84Fi':45.388656616211,'2':11.86952495575,'WGS84La':11.86952495575,'3':57,'Girometro':57,'4':0,'StatoPorte':0},{'0':867,'IdMezzo':867,'1':45.389385223389,'WGS84Fi':45.389385223389,'2':11.869937896729,'WGS84La':11.869937896729,'3':252,'Girometro':252,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':837,'IdMezzo':837,'1':45.400428771973,'WGS84Fi':45.400428771973,'2':11.878483772278,'WGS84La':11.878483772278,'3':136,'Girometro':136,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':814,'IdMezzo':814,'1':45.434604644775,'WGS84Fi':45.434604644775,'2':11.915726661682,'WGS84La':11.915726661682,'3':302,'Girometro':302,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':875,'IdMezzo':875,'1':45.436767578125,'WGS84Fi':45.436767578125,'2':11.918292045593,'WGS84La':11.918292045593,'3':327,'Girometro':327,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}],
[{'0':867,'IdMezzo':867,'1':45.389148712158,'WGS84Fi':45.389148712158,'2':11.869828224182,'WGS84La':11.869828224182,'3':248,'Girometro':248,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':835,'IdMezzo':835,'1':45.417701721191,'WGS84Fi':45.417701721191,'2':11.877492904663,'WGS84La':11.877492904663,'3':239,'Girometro':239,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':814,'IdMezzo':814,'1':45.434677124023,'WGS84Fi':45.434677124023,'2':11.915403366089,'WGS84La':11.915403366089,'3':165,'Girometro':165,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':837,'IdMezzo':837,'1':45.400691986084,'WGS84Fi':45.400691986084,'2':11.877728462219,'WGS84La':11.877728462219,'3':264,'Girometro':264,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':875,'IdMezzo':875,'1':45.436218261719,'WGS84Fi':45.436218261719,'2':11.920274734497,'WGS84La':11.920274734497,'3':337,'Girometro':337,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':845,'IdMezzo':845,'1':45.38353729248,'WGS84Fi':45.38353729248,'2':11.856961250305,'WGS84La':11.856961250305,'3':45,'Girometro':45,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':880,'IdMezzo':880,'1':45.415065765381,'WGS84Fi':45.415065765381,'2':11.875378608704,'WGS84La':11.875378608704,'3':46,'Girometro':46,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.388919830322,'WGS84Fi':45.388919830322,'2':11.869794845581,'WGS84La':11.869794845581,'3':56,'Girometro':56,'4':0,'StatoPorte':0}],
[{'0':814,'IdMezzo':814,'1':45.434585571289,'WGS84Fi':45.434585571289,'2':11.913011550903,'WGS84La':11.913011550903,'3':282,'Girometro':282,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':875,'IdMezzo':875,'1':45.435214996338,'WGS84Fi':45.435214996338,'2':11.923852920532,'WGS84La':11.923852920532,'3':337,'Girometro':337,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':805,'IdMezzo':805,'1':45.389381408691,'WGS84Fi':45.389381408691,'2':11.870231628418,'WGS84La':11.870231628418,'3':56,'Girometro':56,'4':0,'StatoPorte':0},{'0':837,'IdMezzo':837,'1':45.402004241943,'WGS84Fi':45.402004241943,'2':11.876225471497,'WGS84La':11.876225471497,'3':105,'Girometro':105,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':880,'IdMezzo':880,'1':45.415065765381,'WGS84Fi':45.415065765381,'2':11.875378608704,'WGS84La':11.875378608704,'3':46,'Girometro':46,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':835,'IdMezzo':835,'1':45.416889190674,'WGS84Fi':45.416889190674,'2':11.876799583435,'WGS84La':11.876799583435,'3':259,'Girometro':259,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.38362121582,'WGS84Fi':45.38362121582,'2':11.857068061829,'WGS84La':11.857068061829,'3':46,'Girometro':46,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.387325286865,'WGS84Fi':45.387325286865,'2':11.867738723755,'WGS84La':11.867738723755,'3':223,'Girometro':223,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'}],
[{'0':867,'IdMezzo':867,'1':45.386985778809,'WGS84Fi':45.386985778809,'2':11.86462688446,'WGS84La':11.86462688446,'3':213,'Girometro':213,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':835,'IdMezzo':835,'1':45.416015625,'WGS84Fi':45.416015625,'2':11.875933647156,'WGS84La':11.875933647156,'3':253,'Girometro':253,'4':1,'StatoPorte':1,'capolinea':'Capolinea Mandria via Monselice'},{'0':814,'IdMezzo':814,'1':45.427108764648,'WGS84Fi':45.427108764648,'2':11.911319732666,'WGS84La':11.911319732666,'3':141,'Girometro':141,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.384609222412,'WGS84Fi':45.384609222412,'2':11.859356880188,'WGS84La':11.859356880188,'3':9,'Girometro':9,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':837,'IdMezzo':837,'1':45.406959533691,'WGS84Fi':45.406959533691,'2':11.878381729126,'WGS84La':11.878381729126,'3':63,'Girometro':63,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':880,'IdMezzo':880,'1':45.419609069824,'WGS84Fi':45.419609069824,'2':11.878816604614,'WGS84La':11.878816604614,'3':86,'Girometro':86,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.395442962646,'WGS84Fi':45.395442962646,'2':11.873013496399,'WGS84La':11.873013496399,'3':64,'Girometro':64,'4':0,'StatoPorte':0},{'0':875,'IdMezzo':875,'1':45.429515838623,'WGS84Fi':45.429515838623,'2':11.940871238708,'WGS84La':11.940871238708,'3':237,'Girometro':237,'4':1,'StatoPorte':1,'capolinea':'Capolinea Giarre Via Olmi'}],
[{'0':835,'IdMezzo':835,'1':45.413475036621,'WGS84Fi':45.413475036621,'2':11.87677192688,'WGS84La':11.87677192688,'3':315,'Girometro':315,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.384952545166,'WGS84Fi':45.384952545166,'2':11.861531257629,'WGS84La':11.861531257629,'3':18,'Girometro':18,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.397666931152,'WGS84Fi':45.397666931152,'2':11.874389648438,'WGS84La':11.874389648438,'3':64,'Girometro':64,'4':0,'StatoPorte':0},{'0':880,'IdMezzo':880,'1':45.421226501465,'WGS84Fi':45.421226501465,'2':11.881768226624,'WGS84La':11.881768226624,'3':38,'Girometro':38,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':814,'IdMezzo':814,'1':45.425819396973,'WGS84Fi':45.425819396973,'2':11.904188156128,'WGS84La':11.904188156128,'3':207,'Girometro':207,'4':1,'StatoPorte':1,'capolinea':'Capolinea Mandria via Monselice'},{'0':875,'IdMezzo':875,'1':45.431087493896,'WGS84Fi':45.431087493896,'2':11.938496589661,'WGS84La':11.938496589661,'3':153,'Girometro':153,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':867,'IdMezzo':867,'1':45.38353729248,'WGS84Fi':45.38353729248,'2':11.856860160828,'WGS84La':11.856860160828,'3':257,'Girometro':257,'4':1,'StatoPorte':1,'capolinea':'Capolinea Mandria via Monselice'},{'0':837,'IdMezzo':837,'1':45.408966064453,'WGS84Fi':45.408966064453,'2':11.878510475159,'WGS84La':11.878510475159,'3':90,'Girometro':90,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}],
[{'0':814,'IdMezzo':814,'1':45.425636291504,'WGS84Fi':45.425636291504,'2':11.903347969055,'WGS84La':11.903347969055,'3':196,'Girometro':196,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':867,'IdMezzo':867,'1':45.383045196533,'WGS84Fi':45.383045196533,'2':11.856253623962,'WGS84La':11.856253623962,'3':228,'Girometro':228,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':875,'IdMezzo':875,'1':45.433494567871,'WGS84Fi':45.433494567871,'2':11.93479347229,'WGS84La':11.93479347229,'3':133,'Girometro':133,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':805,'IdMezzo':805,'1':45.396858215332,'WGS84Fi':45.396858215332,'2':11.878631591797,'WGS84La':11.878631591797,'3':0,'Girometro':0,'4':0,'StatoPorte':0},{'0':837,'IdMezzo':837,'1':45.411224365234,'WGS84Fi':45.411224365234,'2':11.878423690796,'WGS84La':11.878423690796,'3':79,'Girometro':79,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':845,'IdMezzo':845,'1':45.385124206543,'WGS84Fi':45.385124206543,'2':11.862114906311,'WGS84La':11.862114906311,'3':18,'Girometro':18,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':880,'IdMezzo':880,'1':45.422401428223,'WGS84Fi':45.422401428223,'2':11.883284568787,'WGS84La':11.883284568787,'3':43,'Girometro':43,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':835,'IdMezzo':835,'1':45.411281585693,'WGS84Fi':45.411281585693,'2':11.876828193665,'WGS84La':11.876828193665,'3':248,'Girometro':248,'4':1,'StatoPorte':1,'capolinea':'Capolinea Mandria via Monselice'}],
[{'0':867,'IdMezzo':867,'1':45.379734039307,'WGS84Fi':45.379734039307,'2':11.852473258972,'WGS84La':11.852473258972,'3':233,'Girometro':233,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':875,'IdMezzo':875,'1':45.434181213379,'WGS84Fi':45.434181213379,'2':11.929717063904,'WGS84La':11.929717063904,'3':180,'Girometro':180,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':805,'IdMezzo':805,'1':45.400619506836,'WGS84Fi':45.400619506836,'2':11.877996444702,'WGS84La':11.877996444702,'3':157,'Girometro':157,'4':0,'StatoPorte':0},{'0':837,'IdMezzo':837,'1':45.412315368652,'WGS84Fi':45.412315368652,'2':11.878714561462,'WGS84La':11.878714561462,'3':80,'Girometro':80,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':845,'IdMezzo':845,'1':45.385906219482,'WGS84Fi':45.385906219482,'2':11.865258216858,'WGS84La':11.865258216858,'3':23,'Girometro':23,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':814,'IdMezzo':814,'1':45.425201416016,'WGS84Fi':45.425201416016,'2':11.898171424866,'WGS84La':11.898171424866,'3':185,'Girometro':185,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':880,'IdMezzo':880,'1':45.42456817627,'WGS84Fi':45.42456817627,'2':11.885021209717,'WGS84La':11.885021209717,'3':65,'Girometro':65,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':835,'IdMezzo':835,'1':45.410335540771,'WGS84Fi':45.410335540771,'2':11.878281593323,'WGS84La':11.878281593323,'3':302,'Girometro':302,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'}],
[{'0':814,'IdMezzo':814,'1':45.424877166748,'WGS84Fi':45.424877166748,'2':11.897101402283,'WGS84La':11.897101402283,'3':212,'Girometro':212,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':835,'IdMezzo':835,'1':45.40922164917,'WGS84Fi':45.40922164917,'2':11.878524780273,'WGS84La':11.878524780273,'3':294,'Girometro':294,'4':1,'StatoPorte':1,'capolinea':'Capolinea Mandria via Monselice'},{'0':867,'IdMezzo':867,'1':45.374660491943,'WGS84Fi':45.374660491943,'2':11.846924781799,'WGS84La':11.846924781799,'3':235,'Girometro':235,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.386692047119,'WGS84Fi':45.386692047119,'2':11.866664886475,'WGS84La':11.866664886475,'3':27,'Girometro':27,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':875,'IdMezzo':875,'1':45.435863494873,'WGS84Fi':45.435863494873,'2':11.921718597412,'WGS84La':11.921718597412,'3':159,'Girometro':159,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':880,'IdMezzo':880,'1':45.42456817627,'WGS84Fi':45.42456817627,'2':11.885021209717,'WGS84La':11.885021209717,'3':65,'Girometro':65,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.404693603516,'WGS84Fi':45.404693603516,'2':11.87693977356,'WGS84La':11.87693977356,'3':70,'Girometro':70,'4':0,'StatoPorte':0},{'0':837,'IdMezzo':837,'1':45.414276123047,'WGS84Fi':45.414276123047,'2':11.87553691864,'WGS84La':11.87553691864,'3':139,'Girometro':139,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}],
[{'0':814,'IdMezzo':814,'1':45.423728942871,'WGS84Fi':45.423728942871,'2':11.890828132629,'WGS84La':11.890828132629,'3':172,'Girometro':172,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':867,'IdMezzo':867,'1':45.371608734131,'WGS84Fi':45.371608734131,'2':11.842994689941,'WGS84La':11.842994689941,'3':223,'Girometro':223,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.38697052002,'WGS84Fi':45.38697052002,'2':11.867416381836,'WGS84La':11.867416381836,'3':34,'Girometro':34,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':875,'IdMezzo':875,'1':45.436958312988,'WGS84Fi':45.436958312988,'2':11.91771697998,'WGS84La':11.91771697998,'3':182,'Girometro':182,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':837,'IdMezzo':837,'1':45.414413452148,'WGS84Fi':45.414413452148,'2':11.874998092651,'WGS84La':11.874998092651,'3':280,'Girometro':280,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':880,'IdMezzo':880,'1':45.423709869385,'WGS84Fi':45.423709869385,'2':11.890818595886,'WGS84La':11.890818595886,'3':352,'Girometro':352,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':835,'IdMezzo':835,'1':45.407119750977,'WGS84Fi':45.407119750977,'2':11.878273010254,'WGS84La':11.878273010254,'3':124,'Girometro':124,'4':1,'StatoPorte':1,'capolinea':'Capolinea Mandria via Monselice'},{'0':805,'IdMezzo':805,'1':45.406734466553,'WGS84Fi':45.406734466553,'2':11.878041267395,'WGS84La':11.878041267395,'3':59,'Girometro':59,'4':1,'StatoPorte':1}],
[{'0':835,'IdMezzo':835,'1':45.406368255615,'WGS84Fi':45.406368255615,'2':11.877844810486,'WGS84La':11.877844810486,'3':255,'Girometro':255,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.389205932617,'WGS84Fi':45.389205932617,'2':11.870028495789,'WGS84La':11.870028495789,'3':57,'Girometro':57,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.369575500488,'WGS84Fi':45.369575500488,'2':11.837836265564,'WGS84La':11.837836265564,'3':197,'Girometro':197,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':880,'IdMezzo':880,'1':45.423843383789,'WGS84Fi':45.423843383789,'2':11.893441200256,'WGS84La':11.893441200256,'3':18,'Girometro':18,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':814,'IdMezzo':814,'1':45.42419052124,'WGS84Fi':45.42419052124,'2':11.884586334229,'WGS84La':11.884586334229,'3':294,'Girometro':294,'4':1,'StatoPorte':1,'capolinea':'Capolinea Mandria via Monselice'},{'0':875,'IdMezzo':875,'1':45.434711456299,'WGS84Fi':45.434711456299,'2':11.915004730225,'WGS84La':11.915004730225,'3':186,'Girometro':186,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':805,'IdMezzo':805,'1':45.408779144287,'WGS84Fi':45.408779144287,'2':11.878486633301,'WGS84La':11.878486633301,'3':316,'Girometro':316,'4':1,'StatoPorte':1},{'0':837,'IdMezzo':837,'1':45.416065216064,'WGS84Fi':45.416065216064,'2':11.87646484375,'WGS84La':11.87646484375,'3':55,'Girometro':55,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}],
[{'0':835,'IdMezzo':835,'1':45.406368255615,'WGS84Fi':45.406368255615,'2':11.877844810486,'WGS84La':11.877844810486,'3':255,'Girometro':255,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.390480041504,'WGS84Fi':45.390480041504,'2':11.871146202087,'WGS84La':11.871146202087,'3':57,'Girometro':57,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':875,'IdMezzo':875,'1':45.433536529541,'WGS84Fi':45.433536529541,'2':11.914016723633,'WGS84La':11.914016723633,'3':301,'Girometro':301,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':805,'IdMezzo':805,'1':45.409698486328,'WGS84Fi':45.409698486328,'2':11.87851524353,'WGS84La':11.87851524353,'3':88,'Girometro':88,'4':0,'StatoPorte':0},{'0':867,'IdMezzo':867,'1':45.368709564209,'WGS84Fi':45.368709564209,'2':11.833992004395,'WGS84La':11.833992004395,'3':199,'Girometro':199,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':837,'IdMezzo':837,'1':45.416885375977,'WGS84Fi':45.416885375977,'2':11.877070426941,'WGS84La':11.877070426941,'3':18,'Girometro':18,'4':1,'StatoPorte':1,'capolinea':'Capolinea Torre'},{'0':814,'IdMezzo':814,'1':45.423042297363,'WGS84Fi':45.423042297363,'2':11.88371181488,'WGS84La':11.88371181488,'3':243,'Girometro':243,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':880,'IdMezzo':880,'1':45.424514770508,'WGS84Fi':45.424514770508,'2':11.896111488342,'WGS84La':11.896111488342,'3':27,'Girometro':27,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}],
[{'0':814,'IdMezzo':814,'1':45.423042297363,'WGS84Fi':45.423042297363,'2':11.88371181488,'WGS84La':11.88371181488,'3':243,'Girometro':243,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':880,'IdMezzo':880,'1':45.425060272217,'WGS84Fi':45.425060272217,'2':11.897468566895,'WGS84La':11.897468566895,'3':33,'Girometro':33,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':875,'IdMezzo':875,'1':45.428997039795,'WGS84Fi':45.428997039795,'2':11.914304733276,'WGS84La':11.914304733276,'3':281,'Girometro':281,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':835,'IdMezzo':835,'1':45.405014038086,'WGS84Fi':45.405014038086,'2':11.876858711243,'WGS84La':11.876858711243,'3':248,'Girometro':248,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':837,'IdMezzo':837,'1':45.416885375977,'WGS84Fi':45.416885375977,'2':11.877070426941,'WGS84La':11.877070426941,'3':18,'Girometro':18,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.368118286133,'WGS84Fi':45.368118286133,'2':11.831279754639,'WGS84La':11.831279754639,'3':198,'Girometro':198,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.390960693359,'WGS84Fi':45.390960693359,'2':11.871741294861,'WGS84La':11.871741294861,'3':36,'Girometro':36,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.411365509033,'WGS84Fi':45.411365509033,'2':11.878443717957,'WGS84La':11.878443717957,'3':80,'Girometro':80,'4':0,'StatoPorte':0}],
[{'0':875,'IdMezzo':875,'1':45.427635192871,'WGS84Fi':45.427635192871,'2':11.913996696472,'WGS84La':11.913996696472,'3':260,'Girometro':260,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':805,'IdMezzo':805,'1':45.412094116211,'WGS84Fi':45.412094116211,'2':11.878644943237,'WGS84La':11.878644943237,'3':77,'Girometro':77,'4':0,'StatoPorte':0},{'0':837,'IdMezzo':837,'1':45.418342590332,'WGS84Fi':45.418342590332,'2':11.878401756287,'WGS84La':11.878401756287,'3':54,'Girometro':54,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':880,'IdMezzo':880,'1':45.425151824951,'WGS84Fi':45.425151824951,'2':11.898648262024,'WGS84La':11.898648262024,'3':356,'Girometro':356,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.368835449219,'WGS84Fi':45.368835449219,'2':11.830869674683,'WGS84La':11.830869674683,'3':82,'Girometro':82,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':835,'IdMezzo':835,'1':45.401653289795,'WGS84Fi':45.401653289795,'2':11.876408576965,'WGS84La':11.876408576965,'3':294,'Girometro':294,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.392143249512,'WGS84Fi':45.392143249512,'2':11.871069908142,'WGS84La':11.871069908142,'3':80,'Girometro':80,'4':1,'StatoPorte':1,'capolinea':'Capolinea Torre'},{'0':814,'IdMezzo':814,'1':45.422943115234,'WGS84Fi':45.422943115234,'2':11.883661270142,'WGS84La':11.883661270142,'3':239,'Girometro':239,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'}],
[{'0':814,'IdMezzo':814,'1':45.42191696167,'WGS84Fi':45.42191696167,'2':11.882615089417,'WGS84La':11.882615089417,'3':231,'Girometro':231,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':835,'IdMezzo':835,'1':45.400344848633,'WGS84Fi':45.400344848633,'2':11.878463745117,'WGS84La':11.878463745117,'3':300,'Girometro':300,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':837,'IdMezzo':837,'1':45.420398712158,'WGS84Fi':45.420398712158,'2':11.880181312561,'WGS84La':11.880181312561,'3':29,'Girometro':29,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':880,'IdMezzo':880,'1':45.42573928833,'WGS84Fi':45.42573928833,'2':11.904293060303,'WGS84La':11.904293060303,'3':13,'Girometro':13,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':875,'IdMezzo':875,'1':45.427101135254,'WGS84Fi':45.427101135254,'2':11.910104751587,'WGS84La':11.910104751587,'3':195,'Girometro':195,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':845,'IdMezzo':845,'1':45.39249420166,'WGS84Fi':45.39249420166,'2':11.871154785156,'WGS84La':11.871154785156,'3':77,'Girometro':77,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.370708465576,'WGS84Fi':45.370708465576,'2':11.831812858582,'WGS84La':11.831812858582,'3':286,'Girometro':286,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.414386749268,'WGS84Fi':45.414386749268,'2':11.87543296814,'WGS84La':11.87543296814,'3':130,'Girometro':130,'4':0,'StatoPorte':0}],
[{'0':805,'IdMezzo':805,'1':45.414463043213,'WGS84Fi':45.414463043213,'2':11.875088691711,'WGS84La':11.875088691711,'3':233,'Girometro':233,'4':0,'StatoPorte':0},{'0':837,'IdMezzo':837,'1':45.421276092529,'WGS84Fi':45.421276092529,'2':11.882029533386,'WGS84La':11.882029533386,'3':38,'Girometro':38,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':875,'IdMezzo':875,'1':45.426425933838,'WGS84Fi':45.426425933838,'2':11.908160209656,'WGS84La':11.908160209656,'3':234,'Girometro':234,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':880,'IdMezzo':880,'1':45.426040649414,'WGS84Fi':45.426040649414,'2':11.906901359558,'WGS84La':11.906901359558,'3':355,'Girometro':355,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':814,'IdMezzo':814,'1':45.420963287354,'WGS84Fi':45.420963287354,'2':11.880981445312,'WGS84La':11.880981445312,'3':215,'Girometro':215,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.395496368408,'WGS84Fi':45.395496368408,'2':11.872955322266,'WGS84La':11.872955322266,'3':69,'Girometro':69,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':835,'IdMezzo':835,'1':45.397514343262,'WGS84Fi':45.397514343262,'2':11.87842464447,'WGS84La':11.87842464447,'3':291,'Girometro':291,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':867,'IdMezzo':867,'1':45.368686676025,'WGS84Fi':45.368686676025,'2':11.830775260925,'WGS84La':11.830775260925,'3':267,'Girometro':267,'4':1,'StatoPorte':1,'capolinea':'Capolinea Torre'}],
[{'0':814,'IdMezzo':814,'1':45.420356750488,'WGS84Fi':45.420356750488,'2':11.879591941833,'WGS84La':11.879591941833,'3':194,'Girometro':194,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':875,'IdMezzo':875,'1':45.425243377686,'WGS84Fi':45.425243377686,'2':11.900855064392,'WGS84La':11.900855064392,'3':184,'Girometro':184,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':867,'IdMezzo':867,'1':45.368156433105,'WGS84Fi':45.368156433105,'2':11.830556869507,'WGS84La':11.830556869507,'3':255,'Girometro':255,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':837,'IdMezzo':837,'1':45.424633026123,'WGS84Fi':45.424633026123,'2':11.885098457336,'WGS84La':11.885098457336,'3':65,'Girometro':65,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':880,'IdMezzo':880,'1':45.427024841309,'WGS84Fi':45.427024841309,'2':11.909913063049,'WGS84La':11.909913063049,'3':18,'Girometro':18,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.416053771973,'WGS84Fi':45.416053771973,'2':11.876558303833,'WGS84La':11.876558303833,'3':51,'Girometro':51,'4':0,'StatoPorte':0},{'0':845,'IdMezzo':845,'1':45.397495269775,'WGS84Fi':45.397495269775,'2':11.874231338501,'WGS84La':11.874231338501,'3':311,'Girometro':311,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':835,'IdMezzo':835,'1':45.397827148438,'WGS84Fi':45.397827148438,'2':11.87478351593,'WGS84La':11.87478351593,'3':155,'Girometro':155,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'}],
[{'0':875,'IdMezzo':875,'1':45.425220489502,'WGS84Fi':45.425220489502,'2':11.897508621216,'WGS84La':11.897508621216,'3':222,'Girometro':222,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':805,'IdMezzo':805,'1':45.416976928711,'WGS84Fi':45.416976928711,'2':11.877367019653,'WGS84La':11.877367019653,'3':61,'Girometro':61,'4':0,'StatoPorte':0},{'0':837,'IdMezzo':837,'1':45.423927307129,'WGS84Fi':45.423927307129,'2':11.888765335083,'WGS84La':11.888765335083,'3':351,'Girometro':351,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':845,'IdMezzo':845,'1':45.397731781006,'WGS84Fi':45.397731781006,'2':11.874366760254,'WGS84La':11.874366760254,'3':47,'Girometro':47,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.368209838867,'WGS84Fi':45.368209838867,'2':11.832081794739,'WGS84La':11.832081794739,'3':17,'Girometro':17,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':835,'IdMezzo':835,'1':45.397109985352,'WGS84Fi':45.397109985352,'2':11.873925209045,'WGS84La':11.873925209045,'3':240,'Girometro':240,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':814,'IdMezzo':814,'1':45.414875030518,'WGS84Fi':45.414875030518,'2':11.874931335449,'WGS84La':11.874931335449,'3':236,'Girometro':236,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':880,'IdMezzo':880,'1':45.42712020874,'WGS84Fi':45.42712020874,'2':11.913945198059,'WGS84La':11.913945198059,'3':292,'Girometro':292,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}],
[{'0':814,'IdMezzo':814,'1':45.414813995361,'WGS84Fi':45.414813995361,'2':11.874758720398,'WGS84La':11.874758720398,'3':223,'Girometro':223,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':835,'IdMezzo':835,'1':45.395191192627,'WGS84Fi':45.395191192627,'2':11.872590065002,'WGS84La':11.872590065002,'3':240,'Girometro':240,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':875,'IdMezzo':875,'1':45.423686981201,'WGS84Fi':45.423686981201,'2':11.892221450806,'WGS84La':11.892221450806,'3':187,'Girometro':187,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':867,'IdMezzo':867,'1':45.369564056396,'WGS84Fi':45.369564056396,'2':11.838317871094,'WGS84La':11.838317871094,'3':17,'Girometro':17,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.417484283447,'WGS84Fi':45.417484283447,'2':11.879088401794,'WGS84La':11.879088401794,'3':341,'Girometro':341,'4':0,'StatoPorte':0},{'0':880,'IdMezzo':880,'1':45.428802490234,'WGS84Fi':45.428802490234,'2':11.9144115448,'WGS84La':11.9144115448,'3':92,'Girometro':92,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':845,'IdMezzo':845,'1':45.396873474121,'WGS84Fi':45.396873474121,'2':11.878600120544,'WGS84La':11.878600120544,'3':333,'Girometro':333,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':837,'IdMezzo':837,'1':45.424495697021,'WGS84Fi':45.424495697021,'2':11.896004676819,'WGS84La':11.896004676819,'3':336,'Girometro':336,'4':1,'StatoPorte':1,'capolinea':'Capolinea Torre'}],
[{'0':805,'IdMezzo':805,'1':45.416721343994,'WGS84Fi':45.416721343994,'2':11.87973690033,'WGS84La':11.87973690033,'3':326,'Girometro':326,'4':0,'StatoPorte':0},{'0':835,'IdMezzo':835,'1':45.392154693604,'WGS84Fi':45.392154693604,'2':11.870781898499,'WGS84La':11.870781898499,'3':269,'Girometro':269,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':814,'IdMezzo':814,'1':45.41329574585,'WGS84Fi':45.41329574585,'2':11.877075195312,'WGS84La':11.877075195312,'3':313,'Girometro':313,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.398445129395,'WGS84Fi':45.398445129395,'2':11.878040313721,'WGS84La':11.878040313721,'3':110,'Girometro':110,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':880,'IdMezzo':880,'1':45.433258056641,'WGS84Fi':45.433258056641,'2':11.915820121765,'WGS84La':11.915820121765,'3':72,'Girometro':72,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.37239074707,'WGS84Fi':45.37239074707,'2':11.84428024292,'WGS84La':11.84428024292,'3':46,'Girometro':46,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':875,'IdMezzo':875,'1':45.424434661865,'WGS84Fi':45.424434661865,'2':11.886651992798,'WGS84La':11.886651992798,'3':155,'Girometro':155,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':837,'IdMezzo':837,'1':45.425163269043,'WGS84Fi':45.425163269043,'2':11.898414611816,'WGS84La':11.898414611816,'3':296,'Girometro':296,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}],
[{'0':880,'IdMezzo':880,'1':45.433990478516,'WGS84Fi':45.433990478516,'2':11.916083335876,'WGS84La':11.916083335876,'3':75,'Girometro':75,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':867,'IdMezzo':867,'1':45.37548828125,'WGS84Fi':45.37548828125,'2':11.847896575928,'WGS84La':11.847896575928,'3':54,'Girometro':54,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':805,'IdMezzo':805,'1':45.415977478027,'WGS84Fi':45.415977478027,'2':11.882206916809,'WGS84La':11.882206916809,'3':17,'Girometro':17,'4':0,'StatoPorte':0},{'0':837,'IdMezzo':837,'1':45.425231933594,'WGS84Fi':45.425231933594,'2':11.901452064514,'WGS84La':11.901452064514,'3':14,'Girometro':14,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},{'0':875,'IdMezzo':875,'1':45.424133300781,'WGS84Fi':45.424133300781,'2':11.884558677673,'WGS84La':11.884558677673,'3':246,'Girometro':246,'4':0,'StatoPorte':0,'capolinea':'Capolinea Giarre Via Olmi'},{'0':835,'IdMezzo':835,'1':45.391250610352,'WGS84Fi':45.391250610352,'2':11.870534896851,'WGS84La':11.870534896851,'3':260,'Girometro':260,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':814,'IdMezzo':814,'1':45.410614013672,'WGS84Fi':45.410614013672,'2':11.877920150757,'WGS84La':11.877920150757,'3':322,'Girometro':322,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},{'0':845,'IdMezzo':845,'1':45.4006690979,'WGS84Fi':45.4006690979,'2':11.877795219421,'WGS84La':11.877795219421,'3':239,'Girometro':239,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}]
];

var index=0;
var repeat=function(){
    mapChartFlow.updateMovie(data[index]);
    console.log('map index:'+index);
    index++;
    if (index>30){
        index=0;
    }
};

var myVar=setInterval(function () {repeat();}, 5000);

/////////////////////////////////////////////////
//TEST LINE CHART
/////////////////////////////////////////////////
var lineChart=page1.createLineChart({
    ID: 'line1',
    title: 'LINEE',
    height: 600,
    width: 1000,
    enableLegend: true,
    legend: {
        position: 'NE',
    },
    xAxis:{
        name: 'tempo',
        color: '#000000'
        //ecc
    },
    yAxis:{
        name: 'temperatura',
        color: '#000000'
        //ecc
    },
    backGroundColor: '#FFFFFF',
    viewFinder: true,
    horizontalGrid: true,
    verticalGrid: true,
    legendOnPoint: true,
    scale: 'linear'
});
console.log('Grafico inserito: '+lineChart);

var lineData=[
    {'tempo': 1, 'temperatura': 25},
    {'tempo': 2, 'temperatura': 20},
    {'tempo': 3, 'temperatura': 15},
    {'tempo': 4, 'temperatura': 10},
    {'tempo': 5, 'temperatura': 5},
    {'tempo': 6, 'temperatura': 10},
    {'tempo': 7, 'temperatura': 21},
    {'tempo': 8, 'temperatura': 18},
    {'tempo': 9, 'temperatura': 10},
    {'tempo': 10, 'temperatura': 0},
    {'tempo': 11, 'temperatura': 6},
    {'tempo': 12, 'temperatura': 19}
];

var lineChartFlow;

var index2=0;
var repeatLine=function(){
    if (index2===0){
        lineChartFlow=lineChart.createLineChartFlow({
            ID:'flow1',
            name: 'grafico tempo-temperatura',
            xKey: 'tempo',
            yKey: 'temperatura',
            //other stuff
        });
    }
    console.log('lineChart index: '+index2);
    index2++;
    if (index2>=12){
        index2=0;
        lineChart.deleteAllFlows();
    }else{
        lineChartFlow.addRecord(lineData[index2-1]);
    }
};

var myVar2=setInterval(function () {repeatLine();}, 5000);

/////////////////////////////////////////////////
//TEST BAR CHART
/////////////////////////////////////////////////
var barChart=page1.createBarChart({
    ID: 'bar1',
    title: 'BARRE',
    height: 600,
    width: 1000,
    enableLegend: true,
    legend: {
        position: 'NE',
    },
    xAxis:{
        name: 'tempo',
        color: '#000000'
        //ecc
    },
    yAxis:{
        name: 'pressione',
        color: '#000000'
        //ecc
    },
    backGroundColor: '#FFFFFF',
    viewFinder: true,
    grid: true,
    legendOnPoint: true,
    //ecc
    
});
console.log('Grafico inserito: '+barChart);

var barChartFlow1;
var barChartFlow2;

var index3=0;
var repeatBar=function(){
    if (index3===0){
        barChartFlow1=barChart.createBarChartFlow({
                ID:'flow1',
                name: 'grafico tempo-pressione',
                indexKey: 'tempo',
                valueKey: 'pressione',
            },[
                {tempo: 1, pressione: 3},
                {tempo: 2, pressione: 10},
                {tempo: 3, pressione: 1},
                {tempo: 4, pressione: 5},
                {tempo: 5, pressione: 7}
            ]
        );
        barChartFlow2=barChart.createBarChartFlow({
                ID:'flow2',
                name: 'grafico tempo-umidita',
                indexKey: 'tempo',
                valueKey: 'pressione',
            },[
                {tempo: 1, umidita: 7},
                {tempo: 2, umidita: 20},
                {tempo: 3, umidita: 10},
                {tempo: 4, umidita: 2},
                {tempo: 5, umidita: 4}
            ]
        );
    }
    console.log('barchart index: '+index3);
    index3++;
    if (index3>=4){
        index3=0;
        barChart.deleteAllFlows();
    }else{
        barChartFlow1.updateRecord(index3, {tempo: index3, umidita: index3});
    }
};

var myVar3=setInterval(function () {repeatBar();}, 5000);



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