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

    beforeEach(inject(function($rootScope, $controller, $injector){
    	scope = $rootScope.$new();
    	SocketServicesFactory = $injector.get('SocketServicesFactory');
    	socket = SocketServicesFactory.build('http://norris-nrti-dev.herokuapp.com/page1/map1');
        controller = $controller('MapChartController', { $scope : scope });
    }));

    it('scope.mapChart is defined', function() {
		expect(scope.mapChart).toBeDefined();
	});

	it('scope.mapChart is defined', function() {
		expect(socket).toBeDefined();
	});

    describe('listenOnEvent', function(){
    	
	    it('configGraph works fine', function(){
			socket.on('configGraph', {
				'properties':{
					'ID':'map1',
					'title':'APS',
					'type':'MapChart',
					'height':600,
					'width':1000,
					'enableLegend':true,
					'legendOnPoint':true,
					'latitude':45.4113311,
					'longitude':11.8876318,
					'mapType':'roadmap',
					'mapWidth':2000,
					'mapHeight':2000,
					'legend':{
						'position':'NW',
						'fontColor':'#00AA00',
						'backgroundColor':'#FFAAFF'
					},
					'flows':[
						{
							'ID':'flow1',
							'name':'linea 22',
							'filters':null,
							'longitudeKey':'2',
							'latitudeKey':'1',
							'objectKey':'0',
							'longitudeFormat':'coordinates',
							'latitudeFormat':'coordinates',
							'marker':{
								'type':'shape',
								'shape':'bus',
								'color':'#FFC4F6'
							},
						}
					]
				}
			});
			expect(scope.mapChart.getTitle()).toEqual('APS');
			expect(scope.mapChart.getFlowList().length).toEqual(1);
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