/*jshint node: true */
'use strict';

/*
* Name :  PagesListViewSpec.js
* Module : UnitTest
* Location : /frontend/test/unit/View
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-06-13  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-06-13  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

describe('PageView', function(){

	beforeEach(angular.mock.module('norris-nrti'));

	var element, scope, controller;

	beforeEach(inject(function($rootScope, $compile, $controller) {
    	scope = $rootScope.$new();

    	scope.graphs = [
    		{ 'id' : 1, 'type' : 'MapChart', 'url' : 'http://example/map.com'},
    		{ 'id' : 1, 'type' : 'BarChart', 'url' : 'http://example/bar.com'},
    	];

    	controller = $controller('PageController', { $scope : scope });
    	scope.render();

    	//element = $compile(element)(scope);
    	//scope.$digest();

  	}));

  	describe('template', function() {
		it('works fine', function() {
			var map = element.find('map-chart');
			var bar = element.find('bar-chart');
			expect(elm).toBeDefined();
		});
	});

});