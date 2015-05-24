/*jshint node: true */
'use strict';

/*
* Name :  Graph.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.3			2015-05-18	Maria Giovanna Chinellato	Fix test
*
* 0.1.2         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.1.1			2015-05-14	Maria Giovanna Chinellato	Add test of method addFlow
*
* 0.1.0			2015-05-14	Francesco Rossetto			Add test of Model::Graph.js
*
* 0.0.1			2015-05-14	Francesco Rossetto			Initial code
* =================================================================================================
*
*/


describe('GraphFactory', function(){

	var GraphFactory;
	var LegendFactory;
	var FlowFactory;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject(function(_GraphFactory_, $injector){
		GraphFactory = _GraphFactory_;
		LegendFactory = $injector.get('LegendFactory');
		FlowFactory = $injector.get('FlowFactory');
	}));

	describe('prove', function(){
		var json = {
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'enabledLegend' : false,
			'horizontalGrid' : false,
			'verticalGrid' : false
		};
		var json1 = {
			'title' : 'grafico2',
			'height' : 400,
			'width' : 400,
			'enabledLegend' : false,
			'horizontalGrid' : false,
			'verticalGrid' : false
		};
		var g1, g2;

		beforeEach(function(){
			g1 = GraphFactory.build(json);
			g2 = GraphFactory.build(json1);
		});

		afterEach(function(){
			g1 = null;
			g2 = null;
		});	

		it('primo titolo', function(){
			expect(g1.getTitle()).toEqual('graficonuovo');
		});
		it('secondo titolo', function(){
			expect(g2.getTitle()).toEqual('grafico2');
		});
	});

	describe('Default constructor', function(){

		var Graph;

		beforeEach(function(){
			Graph = GraphFactory.build();
		});

		afterEach(function(){
			Graph = null;
		});

		it('instance defined', function(){
			expect(Graph).toBeDefined();
		});

		it('constructor create the graph with the correct title', function(){
			expect(Graph.getTitle()).toEqual(null);
		});
		it('constructor create the graph with the correct url', function(){
			expect(Graph.getUrl()).toEqual(null);
		});

	});

	describe('Constructor', function(){

		var json = {
			'title' : 'grafico1',
			'url' : 'http://localhost/page1/grafico1'
		};
		var Graph;

		beforeEach(function(){
			Graph = GraphFactory.build(json);
		});

		afterEach(function(){
			Graph = null;
		});

		it('instance defined', function(){
			expect(Graph).toBeDefined();
		});

		it('constructor create the graph with the correct title', function(){
			expect(Graph.getTitle()).toEqual('grafico1');
		});
		it('constructor create the graph with the correct url', function(){
			expect(Graph.getUrl()).toEqual('http://localhost/page1/grafico1');
		});

	});

	describe('updateParameters', function(){

		var json = {
			'title' : 'graficoNuovo',
			'height' : 300,
			'width' : 300,
			'enabledLegend' : true,
			'legend' : {},
			'horizontalGrid' : true,
			'verticalGrid' : true
		};
		var Graph;

		beforeEach(function(){
			Graph = GraphFactory.build();
			Graph.updateParameters(json);
		});

		afterEach(function(){
			Graph = null;
		});

		it('graph updated with the correct title', function(){
			expect(Graph.getTitle()).toEqual('graficoNuovo');
		});
		it('graph updated with the correct height', function(){
			expect(Graph.getHeight()).toEqual(300);
		});
		it('graph updated with the correct width', function(){
			expect(Graph.getWidth()).toEqual(300);
		});
		it('graph updated with the correct legend', function(){
			expect(Graph.getLegend()).toEqual({ _position: 'right', _fontColor: '#000', _backgroundColor: '#FFF' });
		});
		it('graph updated with the correct horizontalGrid', function(){
			expect(Graph.getHGrid()).toEqual(true);
		});
		it('graph updated with the correct verticalGrid', function(){
			expect(Graph.getVGrid()).toEqual(true);
		});

	});
	
	describe('addFlow', function(){

		var json = {
			'ID' : 	'flusso1',
			'name' : 'sonda 1'
		};
		var Graph, Flow1;

		beforeEach(function(){
			Flow1 = FlowFactory.build();
			Graph = GraphFactory.build();
			Graph.addFlow(json.ID, Flow1);
		});

		afterEach(function(){
			Flow1 = null;
			Graph = null;
		});

		it('add flow into graph', function(){
			expect(Graph.getFlowList().length).toEqual(1);
		});

	});

	describe('deleteFlow', function(){

		var json1 = {
			'ID' : 	'flusso1',
			'name' : 'sonda 1'
		};

		var json2 = {
			'ID' : 	'flusso2',
			'name' : 'sonda 2'
		};
		var Graph, Flow1, Flow2;

		beforeEach(function(){
			Flow1 = FlowFactory.build();
			Flow2 = FlowFactory.build();
			Graph = GraphFactory.build();
			Graph.addFlow(json1.ID, Flow1);
			Graph.addFlow(json2.ID, Flow2);
			Graph.deleteFlow('flusso1');
		});

		afterEach(function(){
			Flow1 = null;
			Flow2 = null;
			Graph = null;
		});

		it('delete flow from graph', function(){
			expect(Graph.getFlowList().length).toEqual(1);
		});

	});

});