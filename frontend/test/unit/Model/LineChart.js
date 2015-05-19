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

	describe('Constructor', function(){

		var json = {
			'title' : 'fottutissimografico',
			'url' : 'localhost/page1/grafico1'
		};

		beforeEach(function(){
			LineChart = new LineChart(json);
		});

		afterEach(function(){
			LineChart = null;
		});	

		it('LineChart created', function(){
			expect(LineChart).toBeDefined();
		});
		it('graph Constructor called', function(){
			expect(LineChart.getTitle()).toEqual('fottutissimografico');
		});
		it('graph Constructor called', function(){
			expect(LineChart.getUrl()).toEqual('localhost/page1/grafico1');
		});
		it('graph created with the correct axisX', function(){
			expect(LineChart.getX()).toEqual(null);
		});
		it('graph created with the correct axisY', function(){
			expect(LineChart.getY()).toEqual(null);
		});
		it('graph created with the correct viewFinder', function(){
			expect(LineChart.getViewFinder()).toEqual(null);
		});
		it('graph created with the correct background', function(){
			expect(LineChart.getBackground()).toEqual('#FFF');
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
			expect(res.graphJson).toEqual(g);
			expect(res.lineJson).toEqual(l);
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
			'viewFinder' : { 'viewFinder' : 'sono un viewFinder' },
			'axisX' : {},
			'axisY' : {},
			'background' : '#000',
			'flows' : [{},{},{}]
		};

		beforeEach(function(){
			LineChart = new LineChart();
			LineChart.updateParameters(json);
		});

		afterEach(function(){
			LineChart = null;
		});
		
		it('graph updated with the correct axisX', function(){
			expect(LineChart.getX()).toEqual({});
		});
		it('graph updated with the correct axisY', function(){
			expect(LineChart.getY()).toEqual({});
		});
		it('graph updated with the correct viewFinder', function(){
			expect(LineChart.getViewFinder()).toEqual({ 'viewFinder' : 'sono un viewFinder' });
		});
		it('graph updated with the correct background', function(){
			expect(LineChart.getBackground()).toEqual('#000');
		});
		it('graph updated with the correct flow', function(){
			expect(LineChart.getFlowList().length).toEqual(3);
		});
		
	});
	
	describe('addFlow', function(){
		var json = {
			'ID' : 	'flusso1',
		};

		var fJson = {
			'dataFormat' : 'int',
			'name' : 'flusso1',
			'legendOnPoint' : '',
			'marker' : 'furly',
			'interpolation' : 'linear',
			'areaColor' : '#FFF',
			'maxItem' : '5'
		};

		var newFlow;

		beforeEach(function(){
			newFlow = new LineChartFlow(fJson);
			LineChart = new LineChart();
			LineChart.addFlow(json.ID, newFlow);
		});

		afterEach(function(){
			LineChart = null;
		});	

		it('graph addFlow called with the correct parameters', function(){
			expect(LineChart.getFlowList().length).toEqual(1);
		});

	});

	describe('inizializeData', function(){

		var data = [
			{
				'ID' : '1',
				'records' : [{ 'NorrisRecordID' : '234321', 'value' : [0,1]},{}]
			}
		];

		var newFlow;

		beforeEach(function(){
			newFlow = new LineChartFlow();
			LineChart = new LineChart();
			LineChart.addFlow(data[0].ID, newFlow);
			LineChart.initializeData(data);
		});

		afterEach(function(){
			LineChart = null;
		});	

		it('LineChartFlow inizializeData called in the right way', function(){
			expect(LineChart.getFlowList()[0].flow.getData().length).toEqual(2);
		});

	});

	describe('inPlaceUpdate', function(){

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

		beforeEach(function(){
			newFlow = new LineChartFlow();
			LineChart = new LineChart();
			LineChart.addFlow(data[0].ID, newFlow);
			LineChart.initializeData(data);
		});

		afterEach(function(){
			LineChart = null;
		});	

		it('LineChartFlow inPlaceUpdate called in the right way', function(){
			expect(LineChart.getFlowList()[0].flow.getData()[0].value[0]).toEqual(3);
			LineChart.inPlaceUpdate(data1);
			expect(LineChart.getFlowList()[0].flow.getData()[0].value[0]).toEqual(4);
		});

	});

	describe('streamUpdate', function(){

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

		beforeEach(function(){
			newFlow = new LineChartFlow();
			LineChart = new LineChart();
			LineChart.addFlow(data[0].ID, newFlow);
			LineChart.initializeData(data);
			
		});

		afterEach(function(){
			LineChart = null;
		});	

		it('LineChartFlow streamUpdate called in the right way', function(){
			expect(LineChart.getFlowList()[0].flow.getData().length).toEqual(1);
			LineChart.streamUpdate(data1);
			expect(LineChart.getFlowList()[0].flow.getData().length).toEqual(2);
		});

	});

});