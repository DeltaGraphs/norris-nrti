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
	var socket = function($rootScope){
		this.events = {};

		// Receive Events
		return {
			on : function(eventName, callback){
				if(!this.events[eventName]){
					this.events[eventName] = [];
				}
				this.events[eventName].push(callback);
			},

		// Send Events
			emit: function(eventName, data, emitCallback){
				if(this.events[eventName]){
					angular.forEach(this.events[eventName], function(callback){
						$rootScope.$apply(function() {
							callback(data);
						});
					});
				}
				if(emitCallback){
					emitCallback();
				}
			}
		};

	};

    beforeEach(inject(function($rootScope, $controller){
    	scope = $rootScope.$new();
        controller = $controller('MapChartController', { $scope : scope, socket : socket });
    }));

    describe('Constructor', function(){
    	it('controller is defined', function() {
			expect(controller).toBeDefined();
		});

	    it('scope.mapChart is defined', function() {
			expect(scope.mapChart).toBeDefined();
		});
    });

	/*deeescribe('listenOnEvent', function(){
    	
	    it('configGraph works fine', function(){
			socket.on('configGraph', {
				'properties':{
					'ID':'map1',
					'title':'APS',
					'type':'MapChart',
					'height':600,
					'width':1000,
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
							}
						}
					]
				}
			});
			expect(scope.mapChart.getTitle()).toEqual('APS');
			expect(scope.mapChart.getHeight()).toEqual(600);
			expect(scope.mapChart.getWidth()).toEqual(1000);
			expect(scope.mapChart.getFlowList().length).toEqual(1);
		});

	});*/

	/*var scope;
	var controller;
	var notify;

    beforeEach(inject(function($rootScope, $controller, _socketFactory_){
    	scope = $rootScope.$new();
    	notify = _socketFactory_;
        controller = $controller('MapChartController', { $scope : scope });
    }));

    it('scope.mapChart is defined', function() {
		expect(scope.mapChart).toBeDefined();
	});

	it('scope.mapChart is defined', function() {
		expect(notify).toBeDefined();
	});

    deeescribe('listenOnEvent', function(){
    	
	    it('configGraph works fine', function(){
			notify.receive('configGraph', {
				'properties':{
					'ID':'map1',
					'title':'APS',
					'type':'MapChart',
					'height':600,
					'width':1000,
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
							}
						}
					]
				}
			});
			expect(scope.mapChart.getTitle()).toEqual('APS');
			expect(scope.mapChart.getHeight()).toEqual(600);
			expect(scope.mapChart.getWidth()).toEqual(1000);
			expect(scope.mapChart.getFlowList().length).toEqual(1);
		});

		it('updateGraphProp works fine', function(){
			notify.receive('updateGraphProp', {
				'height':1000,
				'width':600
			});
			expect(scope.mapChart.getHeight()).toEqual(1000);
			expect(scope.mapChart.getWidth()).toEqual(600);
		});

		it('configGraph works fine', function(){
			socket.on('configGraph', {
				'properties':{
					'ID':'map1',
					'title':'APS',
					'type':'MapChart',
					'height':600,
					'width':1000,
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
			expect(scope.mapChart.getHeight()).toEqual(600);
			expect(scope.mapChart.getWidth()).toEqual(1000);
			expect(scope.mapChart.getFlowList().length).toEqual(1);
		});

		it('configGraph works fine', function(){
			socket.on('configGraph', {
				'properties':{
					'ID':'map1',
					'title':'APS',
					'type':'MapChart',
					'height':600,
					'width':1000,
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
			expect(scope.mapChart.getHeight()).toEqual(600);
			expect(scope.mapChart.getWidth()).toEqual(1000);
			expect(scope.mapChart.getFlowList().length).toEqual(1);
		});

		it('configGraph works fine', function(){
			socket.on('configGraph', {
				'properties':{
					'ID':'map1',
					'title':'APS',
					'type':'MapChart',
					'height':600,
					'width':1000,
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
			expect(scope.mapChart.getHeight()).toEqual(600);
			expect(scope.mapChart.getWidth()).toEqual(1000);
			expect(scope.mapChart.getFlowList().length).toEqual(1);
		});
    });
    
	//deeescribe('socketConnection', function(){

	//});

	deeescribe('listenOnEvent', function(){

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