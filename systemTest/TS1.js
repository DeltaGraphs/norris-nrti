/*jshint node: true, -W106 */
'use strict';

/*
* Name : TS1.js
* Module : TS1
* Location : /systemTest
*
* Requirements tested:
*   FBOB1       Il framework deve dare la possibilità all'utente sviluppatore di creare delle pagine.
*   FBOB1.1     Il framework deve dare la possibilità all'utente sviluppatore di impostare un nome nella creazione della pagina.
*   FBDE1.2     Il framework deve dare la possibilità all'utente sviluppatore di impostare una descrizione nella creazione della pagina.
*   FBOB1.3     Il framework deve dare la possibilità all'utente sviluppatore di impostare il massimo numero di grafici su una riga, alla creazione della pagina.
*   FBOB1.4     Il framework deve dare la possibilità all'utente sviluppatore di impostare il massimo numero di grafici su una colonna, alla creazione della pagina.
*   FBOB1.5     Il framework deve dare la possibilità all'utente sviluppatore di aggiungere grafici ad una pagina.
*   FBOB1.5.1   Il framework deve permettere all'utente sviluppatore di aggiungere grafici ad una pagina nella posizione desiderata.
*   FBOB1.5.2   Il framework deve dare la possibilità all'utente sviluppatore di aggiungere un line chart ad una pagina.
*   FBOB1.5.3   Il framework deve dare la possibilità all'utente sviluppatore di aggiungere un bar chart ad una pagina.
*   FBOB1.5.4   Il framework deve dare la possibilità all'utente sviluppatore di aggiungere un map chart ad una pagina.
*   FBOB1.5.5   Il framework deve dare la possibilità all'utente sviluppatore di aggiungere una table ad una pagina.
*   FBDE1.6     Il framework deve permettere all'utente sviluppatore di aggiornare i parametri delle pagine.
*   FBDE1.6.1   Il framework deve permettere all'utente sviluppatore di aggiornare il nome della pagina.
*   FBDE1.6.2   Il framework deve permettere all'utente sviluppatore di aggiornare la descrizione della pagina.
*   FBDE1.6.3   Il framework deve permettere all'utente sviluppatore di aggiornare il massimo numero di grafici su una riga.
*   FBDE1.6.4   Il framework deve permettere all'utente sviluppatore di aggiornare il massimo numero di grafici su una colonna. 
*   FBOB2       Il framework deve dare la possibilità all'utente sviluppatore di creare grafici. 
*   FBOB2.1     Il framework deve dare la possibilità all'utente sviluppatore di impostare un titolo nella creazione del grafico.
*   FBDE2.2     Il framework deve dare la possibilità all'utente sviluppatore di creare un grafico senza impostare dati iniziali.
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-06-27   Filippo Rampado    Initial code
* =========================================================
*/

var TS=function(norris){
    var page=norris.createPage({
        ID:'testPage',
        name: 'Pagina Test',
        description: 'Questa è una bella pagina',
        graphsPerRow: 2,
        graphsPerCol: 10
    });
    page.createBarChart({
        ID: 'testBarChart',
        title: 'Empty Bar Chart'
    });
    page.createLineChart({
        ID: 'testLineChart',
        title: 'Empty Line Chart'
    });
    page.createMapChart({
        ID: 'testMapChart',
        title: 'Empty Chart'
    });
    page.createTable({
        ID: 'testTable',
        title: 'Empty Bar Chart'
    });
    page.createBarChart({
        ID: 'testBarChart2',
    });
    page.createLineChart({
        ID: 'testLineChart2',
    });
    page.createMapChart({
        ID: 'testMapChart2',
    });
    page.createTable({
        ID: 'testTable2',
    });

    //testing updates -> requirements 1.6.*
    var change=false;
    var repeat=function(){
        if (change){
            page.updateParameters({
                name: 'Pagina Test 2',
                description: 'Questa non è una bella pagina',
                graphsPerRow: 5,
                graphsPerCol: 5
            });
        }
        else{
            page.updateParameters({
                name: 'Pagina Test',
                description: 'Questa è una bella pagina',
                graphsPerRow: 2,
                graphsPerCol: 10
            });
        }
        change=!change;
    };
    setInterval(function () {repeat();}, 5000);
};

module.exports=TS;