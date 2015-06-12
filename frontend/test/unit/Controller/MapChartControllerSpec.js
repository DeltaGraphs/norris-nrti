/*jshint node: true */
'use strict';

/*
* Name :  MapChartController.js
* Module : UnitTest
* Location : /frontend/test/unit/Controller
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-05-25  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-25  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

describe('MapChartController', function() {
    var scope, $location, createController;

    beforeEach(angular.mock.module('norris-nrti'));

    beforeEach(inject(function($rootScope, $controller, _$location_){
        $location = _$location_;
        scope = $rootScope.$new();

        createController = function() {
            return $controller('MapChartController', {
                '$scope': scope
            });
        };
    }));

    it('should have a method to check if the path is active', function() {
        var controller = createController();
        expect(scope.mapChart).toBeDefined();
    });
});

/*describe('MapChartController', function(){

	beforeEach(angular.mock.module('norris-nrti'));

	var scope;
	var controller;
	var MapChartFactory;
	//var notify;
	var json = {
			'title' : 'graficonuovo',
			'url' : 'localhost',
			'height' : 400,
			'width' : 400,
			'enabledLegend' : false,
			'horizontalGrid' : false,
			'verticalGrid' : false,
			'legendOnPoint' : false,
			'latitude' : 3,
			'longitude' : 3,
			'scale' : 999,
			'mapType' : 'terrain',
			'zoom' : false,
			'flows' : [{'ID' : '1'},{'ID' : '2'},{'ID' : '3'}]
	};

    describe('listenOnEvent', function(){
		beforeEach(inject(function ($rootScope, $controller, $injector) {
	    	MapChartFactory = $injector.get('MapChartFactory');
	        scope = $rootScope.$new();
	        scope.mapChart = MapChartFactory.build(json);
	        //notify = _notify_;
	        controller = $controller('MapChartController', {    // "lo conosci il MapChartController?" cit. Barney
	        	$scope : scope
	        });
	    }));

	    it ('listenOnEvent works fine', function(){

	    	expect(scope.mapChart).toBeDefined();
			expect(scope.mapChart.getTitle()).toEqual('graficonuovo');
			/*notify.receive('configGraph',{
				'properties' : {
					'title' : 'titolocambiato'
				},
				'data' : data
			});
			expect(scope.mapChart.getTitle()).toEqual('titolocambiato');
			expect(scope.mapChart.getFlowList()[0].flow.getData()[0].value[0]).toEqual(0);
		});
    });
    
	//describe('socketConnection', function(){

	//});

	describe('listenOnEvent', function(){

		var data = [
			{
				'ID' : '1',
				'records' : [{ 'NorrisRecordID' : '234321', 'value' : [0,1]},{}]
			}
		];

		beforeEach(function(){
			scope.mapChart = MapChartFactory.build(json);
		});
		
		it ('listenOnEvent works fine', function(){
			controller('MapChartController', {$scope : scope});
			expect(scope.mapChart.getTitle()).toEqual('graficonuovo');
			notify.receive('configGraph',{
				'properties' : {
					'title' : 'titolocambiato'
				},
				'data' : data
			});
			expect(scope.mapChart.getTitle()).toEqual('titolocambiato');
			expect(scope.mapChart.getFlowList()[0].flow.getData()[0].value[0]).toEqual(0);
		});
	});

});*/