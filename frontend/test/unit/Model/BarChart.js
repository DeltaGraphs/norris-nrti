/*
* Name :  LineChart.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.2.3         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.2.2			2015-05-15	Maria Giovanna Chinellato	Fix test of Model::BarChart
*
* 0.2.1			2015-05-15	Maria Giovanna Chinellato	Fix methods test
*
* 0.2.0			2015-05-15	Maria Giovanna Chinellato	Add test of all the methods of LineChart classes
*
* 0.1.0			2015-05-15	Maria Giovanna Chinellato	Add test of Model::BarChart.js
*
* 0.0.1			2015-05-15	Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

describe('BarChart', function(){
	'use strict';

	var BarChart;
	var Graph;
	var Axis;
	var BarChartFlow;

	beforeEach(module('app'));

	beforeEach(inject(function(_BarChart_, $injector){
		BarChart = _BarChart_;
		Graph = $injector.get('Graph');
		Axis = $injector.get('Axis');
		BarChartFlow = $injector.get('BarChartFlow');
	}));

	describe('Constructor', function(){

		var json = {
			'title' : 'grafico1',
			'URLSocket' : 'http://localhost/page1/grafico1'
		};

		beforeEach(function(){
			BarChart = new BarChart(json);
		});

		spyOn(Graph.prototype, 'apply').and.callFake(function() {return;});

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
			'title' : 'grafico',
			'height' : 300,
			'width' : 300,
			'enabledLegend' : true,
			'legend' : {},
			'horizontalGrid' : true,
			'verticalGrid' : true,
			'axisX' : {},
			'axisY' : {},
			'barOrientation' : 'horizontal',
			'background' : '#FFF',
			'sortable' : false,
			'barsGrouping' : 'stacked'
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
		var b = {
			'axisX' : {},
			'axisY' : {},
			'barOrientation' : 'horizontal',
			'background' : '#FFF',
			'sortable' : false,
			'barsGrouping' : 'stacked'
		};

		beforeEach(function(){
			res = BarChart.Test('split(json)');
		});

		it('json splitted in the correct way', function(){
			expect(res.graphJson).toBeEqual(g);
			expect(res.barJson).toBeEqual(b);
		});

	});


	describe('updateParameters', function(){
		var json = {
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'enabledLegend' : false,
			'horizontalGrid' : false,
			'verticalGrid' : false,
			'barOrientation' : 'vertical',
			'background' : '#F0F',
			'sortable' : false,
			'barsGrouping' : 'stacked',
			'flows' : [{},{},{}]
		};

		beforeEach(function(){
			BarChart.prototype.updateParameters(json);
		});

		spyOn(BarChartFlow.prototype, 'BarChartFlow').and.returnValue({});
		spyOn(BarChartFlow.prototype, 'addFlow').and.callFake(function() {return;});
		spyOn(Graph.prototype, 'apply').and.callFake(function() {return;});
		spyOn(Axis.prototype, 'Axis').and.returnValue({});

		it('graph updated with the correct axisX', function(){
			expect(BarChart.prototype.getX()).toBeEqual({});
		});
		it('graph updated with the correct axisY', function(){
			expect(BarChart.prototype.getY()).toBeEqual({});
		});
		it('graph updated with the correct barOrientation', function(){
			expect(BarChart.prototype.getBarOrientation()).toBeEqual('vertical');
		});
		it('graph updated with the correct background', function(){
			expect(BarChart.prototype.getBackground()).toBeEqual('#F0F');
		});
		it('graph updated with the correct sortable', function(){
			expect(BarChart.prototype.getSortable()).toBeEqual(false);
		});
		it('graph updated with the correct barsGrouping', function(){
			expect(BarChart.prototype.getBarsGrouping()).toBeEqual('stacked');
		});
		it('graph updated with the correct flow', function(){
			expect(BarChart.prototype.addFlow.calls.count()).toBeEqual(3);
		});
		
	});
	
	describe('addFlow', function(){

		var json = {
			'ID' : 	'flusso1',
			'name' : 'sonda 1'
		};

		var newflow = BarChartFlow({});

		//spyOn(Graph.prototype, 'addFlow').and.callFake(function() {return;});
		spyOn(Graph.prototype, 'addFlow.call').and.callFake(function() {return;});

		beforeEach(function(){
			BarChart.prototype.addflow(json.ID, newflow);
		});

		it('add flow into barchart', function(){
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

		spyOn(BarChartFlow.prototype, 'inizializeData').and.callFake(function() {return;});

		beforeEach(function(){
			BarChart.prototype.inizializeData(data);
		});

		it('inizialize flowList', function(){
			expect(BarChartFlow.prototype.inizializeData.calls.count()).toEqual(2);
		});
	});

	describe('inPlaceUpdate', function(){

		var data = 	{
			'ID' : '2',
			'records' : []
		};

		spyOn(BarChartFlow.prototype, 'inPlaceUpdate').and.callFake(function() {return;});

		beforeEach(function(){
			BarChart.prototype.inPlaceUpdate(data);
		});

		it('inizialize flowList', function(){
			expect(BarChartFlow.prototype.inPlaceUpdate).toHaveBeenCalledWith(data);
		});
	});

});