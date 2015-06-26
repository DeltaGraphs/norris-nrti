/*jshint node: true */
'use strict';

/*
* Name :  SocketServices.js
* Module : UnitTest
* Location : /frontend/test/unit/Controller
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.1         2015-06-24  Maria Giovanna Chinellato   Fix module
*
* 0.1.0         2015-06-23  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-06-23  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/
describe('SocketServicesFactory', function(){
	
	var socket;
	var SocketServicesFactory;

	beforeEach(function(){
		angular.mock.module('norris-nrti');
		
		module(function($provide){
			$provide.factory('SocketServicesFactory', function($rootScope){
				
				function SocketServices() {

					return {
						events : [],
					    on: function(eventName, callback){
							this.events.push(eventName);
							$rootScope.$apply(callback);
						},
					    emit:function(eventName, data, emitCallback){
					    	for (var i=0; i<this.events.length; i++){
					    		if (this.events[i] === eventName){
					    			data = null;
					    		}
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
			SocketServicesFactory = $injector.get('SocketServicesFactory');
		});
	});	

	describe('#on', function(){

		var flag = false;

		beforeEach(function(){
			socket = SocketServicesFactory.build();
			socket.on('eventName', function(){
				flag = true;
			});
		});

		afterEach(function(){
			socket = null;
		});
		
		it('work fine', function(){
			expect(flag).toEqual(true);
		});
	});

	describe('#emit', function(){

		var flag = false;

		beforeEach(function(){
			socket = SocketServicesFactory.build();
			socket.emit('eventName', function(){
				flag = true;
			});
		});

		afterEach(function(){
			socket = null;
		});
		
		it('work fine', function(){
			expect(flag).toEqual(true);
		});
	});

});