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

angular.module('app')
.controller('TableController', ['$scope', '$location', 'TableFactory', 'TableFlowFactory', 'SocketServicesFactory', function($scope, $location, TableFactory, TableFlowFactory, SocketServicesFactory){

	var socket;

	var json = {
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
				'flowID': 'flow1',
				'records': [
					{
						'norrisRecordID': 'xxx', // porn stuff
						'values': [5, 3],
						'appearance': [
							{
								'bg': '#FFFFFF',
								'text': '#FFFFFF'
							},
							{
								'bg': '#FFFFFF',
								'text': '#FFFFFF'							
							}
						]
					}
				]
			}
		]
	};

	$scope.table = TableFactory.build();
	$scope.table.updateParameters(json.properties);
	$scope.table.initializeData(json.data);

	this.socketConnection = function(url){
		//socket = SocketServicesFactory.build(url);
		//this.listenOnEvents();
	};

	var count = 0;
	$scope.changedP = true;
	$scope.changedD = true;
	this.listenOnEvents = function(){
		console.log('listen ON EVENTS');
		/*socket.on('configGraph', function(info){
			if (count === 0) {
				count++;
				$scope.mapChart.updateParameters(info.properties);
				$scope.mapChart.initializeData(info.data);
				$scope.changedP = !$scope.changedP;
				$scope.changedD = !$scope.changedD;  
	        }
		});
		socket.on('updateGraphProp', function(info){
			console.log('updateGraphProp');
			$scope.mapChart.updateParameters(info);
			$scope.changedP = !$scope.changedP;
		});
		socket.on('insertFlow', function(info){
			console.log('insertFlow');
			console.log('insert flow' + JSON.stringify(info));
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
		});*/

	};

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;

}]);