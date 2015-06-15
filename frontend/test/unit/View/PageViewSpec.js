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
* 0.1.0         2015-06-13  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-06-13  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

describe('PageView', function(){

	beforeEach(angular.mock.module('norris-nrti'));

	var html, element, scope;

	beforeEach(inject(function($rootScope, $compile) {
    	scope = $rootScope.$new();
    	html = angular.element('<page></page>');

    	scope.graphs = [
    		{ 'id' : 1, 'type' : 'MapChart', 'url' : 'http://example/map.com'},
    		{ 'id' : 2, 'type' : 'LineChart', 'url' : 'http://example/line.com'},
    		{ 'id' : 3, 'type' : 'BarChart', 'url' : 'http://example/bar.com'},
    		{ 'id' : 4, 'type' : 'Table', 'url' : 'http://example/table.com'}
    	];

    	element = $compile(html)(scope);
    	scope.$digest();

  	}));

  	describe('#template', function() {
		it('works fine', function() {
			var map = element.find('map-chart');
			var line = element.find('line-chart');
			var bar = element.find('bar-chart');
			var tab = element.find('table-chart');
			expect(map).toBeDefined();
			expect(map).toHaveAttr('url','http://example/map.com');
			expect(line).toBeDefined();
			expect(line).toHaveAttr('url','http://example/line.com');
			expect(bar).toBeDefined();
			expect(bar).toHaveAttr('url','http://example/bar.com');
			expect(tab).toBeDefined();
			expect(tab).toBeDefined('url','http://example/table.com');
		});
	});

});