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
*   (FBDE3.3.5.2.2)     Il framework deve permettere all'utente sviluppatore di disabilitare la griglia orizzontale del bar chart.
*   FBDE3.3.5.2.3       Il framework deve permettere all'utente sviluppatore di abilitare la griglia verticale del bar chart.
*   (FBDE3.3.5.2.4)     Il framework deve permettere all'utente sviluppatore di disabilitare la griglia verticale del bar chart.
*   (FBDE3.3.5.3)       Il framework deve permettere all'utente sviluppatore di modificare il background al bar chart.
*   (FBDE3.3.5.4)       Il framework deve dare la possibilità all'utente sviluppatore di modificare la possibilità di ordinamento delle barre del bar chart.
*   FBDE3.3.5.5         Il framework deve dare la possibilità all'utente sviluppatore di modificare la visualizzazione stacked delle barre del bar chart.
*   FBDE3.3.5.6         Il framework deve dare la possibilità all'utente sviluppatore di modificare la visualizzazione grouped delle barre del bar chart.
*   FBDE3.3.5.7         Il framework deve dare la possibilità all'utente sviluppatore di aggiornare le proprietà degli assi di un bar chart.
*   FBDE3.3.5.7.1       Il framework deve dare la possibilità all'utente sviluppatore di modificare il nome degli assi di un bar chart.
*   FBDE3.3.5.7.1.1     Il framework deve dare la possibilità all'utente sviluppatore di modificare il nome delle ascisse dei bar chart.
*   FBDE3.3.5.7.1.2     Il framework deve dare la possibilità all'utente sviluppatore di modificare il nome delle ordinate dei bar chart.
*   (FBDE3.3.5.7.2)     Il framework deve dare la possibilità all'utente sviluppatore di aggiornare l'aspetto degli assi di un bar chart.
*   (FBDE3.3.5.7.3)     Il framework deve dare la possibilità all'utente sviluppatore di modificare il range degli assi di un bar chart.
*   (FBDE3.3.5.7.4)     Il framework deve dare la possibilità all'utente sviluppatore di modificare i tick degli assi di un bar chart.
*   (FBDE3.3.5.7.5)     Il framework deve dare la possibilità all'utente sviluppatore di modificare la scala degli assi di un bar chart.
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
	barChart.createBarChartFlow({
        ID:'flow1',
        name: 'grafico tempo-pressione',
        indexKey: 'tempo',
        valueKey: 'pressione',
    },[
        {tempo: 0, pressione: 3},
        {tempo: 1, pressione: 10},
        {tempo: 2, pressione: 1},
        {tempo: 3, pressione: 5},
        {tempo: 4, pressione: 7}
    ]);
    barChart.createBarChartFlow({
        ID:'flow2',
        name: 'grafico tempo-pressione 2 ',
        indexKey: 'tempo',
        valueKey: 'pressione',
    },[
        {tempo: 0, pressione: 2},
        {tempo: 1, pressione: 1},
        {tempo: 2, pressione: 6},
        {tempo: 3, pressione: 2},
        {tempo: 4, pressione: 9}
    ]);
    var change=true;
    var repeat=function(){
    	if (change){
            barChart.updateProperties({
                title: 'CAMBIATO - Test aggiornamento parametri Bar Chart',
                width: 800,
                height: 600,
                enableLegend: true,
                legend: {
                    position: 'NW',
                    fontColor: '#'+Math.floor(Math.random()*16777215).toString(16),
                    backgroundColor: '#'+Math.floor(Math.random()*16777215).toString(16)
                },
                xAxis:{
                    name: 'Cambiato - tempo'
                },
                yAxis:{
                    name: 'Cambiato - temperatura'
                },
                barOrientation: 'V',
                legendOnPoint: true,
                groupingControl: true,
            });
        }
        else{
            barChart.updateProperties({
                title: 'Test aggiornamento parametri Bar Chart',
                width: 800,
                height: 600,
                enableLegend: false,
                xAxis:{
                    name: 'Tempo'
                },
                yAxis:{
                    name: 'Temperatura'
                },
                barOrientation: 'H',
                legendOnPoint: false,
                interpolation: 'linear',
                groupingControl: false,
            });
        }
        change=!change;
    };
    setInterval(function () {repeat();}, 8000);
};

module.exports=TS;