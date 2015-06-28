/*jshint node: true */
'use strict';

/*
* Name :  LineChartViewSpec.js
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

describe('LineChartView', function(){

	beforeEach(angular.mock.module('norris-nrti'));

	var html, element, scope, line, LineChartFactory, controller;
	var json = {
		'properties' : {
			'title' : 'prova1',
			'viewFinder' : true,
			'enableLegend' : true,
			'legendOnPoint' : false
		}
	};
	
	beforeEach(inject(function($rootScope, $compile, $injector, $controller) {
		LineChartFactory = $injector.get('LineChartFactory');
		line = LineChartFactory.build();
    	scope = $rootScope.$new();
    	controller = $controller('LineChartController', { $scope : scope });
    	html = angular.element('<line-chart url="http://example/line.com"></line-chart>');

    	scope.lineChart = line;

    	element = $compile(html)(scope);
    	scope.$digest();

  	}));

  	describe('#init', function() {

  		var info = {
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'enableLegend' : false,
			'socketURL' : 'http://example.com',
			'xAxis' : { name: 'asseX' },
			'yAxis' : { name: 'asseY' },
			'viewFinder' : true,
			'headers' : ['colonna1'],
			'backgroundColor' : '#F0F',
			'legendOnPoint' : false,
			'grid' : false
		};

  		var json = {
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'enableLegend' : true,
			'legend' : {position: 'E'},
			'socketURL' : 'http://example.com',
			'xAxis' : { name: 'asseX' },
			'yAxis' : { name: 'asseY' },
			'viewFinder' : false,
			'headers' : ['colonna1'],
			'backgroundColor' : '#F0F',
			'legendOnPoint' : true,
			'grid' : false,
			'flows' : [{'ID' : 'f1', 'flowColor' : '#000000'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		beforeEach(function(){
			scope.lineChart = LineChartFactory.build();
		});

		afterEach(function(){
			scope.lineChart = null;
		});

		it('default works fine', function() {
			scope.lineChart.updateParameters(info);
			scope.changedP = !scope.changedP;
    		scope.$digest();
			var lineChart = element.find('line-chart');
			expect(lineChart).toBeDefined();
			var nvd3H = element.find('nvd3-line-with-focus-chart');
			expect(nvd3H).toBeDefined();
			var svgH = element.find('svg');
			expect(svgH).toBeDefined();
		});

		it('works fine', function(){
			scope.lineChart.updateParameters(json);
			scope.changedP = !scope.changedP;
    		scope.$digest();
			var nvd3V = element.find('nvd3-line-chart');
			expect(nvd3V).toBeDefined();
			var svgV = element.find('svg');
			expect(svgV).toBeDefined();
		});

	});

	describe('#setData', function() {

  		var json = {
  			'title' : 'json',
			'enableLegend' : true,
			'legend' : {position: 'N'},
			'flows' : [{'ID' : 'f1', 'flowColor' : '#000000'},{ 'ID' : 'f2', 'flowColor' : '#BAAAEE'},{'ID' : 'f3', 'flowColor' : '#B9D3EE'}]
		};

		var data = [
			{
				'ID':'f1',
				'records':[
					{'norrisRecordID':'flow1_1435482609499_1','value':[1,3]},
					{'norrisRecordID':'flow1_1435482609499_2','value':[2,2]},
					{'norrisRecordID':'flow1_1435482609499_3','value':[3,1]}
				]
			}
		];

		it('works fine', function() {
			scope.lineChart.updateParameters(json);
			scope.lineChart.initializeData(data);
			scope.changedD = !scope.changedD;
    		scope.$digest();
		});

		/*it('set the correct flow color', function() {
			var colorArray = scope.colorFunction();
			expect(colorArray[0]).toEqual('#000000');
			expect(colorArray[0]).toEqual('#BAAAEE');
			expect(colorArray[0]).toEqual('#B9D3EE');
		});*/

	});

	describe('#setLegend', function() {

  		var json1 = {
  			'title' : 'json1',
			'enableLegend' : true,
			'legend' : {position: 'S'},
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		var json2 = {
			'title' : 'json2',
			'enableLegend' : true,
			'legend' : {position: 'SE'},
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		var json3 = {
			'title' : 'json3',
			'enableLegend' : true,
			'legend' : {position: 'SW'},
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		var json4 = {
			'title' : 'json4',
			'enableLegend' : true,
			'legend' : {position: 'NW'},
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};
		var json5 = {
			'title' : 'json5',
			'enableLegend' : true,
			'legend' : {position: 'W'},
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		var json6 = {
			'title' : 'json6',
			'enableLegend' : true,
			'legend' : {position: 'NE'},
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		var json7 = {
			'title' : 'json7',
			'enableLegend' : true,
			'legend' : {position: 'E'},
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		beforeEach(function(){
			scope.lineChart = LineChartFactory.build();
		});

		afterEach(function(){
			scope.lineChart = null;
		});

		it('to S works fine', function() {
			scope.lineChart.updateParameters(json1);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		//var legend1 = element.find('div.lineChartLegend');
    		//console.dir(legend1);
			//expect(legend1).toBeDefined();
			//expect(legend1.getAttribute('style')).toBe('float: left; position: relative; right: -' + (scope.lineChart.getWidth()/2) + 'px; background-color: ' + scope.getLegend().getBackgroundColor() + ';');
    	});
    		
    	it('to SE works fine', function(){
			scope.lineChart.updateParameters(json2);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		//var legend2 = element.children()[2];
			//expect(legend2).toBeDefined();
			//expect(legend2.getAttribute('style')).toBe('float: left; position: relative; right: -' + scope.lineChart.getWidth() + 'px; background-color: ' + scope.lineChart.getLegend().getBackgroundColor() + ';');
    	});
    	
    	it('to SW works fine', function(){
    		scope.lineChart.updateParameters(json3);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		//var legend3 = element.children()[2];
			//expect(legend3).toBeDefined();
			//expect(legend3.getAttribute('style')).toBe('float: left; position: relative; background-color: ' + scope.lineChart.getLegend().getBackgroundColor() + ';');
    	});	
    		
    	it('to NW works fine', function(){
    		scope.lineChart.updateParameters(json4);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		//var legend4 = element.children()[2];
			//expect(legend4).toBeDefined();
			//expect(legend4.getAttribute('style')).toBe('float: left; position: relative; top: -' + scope.lineChart.getHeight() + 'px; background-color: ' + scope.lineChart.getLegend().getBackgroundColor() + ';');
		});

		it('to W works fine', function(){
    		scope.lineChart.updateParameters(json5);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		//var legend5 = element.children()[2];
			//expect(legend5).toBeDefined();
			//expect(legend5.getAttribute('style')).toBe('float: left; position: relative; top: -' + (scope.lineChart.getHeight()/2) + 'px; background-color: ' + scope.lineChart.getLegend().getBackgroundColor() + ';');
		});

		it('to NE works fine', function(){
    		scope.lineChart.updateParameters(json6);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		//var legend6 = element.children()[2];
			//expect(legend6).toBeDefined();
			//expect(legend6.getAttribute('style')).toBe('float: left; position: relative; top: -' + scope.lineChart.getHeight() + 'px; right: -' + scope.lineChart.getWidth() + 'px; background-color: ' + scope.lineChart.getLegend().getBackgroundColor() + ';');*/
		});

		it('to E works fine', function(){
    		scope.lineChart.updateParameters(json7);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		//var legend7 = element.find('div.lineChartLegend');
			//expect(legend7).toBeDefined();
			//expect(legend7.getAttribute('style')).toBe('float: left; position: relative; top: -' + (scope.lineChart.getHeight()/2) + 'px; right: -' + scope.lineChart.getWidth() + 'px;  background-color: ' + scope.$parent.getLegend().getBackgroundColor() + ';');
		});

	});

});