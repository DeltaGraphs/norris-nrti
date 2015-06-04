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

angular.module('app')
.controller('LineChartController', ['$scope', '$location', 'LineChartFactory', 'LineChartFlowFactory', 'SocketServicesFactory', function($scope, $location, LineChartFactory, LineChartFlowFactory, SocketServicesFactory){

	var socket;
	$scope.lineChart = LineChartFactory.build();

	/*
	this.socketConnection = function(url){
		socket = SocketServicesFactory.build(url);
		listenOnEvents();
	};


	this.listenOnEvents = function(){
		socket.on('configGraph', function(info){
			$scope.lineChart.updateParameters(info.properties);
			$scope.lineChart.initializeData(info.data);
		});
		socket.on('updateGraphProp', function(info){
			$scope.lineChart.updateParameters(info);
		});
		socket.on('insertFlow', function(info){
			var flow = LineChartFlowFactory.build(info.properties);
			flow.initializeData(info);
			$scope.lineChart.addFlow(info.properties.ID, flow);
		});
		socket.on('deleteFlow', function(info){
			$scope.lineChart.deleteFlow(info.ID);
		});
		socket.on('updateFlowProp', function(info){
			var flowList = $scope.lineChart.getFlowList();
			for (var i=0; i<flowList.length; i++){
				if (flowList[i].id === info.ID){
					flowList[i].flow.updateParameters(info);
				}
			}
		});
		socket.on('updateFlowData', function(data){
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
		});
	};

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	*/
}]);