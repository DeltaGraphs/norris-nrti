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
* 0.1.0         2015-06-13  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-06-13  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

describe('LineChartView', function(){

	beforeEach(angular.mock.module('norris-nrti'));

	var html, element, scope, line, LineChartFactory;
	var json = {
		'properties' : {
			'title' : 'prova',
			'viewFinder' : true
		}
	};
	
	beforeEach(inject(function($rootScope, $compile, $injector) {
		LineChartFactory = $injector.get('LineChartFactory');
		line = LineChartFactory.build();
		line.updateParameters(json);
    	scope = $rootScope.$new();
    	html = angular.element('<line-chart url="http://example/line.com"></line-chart>');

    	scope.lineChart = line;

    	element = $compile(html)(scope);
    	scope.$digest();

  	}));

  	describe('template', function() {
  		var json ={
  			'properties' : {
				'viewFinder' : false
			}
  		};

		it('works fine', function() {
			var lineChart = element.find('line-chart');
			expect(lineChart).toBeDefined();
			var nvd3Focus = element.find('nvd3-line-with-focus-chart');
			expect(nvd3Focus).toBeDefined();
			var svgFocus = element.find('svg');
			expect(svgFocus).toBeDefined();
			bar.updateParameters(json);
			var nvd3 = element.find('nvd3-line-chart');
			expect(nvd3).toBeDefined();
			var svg = element.find('svg');
			expect(svg).toBeDefined();
		});
	});

});