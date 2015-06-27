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
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'enableLegend' : false,
			'socketURL' : 'http://example.com',
			'xAxis' : { name: 'asseX' },
			'yAxis' : { name: 'asseY' },
			'barOrientation' : 'H',
			'headers' : ['colonna1'],
			'backgroundColor' : '#F0F',
			'sortable' : false,
			'groupingControl' : true,
			'legendOnPoint' : false,
			'grid' : false
		};
	
	beforeEach(inject(function($rootScope, $compile, $injector, $controller) {
		BarChartFactory = $injector.get('BarChartFactory');
		bar = BarChartFactory.build();
    	scope = $rootScope.$new();
    	controller = $controller('BarChartController', { $scope : scope });
    	html = angular.element('<bar-chart url="http://example/bar.com"></bar-chart>');

    	scope.barChart = bar;

    	scope.barChart.updateParameters(info);
    	scope.changedP = !scope.changedP;

    	element = $compile(html)(scope);
    	scope.$digest();

  	}));

  	describe('#init', function() {

  		var json = {
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'enableLegend' : true,
			'legend' : {position: 'E'},
			'socketURL' : 'http://example.com',
			'xAxis' : { name: 'asseX' },
			'yAxis' : { name: 'asseY' },
			'barOrientation' : 'V',
			'headers' : ['colonna1'],
			'backgroundColor' : '#F0F',
			'sortable' : false,
			'groupingControl' : false,
			'legendOnPoint' : true,
			'grid' : false
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

	describe('#setData', function() {

  		var json = {
			'enableLegend' : true,
			'legend' : {position: 'N'},
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		it('works fine', function() {
			scope.barChart.updateParameters(json);
			scope.changedD = !scope.changedD;
    		scope.$digest();
		});

	});

	describe('#setData', function() {

  		var json1 = {
			'enableLegend' : true,
			'legend' : {position: 'S'},
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		var json2 = {
			'enableLegend' : true,
			'legend' : {position: 'SE'},
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		var json3 = {
			'enableLegend' : true,
			'legend' : {position: 'SW'},
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		var json4 = {
			'enableLegend' : true,
			'legend' : {position: 'NW'},
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};
		var json5 = {
			'enableLegend' : true,
			'legend' : {position: 'W'},
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		var json6 = {
			'enableLegend' : true,
			'legend' : {position: 'NE'},
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		it('works fine', function() {
			scope.barChart.updateParameters(json1);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		scope.barChart.updateParameters(json2);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		scope.barChart.updateParameters(json3);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		scope.barChart.updateParameters(json4);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		scope.barChart.updateParameters(json5);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		scope.barChart.updateParameters(json6);
			scope.changedD = !scope.changedD;
    		scope.$digest();
		});

	});

});