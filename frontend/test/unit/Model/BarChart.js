/*
* Name :  BarChart.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.3.0			2015-05-18	Francesco Rossetto			Restructured test
*
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

		afterEach(function(){
			BarChart = null;
		});		

		it('BarChart created', function(){
			expect(BarChart).toBeDefined();
		});
		it('graph Constructor called', function(){
			expect(BarChart.parent.constructor.call).toHaveBeenCalledWith(this, json);
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
			expect(res.graphJson).toEqual(g);
			expect(res.barJson).toEqual(b);
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
			'axisX' : {},
			'axisY' : {},
			'barOrientation' : 'vertical',
			'background' : '#F0F',
			'sortable' : false,
			'barsGrouping' : 'stacked',
			'flows' : [{},{},{}]
		};
		var gJson = {
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'enabledLegend' : false,
			'horizontalGrid' : false,
			'verticalGrid' : false,
		};

		beforeEach(function(){
			BarChart = new BarChart();
			BarChart = BarChart.updateParameters(json);
		});

		afterEach(function(){
			BarChart = null;
		});	

		it('graph updateParameters called with the correct parameters', function(){
			expect(BarChart.parent.updateParameters.call).toHaveBeenCalledWith(gJson);
		});
		it('graph updated with the correct axisX', function(){
			expect(BarChart.getX()).toEqual({});
		});
		it('graph updated with the correct axisY', function(){
			expect(BarChart.getY()).toEqual({});
		});
		it('graph updated with the correct barOrientation', function(){
			expect(BarChart.getBarOrientation()).toEqual('vertical');
		});
		it('graph updated with the correct background', function(){
			expect(BarChart.getBackground()).toEqual('#F0F');
		});
		it('graph updated with the correct sortable', function(){
			expect(BarChart.getSortable()).toEqual(false);
		});
		it('graph updated with the correct barsGrouping', function(){
			expect(BarChart.getBarsGrouping()).toEqual('stacked');
		});
		it('graph updated with the correct flow', function(){
			expect(BarChart.addFlow.calls.count()).toEqual(3);
		});
		
	});
	
	describe('addFlow', function(){

		var json = {
			'ID' : 	'flusso1'
		};

		var newflow = BarChartFlow({});

		beforeEach(function(){
			BarChart = new BarChart();
			BarChart = BarChart.addflow(json.ID, newflow);
		});

		afterEach(function(){
			BarChart = null;
		});	

		it('graph addFlow called with the correct parameters', function(){
			expect(BarChart.parent.addFlow.call).toHaveBeenCalledWith(this, json.ID, newflow);
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
			BarChart = new BarChart();
			BarChart = BarChart.inizializeData(data);
		});

		afterEach(function(){
			BarChart = null;
		});	

		it('BarChartFlow inizializeData called in the right way', function(){
			expect(BarChartFlow.inizializeData.calls.count()).toEqual(2);
		});

	});

	describe('inPlaceUpdate', function(){

		var data = 	{
			'ID' : '2',
			'NorrisRecordID' : 'record2',
			'value' : []
		};

		beforeEach(function(){
			BarChart = new BarChart();
			BarChart = BarChart.inPlaceUpdate(data);
		});

		afterEach(function(){
			BarChart = null;
		});	

		it('BarChartFlow inPlaceUpdate called in the right way', function(){
			expect(BarChartFlow.inPlaceUpdate).toHaveBeenCalledWith(data);
		});
	});

});