/*
* Name :  PagesList.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0			2015-05-14	Francesco Rossetto			Codifica del test sul Model Graph.js
*
* 0.0.1			2015-05-14	Francesco Rossetto			Creazione file
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
	
	/*describe('addFlow', function(){

		var json = {

		};

		beforeEach(function(){
			Graph.prototype.addflow();
		});

		it('', function(){
			expect(Graph.prototype.getFlowList().length).toBeEqual(1);
		});

	});*/

});