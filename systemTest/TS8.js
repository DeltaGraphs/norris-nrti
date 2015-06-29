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
*	FBOB3.2.3.3 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati del map chart con il metodo di aggiornamento movie.
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
	    name: 'Place',
	    marker:{
			'type': 'shape',
	        'shape': 'bus'
	    },
	    latitudeKey: '1',
	    longitudeKey: '2',
	    objectKey: '0',
	    //filters:'IdMezzo>806',
	    maxItemsSaved: 5
	});
	mapChart.createMapChartFlow({
	    ID:'flow2',
	    name: 'Stream',
	    marker:{
			'type': 'shape',
	        'shape': 'square'
	    },
	    latitudeKey: '1',
	    longitudeKey: '2',
	    objectKey: '0',
	    //filters:'IdMezzo>806',
	    maxItemsSaved: 5
	});
	mapChart.createMapChartFlow({
	    ID:'flow3',
	    name: 'Movie',
	    marker:{
			'type': 'shape',
	        'shape': 'diamond'
	    },
	    latitudeKey: '1',
	    longitudeKey: '2',
	    objectKey: '0',
	    //filters:'IdMezzo>806',
	    maxItemsSaved: 5
	});
	var IDs=mapChartFlow1.updateMovie([
		{'0':875,'1':45.42533493042,'2':11.902134895325},
		{'0':875,'1':45.43533493042,'2':11.902134895325},
		{'0':875,'1':45.41533493042,'2':11.902134895325},
		{'0':875,'1':45.41933493042,'2':11.902134895325},
		{'0':875,'1':45.42233493042,'2':11.902134895325}
	]);
	

	var index=0;
	var repeat=function(){
		if (index>=5){
			index=0;
		}
		mapChart.updateRecord('flow1', IDs[index], {'0':875,'1':45.41+(Math.random() * 0.01),'2':11.9+(Math.random() * 0.01)});
		mapChart.addRecord('flow2', {'0':875,'1':45.44+(Math.random() * 0.01),'2':11.93+(Math.random() * 0.01)});
		mapChart.updateMovie('flow3',[
			{'0':875,'1':45.4+(Math.random() * 0.1),'2':11.92+(Math.random() * 0.1)},
			{'0':875,'1':45.4+(Math.random() * 0.1),'2':11.92+(Math.random() * 0.1)},
			{'0':875,'1':45.4+(Math.random() * 0.1),'2':11.92+(Math.random() * 0.1)},
			{'0':875,'1':45.4+(Math.random() * 0.1),'2':11.92+(Math.random() * 0.1)},
			{'0':875,'1':45.4+(Math.random() * 0.1),'2':11.92+(Math.random() * 0.1)}
		]);
		index++;
	};
	setInterval(function () {repeat();}, 5000);

};

module.exports=TS;