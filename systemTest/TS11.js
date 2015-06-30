/*jshint node: true, -W106 */
'use strict';

/*
* Name : TS11.js
* Module : TS11
* Location : /systemTest
*
* Requirements tested:
*	FBDE3.3.6 			Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i parametri di un line chart.
*	(FBDE3.3.6.1) 		Il framework deve permettere all'utente sviluppatore di aggiornare le impostazioni della griglia del line chart.
*	(FBDE3.3.6.1.1) 	Il framework deve permettere all'utente sviluppatore di abilitare/disabilitare la griglia orizzontale del line chart.
*	(FBDE3.3.6.1.2) 	Il framework deve permettere all'utente sviluppatore di abilitare/disabilitare la griglia verticale del line chart.
*	(FBDE3.3.6.2) 		Il framework deve permettere all'utente sviluppatore di modificare il background al line chart.
*	FBDE3.3.6.3 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare le proprietà degli assi di un line chart.
*	FBDE3.3.6.3.1 		Il framework deve dare la possibilità all'utente sviluppatore di modificare il nome degli assi di un line chart. 
*	FBDE3.3.6.3.1.11	Il framework deve dare la possibilità all'utente sviluppatore di modificare il nome delle ascisse dei line chart.
*	FBDE3.3.6.3.1.2 	Il framework deve dare la possibilità all'utente sviluppatore di modificare il nome delle ordinate dei line chart.
*	FBDE3.3.6.3.2 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare l'aspetto degli assi di un line chart.
*	FBDE3.3.6.3.3 		Il framework deve dare la possibilità all'utente sviluppatore di modificare il range degli assi di un line chart.
*	FBDE3.3.6.3.4 		Il framework deve dare la possibilità all'utente sviluppatore di modificare i tick degli assi di un line chart.
*	FBDE3.3.6.3.5 		Il framework deve dare la possibilità all'utente sviluppatore di modificare la scala degli assi di un line chart.
*	FBDE3.3.6.4 		Il framework deve dare la possibilità all'utente sviluppatore di modificare la visibilità del view finder del line chart.
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

var TS=function(lineChart){
	lineChart.createLineChartFlow({
	    ID:'flow1',
	    name: 'Place',
	    xKey: 'tempo',
	    yKey: 'temperatura',
	    maxItems: 5,
	    maxItemsSaved: 5,
	});
	var IDs=[];
	IDs.push(lineChart.addRecord('flow1',{'tempo': 1, 'temperatura': 15}));
	IDs.push(lineChart.addRecord('flow1',{'tempo': 2, 'temperatura': 10}));
	IDs.push(lineChart.addRecord('flow1',{'tempo': 3, 'temperatura': 2}));
	IDs.push(lineChart.addRecord('flow1',{'tempo': 4, 'temperatura': 1}));
	IDs.push(lineChart.addRecord('flow1',{'tempo': 5, 'temperatura': 16}));

	lineChart.createLineChartFlow({
	    ID:'flow2',
	    name: 'Stream',
	    xKey: 'tempo',
	    yKey: 'temperatura',
	    maxItems: 4,
	    maxItemsSaved: 4,
	});
	lineChart.addRecord('flow2',{'tempo': 1, 'temperatura': 15});
	lineChart.addRecord('flow2',{'tempo': 2, 'temperatura': 10});
	lineChart.addRecord('flow2',{'tempo': 3, 'temperatura': 2});
	lineChart.addRecord('flow2',{'tempo': 4, 'temperatura': 1});
	lineChart.addRecord('flow2',{'tempo': 5, 'temperatura': 16});
	
	var index=0;
	var repeat=function(){
		if (index>=5){
			index=0;
		}
		lineChart.updateRecord('flow1', IDs[index], {tempo: index, temperatura: Math.floor((Math.random() * 10) + 1)});
		lineChart.addRecord('flow2', {tempo: index, temperatura: Math.floor((Math.random() * 10) + 1)});
		index++;
	};
	setInterval(function () {repeat();}, 5000);
    
};

module.exports=TS;