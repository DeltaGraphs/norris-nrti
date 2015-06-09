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

	/*var json = {
		'properties':
		{
			'ID': 'id1',
			'title': 'tabella 1',	//stringa
			'type': 'Table',	
			'height': 500, // > 0
			'width': 600, // > 0
			'sortable': true,
			'maxItemsPage': 10, // > 0
			'addRowOn': 'bottom', // 'top', 'bottom'
			'headers': ['column1', 'column2'],
			'sort': {
				'column': 'col1',
				'ordering': 'ASC' // 'ASC', 'DESC'
			},
			'appearance': {
				'border': {
					'color': '#000000', //#xxxxxx,
					'width': 1 // > 0
				},
				'rowEven': {
					'textColor': ['#000000', '#000000'],
					'backgroundColor': ['#FFFFFF', '#FFFFFF']
				},
				'rowOdd': {
					'textColor': ['#000000', '#000000'],
					'backgroundColor': ['#FFFFFF', '#FFFFFF']
				},
				'headers': {
					'textColor': ['#000000', '#000000'],
					'backgroundColor': ['#FFFFFF', '#FFFFFF']
				}
			},
			'flows': [
				{
					'ID': 'flow1',
					'name': 'flow1',
					'maxItems': 50
				}
			]
		},
		'data': [
			{
				'ID': 'flow1',
				'records': [
					{'norrisRecordID': 'xx1', 'value': [1, 1]},
					{'norrisRecordID': 'xx2', 'value': [2, 32]},
					{'norrisRecordID': 'xx3', 'value': [3, 324]},
					{'norrisRecordID': 'xx4', 'value': [4, 354]},
					{'norrisRecordID': 'xx5', 'value': [5, 73]},
					{'norrisRecordID': 'xx6', 'value': [6, 33]},
					{'norrisRecordID': 'xx7', 'value': [7, 33]},
					{'norrisRecordID': 'xx8', 'value': [8, 36]},
					{'norrisRecordID': 'xx9', 'value': [9, 36]},
					{'norrisRecordID': 'x10', 'value': [10, 31]},
					{'norrisRecordID': 'x11', 'value': [11, 31]},
					{'norrisRecordID': 'x12', 'value': [11, 30]},
					{'norrisRecordID': 'x13', 'value': [12, 4]},
					{'norrisRecordID': 'x14', 'value': [17, 2]},
					{'norrisRecordID': 'x15', 'value': [17, 12]},
					{'norrisRecordID': 'x16', 'value': [50, 21]},
					{'norrisRecordID': 'x17', 'value': [50, 2]},
					{'norrisRecordID': 'x18', 'value': [51, 1]},
					{'norrisRecordID': 'x19', 'value': [52, 3]},
				]
			}
		]
	};*/

	$scope.table = TableFactory.build();
	//$scope.table.updateParameters(json.properties);
	//$scope.table.initializeData(json.data);

	this.socketConnection = function(url){
		console.log('TABLE socketConnection ' + url);
		socket = SocketServicesFactory.build(url);
		this.listenOnEvents();
	};

	var count = 0;
	$scope.changedP = true;
	$scope.changedD = true;
	this.listenOnEvents = function(){
		console.log('listen ON EVENTS');
		socket.on('configGraph', function(info){
			if (count === 0) {
				count++;
				$scope.table.updateParameters(info.properties);
				$scope.table.initializeData(info.data);
				$scope.changedD = !$scope.changedD;
				$scope.changedP = !$scope.changedP;  
	        }
		});
		socket.on('updateGraphProp', function(info){
			console.log('updateGraphProp');
			$scope.table.updateParameters(info);
			$scope.changedP = !$scope.changedP;
		});
		socket.on('insertFlow', function(info){
			console.log('insertFlow');
			console.log('insert flow' + JSON.stringify(info));
			var flow = MapChartFlowFactory.build(info.properties);
			flow.initializeData(info);
			$scope.table.addFlow(info.properties.ID, flow);
			$scope.changedD = !$scope.changedD;
		});
		socket.on('deleteFlow', function(info){
			console.log('deleteFlow');
			$scope.table.deleteFlow(info.ID);
			$scope.changedD = !$scope.changedD;
		});
		socket.on('updateFlowProp', function(info){
			console.log('updateFlowProp');
			for (var i=0; i<$scope.table.getFlowList().length; i++){
				if ($scope.table.getFlowList()[i].id === info.ID){
					$scope.table.getFlowList()[i].flow.updateParameters(info);
				}
			}
			$scope.changedD = !$scope.changedD;
		});
		socket.on('updateFlowData', function(data){
			console.log('updateFlowData ' + data.action);
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
			$scope.changedD = !$scope.changedD;
		});

	};

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;

}]);