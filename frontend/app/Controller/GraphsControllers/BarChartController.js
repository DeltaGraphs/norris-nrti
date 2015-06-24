/*jshint node: true */
'use strict';

/*
* Name :  BarChartController.js
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
.controller('BarChartController', ['$scope', '$location', 'BarChartFactory', 'BarChartFlowFactory', 'SocketServicesFactory', 'ColorPicker', function($scope, $location, BarChartFactory, BarChartFlowFactory, SocketServicesFactory, ColorPicker){

	var socket;

	// crea un bar chart di default
	var barChart = BarChartFactory.build();
	$scope.barChart = barChart;

	// funzione che connette il socket all'url e chiama la funzione listenOnEvent
	this.socketConnection = function(url){
		socket = SocketServicesFactory.build(url);
		$scope.socket = socket;
		this.listenOnEvents();
	};

	var count = 0;
	$scope.changedP = true;
	$scope.changedD = true;

	// funzione che mette in ascolto il socket su alcuni eventi
	this.listenOnEvents = function(){
		socket.on('configGraph', function(info){ // ascolta sull'evento 'configGraph' (ricevuto come risposta alla connessione)
			if (count === 0){
				$scope.barChart.updateParameters(info.properties); // aggiorna le proprietà del bar chart di default con i dati appena ricevuti
				$scope.barChart.initializeData(info.data); // inizializza i flussi con i dati
				$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
				$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
				count++;
				$scope.count = count;
			}
		});
		socket.on('updateGraphProp', function(info){ // ascolta sull'evento 'updateGraphProp'
			console.log('updateGraphProp');
			$scope.barChart.updateParameters(info); // aggiorna le proprietà del bar chart con i dati appena ricevuti
			$scope.changedP = !$scope.changedP; // 'notifica' cambiamento proprietà
		});
		socket.on('insertFlow', function(info){ // ascolta sull'evento 'insertFlow'
			var flow = BarChartFlowFactory.build(info.properties); // crea un flusso di default
			flow.initializeData(info); // inizializza il flusso
			$scope.barChart.addFlow(info.properties.ID, flow); // aggiunge il flusso al grafico
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});
		socket.on('deleteFlow', function(info){ // ascolta sull'evento 'deleteFlow'
			$scope.barChart.deleteFlow(info.ID); // elimina un flusso
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});
		socket.on('updateFlowProp', function(info){ // ascolta sull'evento 'updateFlowProp'
			for (var i=0; i<$scope.barChart.getFlowList().length; i++){
				if ($scope.barChart.getFlowList()[i].id === info.ID){
					$scope.barChart.getFlowList()[i].flow.updateParameters(info); // aggiorna le proprietà di un flusso
				}
			}
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});
		socket.on('updateFlowData', function(data){ // ascolta sull'evento 'updateFlowData'
			switch (data.action){
				case 'insertRecords':
					$scope.barChart.addRecords(data); // aggiunge record
					break;
				case 'deleteRecord':
					$scope.barChart.deleteData(data); // elimina dati
					break;
				case 'updateRecord':
					$scope.barChart.inPlaceUpdate(data); // effettua aggiornamento in place
					break;
				case 'replaceData':
					$scope.barChart.replaceData(data); // rimpiazza dei dati
					break;
			}
			$scope.changedD = !$scope.changedD; // 'notifica' cambiamento dati
		});
	};

	// variabili e funzioni a disposizione dei test
	//$scope.socket = socket;
	//$scope.count = count;

	// mette a disposizione delle funzioni sullo scope
	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	$scope.defaultColorFlow = ColorPicker.getDefaultColor();

}]);