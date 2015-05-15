/*
* Name :  LineChart.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
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

	beforeEach(module('app'));

	beforeEach(inject(function(_MapChart_, $injector){
		MapChart = _MapChart_;
		Graph = $injector.get('Graph');
		MapChartFlow = $injector.get('MapChartFlow');
	}));

	describe('Constructor', function(){

		var json = {
			"title" : "grafico1",
			"URLSocket" : "http://localhost/page1/grafico1"
		};

		beforeEach(function(){
			MapChartFlow = new MapChartFlow(json);
		});

		spyOn(Graph.prototype, "apply").and.callFake(function() {return;});

		it('constructor use the graph constructor in the correct way', function(){
			expect(Graph.prototype.apply).toHaveBeenCalledWith(json);
		});

	});

	describe('split', function(){
		var res;
		var json = {};
		var json1 = json;
		json = json1;
		json = {
			"title" : "grafico",
			"height" : 300,
			"width" : 300,
			"enabledLegend" : true,
			"legend" : {},
			"horizontalGrid" : true,
			"verticalGrid" : true,
			"latitude" : 4,
			"longitude" : 4,
			"scale" : 1001,
			"mapType" : "roadmap",
			"zoom" : true
		};
		var g = {
			"title" : "grafico",
			"height" : 300,
			"width" : 300,
			"enabledLegend" : true,
			"legend" : {},
			"horizontalGrid" : true,
			"verticalGrid" : true
		};
		var l = {
			"latitude" : 4,
			"longitude" : 4,
			"scale" : 1001,
			"mapType" : "roadmap",
			"zoom" : true
		};

		beforeEach(function(){
			res = MapChart.prototype.test("split(json)");
		});

		it('json splitted in the correct way', function(){
			expect(res.graphJson).toBeEqual(g);
			expect(res.mapJson).toBeEqual(l);
		});

	});


	describe('updateParameters', function(){
		var json = {
			"title" : "graficonuovo",
			"height" : 400,
			"width" : 400,
			"enabledLegend" : false,
			"horizontalGrid" : false,
			"verticalGrid" : false,
			"latitude" : 3,
			"longitude" : 3,
			"scale" : 999,
			"mapType" : "terrain",
			"zoom" : false,
			"flows" : [{},{},{}]
		};

		beforeEach(function(){
			MapChart.prototype.updateParameters(json);
		});

		spyOn(MapChartFlow.prototype, "MapChartFlow").and.returnValue({});
		spyOn(MapChartFlow.prototype, "addFlow").and.callFake(function() {return;});
		spyOn(Graph.prototype, "apply").and.callFake(function() {return;});

		it('graph updated with the correct latitude', function(){
			expect(MapChart.prototype.getLatitude()).toBeEqual(3);
		});
		it('graph updated with the correct longitude', function(){
			expect(MapChart.prototype.getLongitude()).toBeEqual(3);
		});
		it('graph updated with the correct scale', function(){
			expect(MapChart.prototype.getScale()).toBeEqual(999);
		});
		it('graph updated with the correct mapType', function(){
			expect(MapChart.prototype.getMapType()).toBeEqual("terrrain");
		});
		it('graph updated with the correct zoom', function(){
			expect(MapChart.prototype.getZoom()).toBeEqual(false);
		});
		it('graph updated with the correct flows', function(){
            expect(MapChart.prototype.addFlow.calls.count()).toBeEqual(3);
        });
		
	});
	
	describe('addFlow', function(){

		var json = {
			"ID" : 	"flusso1",
			"name" : "sonda 1"
		};

		var newflow = MapChartFlow({});

		//spyOn(Graph.prototype, "addFlow").and.callFake(function() {return;});
		spyOn(Graph.prototype, "addFlow.call").and.callFake(function() {return;});

		beforeEach(function(){
			MapChart.prototype.addflow(json.ID, newflow);
		});

		it('add flow into mapchart', function(){
			expect(Graph.prototype.addFlow.call).toHaveBeenCalledWith(json.ID, newflow);
		});

	});

	describe("inizializeData", function(){

		var data = [
			{
				"ID" : "1",
				"records" : []
			},
			{
				"ID" : "2",
				"records" : []
			}
		];

		spyOn(MapChartFlow.prototype, "inizializeData").and.callFake(function() {return;});

		beforeEach(function(){
			MapChart.prototype.inizializeData(data);
		});

		it('inizialize flowList', function(){
			expect(MapChartFlow.prototype.inizializeData.calls.count()).toEqual(2);
		});
	});

	describe("inPlaceUpdate", function(){

		var data = 	{
			"ID" : "2",
			"records" : []
		};

		spyOn(MapChartFlow.prototype, "inPlaceUpdate").and.callFake(function() {return;});

		beforeEach(function(){
			MapChart.prototype.inPlaceUpdate(data);
		});

		it('inizialize flowList', function(){
			expect(MapChartFlow.prototype.inPlaceUpdate).toHaveBeenCalledWith(data);
		});
	});

	describe("streamUpdate", function(){

		var data = 	{
			"ID" : "2",
			"records" : []
		};

		spyOn(MapChartFlow.prototype, "streamUpdate").and.callFake(function() {return;});

		beforeEach(function(){
			MapChart.prototype.streamUpdate(data);
		});

		it('inizialize flowList', function(){
			expect(MapChartFlow.prototype.streamUpdate).toHaveBeenCalledWith(data);
		});
	});

	describe("movieUpdate", function(){

		var data = 	{
			"ID" : "2",
			"records" : []
		};

		spyOn(MapChartFlow.prototype, "movieUpdate").and.callFake(function() {return;});

		beforeEach(function(){
			MapChart.prototype.movieUpdate(data);
		});

		it('inizialize flowList', function(){
			expect(MapChartFlow.prototype.movieUpdate).toHaveBeenCalledWith(data);
		});
	});

});