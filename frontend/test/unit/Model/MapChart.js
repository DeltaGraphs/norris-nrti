/*
* Name :  LineChart.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.2         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.1.1			2015-05-15	Maria Giovanna Chinellato	Fix test of Model::MapChart
*
* 0.1.0			2015-05-15	Francesco Rossetto			Add test of Model::MapChart.js
*
* 0.0.1			2015-05-15	Francesco Rossetto			Initial code
* =================================================================================================
*
*/

describe('MapChart', function(){
	'use strict';

	var MapChart;
	var Graph;
	var MapChartFlow;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject(function(_MapChart_, $injector){
		MapChart = _MapChart_;
		Graph = $injector.get('Graph');
		MapChartFlow = $injector.get('MapChartFlow');
	}));

	describe('Default constructor', function(){

		/*var f ={
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'enabledLegend' : false,
			'horizontalGrid' : false,
			'verticalGrid' : false
		};*/

		beforeEach(function(){
			MapChart = new MapChart();
		});

		afterEach(function(){
			MapChart = null;
		});

		it('MapChart created', function(){
			expect(MapChart).toBeDefined();
		});

		it('graph created with the correct latitude', function(){
			expect(MapChart.getLatitude()).toEqual(45.4113311);
		});
		it('graph created with the correct longitude', function(){
			expect(MapChart.getLongitude()).toEqual(11.8876318);
		});
		it('graph created with the correct scale', function(){
			expect(MapChart.getScale()).toEqual(1000);
		});
		it('graph created with the correct mapType', function(){
			expect(MapChart.getMapType()).toEqual('terrain');
		});
		it('graph created with the correct zoom', function(){
			expect(MapChart.getZoom()).toEqual(true);
		});
		it('graph created with the correct flows', function(){
            expect(MapChart.addFlow.calls.count()).toEqual(3);
        });

	});

	describe('Constructor', function(){

		var json = {
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'enabledLegend' : false,
			'horizontalGrid' : false,
			'verticalGrid' : false,
			'latitude' : 3,
			'longitude' : 3,
			'scale' : 999,
			'mapType' : 'terrain',
			'zoom' : false,
			'flows' : [{},{},{}]
		};

		beforeEach(function(){
			MapChart = new MapChart(json);
		});

		afterEach(function(){
			MapChart = null;
		});

		it('MapChart created', function(){
			expect(MapChart).toBeDefined();
		});

		it('graph created with the correct latitude', function(){
			expect(MapChart.getLatitude()).toEqual(3);
		});
		it('graph created with the correct longitude', function(){
			expect(MapChart.getLongitude()).toEqual(3);
		});
		it('graph created with the correct scale', function(){
			expect(MapChart.getScale()).toEqual(999);
		});
		it('graph created with the correct mapType', function(){
			expect(MapChart.getMapType()).toEqual('terrain');
		});
		it('graph created with the correct zoom', function(){
			expect(MapChart.getZoom()).toEqual(false);
		});
		it('graph created with the correct flows', function(){
            expect(MapChart.addFlow.calls.count()).toEqual(3);
        });

	});

	/*describe('split', function(){
		var res;
		var json = {};
		var json1 = json;
		json = json1;
		json = {
			'title' : 'grafico',
			'height' : 300,
			'width' : 300,
			'enabledLegend' : true,
			'legend' : {},
			'horizontalGrid' : true,
			'verticalGrid' : true,
			'latitude' : 4,
			'longitude' : 4,
			'scale' : 1001,
			'mapType' : 'roadmap',
			'zoom' : true
		};
		var g = {
			'title' : 'grafico',
			'height' : 300,
			'width' : 300,
			'enabledLegend' : true,
			'legend' : {},
			'horizontalGrid' : true,
			'verticalGrid' : true
		};
		var l = {
			'latitude' : 4,
			'longitude' : 4,
			'scale' : 1001,
			'mapType' : 'roadmap',
			'zoom' : true
		};

		beforeEach(function(){
			res = MapChart.prototype.test('split(json)');
		});

		it('json splitted in the correct way', function(){
			expect(res.graphJson).toEqual(g);
			expect(res.mapJson).toEqual(l);
		});

	});*/


	describe('updateParameters', function(){
		var json = {
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'enabledLegend' : false,
			'horizontalGrid' : false,
			'verticalGrid' : false,
			'latitude' : 3,
			'longitude' : 3,
			'scale' : 999,
			'mapType' : 'terrain',
			'zoom' : false,
			'flows' : [{},{},{}]
		};

		beforeEach(function(){
			MapChart = new MapChart();
			MapChart = MapChart.updateParameters(json);
		});

		afterEach(function(){
			MapChart = null;
		});

		it('graph updated with the correct latitude', function(){
			expect(MapChart.prototype.getLatitude()).toEqual(3);
		});
		it('graph updated with the correct longitude', function(){
			expect(MapChart.prototype.getLongitude()).toEqual(3);
		});
		it('graph updated with the correct scale', function(){
			expect(MapChart.prototype.getScale()).toEqual(999);
		});
		it('graph updated with the correct mapType', function(){
			expect(MapChart.prototype.getMapType()).toEqual('terrrain');
		});
		it('graph updated with the correct zoom', function(){
			expect(MapChart.prototype.getZoom()).toEqual(false);
		});
		it('graph updated with the correct flows', function(){
            expect(MapChart.prototype.addFlow.calls.count()).toEqual(3);
        });
		
	});
	
	describe('addFlow', function(){

		var json = {
			'ID' : 	'flusso1',
			'name' : 'sonda 1'
		};

		var newflow = MapChartFlow({});


		beforeEach(function(){
			var newflow =  MapChartFlow({});
			MapChart = new MapChart();
			MapChart = MapChart.addflow(json.ID, newflow);
		});

		afterEach(function(){
			MapChart = null;
		});

		it('add flow into mapchart', function(){
			expect(Graph.prototype.addFlow.call).toHaveBeenCalledWith(json.ID, newflow);
		});

	});

	describe('inizializeData', function(){

		var data = [
			{
				'ID' : '1',
				'records' : []
			},
			{
				'ID' : '2',
				'records' : []
			}
		];

		

		beforeEach(function(){
			MapChart = new MapChart();
			MapChart = MapChart.inizializeData(data);
		});

		afterEach(function(){
			MapChart = null;
		});

		it('inizialize flowList', function(){
			expect(MapChartFlow.prototype.inizializeData.calls.count()).toEqual(2);
		});
	});

	describe('inPlaceUpdate', function(){

		var data = 	{
			'ID' : '2',
			'records' : []
		};

		beforeEach(function(){
			MapChart = new MapChart();
			MapChart = MapChart.inPlaceUpdate(data);
		});

		afterEach(function(){
			MapChart = null;
		});

		it('inizialize flowList', function(){
			expect(MapChartFlow.prototype.inPlaceUpdate).toHaveBeenCalledWith(data);
		});
	});

	describe('streamUpdate', function(){

		var data = 	{
			'ID' : '2',
			'records' : []
		};

		beforeEach(function(){
			MapChart = new MapChart();
			MapChart = MapChart.streamUpdate(data);
		});

		afterEach(function(){
			MapChart = null;
		});

		it('inizialize flowList', function(){
			expect(MapChartFlow.streamUpdate).toHaveBeenCalledWith(data);
		});
	});

	describe('movieUpdate', function(){

		var data = 	{
			'ID' : '2',
			'records' : []
		};

		beforeEach(function(){
			MapChart = new MapChart();
			MapChart = MapChart.movieUpdate(data);
		});

		afterEach(function(){
			MapChart = null;
		});

		it('inizialize flowList', function(){
			expect(MapChartFlow.movieUpdate).toHaveBeenCalledWith(data);
		});
	});

});