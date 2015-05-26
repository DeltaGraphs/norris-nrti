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

describe('MapChartController', function(){
	var scope;
	var controller;
	var notify;
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

	beforeEach(angular.mock.module('app'));

    beforeEach(inject(function ($rootScope, $controller, _notify_, $injector) {
        MapChartFactory = $injector.get('MapChartFactory');
        scope = $rootScope.$new();
        notify = _notify_;
        controller = $controller('MapChartController', {
            $scope : scope,
            $scope.mapChart = MapChartFactory.build(json);
        });
    }));

	describe('socketConnection', function(){

	});

	var data = [
		{
			'ID' : '1',
			'records' : [{ 'NorrisRecordID' : '234321', 'value' : [0,1]},{}]
		}
	];

	describe('listenOnEvent', function(){
		$scope.mapChart.getTitle().toEqual('graficonuovo');
		notify.receive('configGraph',{
			'properties' : {
				'title' : 'titolocambiato'
			}
			'data' : data
		});
		$scope.mapChart.getTitle().toEqual('titolocambiato');
		$scope.mapChart.getFlowList()[0].flow.getData()[0].value[0].toEqual(0);
	});

});