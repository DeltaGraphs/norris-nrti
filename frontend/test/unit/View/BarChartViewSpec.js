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
			var legend1 = element.children()[2];
			expect(legend1).not.toBeDefined();
			var barChart = element.find('bar-chart');
			expect(barChart).toBeDefined();
			var nvd3H = element.find('nvd3-multi-bar-horizontal-chart');
			expect(nvd3H).toBeDefined();
			var svgH = element.find('svg');
			expect(svgH).toBeDefined();
			scope.barChart.updateParameters(json);
			scope.changedP = !scope.changedP;
    		scope.$digest();
    		var legend2 = element.children()[2];
			expect(legend2).toBeDefined();
			expect(legend2.getAttribute('style')).toBe('float: left; position: relative; top: -' + (scope.barChart.getHeight()/2) + 'px; right: -' + scope.barChart.getWidth() + 'px;  background-color: ' + scope.$parent.getLegend().getBackgroundColor() + ';');
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

	describe('#setLegend', function() {

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
    		var legend1 = element.children()[2];
			expect(legend1).toBeDefined();
			expect(legend1.getAttribute('style')).toBe('float: left; position: relative; right: -' + (scope.barChart.getWidth()/2) + 'px; background-color: ' + scope.getLegend().getBackgroundColor() + ';');
    		scope.barChart.updateParameters(json2);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		var legend2 = element.children()[2];
			expect(legend2).toBeDefined();
			expect(legend2.getAttribute('style')).toBe('float: left; position: relative; right: -' + scope.barChart.getWidth() + 'px; background-color: ' + scope.barChart.getLegend().getBackgroundColor() + ';');
    		scope.barChart.updateParameters(json3);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		var legend3 = element.children()[2];
			expect(legend3).toBeDefined();
			expect(legend3.getAttribute('style')).toBe('float: left; position: relative; background-color: ' + scope.barChart.getLegend().getBackgroundColor() + ';');
    		scope.barChart.updateParameters(json4);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		var legend4 = element.children()[2];
			expect(legend4).toBeDefined();
			expect(legend4.getAttribute('style')).toBe('float: left; position: relative; top: -' + scope.barChart.getHeight() + 'px; background-color: ' + scope.barChart.getLegend().getBackgroundColor() + ';');
    		scope.barChart.updateParameters(json5);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		var legend5 = element.children()[2];
			expect(legend5).toBeDefined();
			expect(legend5.getAttribute('style')).toBe('float: left; position: relative; top: -' + (scope.barChart.getHeight()/2) + 'px; background-color: ' + scope.barChart.getLegend().getBackgroundColor() + ';');
    		scope.barChart.updateParameters(json6);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		var legend6 = element.children()[2];
			expect(legend6).toBeDefined();
			expect(legend6.getAttribute('style')).toBe('float: left; position: relative; top: -' + scope.barChart.getHeight() + 'px; right: -' + scope.barChart.getWidth() + 'px; background-color: ' + scope.barChart.getLegend().getBackgroundColor() + ';');
		});

	});

});