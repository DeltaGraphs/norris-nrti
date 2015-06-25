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

	var html, element, scope, bar, BarChartFactory, controller;
	var info = {
		'properties' : {
			'title' : 'prova1',
			'barOrientation' : 'H',
			'enableLegend' : false,
			'legendOnPoint' : true,
			'groupingControl' : true
		}
	};
	
	beforeEach(inject(function($rootScope, $compile, $injector, $controller) {
		BarChartFactory = $injector.get('BarChartFactory');
		bar = BarChartFactory.build();
		bar.updateParameters(info);
    	scope = $rootScope.$new();
    	controller = $controller('BarChartController', { $scope : scope });
    	html = angular.element('<bar-chart url="http://example/bar.com"></bar-chart>');

    	scope.barChart = bar;

    	element = $compile(html)(scope);
    	scope.$digest();

  	}));

  	describe('Constructor', function() {
  		var json  = {
			'properties' : {
				'title' : 'prova2',
				'barOrientation' : 'V',
				'enableLegend' : true,
				'legendOnPoint' : false,
				'groupingControl' : false
			}
		};

		it('works fine', function() {
			var barChart = element.find('bar-chart');
			expect(barChart).toBeDefined();
			var nvd3H = element.find('nvd3-multi-bar-horizontal-chart');
			expect(nvd3H).toBeDefined();
			var svgH = element.find('svg');
			expect(svgH).toBeDefined();
			bar.updateParameters(json);
			var nvd3V = element.find('nvd3-multi-bar-chart');
			expect(nvd3V).toBeDefined();
			var svgV = element.find('svg');
			expect(svgV).toBeDefined();
		});
	});

});