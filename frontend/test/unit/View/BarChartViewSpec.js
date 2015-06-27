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
* 0.1.1         2015-06-25  Maria Giovanna Chinellato   Fix test
*
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
    	scope = $rootScope.$new();
    	controller = $controller('BarChartController', { $scope : scope });
    	html = angular.element('<bar-chart url="http://example/bar.com"></bar-chart>');

    	scope.barChart = bar;
    	bar.updateParameters(info);

    	element = $compile(html)(scope);
    	scope.$digest();

  	}));

  	describe('Constructor', function() {
  		var json = {
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'enableLegend' : true,
			'legend' : {position: 'E'},
			'socketURL' : 'http://example.com',
			'xAxis' : { name: 'asseX' },
			'yAxis' : { name: 'asseY' },
			'barOrientation' : 'vertical',
			'headers' : ['colonna1'],
			'backgroundColor' : '#F0F',
			'sortable' : false,
			'groupingControl' : false,
			'legendOnPoint' : true,
			'grid' : false,
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		it('works fine', function() {
			var barChart = element.find('bar-chart');
			expect(barChart).toBeDefined();
			var nvd3H = element.find('nvd3-multi-bar-horizontal-chart');
			expect(nvd3H).toBeDefined();
			var svgH = element.find('svg');
			expect(svgH).toBeDefined();
			scope.barChart.updateParameters(json);
			scope.changedP = !scope.changedP;
    		scope.$digest();
			var nvd3V = element.find('nvd3-multi-bar-chart');
			expect(nvd3V).toBeDefined();
			var svgV = element.find('svg');
			expect(svgV).toBeDefined();
		});
	});

});