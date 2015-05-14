/*
* Name :  PagesList.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.1			2015-05-14	Maria Giovanna Chinellato	Add test of method addFlow
*
* 0.1.0			2015-05-14	Francesco Rossetto			Add test of Model::Graph.js
*
* 0.0.1			2015-05-14	Francesco Rossetto			Initial code
* =================================================================================================
*
*/

describe('Graph', function(){
	'use strict';

	var Graph;
	var Legend;
	var Flow;

	beforeEach(module('app'));

	beforeEach(inject(function(_Graph_, $injector){
		Graph = _Graph_;
		Legend = $injector.get('Legend');
		Flow = $injector.get('Flow');
	}));

	describe('Constructor', function(){

		var json = {
			"title" : "grafico1",
			"URLSocket" : "http://localhost/page1/grafico1"
		};

		beforeEach(function(){
			Graph = new Graph(json);
		});

		it('constructor create the graph with the correct title', function(){
			expect(Graph.getTitle()).toBeEqual("grafico1");
		});
		it('constructor create the graph with the correct url', function(){
			expect(Graph.getUrl()).toBeEqual("http://localhost/page1/grafico1");
		});

	});

	describe('updateParameters', function(){
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

	});

});