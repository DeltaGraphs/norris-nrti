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
.controller('BarChartController', ['$scope', '$location', 'BarChartFactory', 'BarChartFlowFactory', 'SocketServicesFactory', function($scope, $location, BarChartFactory, BarChartFlowFactory, SocketServicesFactory){

	var socket;
	$scope.barChart = BarChartFactory.build();

	this.socketConnection = function(url){
		console.log('BARCHART socketConnection ' + url);
		socket = SocketServicesFactory.build(url);
		this.listenOnEvents();
	};

	var count = 0;
	$scope.changedP = true;
	$scope.changedD = true;
	//$scope.changedF = true;
	this.listenOnEvents = function(){
		console.log('BARCHART listenOnEvents');
		socket.on('configGraph', function(info){
			if (count === 0){
				console.log('BARCHART configGraph');
				$scope.barChart.updateParameters(info.properties);
				$scope.barChart.initializeData(info.data);
				$scope.changedD = !$scope.changedD;
				$scope.changedP = !$scope.changedP;
				count++;
			}
		});
		socket.on('updateGraphProp', function(info){
			console.log('BARCHART updateGraphProp');
			$scope.barChart.updateParameters(info);
			$scope.changedP = !$scope.changedP;
		});
		socket.on('insertFlow', function(info){
			console.log('BARCHART insert flow');
			var flow = BarChartFlowFactory.build(info.properties);
			flow.initializeData(info);
			$scope.barChart.addFlow(info.properties.ID, flow);
			$scope.changedD = !$scope.changedD;

			//$scope.changedF = !$scope.changedF;
		});
		socket.on('deleteFlow', function(info){
			console.log('BARCHART deleteFlow');
			$scope.barChart.deleteFlow(info.ID);
			$scope.changedD = !$scope.changedD;
			//$scope.changedF = !$scope.changedF;
		});
		socket.on('updateFlowProp', function(info){
			console.log('BARCHART updateFlowProp'  + JSON.stringify($scope.barChart));
			for (var i=0; i<$scope.barChart.getFlowList().length; i++){
				if ($scope.barChart.getFlowList()[i].id === info.ID){
					$scope.barChart.getFlowList()[i].flow.updateParameters(info);
				}
			}
			$scope.changedD = !$scope.changedD;
		});
		socket.on('updateFlowData', function(data){
			console.log('BARCHART updateFlowData');
			switch (data.action){
				case 'insertRecords':
					$scope.barChart.addRecords(data);
					break;
				case 'deleteRecord':
					$scope.barChart.deleteData(data);
					break;
				case 'updateRecord':
					$scope.barChart.inPlaceUpdate(data);
					break;
				case 'replaceData':
					$scope.barChart.replaceData(data);
					break;
			}
			$scope.changedD = !$scope.changedD;
		});
	};


	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;

}]);