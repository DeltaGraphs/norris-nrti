/*jshint node: true */
'use strict';

/*
* Name :  MapChartController.js
* Module : FrontEnd::Controller::GraphsController
* Location : /frontend/app/Controller/GraphsController
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.0         2015-05-25  Francesco Rossetto		   Tested
*
* 0.1.0         2015-05-25  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-25  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

angular.module('norris-nrti')
.controller('MapChartController', function($scope, $location, MapChartFactory, MapChartFlowFactory, SocketServicesFactory){

	var socket;
	var mapChart = MapChartFactory.build(); // crea un map chart di default
	$scope.mapChart = mapChart;

	// funzione che connette il socket all'url e chiama la funzione listenOnEvent
	var count1 = 0;
	this.socketConnection = function(url){
		if (count1 === 0) {
			socket = SocketServicesFactory.build(url);
			$scope.socket = socket;
			this.listenOnEvents();
			count1++;
		}
	};

	var count = 0;
	$scope.changedP = true;
	$scope.changedD = true;
	$scope.changedF = true;

	// funzione che mette in ascolto il socket su alcuni eventi
	this.listenOnEvents = function(){
		socket.on('configGraph', function(info){ // ascolta sull'evento 'configGraph' (ricevuto come risposta alla connessione)
			if (count === 0) {
				count++;
				$scope.mapChart.updateParameters(info.properties); // aggiorna le proprietà del map chart di default con i dati appena ricevuti
				$scope.mapChart.initializeData(info.data); // inizializza i flussi con i dati
				$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
				$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
	        }
		});
		socket.on('updateGraphProp', function(info){ // ascolta sull'evento 'updateGraphProp'
			$scope.mapChart.updateParameters(info); // aggiorna le proprietà del map chart con i dati appena ricevuti
			$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
		});
		socket.on('insertFlow', function(info){ // ascolta sull'evento 'insertFlow'
			var flow = MapChartFlowFactory.build(info.properties); // crea un flusso di default
			flow.initializeData(info); // inizializzail flusso
			$scope.mapChart.addFlow(info.ID, flow); // aggiunge il flusso al grafico
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});
		socket.on('deleteFlow', function(info){ // ascolta sull'evento 'deleteFlow'
			$scope.mapChart.deleteFlow(info.ID); // elimina un flusso
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});
		socket.on('updateFlowProp', function(info){ // ascolta sull'evento 'updateFlowProp'
			for (var i=0; i<$scope.mapChart.getFlowList().length; i++){
				if ($scope.mapChart.getFlowList()[i].id === info.ID){
					$scope.mapChart.getFlowList()[i].flow.updateParameters(info); // aggiorna le proprietà dei flussi
				}
			}
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});
		socket.on('updateFlowData', function(data){ // ascolta sull'evento 'updateFlowData'
			switch (data.action){
				case 'insertRecords':
					$scope.mapChart.streamUpdate(data); // effettua un aggiornamento di tipo stream
					break;
				case 'deleteRecord':
					$scope.mapChart.deleteData(data); // elimina dei dati
					break;
				case 'updateRecord':
					$scope.mapChart.inPlaceUpdate(data); // effettua aggiornamento di tipo in place
					break;
				case 'replaceData':
					$scope.mapChart.replaceData(data); // rimpiazza dei dati
					break;
			}
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});

	};
	// variabili e funzioni a disposizione dei test
	$scope.socket = socket;

	// mette a disposizione delle funzioni sullo scope
	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;

});