/*jshint node: true */
'use strict';

/*
* Name :  BarChartControllerSpec.js
* Module : UnitTest
* Location : /frontend/test/unit/Controller
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.3         2015-06-26  Maria Giovanna Chinellato	fix test
*
* 0.1.2         2015-06-24  Francesco Rossetto			fix describe 'BarChartController'
*
* 0.1.1         2015-06-23  Francesco Rossetto			fix configGraph
*
* 0.1.0         2015-05-25  Francesco Rossetto			Add all attributes and all methods
*
* 0.0.1         2015-05-25  Francesco Rossetto			Initial code      
* =================================================================================================
*
*/

describe('BarChartController', function(){

	var scope;
	var controller;
	var socket;
	var SocketServicesFactory;

	beforeEach(function(){
		angular.mock.module('norris-nrti');
		//angular.mock.module('mockSocket');
		module(function($provide){
			$provide.factory('SocketServicesFactory', function($rootScope){
				
				function SocketServices() {
					this.events = {};

					return {
					    on: function(eventName, callback){
							if(this.events[eventName] !== undefined){
								this.events[eventName].push(callback);
							}
							else{
								this.events[eventName] = [];
							}
						},
					    emit:function(eventName, data, emitCallback){
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
				}

				function SocketServicesFactory() {}

				SocketServicesFactory.build = function () {
				return new SocketServices();
				};

				return SocketServicesFactory;

			});
		});

		inject(function($rootScope, $controller, $injector){
			scope = $rootScope.$new();
			SocketServicesFactory = $injector.get('SocketServicesFactory');
			controller = $controller('BarChartController', { $scope : scope });
		});
	});


	it('controller is defined', function() {
		expect(controller).toBeDefined();
	});

	it('scope.mapChart is defined', function() {
		expect(scope.barChart).toBeDefined();
	});

	//describe('#socketConnection', function(){

		describe('#listenOnEvents', function(){

			var configGraph = false;
			var updateGraphProp = false;
			var insertFlow = false;
			var deleteFlow = false;
			var updateFlowProp = false;
			var updateFlowData = false;

			beforeEach(function(){
				socket = SocketServicesFactory.build();
				socket.on('configGraph', function(){
					configGraph = true;
				});
			});

			afterEach(function(){
				socket = null;
			});
			
			it('configGraph', function(){
				expect(configGraph).toEqual(true);
			});

			/*socket.on('updateGraphProp', function(){
				updateGraphProp = true;
			});
			it('updateGraphProp', function(){
				expect(updateGraphProp).toEqual(true);
			});

			socket.on('insertFlow', function(){
				insertFlow = true;
			});
			it('insertFlow', function(){
				expect(insertFlow).toEqual(true);
			});

			socket.on('deleteFlow', function(){ 
				deleteFlow = true;
			});
			it('deleteFlow', function(){
				expect(deleteFlow).toEqual(true);
			});

			socket.on('updateFlowProp', function(){
				updateFlowProp = true;
			});
			it('updateFlowProp', function(){
				expect(updateFlowProp).toEqual(true);
			});

			socket.on('updateFlowData', function(){
				updateFlowData = true;
			});
			it('updateFlowData', function(){
				expect(updateFlowData).toEqual(true);
			});*/
		});
	//});

});