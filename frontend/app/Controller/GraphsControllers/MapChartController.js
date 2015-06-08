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

	$scope.mapChart = MapChartFactory.build();

	var count1 = 0;
	this.socketConnection = function(url){
		if (count1 === 0) {
			console.log('MAPCHART socketConnection ' + url);
			socket = SocketServicesFactory.build(url);
			this.listenOnEvents();
			count1++;
		}
	};

	var count = 0;
	$scope.changedP = true;
	$scope.changedD = true;
	$scope.changedF = true;
	this.listenOnEvents = function(){
		console.log('MAPCHART listenOnEvents');
		socket.on('configGraph', function(info){
			if (count === 0) {
				console.log('MAPCHART configGraph');
				count++;
				$scope.mapChart.updateParameters(info.properties);
				$scope.mapChart.initializeData(info.data);
				$scope.changedP = !$scope.changedP;
				$scope.changedD = !$scope.changedD;
	        }
		});
		socket.on('updateGraphProp', function(info){
			console.log('MAPCHART updateGraphProp');
			$scope.mapChart.updateParameters(info);
			$scope.changedP = !$scope.changedP;
		});
		socket.on('insertFlow', function(info){
			console.log('MAPCHART insert flow' + JSON.stringify(info));
			var flow = MapChartFlowFactory.build(info.properties);
			flow.initializeData(info);
			$scope.mapChart.addFlow(info.ID, flow);
			$scope.changedD = !$scope.changedD;
			$scope.changedF = !$scope.changedF;
		});
		socket.on('deleteFlow', function(info){
			console.log('MAPCHART deleteFlow');
			$scope.mapChart.deleteFlow(info.ID);
			$scope.changedD = !$scope.changedD;
			$scope.changedF = !$scope.changedF;
		});
		socket.on('updateFlowProp', function(info){
			console.log('MAPCHART updateFlowProp');
			for (var i=0; i<$scope.mapChart.getFlowList().length; i++){
				if ($scope.mapChart.getFlowList()[i].id === info.ID){
					$scope.mapChart.getFlowList()[i].flow.updateParameters(info);
				}
			}
			$scope.changedD = !$scope.changedD;
		});
		socket.on('updateFlowData', function(data){
			console.log('MAPCHART updateFlowData ' + data.action);
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