/*jshint node: true */
'use strict';

/*
* Name :  MapChartController.js
* Module : UnitTest
* Location : /frontend/test/unit/Controller
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

describe('MapChartController', function(){
	var scope;
	var controller;
	var socket;
	var json = {
			'title' : 'graficonuovo',
			'url' : 'localhost',
			'height' : 400,
			'width' : 400,
			'enabledLegend' : false,
			'horizontalGrid' : false,
			'verticalGrid' : false,
			'legendOnPoint' : false,
			'latitude' : 3,
			'longitude' : 3,
			'scale' : 999,
			'mapType' : 'terrain',
			'zoom' : false,
			'flows' : [{'ID' : '1'},{'ID' : '2'},{'ID' : '3'}]
	};
	var MapChartFactory;

	beforeEach(angular.mock.module('app'));

    beforeEach(inject(function ($rootScope, $controller, $injector) {
        MapChartFactory = $injector.get('MapChartFactory');
        scope = $rootScope.$new();
        scope.mapChart = MapChartFactory.build(json);
        socket = $injector.get('SocketServices');
        controller = $controller('MapChartController', {
            $scope : scope
        });
    }));

	describe('socketConnection', function(){

	});

	describe('listenOnEvent', function(){

		var data = [
			{
				'ID' : '1',
				'records' : [{ 'NorrisRecordID' : '234321', 'value' : [0,1]},{}]
			}
		];
		
		it ('listenOnEvent works fine', function(){
			expect(scope.mapChart.getTitle()).toEqual('graficonuovo');
			socket.receive('configGraph',{
				'properties' : {
					'title' : 'titolocambiato'
				},
				'data' : data
			});
			expect(scope.mapChart.getTitle()).toEqual('titolocambiato');
			expect(scope.mapChart.getFlowList()[0].flow.getData()[0].value[0]).toEqual(0);
		});
	});

});