/*jshint node: true, -W106 */
'use strict';

/*
* Name : TS3.js
* Module : TS3
* Location : /systemTest
*
* Requirements tested:
*	FBOB3.2.2 			Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati del line chart.
*	FBOB3.2.2.1 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati del line chart con il metodo di aggiornamento in place.
*	FBOB3.2.2.2 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati del line chart con il metodo stream.
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

var TS=function(lineChart){
	lineChart.createLineChartFlow({
	    ID:'flow1',
	    name: 'grafico tempo-temperatura',
	    xKey: 'tempo',
	    yKey: 'temperatura',
	    flowColor: '#B9D3EE',
	    marker: 'triangle',
	    xFormat: 'toFloat',
	    maxItems: 5,
	    filters: 'temperatura>2'
	});
	var IDs=[];
	IDs.push(lineChart.addRecord('flow1',{'tempo': 1, 'temperatura': 15}));
	IDs.push(lineChart.addRecord('flow1',{'tempo': 2, 'temperatura': 10}));
	IDs.push(lineChart.addRecord('flow1',{'tempo': 3, 'temperatura': 2}));
	IDs.push(lineChart.addRecord('flow1',{'tempo': 4, 'temperatura': 1}));
	IDs.push(lineChart.addRecord('flow1',{'tempo': 5, 'temperatura': 16}));

	lineChart.createLineChartFlow({
	    ID:'flow2',
	    name: 'grafico tempo-temperatura',
	    xKey: 'tempo',
	    yKey: 'temperatura',
	    flowColor: '#B9D3EE',
	    marker: 'triangle',
	    xFormat: 'toFloat',
	    maxItems: 4,
	    filters: 'temperatura>2'
	});
	var IDs2=[];
	IDs2.push(lineChart.addRecord('flow2',{'tempo': 1, 'temperatura': 15}));
	IDs2.push(lineChart.addRecord('flow2',{'tempo': 2, 'temperatura': 10}));
	IDs2.push(lineChart.addRecord('flow2',{'tempo': 3, 'temperatura': 2}));
	IDs2.push(lineChart.addRecord('flow2',{'tempo': 4, 'temperatura': 1}));
	IDs2.push(lineChart.addRecord('flow2',{'tempo': 5, 'temperatura': 16}));
	var index=0;

	var repeat=function(){
		if (index>=5){
			index=0;
		}
		lineChart.updateRecord('flow1', IDs[index], {tempo: index, pressione: index*2});
		lineChart.addRecord('flow2', {tempo: index, pressione: index*2+4});
		index++;
	};
	setInterval(function () {repeat();}, 5000);
    
};

module.exports=TS;