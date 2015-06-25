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
* 0.1.0         2015-06-13  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-06-13  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

describe('MapChartView', function(){

	beforeEach(angular.mock.module('norris-nrti'));

	var html, element, scope, map, MapChartFactory;
	var json = {
		'properties' : {
			'title' : 'prova'
		}
	};

	beforeEach(inject(function($rootScope, $compile, $injector) {
		MapChartFactory = $injector.get('MapChartFactory');
		map = MapChartFactory.build();
		map.updateParameters(json);
    	scope = $rootScope.$new();
    	controller = $controller('MapChartController', { $scope : scope });
    	html = angular.element('<map-chart url="http://example/map.com"></map-chart>');

    	scope.mapChart = map;

    	element = $compile(html)(scope);
    	scope.$digest();

  	}));

  	describe('Constructor', function() {
		it('works fine', function() {
			var mapChart = element.find('map-chart');
			expect(mapChart).toBeDefined();
			var div = element.find('div');
			expect(div).toBeDefined();
		});
	});

});