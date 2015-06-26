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

	beforeEach(function(){
		angular.mock.module('norris-nrti');
		module(function($provide){
			$provide.factory('SocketServicesFactory', function($rootScope){
				this.events = {};

				// Receive Events
				this.on = function(eventName, callback){
					if(!this.events[eventName]){
						this.events[eventName] = [];
					}
					this.events[eventName].push(callback);
				};

				// Send Events
				this.emit = function(eventName, data, emitCallback){
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
				};

				return this;

			});
		});

		inject(function($rootScope, $controller, $injector){
			scope = $rootScope.$new();
			socket = $injector.get('SocketServicesFactory');
			controller = $controller('BarChartController', { $scope : scope });
		});
	});


	it('controller is defined', function() {
		expect(controller).toBeDefined();
	});

	it('scope.mapChart is defined', function() {
		expect(scope.barChart).toBeDefined();
	});

	describe('#socketConnection', function(){

		describe('#listenOnEvents', function(){

			var configGraph = false;

			socket.on('configGraph', function(){
				configGraph = true;
			});

			it('configGraph', function(){
				expect(configGraph).toEqual(true);
			});
		});
	});

});