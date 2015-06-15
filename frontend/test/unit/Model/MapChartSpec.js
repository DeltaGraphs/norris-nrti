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

describe('MapChartFactory', function(){
	'use strict';

	var MapChartFactory;
	var MapChartFlowFactory;

	beforeEach(angular.mock.module('norris-nrti'));

	beforeEach(inject(function(_MapChartFactory_, $injector){
		MapChartFactory = _MapChartFactory_;
		MapChartFlowFactory = $injector.get('MapChartFlowFactory');
	}));

	describe('Constructor', function(){

		var json = {
			'title' : 'fottutissimografico',
			'socketURL' : 'localhost/page1/grafico1'
		};

		var MapChart;

		beforeEach(function(){
			MapChart = MapChartFactory.build(json);
		});

		afterEach(function(){
			MapChart = null;
		});

		it('MapChart created', function(){
			expect(MapChart).toBeDefined();
		});

		it('graph Constructor called', function(){
			expect(MapChart.getTitle()).toEqual('fottutissimografico');
		});
		it('graph Constructor called', function(){
			expect(MapChart.getUrl()).toEqual('localhost/page1/grafico1');
		});
		it('graph created with the correct legendOnPoint', function(){
			expect(MapChart.getLegendOnPoint()).toEqual(false);
		});
		it('graph created with the correct latitude', function(){
			expect(MapChart.getLatitude()).toEqual(45.4113311);
		});
		it('graph created with the correct longitude', function(){
			expect(MapChart.getLongitude()).toEqual(11.8876318);
		});
		it('graph created with the correct mapType', function(){
			expect(MapChart.getMapType()).toEqual('roadmap');
		});
		it('graph created with the correct zoom', function(){
			expect(MapChart.getZoomable()).toEqual(true);
		});
		it('graph created with the correct drag', function(){
			expect(MapChart.getDraggable()).toEqual(true);
		});
		it('graph created with the correct mapWidth', function(){
			expect(MapChart.getMapWidth()).toEqual(0);
		});
		it('graph created with the correct mapHeight', function(){
			expect(MapChart.getMapHeight()).toEqual(0);
		});

	});

	/*dddescribe('split', function(){
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


	describe('#updateParameters', function(){
		var json = {
			'title' : 'graficonuovo',
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
			'flows' : [{'ID' : 'f1'},{'ID' : 'f2'},{'ID' : 'f3'}]
		};
		var MapChart;

		beforeEach(function(){
			MapChart = MapChartFactory.build();
			MapChart.updateParameters(json);
		});

		afterEach(function(){
			MapChart = null;
		});

		it('MapChart created', function(){
			expect(MapChart).toBeDefined();
		});

		it('graph updated with the correct legendOnPoint', function(){
			expect(MapChart.getLegendOnPoint()).toEqual(false);
		});
		it('graph updated with the correct latitude', function(){
			expect(MapChart.getLatitude()).toEqual(3);
		});
		it('graph updated with the correct longitude', function(){
			expect(MapChart.getLongitude()).toEqual(3);
		});
		it('graph updated with the correct mapType', function(){
			expect(MapChart.getMapType()).toEqual('terrain');
		});
		it('graph updated with the correct zoom', function(){
			expect(MapChart.getZoomable()).toEqual(false);
		});
		it('graph update with the correct drag', function(){
			expect(MapChart.getDraggable()).toEqual(true);
		});
		it('graph updated with the correct flows', function(){
            expect(MapChart.getFlowList().length).toEqual(3);
        });
        it('graph updated with the correct mapWidth', function(){
			expect(MapChart.getMapWidth()).toEqual(0);
		});
		it('graph updated with the correct mapHeight', function(){
			expect(MapChart.getMapHeight()).toEqual(0);
		});

		
	});
	
	describe('#addFlow', function(){

		var json = {
			'ID' : 	'flusso1',
		};

		var fJson = {
			'name' : 'flusso1',
			'marker' : {'type' : 'shape', 'shape' : 'circle', 'icon' : null, 'text' : null},
			'maxItems' : '45',
			'trace' : {'type' : 'none'}
		};

		var newFlow;
		var MapChart;


		beforeEach(function(){
			newFlow = MapChartFlowFactory.build(fJson);
			MapChart = MapChartFactory.build();
			MapChart.addFlow(json.ID, newFlow);
		});

		afterEach(function(){
			MapChart = null;
		});

		it('add flow into mapchart', function(){
			expect(MapChart.getFlowList().length).toEqual(1);
		});

	});

	describe('#deleteFlow', function(){

		var json1 = {
			'ID' : 	'flusso1',
			'name' : 'sonda 1'
		};

		var json2 = {
			'ID' : 	'flusso2',
			'name' : 'sonda 2'
		};
		var MapChart, Flow1, Flow2;

		beforeEach(function(){
			Flow1 = MapChartFlowFactory.build();
			Flow2 = MapChartFlowFactory.build();
			MapChart = MapChartFactory.build();
			MapChart.addFlow(json1.ID, Flow1);
			MapChart.addFlow(json2.ID, Flow2);
			MapChart.deleteFlow('flusso1');
		});

		afterEach(function(){
			Flow1 = null;
			Flow2 = null;
			MapChart = null;
		});

		it('delete flow from graph', function(){
			expect(MapChart.getFlowList().length).toEqual(1);
		});

	});

	describe('#replaceData', function(){

		var json1 = {
			'ID' : 	'flusso1',
			'name' : 'sonda 1',
			'records' : [{'NorrisRecordID' : 'record2', 'value' : [3,3] }, {'NorrisRecordID' : 'record3', 'value' : [4,4] }]
		};

		var json = {
			'ID' : 'flusso1',
			'records' :	[{'NorrisRecordID' : 'record4', 'value' : [5,5] }, {'NorrisRecordID' : 'record5', 'value' : [6,6] }]
		};

		var MapChart, Flow;

		beforeEach(function(){
			Flow = MapChartFlowFactory.build();
			Flow.initializeData(json1);
			MapChart = MapChartFactory.build();
			MapChart.addFlow(json1.ID, Flow);
			MapChart.replaceData(json);
		});

		afterEach(function(){
			Flow = null;
			MapChart = null;
		});

		it('delete flow from graph', function(){
			expect(MapChart.getFlowList()[0].flow.getData()[0].value[0]).toEqual(5);
			expect(MapChart.getFlowList()[0].flow.getData()[1].value[0]).toEqual(6);
		});

	});

	describe('#inizializeData', function(){

		var data = [
			{
				'ID' : '1',
				'records' : [{ 'NorrisRecordID' : '234321', 'value' : [0,1]},{}]
			}
		];

		var newFlow;
		var MapChart;

		beforeEach(function(){
			newFlow = MapChartFlowFactory.build();
			MapChart = MapChartFactory.build();
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

	describe('#inPlaceUpdate', function(){

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
		var MapChart;

		beforeEach(function(){
			newFlow = MapChartFlowFactory.build();
			MapChart = MapChartFactory.build();
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

	describe('#streamUpdate', function(){

		var data = [
			{
				'ID' : '2',
				'records' : [{'NorrisRecordID' : 'record2', 'value' : [3,3] }]
			}
		];
		var data1 = 	{
			'ID' : '2',
			'records' : [{
				'NorrisRecordID' : 'record2',
				'value' : [4,4]
			}]
		};
		var newFlow;
		var MapChart;

		beforeEach(function(){
			newFlow = MapChartFlowFactory.build();
			MapChart = MapChartFactory.build();
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

	describe('#deleteData', function(){

		var data = [
			{
				'ID' : '2',
				'records' : [{'NorrisRecordID' : 'record2', 'value' : [3,3] }]
			}
		];

		var delData = {
			'ID' : '2',
			'NorrisRecordID' : 'record2'
		};
		
		var newFlow;
		var MapChart;

		beforeEach(function(){
			newFlow = MapChartFlowFactory.build();
			MapChart = MapChartFactory.build();
			MapChart.addFlow(data[0].ID, newFlow);
			MapChart.initializeData(data);
			MapChart.deleteData(delData);
		});

		afterEach(function(){
			MapChart = null;
		});

		it('deleteData in the correct way', function(){
			expect(MapChart.getFlowList()[0].flow.getData().length).toEqual(0);
		});
	});

});