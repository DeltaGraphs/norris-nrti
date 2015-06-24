/*jshint node: true */
'use strict';

/*
* Name :  LineChartControllerSpec.js
* Module : UnitTest
* Location : /frontend/test/unit/Controller
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.2         2015-06-24  Francesco Rossetto			fix describe 'LineChartController'
*
* 0.1.1         2015-06-24  Francesco Rossetto			fix configGraph
*
* 0.1.0         2015-06-24  Francesco Rossetto			Add all attributes and all methods
*
* 0.0.1         2015-06-24  Francesco Rossetto			Initial code      
* =================================================================================================
*
*/

describe('LineChartController', function(){

	var scope;
	var controller;

	beforeEach(function(){
		angular.mock.module('norris-nrti');
		inject(function($rootScope, $controller){
			scope = $rootScope.$new();
			controller = $controller('LineChartController', { $scope : scope });
		});
	});

	it('scope.lineChart is defined', function() {
		expect(scope.lineChart).toBeDefined();
	});

	it('controller is defined', function() {
		expect(controller).toBeDefined();
	});

	describe('socketConnection', function(){

		beforeEach(function(){
			socketConnection("http://norris-nrti-dev.herokuapp.com/page1/line1");
		});

		it('socketConnection works fine', function(){
			expect(socket).toBeDefined();
			expect(count).toEqual(1);
		});
	});
});