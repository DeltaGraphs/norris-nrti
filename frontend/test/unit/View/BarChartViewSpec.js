/*jshint node: true */
'use strict';

/*
* Name :  BarChartViewSpec.js
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

describe('BarChartView', function(){

	beforeEach(angular.mock.module('norris-nrti'));

	var html, element, scope, bar, BarChartFactory;
	var json = {
		'properties' : {
			'title' : 'prova',
			'barOrientation' : 'H'
		}
	};
	
	beforeEach(inject(function($rootScope, $compile, $injector) {
		BarChartFactory = $injector.get('BarChartFactory');
		bar = BarChartFactory.build();
		bar.updateParameters(json);
    	scope = $rootScope.$new();
    	html = angular.element('<bar-chart url="http://example/bar.com"></bar-chart>');

    	scope.barChart = bar;

    	element = $compile(html)(scope);
    	scope.$digest();

  	}));

  	describe('template', function() {
		it('works fine', function() {
			var barChart = element.find('bar-chart');
			expect(barChart).toBeDefined();
			var div = element.find('nvd3-multi-bar-horizontal-chart');
			expect(div).toBeDefined();
		});
	});

});