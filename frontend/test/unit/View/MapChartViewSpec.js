/*jshint node: true */
'use strict';

/*
* Name :  MapChartViewSpec.js
* Module : UnitTest
* Location : /frontend/test/unit/View
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.1         2015-06-28  Maria Giovanna Chinellato   Fix test
*
* 0.1.0         2015-06-13  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-06-13  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

describe('MapChartView', function(){

	beforeEach(angular.mock.module('norris-nrti'));

	var html, element, scope, map, MapChartFactory, controller;

	beforeEach(inject(function($rootScope, $compile, $injector, $controller) {
		MapChartFactory = $injector.get('MapChartFactory');
		map = MapChartFactory.build();
    	scope = $rootScope.$new();
    	controller = $controller('MapChartController', { $scope : scope });
    	html = angular.element('<map-chart url="http://example/map.com"></map-chart>');

    	scope.mapChart = map;

    	element = $compile(html)(scope);
    	scope.$digest();

  	}));

  	/*describe('Constructor', function() {
  		var info = {
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'enableLegend' : false,
			'socketURL' : 'http://example.com',
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
			'mapType' : 'roadmap',
			'legendOnPoint' : true,
			'grid' : false,
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};

		beforeEach(function(){
			scope.mapChart = MapChartFactory.build();
		});

		afterEach(function(){
			scope.mapChart = null;
		});

		it('works fine', function() {
			scope.mapChart.updateParameters(info);
			scope.changedP = !scope.changedP;
    		scope.$digest();
			var mapChart = element.find('map-chart');
			expect(mapChart).toBeDefined();
			var div = element.find('div');
			expect(div).toBeDefined();
			map.updateParameters(json);
			scope.changedP = !scope.changedP;
		});

		it('works fine', function() {
			scope.mapChart.updateParameters(json);
			scope.changedP = !scope.changedP;
    		scope.$digest();
			var mapChart = element.find('map-chart');
			expect(mapChart).toBeDefined();
			var div = element.find('div');
			expect(div).toBeDefined();
			map.updateParameters(json);
			scope.changedP = !scope.changedP;
		});
	});*/

	describe('#setData', function() {

  		var json = {
  			'title' : 'json',
			'enableLegend' : true,
			'legend' : {position: 'N'},
			'flows' : [{'ID' : 'f1', 'marker':{'type':'shape','shape':'bus','color':'#FFC4F6'}},{ 'ID' : 'f2', 'trace': {'type':'poly'}},{'ID' : 'f3'}]
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
			scope.mapChart.updateParameters(json);
			scope.mapChart.initializeData(data);
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
			'flows' : [{'ID' : 'f1', 'trace': {type:'poly', strokeColor : '#000'}},{ 'ID' : 'f2', 'trace': {type:'poly', strokeColor : '#000'}},{'ID' : 'f3', 'trace': {type:'poly', strokeColor : '#000'}}]
		};

		var json2 = {
			'title' : 'json2',
			'enableLegend' : true,
			'legend' : {position: 'SE'},
			'flows' : [{'ID' : 'f1', 'trace': {type:'poly', strokeColor : '#000'}},{ 'ID' : 'f2', 'trace': {type:'poly', strokeColor : '#000'}},{'ID' : 'f3', 'trace': {type:'poly', strokeColor : '#000'}}]
		};

		var json3 = {
			'title' : 'json3',
			'enableLegend' : true,
			'legend' : {position: 'SW'},
			'flows' : [{'ID' : 'f1', 'trace': {type:'poly', strokeColor : '#000'}},{ 'ID' : 'f2', 'trace': {type:'poly', strokeColor : '#000'}},{'ID' : 'f3', 'trace': {type:'poly', strokeColor : '#000'}}]
		};

		var json4 = {
			'title' : 'json4',
			'enableLegend' : true,
			'legend' : {position: 'NW'},
			'flows' : [{'ID' : 'f1', 'trace': {type:'poly', strokeColor : '#000'}},{ 'ID' : 'f2', 'trace': {type:'poly', strokeColor : '#000'}},{'ID' : 'f3', 'trace': {type:'poly', strokeColor : '#000'}}]
		};
		var json5 = {
			'title' : 'json5',
			'enableLegend' : true,
			'legend' : {position: 'W'},
			'flows' : [{'ID' : 'f1', 'trace': {type:'poly', strokeColor : '#000'}},{ 'ID' : 'f2', 'trace': {type:'poly', strokeColor : '#000'}},{'ID' : 'f3', 'trace': {type:'poly', strokeColor : '#000'}}]
		};

		var json6 = {
			'title' : 'json6',
			'enableLegend' : true,
			'legend' : {position: 'NE'},
			'flows' : [{'ID' : 'f1', 'trace': {type:'poly', strokeColor : '#000'}},{ 'ID' : 'f2', 'trace': {type:'poly', strokeColor : '#000'}},{'ID' : 'f3', 'trace': {type:'poly', strokeColor : '#000'}}]
		};

		var json7 = {
			'title' : 'json7',
			'enableLegend' : true,
			'legend' : {position: 'E'},
			'flows' : [{'ID' : 'f1', 'trace': {type:'poly', strokeColor : '#000'}},{ 'ID' : 'f2', 'trace': {type:'poly', strokeColor : '#000'}},{'ID' : 'f3', 'trace': {type:'poly', strokeColor : '#000'}}]
		};

		beforeEach(function(){
			scope.mapChart = MapChartFactory.build();
		});

		afterEach(function(){
			scope.mapChart = null;
		});

		it('to S works fine', function() {
			scope.mapChart.updateParameters(json1);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		//var legend1 = element.find('div.mapChartLegend');
    		//console.dir(legend1);
			//expect(legend1).toBeDefined();
			//expect(legend1.getAttribute('style')).toBe('float: left; position: relative; right: -' + (scope.mapChart.getWidth()/2) + 'px; background-color: ' + scope.getLegend().getBackgroundColor() + ';');
    	});
    		
    	it('to SE works fine', function(){
			scope.mapChart.updateParameters(json2);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		//var legend2 = element.children()[2];
			//expect(legend2).toBeDefined();
			//expect(legend2.getAttribute('style')).toBe('float: left; position: relative; right: -' + scope.mapChart.getWidth() + 'px; background-color: ' + scope.mapChart.getLegend().getBackgroundColor() + ';');
    	});
    	
    	it('to SW works fine', function(){
    		scope.mapChart.updateParameters(json3);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		//var legend3 = element.children()[2];
			//expect(legend3).toBeDefined();
			//expect(legend3.getAttribute('style')).toBe('float: left; position: relative; background-color: ' + scope.mapChart.getLegend().getBackgroundColor() + ';');
    	});	
    		
    	it('to NW works fine', function(){
    		scope.mapChart.updateParameters(json4);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		//var legend4 = element.children()[2];
			//expect(legend4).toBeDefined();
			//expect(legend4.getAttribute('style')).toBe('float: left; position: relative; top: -' + scope.mapChart.getHeight() + 'px; background-color: ' + scope.mapChart.getLegend().getBackgroundColor() + ';');
		});

		it('to W works fine', function(){
    		scope.mapChart.updateParameters(json5);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		//var legend5 = element.children()[2];
			//expect(legend5).toBeDefined();
			//expect(legend5.getAttribute('style')).toBe('float: left; position: relative; top: -' + (scope.mapChart.getHeight()/2) + 'px; background-color: ' + scope.mapChart.getLegend().getBackgroundColor() + ';');
		});

		it('to NE works fine', function(){
    		scope.mapChart.updateParameters(json6);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		//var legend6 = element.children()[2];
			//expect(legend6).toBeDefined();
			//expect(legend6.getAttribute('style')).toBe('float: left; position: relative; top: -' + scope.mapChart.getHeight() + 'px; right: -' + scope.mapChart.getWidth() + 'px; background-color: ' + scope.mapChart.getLegend().getBackgroundColor() + ';');*/
		});

		it('to E works fine', function(){
    		scope.mapChart.updateParameters(json7);
			scope.changedD = !scope.changedD;
    		scope.$digest();
    		//var legend7 = element.find('div.mapChartLegend');
			//expect(legend7).toBeDefined();
			//expect(legend7.getAttribute('style')).toBe('float: left; position: relative; top: -' + (scope.mapChart.getHeight()/2) + 'px; right: -' + scope.mapChart.getWidth() + 'px;  background-color: ' + scope.$parent.getLegend().getBackgroundColor() + ';');
		});

	});

});