/*jshint node: true, -W106 */
'use strict';

/*
* Name : TS5.js
* Module : TS5
* Location : /systemTest
*
* Requirements tested:
*	FBOB2.6 		Il framework deve dare la possibilità all'utente sviluppatore di creare una table.
*	FBOB2.6.1 		Il framework deve permettere all'utente sviluppatore di impostare i campi dell'intestazione di una table, al momento della creazione.
*	FBOB2.6.2 		Il framework deve dare la possibilità all'utente sviluppatore di impostare il numero massimo di elementi visualizzati nella table, al momento della creazione.
*	FBOB2.6.3 		Il framework deve dare la possibilità all'utente sviluppatore di impostare la posizione di aggiunta dei dati in una table, al momento della creazione.
*	FBOB2.6.3.1 	Il framework deve dare la possibilità all'utente sviluppatore di impostare la posizione di inserimento in testa dei dati in una table, al momento della creazione.
*	FBOB2.6.3.2 	Il framework deve dare la possibilità all'utente sviluppatore di impostare la posizione di inserimento in coda dei dati in una table, al momento della creazione.
*	FBOB2.6.4 		Il framework deve dare la possibilità all'utente sviluppatore di impostare l'ordinamento dei dati in una table, in base ad una colonna, al momento della creazione.
*	FBDE2.6.4.1 	Il framework deve dare la possibilità all'utente sviluppatore di impostare l'ordinamento dei dati in una table, in base a più colonne, al momento della creazione.
*	FBOB2.6.5 		Il framework deve consentire all'utente sviluppatore di impostare la griglia nella table, al momento della creazione.
*	FBOB2.6.5.1 	Il framework deve permettere all'utente sviluppatore di abilitare la griglia orizzontale della table, nel momento della creazione.
*	FBOB2.6.5.2 	Il framework deve permettere all'utente sviluppatore di abilitare la griglia verticale della table, nel momento della creazione.
*	FBOB2.6.5.3 	Il framework deve permettere all'utente sviluppatore di disabilitare la griglia orizzontale della table, nel momento della creazione.
*	FBOB2.6.5.4 	Il framework deve permettere all'utente sviluppatore di disabilitare la griglia verticale della table, nel momento della creazione.
*	FBOB2.6.6 		Il framework deve permettere all'utente sviluppatore di specificare il colore di sfondo delle celle della table, al momento della creazione.
*	FBOB2.6.6.1 	Il framework deve permettere all'utente sviluppatore di specificare il colore di sfondo di una singola cella della table, al momento della creazione.
*	FBOB2.6.6.2 	Il framework deve permettere all'utente sviluppatore di specificare il colore di sfondo di più celle della table, al momento della creazione.
*	FBOB2.6.7 		Il framework deve permettere all'utente sviluppatore di specificare il colore del testo all'interno delle celle della table, al momento della creazione.
*	FBOB2.6.7.1 	Il framework deve permettere all'utente sviluppatore di specificare il colore del testo all'interno di una singola cella della table, al momento della creazione.
*	FBOB2.6.7.2 	Il framework deve permettere all'utente sviluppatore di specificare il colore del testo all'interno di più celle della table, al momento della creazione.
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
	var table=page.createTable({
	    ID: 'table1',
	    title: 'Tabella',
	    sortable: true,
	    maxItemsPage: 20,
	    addRowOn: 'top',	//or bottom
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
	        },
	        rowEven: {
	            textColor: ['#1F3D99', '#000000'],
	            backgroundColor: ['#99E2F2', '#F2E899']
	        },
	        rowOdd: {
	            textColor: ['#000000', '#1F3D99'],
	            backgroundColor: ['#99F2DF', '#D9F299']
	        },
	        headers: {
	            textColor: ['#FFFFFF', '#FFFFFF'],
	            backgroundColor: ['#2FBA38', '#2F3ABA']
	        }
	    },
	});

	//just to show parameters
	
	var tableFlow1=table.createTableFlow({
        ID:'flow1',
        name: 'autobus',
        columnKeys: ['0','1','2']
    });
	tableFlow1.addRecord({'0':875,'IdMezzo':875,'1':45.42533493042,'WGS84Fi':45.42533493042,'2':11.902134895325,'WGS84La':11.902134895325,'3':14,'Girometro':14,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre',appearance:[{bg: '#FFAAFF',text: '#FFAAAA'},{bg: '#FFAAFF',text: '#FFABBA'},{bg: '#FFAAFF',text: '#FFAACC'}]});
	tableFlow1.addRecord({'0':805,'IdMezzo':805,'1':45.385223388672,'WGS84Fi':45.385223388672,'2':11.862413406372,'WGS84La':11.862413406372,'3':14,'Girometro':14,'4':0,'StatoPorte':0,'capolinea':'Codalunga 8b'});
	tableFlow1.addRecord({'0':867,'IdMezzo':867,'1':45.390911102295,'WGS84Fi':45.390911102295,'2':11.870438575745,'WGS84La':11.870438575745,'3':266,'Girometro':266,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'});
	tableFlow1.addRecord({'0':835,'IdMezzo':835,'1':45.424865722656,'WGS84Fi':45.424865722656,'2':11.885174751282,'WGS84La':11.885174751282,'3':188,'Girometro':188,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice',appearance:[{bg: '#FFAAFF',text: '#FFAAAA'},{bg: '#FFAAFF',text: '#FFABBA'},{bg: '#FFAAFF',text: '#FFAACC'}]});
	tableFlow1.addRecord({'0':814,'IdMezzo':814,'1':45.429698944092,'WGS84Fi':45.429698944092,'2':11.940545082092,'WGS84La':11.940545082092,'3':132,'Girometro':132,'4':0,'StatoPorte':0,'capolinea':'Capolinea Mandria via Monselice'});
	tableFlow1.addRecord({'0':845,'IdMezzo':845,'1':45.381771087646,'WGS84Fi':45.381771087646,'2':11.854724884033,'WGS84La':11.854724884033,'3':51,'Girometro':51,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'});
	tableFlow1.addRecord({'0':880,'IdMezzo':880,'1':45.40881729126,'WGS84Fi':45.40881729126,'2':11.878475189209,'WGS84La':11.878475189209,'3':45,'Girometro':45,'4':1,'StatoPorte':1,'capolinea':'Capolinea Torre'});
	tableFlow1.addRecord({'0':837,'IdMezzo':837,'1':45.392189025879,'WGS84Fi':45.392189025879,'2':11.87103843689,'WGS84La':11.87103843689,'3':80,'Girometro':80,'4':0,'StatoPorte':0,'capolinea':'Capolinea Torre'});
};

module.exports=TS;