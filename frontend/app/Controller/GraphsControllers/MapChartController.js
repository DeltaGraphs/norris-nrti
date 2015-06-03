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

	this.listenOnEvents = function(){
		console.log('listen ON EVENTS');
		socket.on('configGraph', function(info){
			console.log(JSON.stringify(info));
			$scope.mapChart.updateParameters(info.properties);
			$scope.mapChart.initializeData(info.data);
		});
		socket.on('updateGraphProp', function(info){
			$scope.mapChart.updateParameters(info);
		});
		socket.on('insertFlow', function(info){
			var flow = MapChartFlowFactory.build(info.properties);
			flow.initializeData(info);
			$scope.mapChart.addFlow(info.properties.ID, flow);
		});
		socket.on('deleteFlow', function(info){
			$scope.mapChart.deleteFlow(info.ID);
		});
		socket.on('updateFlowProp', function(info){
			for (var i=0; i<$scope.mapChart.getFlowList().length; i++){
				if ($scope.mapChart.getFlowList()[i].id === info.ID){
					$scope.mapChart.getFlowList()[i].flow.updateParameters(info);
				}
			}
		});
		socket.on('updateFlowData', function(data){
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
		});

	};

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;

}]);