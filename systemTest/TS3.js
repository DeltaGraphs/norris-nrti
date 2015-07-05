/*jshint node: true, -W106 */
'use strict';

/*
* Name : TS3.js
* Module : TS3
* Location : /systemTest
*
* Requirements tested:
*	FBOB2.4 		Il framework deve dare la possibilità all'utente sviluppatore di creare un linechart.
*	FBOB2.4.1		Il framework deve dare la possibilità all'utente sviluppatore di aggiungere la griglia del line chart, al momento della creazione.
*	FBOB2.4.1.1 	Il framework deve permettere all'utente sviluppatore di abilitare la griglia orizzontale del line chart, al momento della creazione.
*	FBOB2.4.1.2 	Il framework deve permettere all'utente sviluppatore di abilitare la griglia verticale del line chart , al momento della creazione.
*	(FBDE2.4.1.3) 	Il framework deve permettere all'utente sviluppatore di disabilitare la griglia orizzontale del line chart, al momento della creazione.
*	(FBDE2.4.1.4) 	Il framework deve permettere all'utente sviluppatore di disabilitare la griglia verticale del line chart , al momento della creazione.
*	(FBDE2.4.2)		Il framework deve dare la possibilità all'utente sviluppatore di aggiungere un background al line chart, al momento della creazione.
*	FBOB2.4.3 		Il framework deve dare la possibilità all'utente sviluppatore di impostare le proprietà degli assi alla creazione di un line chart.
*	FBOB2.4.3.1 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il nome degli assi alla creazione di un line chart. 
*	FBOB2.4.3.1.1 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il nome delle ascisse dei line chart, al momento della creazione.
*	FBOB2.4.3.1.2 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il nome delle ordinate dei line chart, al momento della creazione.
*	(FBDE2.4.3.2) 	Il framework deve dare la possibilità all'utente sviluppatore di impostare l'aspetto degli assi alla creazione di un line chart.
*	(FBDE2.4.3.3) 	Il framework deve dare la possibilità all'utente sviluppatore di impostare il range degli assi alla creazione di un line chart.
*	(FBDE2.4.3.4) 	Il framework deve dare la possibilità all'utente sviluppatore di impostare i tick degli assi alla creazione di un line chart.
*	(FBDE2.4.3.5) 	Il framework deve dare la possibilità all'utente sviluppatore di impostare la scala degli assi alla creazione di un line chart.
*	FBDE2.4.4 		Il framework deve dare la possibilità all'utente sviluppatore di impostare il View finder del line chart, al momento della creazione.
*   FBOB3.1.2       Il framework deve dare la possibilità all'utente sviluppatore di aggiungere flussi di dati al line chart.
*   FBOB3.1.2.1     Il framework deve dare la possibilità all'utente sviluppatore di impostare il nome dei flussi di dati del line chart.
*   FBOB3.1.2.2     Il framework deve dare la possibilità all'utente sviluppatore di impostare il colore del set dei dati al line chart.
*   FBDE3.1.2.3     Il framework deve dare la possibilità all'utente sviluppatore di impostare la visualizzazione della legenda del marker per un set di dati e il colore degli stessi, nel line chart.
*   FBDE3.1.2.4     Il framework deve dare la possibilità all'utente sviluppatore di impostare l'interpolazione del set dei dati del line chart.
*   FBDE3.1.2.5     Il framework deve dare la possibilità all'utente sviluppatore di impostare il colore dell'area sottesa da un set di dati del line chart.
*   FBDE3.1.2.6     Il framework deve dare la possibilità all'utente sviluppatore di impostare il tipo di legenda che appare sopra un punto selezionato del line chart.
*   FBDE3.1.2.7     Il framework deve dare la possibilità all'utente sviluppatore di impostare il massimo numero di elementi visualizzabili nel line chart.
*   FBOB3.1.2.8     Il framework deve dare la possibilità all'utente sviluppatore di impostare l'array di dati iniziale che costituirà il set dei dati del line chart.
*   FBOB3.1.2.9     Il framework deve dare la possibilità all'utente sviluppatore di impostare formato di interpretazione dei dati contenuti nell'array del line chart.
*   FBDE3.1.2.10    Il framework deve dare la possibilità all'utente sviluppatore di impostare il filtro dinamico da applicare ai dati contenuti nell'array del line chart.
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
    var lineChart=page.createLineChart({
	    ID: 'lineChart',
	    title: 'Test creazione Line Chart',
	    height: 600,
	    width: 1000,
	    enableLegend: true,
	    legend: {
	        position: 'NE',
            fontColor: '#00AA00',
            backgroundColor: '#FFAAFF'
	    },
	    xAxis:{
	        name: 'tempo'
	    },
	    yAxis:{
	        name: 'temperatura'
	    },
	    viewFinder: true,
        legendOnPoint: true,
	    //interpolation: 'basis'
	});

	var lineChartFlow=lineChart.createLineChartFlow({
        ID:'flow1',
        name: 'grafico tempo-temperatura',
        xKey: 'tempo',
        yKey: 'temperatura',
        flowColor: '#B9D3EE',
        xFormat: 'toFloat',
        maxItemsSaved: 50,
        maxItems: 4,
        filters: 'temperatura>1'
    });
    lineChartFlow.addRecord({'tempo': 1, 'temperatura': 15});
    lineChartFlow.addRecord({'tempo': 2, 'temperatura': 10});
    lineChartFlow.addRecord({'tempo': 3, 'temperatura': 2});
    lineChartFlow.addRecord({'tempo': 4, 'temperatura': 1});
    lineChartFlow.addRecord({'tempo': 5, 'temperatura': 16});
    lineChartFlow.addRecord({'tempo': 6, 'temperatura': 18});
    lineChartFlow.addRecord({'tempo': 7, 'temperatura': 19});
    lineChartFlow.addRecord({'tempo': 8, 'temperatura': 20});
    var lineChartFlow2=lineChart.createLineChartFlow({
        ID:'flow2',
        name: 'grafico tempo-temperatura 2',
        xKey: 'tempo',
        yKey: 'temperatura',
        flowColor: '#FFD3EE',
        xFormat: 'toFloat',
        maxItemsSaved: 50,
        maxItems: 4,
        filters: 'temperatura>2'
    });
    lineChartFlow2.addRecord({'tempo': 1, 'temperatura': 5});
    lineChartFlow2.addRecord({'tempo': 2, 'temperatura': 0});
    lineChartFlow2.addRecord({'tempo': 3, 'temperatura': 12});
    lineChartFlow2.addRecord({'tempo': 4, 'temperatura': 11});
    lineChartFlow2.addRecord({'tempo': 5, 'temperatura': 6});
};

module.exports=TS;