/*jshint node: true, -W106 */
'use strict';

/*
* Name : TS4.js
* Module : TS4
* Location : /systemTest
*
* Requirements tested:
*	FBOB2.5 		Il framework deve dare la possibilità all'utente sviluppatore di creare un map chart.
*	FBDE2.5.1 		Il framework deve consentire all'utente sviluppatore di impostare la possibilità di effettuare il trascinamento nel map chart, al momento della creazione.
* 	FBOB2.5.2 		Il framework deve consentire all'utente sviluppatore di impostare il punto centrale del map chart, nel momento della creazione.
*	FBOB2.5.3 		Il framework deve consentire all'utente sviluppatore di impostare la scala dell'area visualizzata nel map chart, al momento della creazione.
* 	FBDE2.5.4 		Il framework deve consentire all'utente sviluppatore di impostare il tipo della mappa del map chart, al momento della creazione.
*	FBDE2.5.5 		Il framework deve consentire all'utente sviluppatore di impostare la possibilità di zoomare nel map chart, al momento della creazione.
*	FBDE2.5.6 		Il framework deve consentire all'utente sviluppatore di impostare la griglia nel map chart, al momento della creazione.
*	(FBDE2.5.6.1)	Il framework deve permettere all'utente sviluppatore di abilitare la griglia orizzontale del map chart, al momento della creazione.
*	(FBDE2.5.6.2) 	Il framework deve permettere all'utente sviluppatore di abilitare la griglia verticale del map chart, al momento della creazione.
*	FBDE2.5.6.3 	Il framework deve permettere all'utente sviluppatore di disabilitare la griglia orizzontale del map chart, al momento della creazione.
*	FBDE2.5.6.4 	Il framework deve permettere all'utente sviluppatore di disabilitare la griglia verticale del map chart, al momento della creazione.
*	FBOB3.1.3 		Il framework deve dare la possibilità all'utente sviluppatore di aggiungere flussi di dati al map chart.
*	FBOB3.1.3.1 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il nome del set dei dati del map chart.
*	FBOB3.1.3.2 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il colore del set dei dati del map chart.
*	FBDE3.1.3.3 	Il framework deve dare la possibilità all'utente sviluppatore di impostare la tipologia dei marker per un set di dati e il colore degli stessi, nel map chart.
*	FBOB3.1.3.4 	Il framework deve dare la possibilità all'utente sviluppatore di impostare l'aspetto della linea del tracciato, nel map chart.
*	FBDE3.1.3.5 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il tipo di legenda che appare sopra un punto selezionato del map chart.
*	FBDE3.1.3.6 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il massimo numero di elementi visualizzabili nel map chart.
*	FBOB3.1.3.7 	Il framework deve dare la possibilità all'utente sviluppatore di impostare l'array di dati iniziale che costituirà il set dei dati del map chart.
*	FBOB3.1.3.8 	Il framework deve dare la possibilità all'utente sviluppatore di impostare formato di interpretazione dei dati contenuti nell'array del map chart.
*	FBDE3.1.3.9 	Il framework deve dare la possibilità all'utente sviluppatore di impostare l'elemento di background, ossia tracciato o area di sfondo, relativa all'uso dei dati del mapchart.
*	FBDE3.1.3.10 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il filtro dinamico da applicare ai dati contenuti nell'array del map chart.
*
* <<Requirements into brackets are not satisfied>>
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-06-27   Filippo Rampado    Initial code
* =========================================================
*/

var TS=function(page){
	var mapChart=page.createMapChart({
		ID: 'mapChart',
		title: 'Test creazione Map Chart',
		enableLegend: true,
		legend: {
		    position: 'NW',
		    fontColor: '#00AA00',
		    backgroundColor: '#FFAAFF'
		},
		latitude: 45.4113311,
		longitude: 11.8876318,
		mapType: 'roadmap',
		mapWidth: 2000,
		mapHeight: 2000,
	});

	//just to show parameters
	
	var mapChartFlow=mapChart.createMapChartFlow({
	    ID:'flow1',
	    name: 'linea 22',
	    marker:{
			'type': 'shape',
	        'shape': 'bus',
	        'color' : '#FFC4F6'
	    },
	    trace:{
			'type':'poly',
			'coordinates': [
	            [45.42533493042, 11.902134895325],[45.385223388672, 11.862413406372],[45.390911102295,11.870438575745],[45.424865722656, 11.885174751282]
			],
			'strokeColor' : '#DC271C',
	        'fillColor' : '#3a6d99'
		},
	    latitudeKey: '1',
	    longitudeKey: '2',
	    latitudeFormat: 'toFloat',
	    objectKey: '0',
	    filters:'IdMezzo>806',
	    maxItemsSaved: 50
	});
	mapChartFlow.updateMovie(
		[{'0':875,'IdMezzo':875,'1':45.42533493042,'WGS84Fi':45.42533493042,'2':11.902134895325,'WGS84La':11.902134895325,'3':14,'Girometro':14,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},
		{'0':805,'IdMezzo':805,'1':45.385223388672,'WGS84Fi':45.385223388672,'2':11.862413406372,'WGS84La':11.862413406372,'3':14,'Girometro':14,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'},
		{'0':867,'IdMezzo':867,'1':45.390911102295,'WGS84Fi':45.390911102295,'2':11.870438575745,'WGS84La':11.870438575745,'3':266,'Girometro':266,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},
		{'0':835,'IdMezzo':835,'1':45.424865722656,'WGS84Fi':45.424865722656,'2':11.885174751282,'WGS84La':11.885174751282,'3':188,'Girometro':188,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},
		{'0':814,'IdMezzo':814,'1':45.429698944092,'WGS84Fi':45.429698944092,'2':11.940545082092,'WGS84La':11.940545082092,'3':132,'Girometro':132,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'},
		{'0':845,'IdMezzo':845,'1':45.381771087646,'WGS84Fi':45.381771087646,'2':11.854724884033,'WGS84La':11.854724884033,'3':51,'Girometro':51,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'},
		{'0':880,'IdMezzo':880,'1':45.40881729126,'WGS84Fi':45.40881729126,'2':11.878475189209,'WGS84La':11.878475189209,'3':45,'Girometro':45,'4':1,'StatoPorte':1,'capolinea':'Capolinea Torre'},
		{'0':837,'IdMezzo':837,'1':45.392189025879,'WGS84Fi':45.392189025879,'2':11.87103843689,'WGS84La':11.87103843689,'3':80,'Girometro':80,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'}]
	);
};

module.exports=TS;