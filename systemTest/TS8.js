/*jshint node: true, -W106 */
'use strict';

/*
* Name : TS8.js
* Module : TS8
* Location : /systemTest
*
* Requirements tested:
*	FBOB3.2.3 			Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati del map chart.
*	FBOB3.2.3.1 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati del map chart con il metodo di aggiornamento in place.
*	FBDE3.2.3.2 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati del map chart con il metodo di aggiornamento stream.
*	FBOB3.2.3.3 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati del map chart con il metodo di aggiornamento movie.*
*
* <<Requirements into brackets are not satisfied>>
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-06-29   Filippo Rampado    Initial code
* =========================================================
*/

var TS=function(mapChart){
	var mapChartFlow1=mapChart.createMapChartFlow({
	    ID:'flow1',
	    name: 'linea 1',
	    marker:{
			'type': 'shape',
	        'shape': 'bus'
	    },
	    latitudeKey: '1',
	    longitudeKey: '2',
	    objectKey: '0',
	    //filters:'IdMezzo>806',
	    maxItems: 10
	});
	var mapChartFlow2=mapChart.createMapChartFlow({
	    ID:'flow1',
	    name: 'linea 2',
	    marker:{
			'type': 'shape',
	        'shape': 'square'
	    },
	    latitudeKey: '1',
	    longitudeKey: '2',
	    objectKey: '0',
	    //filters:'IdMezzo>806',
	    maxItems: 10
	});
	mapChartFlow1.updateMovie([
		{'0':875,'IdMezzo':875,'1':45.42533493042,'WGS84Fi':45.42533493042,'2':11.902134895325,'WGS84La':11.902134895325,'3':14,'Girometro':14,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},
		{'0':805,'IdMezzo':805,'1':45.385223388672,'WGS84Fi':45.385223388672,'2':11.862413406372,'WGS84La':11.862413406372,'3':14,'Girometro':14,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'},
		{'0':867,'IdMezzo':867,'1':45.390911102295,'WGS84Fi':45.390911102295,'2':11.870438575745,'WGS84La':11.870438575745,'3':266,'Girometro':266,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},
		{'0':835,'IdMezzo':835,'1':45.424865722656,'WGS84Fi':45.424865722656,'2':11.885174751282,'WGS84La':11.885174751282,'3':188,'Girometro':188,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'}
	]);
	mapChartFlow2.updateMovie([
		{'0':814,'IdMezzo':814,'1':45.429698944092,'WGS84Fi':45.429698944092,'2':11.940545082092,'WGS84La':11.940545082092,'3':132,'Girometro':132,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},
		{'0':845,'IdMezzo':845,'1':45.381771087646,'WGS84Fi':45.381771087646,'2':11.854724884033,'WGS84La':11.854724884033,'3':51,'Girometro':51,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},
		{'0':880,'IdMezzo':880,'1':45.40881729126,'WGS84Fi':45.40881729126,'2':11.878475189209,'WGS84La':11.878475189209,'3':45,'Girometro':45,'4':1,'StatoPorte':1,'capolinea':'Capolinea Torre'},
		{'0':837,'IdMezzo':837,'1':45.392189025879,'WGS84Fi':45.392189025879,'2':11.87103843689,'WGS84La':11.87103843689,'3':80,'Girometro':80,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}
	]);


	//TO BE CONTINUED
};

module.exports=TS;