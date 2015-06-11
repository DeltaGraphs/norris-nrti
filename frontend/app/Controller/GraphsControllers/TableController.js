/*jshint node: true */
'use strict';

/*
* Name :  TableController.js
* Module : FrontEnd::Controller::GraphsController
* Location : /frontend/app/Controller/GraphsController
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-06-04 Francesco Rossetto			Add all attributes and methods
*
* 0.0.1         2015-06-04  Francesco Rossetto			Initial code      
* =================================================================================================
*/

angular.module('norris-nrti')
.controller('TableController', ['$scope', '$location', 'TableFactory', 'TableFlowFactory', 'SocketServicesFactory', function($scope, $location, TableFactory, TableFlowFactory, SocketServicesFactory){

	var socket;
	var table = TableFactory.build();
	$scope.table = table;

	this.socketConnection = function(url){
		console.log('TABLE socketConnection ' + url);
		socket = SocketServicesFactory.build(url);
		this.listenOnEvents();
	};

	var count = 0;
	$scope.changed = true;
	//$scope.changedD = true;
	this.listenOnEvents = function(){
		console.log('listen ON EVENTS');
		socket.on('configGraph', function(info){
			console.log('TABLE config graph');
			if (count === 0) {
				count++;
				$scope.table.updateParameters(info.properties);
				$scope.table.initializeData(info.data);
				$scope.changed = !$scope.changed;
				//$scope.changedP = !$scope.changedP;  
	        }
		});
		socket.on('updateGraphProp', function(info){
			console.log('TABLE updateGraphProp');
			$scope.table.updateParameters(info);
			$scope.changed = !$scope.changed;
		});
		socket.on('insertFlow', function(info){
			console.log('TABLE  insert flow' + JSON.stringify(info));
			var flow = TableFlowFactory.build(info.properties);
			flow.initializeData(info, $scope.table.getAddRowOn());
			$scope.table.addFlow(info.properties.ID, flow);
			$scope.changed = !$scope.changed;
		});
		socket.on('deleteFlow', function(info){
			console.log('TABLE  deleteFlow');
			$scope.table.deleteFlow(info.ID);
			$scope.changed = !$scope.changed;
		});
		socket.on('updateFlowProp', function(info){
			console.log('TABLE  updateFlowProp');
			for (var i=0; i<$scope.table.getFlowList().length; i++){
				if ($scope.table.getFlowList()[i].id === info.ID){
					$scope.table.getFlowList()[i].flow.updateParameters(info);
				}
			}
			$scope.changed = !$scope.changed;
		});
		socket.on('updateFlowData', function(data){
			console.log('TABLE  updateFlowData ' + data.action);
			switch (data.action){
				case 'insertRecords':
					$scope.table.streamUpdate(data);
					break;
				case 'deleteRecord':
					$scope.table.deleteData(data);
					break;
				case 'updateRecord':
					$scope.table.inPlaceUpdate(data);
					break;
				case 'replaceData':
					$scope.table.replaceData(data);
					break;
			}
			$scope.changed = !$scope.changed;
		});

	};

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;

}]);