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
.controller('LineChartController', ['$scope', '$location', 'LineChartFactory', 'LineChartFlowFactory', 'SocketServicesFactory', function($scope, $location, LineChartFactory, LineChartFlowFactory, SocketServicesFactory){

	var socket;
	$scope.lineChart = LineChartFactory.build();
	this.socketConnection = function(url){
		console.log('LINECHART socketConnection ' + url);
		socket = SocketServicesFactory.build(url);
		this.listenOnEvents();
	};
	var count = 0;
	$scope.changedP = true;
	$scope.changedD = true;
	//$scope.changedF = true;
	this.listenOnEvents = function(){
		console.log('LINECHART listenOnEvents');
		/*socket.on('configGraph', function(info){
			if (count === 0){
				console.log('LINECHART configGraph');
				$scope.lineChart.updateParameters(info.properties);
				$scope.lineChart.initializeData(info.data);
				$scope.changedP = !$scope.changedP;
				$scope.changedD = !$scope.changedD;
				count++;
			}
		});
		socket.on('updateGraphProp', function(info){
			console.log('LINECHART updateGraphProp');
			$scope.lineChart.updateParameters(info);
			$scope.changedP = !$scope.changedP;
		});
		socket.on('insertFlow', function(info){
			console.log('LINECHART insert flow' + JSON.stringify(info));
			var flow = LineChartFlowFactory.build(info); // no properties perchè non ci sono dati
			flow.initializeData(info);
			$scope.lineChart.addFlow(info.ID, flow);
			$scope.changedD = !$scope.changedD;
			//$scope.changedF = !$scope.changedF;
		});
		socket.on('deleteFlow', function(info){
			console.log('LINECHART deleteFlow');
			$scope.lineChart.deleteFlow(info.ID);
			//$scope.changedP = !$scope.changedP;
			$scope.changedD = !$scope.changedD;
			//$scope.changedF = !$scope.changedF;
		});
		socket.on('updateFlowProp', function(info){
			console.log('LINECHART updateFlowProp');
			for (var i=0; i<$scope.barChart.getFlowList().length; i++){
				if ($scope.lineChart.getFlowList()[i].id === info.ID){
					$scope.lineChart.getFlowList()[i].flow.updateParameters(info);
				}
			}
			$scope.changedD = !$scope.changedD;
		});
		socket.on('updateFlowData', function(data){
			console.log('LINECHART updateFlowData ' + data.action);
			switch (data.action){
				case 'insertRecords':
					$scope.lineChart.streamUpdate(data);
					break;
				case 'deleteRecord':
					$scope.lineChart.deleteData(data);
					break;
				case 'updateRecord':
					$scope.lineChart.inPlaceUpdate(data);
					break;
				case 'replaceData':
					$scope.lineChart.replaceData(data);
					break;
			}
			$scope.changedD = !$scope.changedD;
		});*/
	};

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
}]);