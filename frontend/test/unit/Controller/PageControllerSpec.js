/*jshint node: true */
'use strict';

/*
* Name :  PageControllerSpec.js
* Module : UnitTest
* Location : /frontend/test/unit/Controller
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-06-27  Francesco Rossetto			Add all attributes and all methods
*
* 0.0.1         2015-06-27  Francesco Rossetto			Initial code      
* =================================================================================================
*
*/

describe('PageController', function(){

	var scope;
	var controller;

	beforeEach(function(){
		angular.mock.module('norris-nrti');
		inject(function($rootScope, $controller, $routeParams){
			$routeParams.pageId = 0;
			scope = $rootScope.$new();
			controller = $controller('PageController', { $scope : scope });
		});
	});

	it('controller is defined', function() {
		expect(controller).toBeDefined();
	});

	describe('socketConnection', function(){

		beforeEach(function(){
			scope.url = "http://norris-nrti-dev.herokuapp.com/page1"
			controller.socketConnection();
		});

		it('socketConnection works fine', function(){
			expect(scope.socket).toBeDefined();
		});
	});
	describe('matrix', function(){

		beforeEach(function(){
			scope.graphs = controller.matrix(scope.page.getGraphsList());
		});

		it('socketConnection works fine', function(){
			expect(scope.graphs).toBeDefined();
		});
	});


});