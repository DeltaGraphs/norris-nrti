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
            expect(MapChart.getFlowList().length).toEqual(3);
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
            expect(MapChart.getFlowList.length).toEqual(3);
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
			expect(MapChart.getLatitude()).toEqual(3);
		});
		it('graph updated with the correct longitude', function(){
			expect(MapChart.getLongitude()).toEqual(3);
		});
		it('graph updated with the correct scale', function(){
			expect(MapChart.getScale()).toEqual(999);
		});
		it('graph updated with the correct mapType', function(){
			expect(MapChart.getMapType()).toEqual('terrrain');
		});
		it('graph updated with the correct zoom', function(){
			expect(MapChart.getZoom()).toEqual(false);
		});
		it('graph updated with the correct flows', function(){
            expect(MapChart.addFlow.calls.count()).toEqual(3);
        });
		
	});
	
	describe('addFlow', function(){

		var json = {
			'ID' : 	'flusso1',
		};

		var fJson = {
			'dataFormat' : 'String',
			'name' : 'flusso1',
			'flowColor' : '#F3F',
			'legendOnPoint' : 'flusso1',
			'marker' : 'furly1',
			'maxItem' : '45',
			'trace' : 'flow'
		};

		var newflow;


		beforeEach(function(){
			var newflow = new MapChartFlow(fJson);
			MapChart = new MapChart();
			MapChart = MapChart.addflow(json.ID, newflow);
		});

		afterEach(function(){
			MapChart = null;
		});

		it('add flow into mapchart', function(){
			expect(MapChart.getFlowList().length).toEqual(1);
		});

	});

	describe('inizializeData', function(){

		var data = [
			{
				'ID' : '1',
				'records' : [{ 'NorrisRecordID' : '234321', 'value' : [0,1]},{}]
			}
		];

		var newFlow;

		beforeEach(function(){
			newFlow = new MapChartFlow();
			MapChart = new MapChart();
			MapChart.addFlow(data[0].ID, newFlow);
			MapChart.initializeData(data);
		});
		afterEach(function(){
			MapChart = null;
		});

		it('inizialize flowList', function(){
			expect(MapChart.getFlowList()[0].flow.getData().length).toEqual(2);
		});
	});

	describe('inPlaceUpdate', function(){

		var data = [
			{
				'ID' : '2',
				'records' : [{'NorrisRecordID' : 'record2', 'value' : [3,3] }]
			}
		];
		var data1 = 	{
			'ID' : '2',
			'NorrisRecordID' : 'record2',
			'value' : [4,4]
		};
		var newFlow;

		beforeEach(function(){
			newFlow = new MapChartFlow();
			MapChart = new MapChart();
			MapChart.addFlow(data[0].ID, newFlow);
			MapChart.initializeData(data);
		});

		afterEach(function(){
			MapChart = null;
		});

		it('inizialize flowList', function(){
			expect(MapChart.getFlowList()[0].flow.getData()[0].value[0]).toEqual(3);
			MapChart.inPlaceUpdate(data1);
			expect(MapChart.getFlowList()[0].flow.getData()[0].value[0]).toEqual(4);
		});
	});

	describe('streamUpdate', function(){

		var data = [
			{
				'ID' : '2',
				'records' : [{'NorrisRecordID' : 'record2', 'value' : [3,3] }]
			}
		];
		var data1 = 	{
			'records' : [{
				'ID' : '2',
				'NorrisRecordID' : 'record2',
				'value' : [4,4]
			}]
		};
		var newFlow;

		beforeEach(function(){
			newFlow = new MapChartFlow();
			MapChart = new MapChart();
			MapChart.addFlow(data[0].ID, newFlow);
			MapChart.initializeData(data);
		});

		afterEach(function(){
			MapChart = null;
		});

		it('inizialize flowList', function(){
			expect(MapChart.getFlowList()[0].flow.getData().length).toEqual(1);
			MapChart.streamUpdate(data1);
			expect(MapChart.getFlowList()[0].flow.getData().length).toEqual(2);
		});
	});

	/*describe('movieUpdate', function(){

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
	});*/

});