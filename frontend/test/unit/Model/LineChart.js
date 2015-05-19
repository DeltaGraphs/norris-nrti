/*
* Name :  LineChart.js
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

	beforeEach(angular.mock.module('app'));

	beforeEach(inject(function(_LineChart_, $injector){
		LineChart = _LineChart_;
		Graph = $injector.get('Graph');
		Axis = $injector.get('Axis');
		ViewFinder = $injector.get('Legend');
		LineChartFlow = $injector.get('LineChartFlow');
	}));
	describe('Default constructor', function(){

		beforeEach(function(){
			LineChart = new LineChart();
		});

		afterEach(function(){
			LineChart = null;
		});	

		/*it('graph updateParameters called with the correct parameters', function(){
			expect(LineChart.parent.updateParameters.call).toHaveBeenCalledWith(gJson);
		});*/

		it('LineChart created', function(){
			expect(LineChart).toBeDefined();
		});
		
		it('graph created with the correct axisX', function(){
			expect(LineChart.getX()).toBeEqual(null);
		});
		it('graph created with the correct axisY', function(){
			expect(LineChart.getY()).toBeEqual(null);
		});
		it('graph created with the correct enabledLegend', function(){
			expect(LineChart.getEnableViewFinder()).toBeEqual(false);
		});
		it('graph created with the correct viewFinder', function(){
			expect(LineChart.getViewFinder()).toBeEqual(null);
		});
		it('graph created with the correct background', function(){
			expect(LineChart.getBackground()).toBeEqual('#FFF');
		});
		it('graph created with the correct flow', function(){
			expect(LineChart.addFlow.calls.count()).toBeEqual(null);
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
			'enabledViewFinder' : true,
			'viewFinder' : {},
			'axisX' : {},
			'axisY' : {},
			'background' : '#000',
			'flows' : [{},{},{}]
		};
		/*var gJson = {
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'enabledLegend' : false,
			'horizontalGrid' : false,
			'verticalGrid' : false,
		};*/

		beforeEach(function(){
			LineChart = new LineChart(json);
		});

		afterEach(function(){
			LineChart = null;
		});	

		/*it('graph updateParameters called with the correct parameters', function(){
			expect(LineChart.parent.updateParameters.call).toHaveBeenCalledWith(gJson);
		});*/
		it('LineChart created', function(){
			expect(LineChart).toBeDefined();
		});
		
		it('graph created with the correct axisX', function(){
			expect(LineChart.getX()).toBeEqual({});
		});
		it('graph created with the correct axisY', function(){
			expect(LineChart.getY()).toBeEqual({});
		});
		it('graph created with the correct enabledLegend', function(){
			expect(LineChart.getEnableViewFinder()).toBeEqual(true);
		});
		it('graph created with the correct viewFinder', function(){
			expect(LineChart.getViewFinder()).toBeEqual({});
		});
		it('graph created with the correct background', function(){
			expect(LineChart.getBackground()).toBeEqual('#000');
		});
		it('graph created with the correct flow', function(){
			expect(LineChart.addFlow.calls.count()).toBeEqual(3);
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

	});*/


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
			'axisX' : {},
			'axisY' : {},
			'background' : '#000',
			'flows' : [{},{},{}]
		};
		/*var gJson = {
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'enabledLegend' : false,
			'horizontalGrid' : false,
			'verticalGrid' : false,
		};*/

		beforeEach(function(){
			LineChart = new LineChart();
			LineChart = LineChart.updateParameters(json);
		});

		afterEach(function(){
			LineChart = null;
		});	

		/*it('graph updateParameters called with the correct parameters', function(){
			expect(LineChart.parent.updateParameters.call).toHaveBeenCalledWith(gJson);
		});*/
		
		it('graph updated with the correct axisX', function(){
			expect(LineChart.getX()).toBeEqual({});
		});
		it('graph updated with the correct axisY', function(){
			expect(LineChart.getY()).toBeEqual({});
		});
		it('graph updated with the correct enabledViewFinder', function(){
			expect(LineChart.getEnableViewFinder()).toBeEqual(true);
		});
		it('graph updated with the correct viewFinder', function(){
			expect(LineChart.getViewFinder()).toBeEqual({});
		});
		it('graph updated with the correct background', function(){
			expect(LineChart.getBackground()).toBeEqual('#000');
		});
		it('graph updated with the correct flow', function(){
			expect(LineChart.addFlow.calls.count()).toBeEqual(3);
		});
		
	});
	
	describe('addFlow', function(){

		var json = {
			'ID' : 	'flusso1'
		};

		beforeEach(function(){
			var newflow = LineChartFlow({});
			LineChart = new LineChart();
			LineChart = LineChart.addflow(json.ID, newflow);
		});

		afterEach(function(){
			LineChart = null;
		});	

		it('graph addFlow called with the correct parameters', function(){
			expect(LineChart.parent.addFlow.call).toHaveBeenCalledWith(this, json.ID, newflow);
		});

	});

	/*describe('inizializeData', function(){

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
			LineChart = new LineChart();
			LineChart = LineChart.inizializeData(data);
		});

		afterEach(function(){
			LineChart = null;
		});	

		it('LineChartFlow inizializeData called in the right way', function(){
			expect(LineChartFlow.prototype.inizializeData.calls.count()).toEqual(2);
		});

	});

	describe('inPlaceUpdate', function(){

		var data = 	{
			'ID' : '2',
			'NorrisRecordID' : 'record2',
			'value' : []
		};

		beforeEach(function(){
			LineChart = new LineChart();
			LineChart = LineChart.inPlaceUpdate(data);
		});

		afterEach(function(){
			LineChart = null;
		});	

		it('LineChartFlow inPlaceUpdate called in the right way', function(){
			expect(LineChartFlow.inPlaceUpdate).toHaveBeenCalledWith(data);
		});

	});

	describe('streamUpdate', function(){

		var data = 	{
			'ID' : '2',
			'records' : []
		};

		beforeEach(function(){
			LineChart = new LineChart();
			LineChart = LineChart.streamUpdate(data);
		});

		afterEach(function(){
			LineChart = null;
		});	

		it('LineChartFlow streamUpdate called in the right way', function(){
			expect(LineChartFlow.streamUpdate).toHaveBeenCalledWith(data);
		});

	});*/

});