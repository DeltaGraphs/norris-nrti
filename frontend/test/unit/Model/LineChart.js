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
* 0.2.2			2015-05-15	Maria Giovanna Chinellato	Fix test of Model::LineChart.js
*
* 0.2.1			2015-05-15	Maria Giovanna Chinellato	Fix methods test
*
* 0.2.0			2015-05-15	Maria Giovanna Chinellato	Add test: all the methods of LineChart classes
*
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
		LineChartFlow = $injector.get('LineChartFlow');
	}));

	describe('Constructor', function(){

		var json = {
			'title' : 'grafico1',
			'URLSocket' : 'http://localhost/page1/grafico1'
		};

		beforeEach(function(){
			LineChart = new LineChart(json);
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
			'enabledViewFinder' : true,
			'viewFinder' : {},
			'background' : '#FFF'
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
			'axisX' : {},
			'axisY' : {},
			'enabledViewFinder' : true,
			'viewFinder' : {},
			'background' : '#FFF'
		};

		beforeEach(function(){
			res = LineChart.prototype.test('split(json)');
		});

		it('json splitted in the correct way', function(){
			expect(res.graphJson).toBeEqual(g);
			expect(res.lineJson).toBeEqual(l);
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
			'enabledViewFinder' : true,
			'viewFinder' : {},
			'background' : '#000',
			'flows' : [{},{},{}]
		};

		beforeEach(function(){
			LineChart.prototype.updateParameters(json);
		});

		spyOn(LineChartFlow.prototype, 'LineChartFlow').and.returnValue({});
		spyOn(LineChartFlow.prototype, 'addFlow').and.callFake(function() {return;});
		spyOn(Graph.prototype, 'apply').and.callFake(function() {return;});
		spyOn(ViewFinder.prototype, 'ViewFinder').and.returnValue({});
		spyOn(Axis.prototype, 'Axis').and.returnValue({});

		it('graph updated with the correct enabledViewFinder', function(){
			expect(LineChart.prototype.getEnabledViewFinder()).toBeEqual(false);
		});
		it('graph updated with the correct viewFinder', function(){
			expect(LineChart.prototype.getViewFinder()).toBeEqual({});
		});
		it('graph updated with the correct axisX', function(){
			expect(LineChart.prototype.getX()).toBeEqual({});
		});
		it('graph updated with the correct axisY', function(){
			expect(LineChart.prototype.getY()).toBeEqual({});
		});
		it('graph updated with the correct background', function(){
			expect(LineChart.prototype.getBackground()).toBeEqual('#000');
		});
		it('graph updated with the correct flow', function(){
			expect(LineChart.prototype.addFlow.calls.count()).toBeEqual(3);
		});
		
	});
	
	describe('addFlow', function(){

		var json = {
			'ID' : 	'flusso1',
			'name' : 'sonda 1'
		};

		var newflow = LineChartFlow({});

		//spyOn(Graph.prototype, 'addFlow').and.callFake(function() {return;});
		spyOn(Graph.prototype, 'addFlow.call').and.callFake(function() {return;});

		beforeEach(function(){
			LineChart.prototype.addflow(json.ID, newflow);
		});

		it('add flow into linechart', function(){
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

		spyOn(LineChartFlow.prototype, 'inizializeData').and.callFake(function() {return;});

		beforeEach(function(){
			LineChart.prototype.inizializeData(data);
		});

		it('inizialize flowList', function(){
			expect(LineChartFlow.prototype.inizializeData.calls.count()).toEqual(2);
		});
	});

	describe('inPlaceUpdate', function(){

		var data = 	{
			'ID' : '2',
			'records' : []
		};

		spyOn(LineChartFlow.prototype, 'inPlaceUpdate').and.callFake(function() {return;});

		beforeEach(function(){
			LineChart.prototype.inPlaceUpdate(data);
		});

		it('inizialize flowList', function(){
			expect(LineChartFlow.prototype.inPlaceUpdate).toHaveBeenCalledWith(data);
		});
	});

	describe('streamUpdate', function(){

		var data = 	{
			'ID' : '2',
			'records' : []
		};

		spyOn(LineChartFlow.prototype, 'streamUpdate').and.callFake(function() {return;});

		beforeEach(function(){
			LineChart.prototype.streamUpdate(data);
		});

		it('inizialize flowList', function(){
			expect(LineChartFlow.prototype.streamUpdate).toHaveBeenCalledWith(data);
		});
	});

});