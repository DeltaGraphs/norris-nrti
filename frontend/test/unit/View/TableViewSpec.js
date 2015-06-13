/*jshint node: true */
'use strict';

/*
* Name :  TableViewSpec.js
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

describe('TableView', function(){

	beforeEach(angular.mock.module('norris-nrti'));

	var html, element, scope, table, TableFactory;
	var json = {
		'properties' : {
			'title' : 'prova'
		}
	};
	
	beforeEach(inject(function($rootScope, $compile, $injector) {
		TableFactory = $injector.get('TableFactory');
		table = TableFactory.build();
		table.updateProperties(json);
    	scope = $rootScope.$new();
    	html = angular.element('<table-chart url="http://example/table.com"></table-chart>');

    	scope.tableChart = table;

    	element = $compile(html)(scope);
    	scope.$digest();

  	}));

  	describe('template', function() {
		it('works fine', function() {
			var tableChart = element.find('table-chart');
			expect(tableChart).toBeDefined();
			var tag = element.find('table');
			expect(tag).toBeDefined();
		});
	});

});