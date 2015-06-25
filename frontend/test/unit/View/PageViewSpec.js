/*jshint node: true */
'use strict';

/*
* Name :  PagesViewSpec.js
* Module : UnitTest
* Location : /frontend/test/unit/View
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.1         2015-06-25  Maria Giovanna Chinellato   Fix test
*
* 0.1.0         2015-06-13  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-06-13  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

describe('PageView', function(){

	beforeEach(angular.mock.module('norris-nrti'));

	var html, element, scope, controller, PageFactory;

	beforeEach(function(){
		
		module(function($provide){
			$provide.controller('PageController', function($scope){
				$scope.page = null;
			});
		});

		inject(function($rootScope, $compile, $controller, $injector) {
	    	scope = $rootScope.$new();
	    	PageFactory = $injector.get('PageFactory');
	    	controller = $controller('PageController', { $scope : scope });
	    	html = angular.element('<page></page>');

	    	scope.page = PageFactory.build();

	    	scope.graphs = [
	    		{ 'id' : 1, 'type' : 'MapChart', 'url' : 'http://example/map.com'},
	    		{ 'id' : 2, 'type' : 'LineChart', 'url' : 'http://example/line.com'},
	    		{ 'id' : 3, 'type' : 'BarChart', 'url' : 'http://example/bar.com'},
	    		{ 'id' : 4, 'type' : 'Table', 'url' : 'http://example/table.com'}
	    	];

	    	element = $compile(html)(scope);
	    	scope.$digest();
	    });

  	});

  	describe('Constructor', function() {
		it('works fine', function() {
			var map = element.find('map-chart');
			var line = element.find('line-chart');
			var bar = element.find('bar-chart');
			var tab = element.find('table-chart');
			expect(map).toBeDefined();
			expect(line).toBeDefined();
			expect(bar).toBeDefined();
			expect(tab).toBeDefined();
		});
	});

});