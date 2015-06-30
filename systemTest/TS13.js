/*jshint node: true, -W106 */
'use strict';

/*
* Name : TS13.js
* Module : TS13
* Location : /systemTest
*
* Requirements tested:
*	FBDE3.3.8 			Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i parametri di una table.
*	FBDE3.3.8.1 		Il framework deve permettere all'utente sviluppatore di modificare i campi dell'intestazione di una table.
*	FBDE3.3.8.2 		Il framework deve dare la possibilità all'utente sviluppatore di modificare il numero massimo di elementi visualizzati nella table.
*	FBDE3.3.8.3 		Il framework deve dare la possibilità all'utente sviluppatore di modificare la posizione di aggiunta dei dati in una table.
*	FBOB3.3.8.3.1 		Il framework deve dare la possibilità all'utente sviluppatore di impostare la posizione di inserimento in testa dei dati in una table.
*	FBDE3.3.8.3.2 		Il framework deve dare la possibilità all'utente sviluppatore di impostare la posizione di inserimento in coda dei dati in una table.
*	FBDE3.3.8.4 		Il framework deve dare la possibilità all'utente sviluppatore di modificare l'ordinamento dei dati in una table, in base ad una colonna.
*	FBDE3.3.8.4.1 		Il framework deve dare la possibilità all'utente sviluppatore di modificare l'ordinamento dei dati in una table, in base a più colonne.
*	FBDE3.3.8.5 		Il framework deve consentire all'utente sviluppatore di modificare la griglia nella table.
*	FBDE3.3.8.5.1 		Il framework deve permettere all'utente sviluppatore di abilitare la griglia orizzontale della table.
*	FBDE3.3.8.5.2 		Il framework deve permettere all'utente sviluppatore di abilitare la griglia verticale della table.
*	FBDE3.3.8.5.3 		Il framework deve permettere all'utente sviluppatore di disabilitare la griglia orizzontale della table.
*	FBDE3.3.8.5.4 		Il framework deve permettere all'utente sviluppatore di disabilitare la griglia verticale della table.
* <<Requirements into brackets are not satisfied>>
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-06-29   Filippo Rampado    Initial code
* =========================================================
*/

var TS=function(table){
	var tableFlow1=table.createTableFlow({
        ID:'flow1',
        name: 'flusso 1',
        columnKeys: ['0','1','2'],
        maxItemsSaved: 5
    });
    var IDs=[];
	IDs.push(tableFlow1.addRecord({'0':1, '1':1, '2':1}));
	IDs.push(tableFlow1.addRecord({'0':2, '1':3, '2':3}));
	IDs.push(tableFlow1.addRecord({'0':3, '1':3, '2':3}));
	IDs.push(tableFlow1.addRecord({'0':4, '1':4, '2':4}));
	IDs.push(tableFlow1.addRecord({'0':5, '1':5, '2':5}));


	var change=true;
    var repeat=function(){
	    if (change){
	    	table.updateProperties({
				sortable: true,
			    maxItemsPage: 20,
			    addRowOn: 'top',
			    headers: ['IDMezzo', 'WGS84Fi', 'WGS84La'],
			    sort: {
			        column: ['IDMezzo','WGS84Fi'],
			        ordering: ['DESC','ASC']
			    },
			    appearance: {
			        horizontalGrid: {
			            color: '#00AA00', //#xxxxxx,
			            width: 1 // > 0
			        },
			        verticalGrid: {
			            color: '#00AA00', //#xxxxxx,
			            width: 1 // > 0
			        }
			    }
			});
		}
        else{
			table.updateProperties({
				sortable: false,
			    maxItemsPage: 10,
			    addRowOn: 'bottom',
			    headers: ['CHANGE-1', 'CHANGE-2', 'CHANGE-3'],
			    sort: {
			        column: ['CHANGE-1'],
			        ordering: ['DESC']
			    },
			    appearance: {
			        horizontalGrid: {
			            color: '#00AA00', //#xxxxxx,
			            width: 0 // > 0
			        },
			        verticalGrid: {
			            color: '#00AA00', //#xxxxxx,
			            width: 0 // > 0
			        }
			    }
			});
        }
        change=!change;
	};
	setInterval(function () {repeat();}, 8000);
};

module.exports=TS;