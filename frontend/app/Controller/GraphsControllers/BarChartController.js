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

angular.module('app')
.controller('BarChartController', ['$scope', '$location', 'BarChartFactory', 'BarChartFlowFactory', 'SocketServicesFactory', function($scope, $location, BarChartFactory, BarChartFlowFactory, SocketServicesFactory){

	var socket;
	$scope.barChart = BarChartFactory.build();

	/*
	this.socketConnection = function(url){
		socket = SocketServicesFactory.build(url);
		listenOnEvents();
	};


	this.listenOnEvents = function(){
		socket.on('configGraph', function(info){
			$scope.barChart.updateParameters(info.properties);
			$scope.barChart.initializeData(info.data);
		});
		socket.on('updateGraphProp', function(info){
			$scope.barChart.updateParameters(info);
		});
		socket.on('insertFlow', function(info){
			var flow = BarChartFlowFactory.build(info.properties);
			flow.initializeData(info);
			$scope.barChart.addFlow(info.properties.ID, flow);
		});
		socket.on('deleteFlow', function(info){
			$scope.barChart.deleteFlow(info.ID);
		});
		socket.on('updateFlowProp', function(info){
			var flowList = $scope.barChart.getFlowList();
			for (var i=0; i<flowList.length; i++){
				if (flowList[i].id === info.ID){
					flowList[i].flow.updateParameters(info);
				}
			}
		});
		socket.on('updateFlowData', function(data){
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
		});
	};

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	
	*/
}]);