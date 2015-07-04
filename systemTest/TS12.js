/*jshint node: true, -W106 */
'use strict';

/*
* Name : TS12.js
* Module : TS12
* Location : /systemTest
*
* Requirements tested:
*	FBDE3.3.7 			Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i parametri di un map chart.
*	FBDE3.3.7.1 		Il framework deve consentire all'utente sviluppatore di aggiornare il punto centrale del map chart.
*	FBDE3.3.7.2 		Il framework deve consentire all'utente sviluppatore di aggiornare la scala del map chart.
*	FBDE3.3.7.3 		Il framework deve consentire all'utente sviluppatore di modificare il tipo della mappa del map chart. 
*	FBDE3.3.7.4 		Il framework deve consentire all'utente sviluppatore di modificare la possibilità di zoomare nel map chart.
*	FBDE3.3.7.5 		Il framework deve consentire all'utente sviluppatore di modificare la possibilità di effettuare il trascinamento nel map chart.
*	FBDE3.3.7.6 		Il framework deve consentire all'utente sviluppatore di modificare le impostazioni della griglia nel map chart.
*	(FBDE3.3.7.6.1) 	Il framework deve permettere all'utente sviluppatore di abilitare la griglia orizzontale del map chart.
*	(FBDE3.3.7.6.2)		Il framework deve permettere all'utente sviluppatore di abilitare la griglia verticale del map chart.
*	FBDE3.3.7.6.3	 	Il framework deve permettere all'utente sviluppatore di disabilitare la griglia orizzontale del map chart.
*	FBDE3.3.7.6.4		Il framework deve permettere all'utente sviluppatore di disabilitare la griglia verticale del map chart.
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
	    name: 'Linea 22',
	    marker:{
			'type': 'shape',
	        'shape': 'triangle'
	    },
	    latitudeKey: '1',
	    longitudeKey: '2',
	    objectKey: '0',
	    maxItemsSaved: 5
	});
	mapChartFlow1.updateMovie([
		{'0':875,'1':45.42533493042,'2':11.902134895325},
		{'0':875,'1':45.43533493042,'2':11.902134895325},
		{'0':875,'1':45.41533493042,'2':11.902134895325},
		{'0':875,'1':45.41933493042,'2':11.902134895325},
		{'0':875,'1':45.42233493042,'2':11.902134895325}
	]);
	

	var change=true;
    var repeat=function(){
	    if (change){
	    	mapChart.updateProperties({
				latitude: 45.42533493042,
				longitude: 11.902134895325,
				mapType: 'roadmap',
				mapWidth: 2000,
				mapHeight: 2000,
			});
			mapChartFlow1.updateMovie([
				{'0':875,'1':45.42533493042,'2':11.902134895325},
				{'0':875,'1':45.43533493042,'2':11.902134895325},
				{'0':875,'1':45.41533493042,'2':11.902134895325},
				{'0':875,'1':45.41933493042,'2':11.902134895325},
				{'0':875,'1':45.42233493042,'2':11.902134895325}
			]);
		}
        else{
			mapChart.updateProperties({
				latitude: 45.43533493042,
				longitude: 11.902134895325,
				mapType: 'hybrid',
				mapWidth: 10000,
				mapHeight: 10000,
			});
			mapChartFlow1.updateMovie([
				{'0':875,'1':45.42533493042,'2':11.902134895325},
				{'0':875,'1':45.43533493042,'2':11.902134895325},
				{'0':875,'1':45.41533493042,'2':11.902134895325},
				{'0':875,'1':45.41933493042,'2':11.902134895325},
				{'0':875,'1':45.42233493042,'2':11.902134895325}
			]);
        }
        change=!change;
	};
	setInterval(function () {repeat();}, 8000);

};

module.exports=TS;