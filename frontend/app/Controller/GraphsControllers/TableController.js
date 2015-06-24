/*jshint node: true */
'use strict';

/*
* Name :  TableController.js
* Module : FrontEnd::Controller::GraphsController
* Location : /frontend/app/Controller/GraphsController
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-06-04 Francesco Rossetto			Add all attributes and methods
*
* 0.0.1         2015-06-04  Francesco Rossetto			Initial code      
* =================================================================================================
*/

angular.module('norris-nrti')
.controller('TableController', ['$scope', '$location', 'TableFactory', 'TableFlowFactory', 'SocketServicesFactory', function($scope, $location, TableFactory, TableFlowFactory, SocketServicesFactory){

	var socket;
	var table = TableFactory.build(); // crea una table di default
	$scope.table = table;

	// funzione che connette il socket all'url e chiama la funzione listenOnEvent
	this.socketConnection = function(url){
		socket = SocketServicesFactory.build(url);
		this.listenOnEvents();
	};

	var count = 0;
	$scope.changed = true;
	$scope.changedP = false;

	// funzione che mette in ascolto il socket su alcuni eventi
	this.listenOnEvents = function(){
		socket.on('configGraph', function(info){ // ascolta sull'evento 'configGraph' (ricevuto come risposta alla connessione)
			if (count === 0) {
				count++;
				$scope.table.updateParameters(info.properties); // aggiorna le proprietà della table di default con i dati appena ricevuti
				$scope.table.initializeData(info.data); // inizializza i flussi con i dati
				$scope.changed = !$scope.changed; // 'notifica' cambiamento dati e proprietà
				console.log('changedP controller');
				$scope.changedP = true;
	        }
		});
		socket.on('updateGraphProp', function(info){ // ascolta sull'evento 'updateGraphProp'
			$scope.table.updateParameters(info); // aggiorna le proprietà della table con i dati appena ricevuti
			$scope.changed = !$scope.changed; // 'notifica' cambiamento proprietà
			console.log('changedP controller');
			$scope.changedP = true;
		});
		socket.on('insertFlow', function(info){ // ascolta sull'evento 'insertFlow'
			var flow = TableFlowFactory.build(info.properties); // crea un flusso di default
			flow.initializeData(info, $scope.table.getAddRowOn()); // inizializzail flusso
			$scope.table.addFlow(info.properties.ID, flow); // aggiunge il flusso al grafico
			$scope.changed = !$scope.changed; // 'notifica' cambiamento dati
		});
		socket.on('deleteFlow', function(info){ // ascolta sull'evento 'deleteFlow'
			$scope.table.deleteFlow(info.ID); // elimina un flusso
			$scope.changed = !$scope.changed; // 'notifica' cambiamento dati
		});
		socket.on('updateFlowProp', function(info){ // ascolta sull'evento 'updateFlowProp'
			for (var i=0; i<$scope.table.getFlowList().length; i++){
				if ($scope.table.getFlowList()[i].id === info.ID){
					$scope.table.getFlowList()[i].flow.updateParameters(info); // aggiorna le proprietà dei flussi
				}
			}
			$scope.changed = !$scope.changed; // 'notifica' cambiamento dati
		});
		socket.on('updateFlowData', function(data){ // ascolta sull'evento 'updateFlowData'
			switch (data.action){
				case 'insertRecords':
					$scope.table.streamUpdate(data); // effettua un aggiornamento di tipo stream
					break;
				case 'deleteRecord':
					$scope.table.deleteData(data); // elimina dei dati
					break;
				case 'updateRecord':
					$scope.table.inPlaceUpdate(data); // effettua aggiornamento di tipo in place
					break;
				case 'replaceData':
					$scope.table.replaceData(data); // rimpiazza dei dati
					break;
			}
			$scope.changed = !$scope.changed; // 'notifica' cambiamento dati
		});

	};

	// mette a disposizione delle funzioni sullo scope
	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;

}]);