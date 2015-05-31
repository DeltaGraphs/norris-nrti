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
.controller('MapChartController', ['$scope', '$controllerProvider', 'location', 'MapChartFactory', 'MapChartFlowFactory', 'SocketServicesFactory', function($scope, $controllerProvider, $location, MapChartFactory, MapChartFlowFactory, SocketServicesFactory){

	//var mapChart = $scope.mapChart;

	/*var json = {
			'title' : 'graficonuovo',
			'url' : 'https://norris-nrti-dev.herokuapp.com/page1/map1',
			'height' : 400,
			'width' : 400,
			'enabledLegend' : false,
			'horizontalGrid' : false,
			'verticalGrid' : false,
			'legendOnPoint' : true,
			'scale' : 999,
			'mapType' : 'roadMap',
			'zoom' : false,
	};

	$scope.mapChart = MapChartFactory.build(json);*/
	var socket;
	var url = $scope.mapChart.getUrl();

	this.socketConnection = function(){
		socket = SocketServicesFactory.build(url);
		// listenOnEvents();
	};

	this.listenOnEvents = function(){
		socket.on('configGraph', function(info){
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
			var flowList = $scope.mapChart.getFlowList();
			for (var i=0; i<flowList.length; i++){
				if (flowList[i].id === info.ID){
					flowList[i].flow.updateParameters(info);
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
	
	//$controllerProvider.register('MapChartController', this);
}]);