/*jshint node: true, -W106 */
'use strict';

/*
* Name : TS2.js
* Module : TS2
* Location : /systemTest
*
* Requirements tested:
*	FBOB2.3 		Il framework deve dare la possibilità all'utente sviluppatore di creare un bar chart.
*	FBOB2.3.1 		Il framework deve dare la possibilità all'utente sviluppatore di impostare le proprietà degli assi alla creazione di un bar chart.
*	FBOB2.3.1.1 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il nome degli assi alla creazione di un bar chart.
*	FBOB2.3.1.1.1 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il nome delle ascisse dei bar chart, nel momento della creazione.
*	FBOB2.3.1.1.2 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il nome delle ordinate dei bar chart, nel momento della creazione.
*	(FBDE2.3.1.2) 	Il framework deve dare la possibilità all'utente sviluppatore di impostare l'aspetto degli assi alla creazione di un bar chart. 
*	(FBDE2.3.1.3) 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il range degli assi alla creazione di un bar chart. 
*	(FBDE2.3.1.4) 	Il framework deve dare la possibilità all'utente sviluppatore di impostare i tick degli assi alla creazione di un bar chart.
*	(FBDE2.3.1.5) 	Il framework deve dare la possibilità all'utente sviluppatore di impostare la scala degli assi alla creazione di un bar chart.
*	FBOB2.3.2 		Il framework deve permettere all'utente sviluppatore di scegliere l'orientamento delle barre del bar chart, al momento della creazione.
*	FBOB2.3.2.1 	Il framework deve permettere all'utente sviluppatore di scegliere l'orientamento orizzontale delle barre del bar chart, al momento della creazione.
*	FBOB2.3.2.2 	Il framework deve permettere all'utente sviluppatore di scegliere l'orientamento verticale delle barre del bar chart, al momento della creazione.
*	(FBDE2.3.3)		Il framework deve permettere all'utente sviluppatore di aggiungere una griglia al bar chart, al momento della creazione.
*	(FBDE2.3.3.1) 	Il framework deve permettere all'utente sviluppatore di abilitare la griglia orizzontale del bar chart, al momento della creazione.
*	(FBDE2.3.3.2) 	Il framework deve permettere all'utente sviluppatore di disabilitare la griglia orizzontale del bar chart, al momento della creazione.
*	(FBDE2.3.3.3) 	Il framework deve permettere all'utente sviluppatore di abilitare la griglia verticale del bar chart, al momento della creazione.
*	(FBDE2.3.3.4) 	Il framework deve permettere all'utente sviluppatore di disabilitare la griglia verticale del bar chart, al momento della creazione.
*	(FBDE2.3.4)	 	Il framework deve permettere all'utente sviluppatore di aggiungere un background al bar chart, al momento della creazione.
*	(FBDE2.3.5) 	Il framework deve dare la possibilità all'utente sviluppatore di impostare la possibilità di ordinamento delle barre del bar chart al momento della creazione.
*	FBDE2.3.6 		Il framework deve dare la possibilità all'utente sviluppatore di impostare la visualizzazione stacked delle barre del bar chart al momento della creazione.
*	FBDE2.3.7 		Il framework deve dare la possibilità all'utente sviluppatore di impostare la visualizzazione grouped delle barre del bar chart al momento della creazione.
*	FBOB2.8 		Il framework deve dare la possibilità all'utente sviluppatore di impostare il formato di stampa dei dati nel grafico, al momento della creazione.
*	FBOB3 			Il framework deve permettere all'utente sviluppatore di aggiornare il contenuto dei grafici.
*	FBOB3.1 		Il framework deve dare la possibilità all'utente sviluppatore di aggiungere flussi di dati ai grafici.
*	FBOB3.1.1 		Il framework deve dare la possibilità all'utente sviluppatore di aggiungere flussi di dati al bar chart.
*	FBOB3.1.1.1 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il colore del set dei dati del bar chart.
*	FBOB3.1.1.2 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il nome del set dei dati del bar chart.
*	FBOB3.1.1.3 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il tipo di legenda che appare sopra un punto selezionato del bar chart. 
*	FBOB3.1.1.4 	Il framework deve dare la possibilità all'utente sviluppatore di impostare l'array di dati iniziale che costituirà il set dei dati del bar chart.
*	FBOB3.1.1.5 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il formato di interpretazione dei dati contenuti nell'array del bar chart.
*	FBOB3.1.1.6 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il filtro dinamico da applicare ai dati contenuti nell'array del bar chart.
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
    var barChart=page.createBarChart({
	    ID: 'barChart',
	    title: 'Test creazione Bar Chart',
	    enableLegend: true,
	    legend: {
	        position: 'NE'
	    },
	    xAxis:{
	        name: 'tempo'
	    },
	    yAxis:{
	        name: 'pressione'
	    },
	    headers: ['h1','h2','h3','h4','h5'],
	    barOrientation: 'V',	//or H
	    groupingControl: true
	});

	barChart.createBarChartFlow({
        ID:'flow1',
        name: 'grafico tempo-pressione',
        indexKey: 'tempo',
        valueKey: 'pressione',
        flowColor: '#33AAFF',
        valueFormat: 'toInt',
        filters: 'pressione>3'
    },[
        {tempo: 1, pressione: 3},
        {tempo: 2, pressione: 10},
        {tempo: 3, pressione: 1},
        {tempo: 4, pressione: 5},
        {tempo: 5, pressione: 7}
    ]);
};

module.exports=TS;