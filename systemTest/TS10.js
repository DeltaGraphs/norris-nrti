/*jshint node: true, -W106 */
'use strict';

/*
* Name : TS10.js
* Module : TS10
* Location : /systemTest
*
* Requirements tested:
*   FBDE3.3             Il framework deve permettere all'utente sviluppatore di aggiornare i parametri dei grafici.
*   FBDE3.3.1           Il framework deve permettere all'utente sviluppatore di aggiornare il titolo del grafico.
*   FBDE3.3.2           Il framework deve permettere all'utente sviluppatore di aggiornare le dimensioni del grafico.
*   FBDE3.3.3           Il framework deve dare la possibilità all'utente sviluppatore di modificare il formato di stampa dei dati nel grafico.
*   FBDE3.3.4           Il framework deve dare la possibilità all'utente sviluppatore di modificare i parametri relativi alla legenda.
*   FBDE3.3.4.1         Il framework deve dare la possibilità all'utente sviluppatore di modificare la possibilità di abilitare e disabilitare la legenda nel grafico.
*   FBDE3.3.4.2         Il framework deve dare la possibilità all'utente sviluppatore di modificare la posizione della legenda nel grafico.
*   FBDE3.3.4.3         Il framework deve dare la possibilità all'utente sviluppatore di modificare l'aspetto della legenda nel grafico.
*   FBDE3.3.5           Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i parametri di un bar chart.
*   FBDE3.3.5.1         Il framework deve consentire all'utente sviluppatore di aggiornare l'orientamento delle barre di un bar chart.
*   FBDE3.3.5.1.1       Il framework deve consentire all'utente sviluppatore di aggiornare l'orientamento orizzontale delle barre di un bar chart.
*   FBDE3.3.5.1.2       Il framework deve consentire all'utente sviluppatore di aggiornare l'orientamento verticale delle barre di un bar chart.
*   FBDE3.3.5.2         Il framework deve permettere all'utente sviluppatore di aggiornare le impostazioni della griglia del bar chart.
*   FBDE3.3.5.2.1       Il framework deve permettere all'utente sviluppatore di abilitare la griglia orizzontale del bar chart.
*   FBDE3.3.5.2.2       Il framework deve permettere all'utente sviluppatore di disabilitare la griglia orizzontale del bar chart.
*   FBDE3.3.5.2.3       Il framework deve permettere all'utente sviluppatore di abilitare la griglia verticale del bar chart.
*   FBDE3.3.5.2.4       Il framework deve permettere all'utente sviluppatore di disabilitare la griglia verticale del bar chart.
*   FBDE3.3.5.3         Il framework deve permettere all'utente sviluppatore di modificare il background al bar chart.
*   FBDE3.3.5.4         Il framework deve dare la possibilità all'utente sviluppatore di modificare la possibilità di ordinamento delle barre del bar chart.
*   FBDE3.3.5.5         Il framework deve dare la possibilità all'utente sviluppatore di modificare la visualizzazione stacked delle barre del bar chart.
*   FBDE3.3.5.6         Il framework deve dare la possibilità all'utente sviluppatore di modificare la visualizzazione grouped delle barre del bar chart.
*   FBDE3.3.5.7         Il framework deve dare la possibilità all'utente sviluppatore di aggiornare le proprietà degli assi di un bar chart.
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