/*jshint node: true */
'use strict';

/*
* Name :  MapChartControllerSpec.js
* Module : UnitTest
* Location : /frontend/test/unit/Controller
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.2         2015-06-24  Maria Giovanna Chinellato   fix describe 'MapChartController'
*
* 0.1.1         2015-06-23  Maria Giovanna Chinellato   fix configGraph
*
* 0.1.0         2015-05-25  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-25  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

describe('MapChartController', function(){

	var scope;
	var controller;

	beforeEach(function(){
		angular.mock.module('norris-nrti');
		inject(function($rootScope, $controller){
			scope = $rootScope.$new();
			controller = $controller('MapChartController', { $scope : scope });
		});
	});

	it('scope.mapChart is defined', function() {
		expect(scope.mapChart).toBeDefined();
	});

	it('controller is defined', function() {
		expect(controller).toBeDefined();
	});

	describe('#socketConnection', function(){

		beforeEach(function(){
			controller.socketConnection("http://norris-nrti-dev.herokuapp.com/page1/map1");
		});

		it('socketConnection works fine', function(){
			expect(count).toEqual(1);
		});
	});
});