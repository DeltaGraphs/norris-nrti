/*jshint node: true, -W106 */
'use strict';

/*
* Name : TS9.js
* Module : TS9
* Location : /systemTest
*
* Requirements tested:
*	FBOB3.2.4 			Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati della table.
*	FBOB3.2.4.1 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati della table con il metodo di aggiornamento in place.
*	FBOB3.2.4.2 		Il framework deve dare la possibilità all'utente sviluppatore di aggiornare i dati della table con il metodo di aggiornamento stream.
*	FBDE3.2.5 			Il framework deve dare la possibilità all'utente sviluppatore di eliminare flussi di dati dai grafici.
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
	
	table.createTableFlow({
        ID:'flow2',
        name: 'flusso 2',
        columnKeys: ['0','1','2'],
        maxItemsSaved: 5
    });
	var index=0;
	var repeat=function(){
		if (index>=5){
			table.deleteFlow('flow2');
			table.createTableFlow({
		        ID:'flow2',
		        name: 'flusso 2',
		        columnKeys: ['0','1','2'],
		        filters: 'IdMezzo>806',
		        maxItemsSaved: 5
		    });
			index=0;
		}
		table.updateRecord('flow1', IDs[index], {'0':Math.floor((Math.random() * 10) + 1), '1':Math.floor((Math.random() * 10) + 1), '2':Math.floor((Math.random() * 10) + 1)});
		table.addRecord('flow2', {'0':Math.floor((Math.random() * 10) + 1), '1':Math.floor((Math.random() * 10) + 1), '2':Math.floor((Math.random() * 10) + 1)});
		index++;
	};
	setInterval(function () {repeat();}, 5000);
};

module.exports=TS;