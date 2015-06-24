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

	beforeEach(angular.mock.module('norris-nrti'));

	beforeEach(inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		controller = $controller('BarChartController', { $scope : scope });
	}));

	it('controller is defined', function() {
		expect(controller).toBeDefined();
	});

	it('scope.barChart is defined', function() {
		expect(scope.barChart).toBeDefined();
	});


	describe('socketConnection', function(){

	
		beforeEach(function(){
			controller.socketConnection('http://norris-nrti-dev.herokuapp.com/page1/bar1');
		});

		

		/*

		it('socketConnection works fine', function(){
			expect(scope.socket).toBeDefined();
			expect(scope.count).toEqual(1);
		});*/
	});
});