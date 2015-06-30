/*jshint node: true, -W106 */
'use strict';

/*
* Name : TS6.js
* Module : TS6
* Location : /systemTest
*
* Requirements tested:
*	FBOB3.2 			Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati dei grafici.
*	FBOB3.2.1 			Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati del bar chart.
*	FBOB3.2.1.1 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati del bar chart con il metodo di aggiornamento in place.
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

var TS=function(barChart){
	var barChartFlow=barChart.createBarChartFlow({
        ID:'flow1',
        name: 'grafico tempo-pressione',
        indexKey: 'tempo',
        valueKey: 'pressione',
        enableLegend: true,
    },[
        {tempo: 1, pressione: 3},
        {tempo: 2, pressione: 10},
        {tempo: 3, pressione: 1},
        {tempo: 4, pressione: 5},
        {tempo: 5, pressione: 7}
    ]);
    barChart.createBarChartFlow({
        ID:'flow2',
        name: 'grafico tempo-pressione2',
        indexKey: 'tempo',
        valueKey: 'pressione',
    },[
        {tempo: 1, pressione: 3},
        {tempo: 2, pressione: 10},
        {tempo: 3, pressione: 1},
        {tempo: 4, pressione: 5},
        {tempo: 5, pressione: 7}
    ]);
    var index=0;
    var repeat=function(){
    	if (index>=5){
    		index=0;
    	}
		barChartFlow.updateRecord(index, {tempo: index, pressione: Math.floor((Math.random() * 10) + 1)});
		barChart.updateRecord('flow2', index, {tempo: index, pressione: Math.floor((Math.random() * 10) + 1)});
		index++;
    };
    setInterval(function () {repeat();}, 5000);
};

module.exports=TS;