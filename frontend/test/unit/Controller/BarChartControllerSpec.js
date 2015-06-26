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
		angular.mock.module('mockSocket');

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
			var updateGraphProp = false;
			var insertFlow = false;
			var deleteFlow = false;
			var updateFlowProp = false;
			var updateFlowData = false;

			socket.on('configGraph', function(){
				configGraph = true;
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
	});

});