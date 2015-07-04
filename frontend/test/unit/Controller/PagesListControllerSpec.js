/*jshint node: true */
'use strict';

/*
* Name :  PagesListControllerSpec.js
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

describe('PagesListController', function(){

	var scope;
	var controller;
	var UrlProvider;

	beforeEach(function(){
		angular.mock.module('norris-nrti');
		inject(function($rootScope, $controller, $injector){
			UrlProvider = $injector.get('UrlProvider');
			scope = $rootScope.$new();
			controller = $controller('PagesListController', { $scope : scope });
		});
	});

	it('controller is defined', function() {
		expect(controller).toBeDefined();
	});

	describe('socketConnection', function(){

		beforeEach(function(){
			scope.url = "http://norris-nrti-dev.herokuapp.com/norris";
			controller.socketConnection();
		});

		it('socketConnection works fine', function(){
			expect(scope.socket).toBeDefined();
		});
	});
});