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

	var json = {
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
			'zoom' : false
	};

	var mapChart = MapChartFactory.build(json);
	$scope.mapChart = mapChart;
	var socket;
	var url = $scope.mapChart.getUrl();

	console.log(url);

	this.socketConnection = function(){
		console.log('socketConnection ' + url);
		socket = SocketServicesFactory.build(url);
		// listenOnEvents();
	};

	this.listenOnEvents = function(){
		socket.on('configGraph', function(info){
			console.log(JSON.stringify(info));
			console.log(mapChart.getLatitude());
			$scope.mapChart = mapChart.updateParameters(info.properties);
			$scope.mapChart = mapChart.initializeData(info.data);
		});
		socket.on('updateGraphProp', function(info){
			$scope.mapChart = mapChart.updateParameters(info);
		});
		socket.on('insertFlow', function(info){
			var flow = MapChartFlowFactory.build(info.properties);
			flow.initializeData(info);
			$scope.mapChart = mapChart.addFlow(info.properties.ID, flow);
		});
		socket.on('deleteFlow', function(info){
			$scope.mapChart = mapChart.deleteFlow(info.ID);
		});
		socket.on('updateFlowProp', function(info){
			var flowList = mapChart.getFlowList();
			for (var i=0; i<flowList.length; i++){
				if (flowList[i].id === info.ID){
					flowList[i].flow.updateParameters(info);
				}
			}
			$scope.mapChart = mapChart;
		});
		socket.on('updateFlowData', function(data){
			switch (data.action){
				case 'insertRecords':
					$scope.mapChart = mapChart.streamUpdate(data);
					break;
				case 'deleteRecord':
					$scope.mapChart = mapChart.deleteData(data);
					break;
				case 'updateRecord':
					$scope.mapChart = mapChart.inPlaceUpdate(data);
					break;
				case 'replaceData':
					$scope.mapChart = mapChart.replaceData(data);
					break;
			}
		});

	};

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;

}]);