/*
* Name :  LineChart.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0			2015-05-15	Francesco Rossetto			Add test of Model::LineChart.js
*
* 0.0.1			2015-05-15	Francesco Rossetto			Initial code
* =================================================================================================
*
*/

describe('LineChart', function(){
	'use strict';

	var LineChart;
	var Graph;
	var Axis;
	var ViewFinder;
	var LineChartFlow;

	beforeEach(module('app'));

	beforeEach(inject(function(_LineChart_, $injector){
		LineChart = _LineChart_;
		Graph = $injector.get('Graph');
		Axis = $injector.get('Axis');
		ViewFinder = $injector.get('Legend');
		LineChartFlow = $injector.get('Flow');
	}));

	describe('Constructor', function(){

		var json = {
			"title" : "grafico1",
			"URLSocket" : "http://localhost/page1/grafico1"
		};

		beforeEach(function(){
			LineChart = new LineChart(json);
		});

		spyOn(Graph.prototype, "Graph").and.returnValue({});

		it('constructor use the graph constructor in the correct way', function(){
			expect(Graph.prototype.Graph()).toBeCalledWith(json);
		});

	});

	describe('split', function(){
		var json = {
			"title" : "grafico",
			"height" : 300,
			"width" : 300,
			"enabledLegend" : true,
			"legend" : {},
			"horizontalGrid" : true,
			"verticalGrid" : true,
			"axisX" : {},
			"axisY" : {},
			"enabledViewFinder" : true,
			"viewFinder" : {},
			"background" : "#FFF"
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
			"axisX" : {},
			"axisY" : {},
			"enabledViewFinder" : true,
			"viewFinder" : {},
			"background" : "#FFF"
		};

		beforeEach(function(){
			res = LineChart.Test("split(json)");
		});

		it('json splitted in the correct way', function(){
			expect(res.gJson).toBeEqual(g);
			expect(res.lJson).toBeEqual(l);
		});

	});


	/*describe('updateParameters', function(){
		var json = {
			"title" : "graficoNuovo",
			"height" : 300,
			"width" : 300,
			"enabledLegend" : true,
			"legend" : {},
			"horizontalGrid" : true,
			"verticalGrid" : true
		};

		beforeEach(function(){
			Graph.prototype.updateParameters(json);
		});

		spyOn(Legend.prototype, "Legend").and.returnValue({});

		it('graph updated with the correct name', function(){
			expect(Graph.prototype.getTitle()).toBeEqual("graficoNuovo");
		});
		it('graph updated with the correct name', function(){
			expect(Graph.prototype.getHeight()).toBeEqual(300);
		});
		it('graph updated with the correct name', function(){
			expect(Graph.prototype.getWidth()).toBeEqual(300));
		});
		it('graph updated with the correct name', function(){
			expect(Graph.prototype.getEnabledLegend()).toBeEqual(true));
		});
		it('graph updated with the correct name', function(){
			expect(Graph.prototype.getLegend()).toBeEqual({}));
		});
		it('graph updated with the correct name', function(){
			expect(Graph.prototype.getHorizontalGrid()).toBeEqual(true));
		});
		it('graph updated with the correct name', function(){
			expect(Graph.prototype.getVerticalGrid()).toBeEqual(true));
		});

	});
	
	describe('addFlow', function(){

		var json = {
			"ID" : 	"flusso1",
			"name" : "sonda 1"
		};

		spyOn(Flow.prototype, "Flow").and.returnValue({});

		beforeEach(function(){
			Graph.prototype.addflow(json);
		});

		it('add flow into graph', function(){
			expect(Graph.prototype.getFlowList().length).toBeEqual(1);
		});

	});

	describe('deleteFlow', function(){

		beforeEach(function(){
			Graph.prototype.deleteFlow("flusso1");
		});

		it('delete flow from graph', function(){
			expect(Graph.prototype.getFlowList().length).toBeEqual(0);
		});

	});*/

});