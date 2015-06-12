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

	beforeEach(angular.mock.module('norris-nrti'));

	var scope;
	var controller;
	var SocketServicesFactory;
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

    beforeEach(inject(function($rootScope, $controller, $injector){
    	scope = $rootScope.$new();
    	SocketServicesFactory = $injector.get('SocketServicesFactory');
    	socket = SocketServicesFactory.build();
        controller = $controller('MapChartController', { $scope : scope, socket : socket });
    }));

    it('scope.mapChart is defined', function() {
		expect(scope.mapChart).toBeDefined();
	});

    describe('listenOnEvent', function(){
    	
	    it('configGraph works fine', function(){
			socket.receive('configGraph',{
				'properties' : {
					'title' : 'titolocambiato'
				},
				'data' : []
			});
			expect(scope.mapChart.getTitle()).toEqual('titolocambiato');
			expect(scope.mapChart.getFlowList()[0].flow.getData()[0].value[0]).toEqual(0);
		});
    });
    
	//describe('socketConnection', function(){

	//});

	/*describe('listenOnEvent', function(){

		var data = [
			{
				'ID' : '1',
				'records' : [{ 'NorrisRecordID' : '234321', 'value' : [0,1]},{}]
			}
		];

		beforeEach(function(){
			scope.mapChart = MapChartFactory.build(json);
		});
		
		it ('listenOnEvent works fine', function(){
			controller('MapChartController', {$scope : scope});
			expect(scope.mapChart.getTitle()).toEqual('graficonuovo');
			notify.receive('configGraph',{
				'properties' : {
					'title' : 'titolocambiato'
				},
				'data' : data
			});
			expect(scope.mapChart.getTitle()).toEqual('titolocambiato');
			expect(scope.mapChart.getFlowList()[0].flow.getData()[0].value[0]).toEqual(0);
		});
	});*/
	
});