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
* 0.1.0         2015-05-25  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-25  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

angular.module('app')
.controller('MapChartController', ['$scope', '$location', 'MapChartFactory', 'MapChartFlowFactory', 'SocketServicesFactory', function($scope, $location, MapChartFactory, MapChartFlowFactory, SocketServicesFactory){

	var socket;

	this.socketConnection = function(){
		socket = SocketServicesFactory.build($scope.mapChart.getUrl());
		this.listenOnEvents();
	};
	var count = 0;
	$scope.changedP = true;
	$scope.changedD = true;
	this.listenOnEvents = function(){
		console.log('listen ON EVENTS');
		socket.on('configGraph', function(info){
			if (count	=== 0) {
				console.log('configGraph');
				$scope.mapChart.updateParameters(info.properties);
				$scope.mapChart.initializeData(info.data);
				$scope.changedP = !$scope.changedP;
				$scope.changedD = !$scope.changedD;
	            count++;
	        }
		});
		socket.on('updateGraphProp', function(info){
			console.log('updateGraphProp');
			$scope.mapChart.updateParameters(info);
			$scope.changedP = !$scope.changedP;
		});
		socket.on('insertFlow', function(info){
			console.log('insertFlow');
			var flow = MapChartFlowFactory.build(info.properties);
			flow.initializeData(info);
			$scope.mapChart.addFlow(info.properties.ID, flow);
			$scope.changedD = !$scope.changedD;
		});
		socket.on('deleteFlow', function(info){
			console.log('deleteFlow');
			$scope.mapChart.deleteFlow(info.ID);
			$scope.changedD = !$scope.changedD;
		});
		socket.on('updateFlowProp', function(info){
			console.log('updateFlowProp');
			for (var i=0; i<$scope.mapChart.getFlowList().length; i++){
				if ($scope.mapChart.getFlowList()[i].id === info.ID){
					$scope.mapChart.getFlowList()[i].flow.updateParameters(info);
				}
			}
			$scope.changedD = !$scope.changedD;
		});
		socket.on('updateFlowData', function(data){
			console.log('updateFlowData ' + data.action);
			switch (data.action){
				case 'insertRecords':
					$scope.mapChart.streamUpdate(data);
					break;
				case 'deleteRecord':
					$scope.mapChart.deleteData(data);
					break;
				case 'updateRecord':
					$scope.mapChart.inPlaceUpdate(data);
					break;
				case 'replaceData':
					$scope.mapChart.replaceData(data);
					break;
			}
			$scope.changedD = !$scope.changedD;
		});

	};

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;

}]);