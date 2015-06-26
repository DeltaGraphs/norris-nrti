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

	beforeEach(function(){
		angular.mock.module('norris-nrti');
		module(function($provide){
			$provide.factory('SocketServicesFactory', function($rootScope){
				this.events = {};
				this.url;

				this.build = function(url){
					this.url = url;
				};

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

		inject(function($rootScope, $controller){
			scope = $rootScope.$new();
			controller = $controller('BarChartController', { $scope : scope });
		});
	});

	it('scope.mapChart is defined', function() {
		expect(scope.barChart).toBeDefined();
	});

	it('controller is defined', function() {
		expect(controller).toBeDefined();
	});

	describe('socketConnection', function(){

		beforeEach(function(){
			controller.socketConnection('http://norris-nrti-dev.herokuapp.com/page1/map1');
		});

		/*it('socketConnection works fine', function(){
			expect(count).toEqual(1);
		});*/
	});

});