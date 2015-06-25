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

	var html, info, element, scope, controller, PageFactory, PagesList, pagesList, route;

	beforeEach(inject(function($rootScope, $compile, $controller, $injector, $route) {
    	scope = $rootScope.$new();
    	route = $route.$new();
    	PagesList = $injector.get('PagesList');
    	info = {
    		data: [
    			{
    				'properties': {
    					'ID':'page1',
    					'name':'Pagina 1 Last Sync: 25/6/2015 @ 19:21:56',
    					'description':'Questa è una bella pagina Last Sync: 25/6/2015 @ 19:21:56',
    					'socketURL':'http://norris-nrti-dev.herokuapp.com/norris/page1'
    				}
    			}
        ]};

        $route.pageId = 0;

        pagesList = new PagesList(info);

    	PageFactory = $injector.get('PageFactory');
    	controller = $controller('PageController', { $scope : scope, PagesList : pagesList, $routeParams : route });
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

  	}));

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