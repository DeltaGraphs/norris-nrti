/*jshint node: true */
'use strict';

/*
* Name :  LineChartController.js
* Module : FrontEnd::Controller::GraphsController
* Location : /frontend/app/Controller/GraphsController
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-05-30  Francesco Rossetto			Add all attributes and methods
*
* 0.0.1         2015-05-30  Francesco Rossetto			Initial code      
* =================================================================================================
*
*/

angular.module('norris-nrti')
.controller('LineChartController', ['$scope', '$location', 'LineChartFactory', 'LineChartFlowFactory', 'SocketServicesFactory', 'ColorPicker', function($scope, $location, LineChartFactory, LineChartFlowFactory, SocketServicesFactory, ColorPicker){

	var socket;
	var lineChart = LineChartFactory.build(); // crea un line chart di default
	$scope.lineChart = lineChart;
	
	// funzione che connette il socket all'url e chiama la funzione listenOnEvent
	this.socketConnection = function(url){
		socket = SocketServicesFactory.build(url);
		this.listenOnEvents();
	};
	var count = 0;
	$scope.changedP = true;
	$scope.changedD = true;

	// funzione che mette in ascolto il socket su alcuni eventi
	this.listenOnEvents = function(){
		/*socket.on('configGraph', function(info){ // ascolta sull'evento 'configGraph' (ricevuto come risposta alla connessione)
			if (count === 0){
				$scope.lineChart.updateParameters(info.properties); // aggiorna le proprietà del line chart di default con i dati appena ricevuti
				$scope.lineChart.initializeData(info.data); // inizializza i flussi con i dati
				$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
				$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
				count++;
			}
		});
		socket.on('updateGraphProp', function(info){ // ascolta sull'evento 'updateGraphProp'
			$scope.lineChart.updateParameters(info);  // aggiorna le proprietà del line chart con i dati appena ricevuti
			$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
		});
		socket.on('insertFlow', function(info){ // ascolta sull'evento 'insertFlow'
			var flow = LineChartFlowFactory.build(info.properties); // crea un flusso di default
			flow.initializeData(info); // inizializzail flusso
			$scope.lineChart.addFlow(info.properties.ID, flow); // aggiunge il flusso al grafico
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
			$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
		});
		socket.on('deleteFlow', function(info){
			$scope.lineChart.deleteFlow(info.ID); // elimina un flusso
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
			$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
		});
		socket.on('updateFlowProp', function(info){ // ascolta sull'evento 'updateFlowProp'
			for (var i=0; i<$scope.barChart.getFlowList().length; i++){
				if ($scope.lineChart.getFlowList()[i].id === info.ID){
					$scope.lineChart.getFlowList()[i].flow.updateParameters(info); // aggiorna le proprietà dei flussi
				}
			}
			$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
		});
		socket.on('updateFlowData', function(data){
			switch (data.action){
				case 'insertRecords':
					$scope.lineChart.streamUpdate(data); // effettua un aggiornamento di tipo stream
					break;
				case 'deleteRecord':
					$scope.lineChart.deleteData(data); // elimina dei dati
					break;
				case 'updateRecord':
					$scope.lineChart.inPlaceUpdate(data);  // effettua aggiornamento di tipo in place
					break;
				case 'replaceData':
					$scope.lineChart.replaceData(data); // rimpiazza dei dati
					break;
			}
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});*/
	};

	// mette a disposizione delle funzioni sullo scope
	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	$scope.defaultColorFlow = ColorPicker.getDefaultColor();
}]);