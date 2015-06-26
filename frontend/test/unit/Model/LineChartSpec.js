/*
* Name :  LineChart.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.3.1			2015-06-26	Maria Giovanna Chinellato   Fix code
*
* 0.3.0			2015-05-18	Francesco Rossetto			Restructured test
*
* 0.2.3         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.2.2			2015-05-16	Maria Giovanna Chinellato	Fix test of Model::LineChart.js
*
* 0.2.1			2015-05-16	Maria Giovanna Chinellato	Fix methods test
*
* 0.2.0			2015-05-16	Maria Giovanna Chinellato	Add test: all the methods of LineChart classes
*
* 0.1.0			2015-05-16	Francesco Rossetto			Add test of Model::LineChart.js
*
* 0.0.1			2015-05-16	Francesco Rossetto			Initial code
* =================================================================================================
*
*/

describe('LineChart', function(){
	'use strict';

	var LineChartFactory;
	var LineChartFlowFactory;

	beforeEach(angular.mock.module('norris-nrti'));

	beforeEach(inject(function(_LineChartFactory_, $injector){
		LineChartFactory = _LineChartFactory_;
		LineChartFlowFactory = $injector.get('LineChartFlowFactory');
	}));

	describe('Constructor', function(){

		var LineChart;

		beforeEach(function(){
			LineChart = LineChartFactory.build();
		});

		afterEach(function(){
			LineChart = null;
		});	

		it('LineChart created', function(){
			expect(LineChart).toBeDefined();
		});
		it('graph Constructor called', function(){
			expect(LineChart.getTitle()).toEqual(null);
		});
		it('graph Constructor called', function(){
			expect(LineChart.getUrl()).toEqual(null);
		});
		it('graph created with the correct legendOnPoint', function(){
			expect(LineChart.getLegendOnPoint()).toEqual(false);
		});
		it('graph created with the correct axisX', function(){
			expect(LineChart.getX()).toEqual(null);
		});
		it('graph created with the correct axisY', function(){
			expect(LineChart.getY()).toEqual(null);
		});
		it('graph created with the correct viewFinder', function(){
			expect(LineChart.getViewFinder()).toEqual(false);
		});
		it('graph created with the correct background', function(){
			expect(LineChart.getBackground()).toEqual('#FFF');
		});
		it('graph created with the correct interpolation', function(){
			expect(LineChart.getInterpolation()).toEqual('linear');
		});
		it('graph created with the correct horizontalGrid', function(){
			expect(LineChart.getHGrid()).toEqual(false);
		});
		it('graph created with the correct verticalGrid', function(){
			expect(LineChart.getVGrid()).toEqual(false);
		});

	});

	/*deeescribe('split', function(){
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


	describe('#updateParameters', function(){
		var json = {
			'title' : 'graficonuovo',
			'socketURL' : 'localhost/page1/grafico1',
			'height' : 400,
			'width' : 400,
			'enableLegend' : true,
			'legend' : { position: 'SW' },
			'legendOnPoint' : true,
			'viewFinder' : true,
			'axisX' : {},
			'axisY' : {},
			'backgroundColor' : '#000',
			'interpolation' : 'linear',
			'horizontalGrid' : true,
			'verticalGrid' : true,
			'flows' : [{'ID' : 'f1'},{'ID' : 'f2'},{'ID' : 'f3'}]
		};

		var LineChart;

		beforeEach(function(){
			LineChart = LineChartFactory.build();
			LineChart.updateParameters(json);
		});

		afterEach(function(){
			LineChart = null;
		});
		
		it('graph updated with the correct legendOnPoint', function(){
			expect(LineChart.getLegendOnPoint()).toEqual(true);
		});
		it('graph updated with the correct height', function(){
			expect(LineChart.getHeight()).toEqual(400);
		});
		it('graph updated with the correct width', function(){
			expect(LineChart.getWidth()).toEqual(400);
		});
		it('graph updated with the correct axisX', function(){
			expect(LineChart.getX()).toBeDefined();
		});
		it('graph updated with the correct axisY', function(){
			expect(LineChart.getY()).toBeDefined();
		});
		it('graph updated with the correct viewFinder', function(){
			expect(LineChart.getViewFinder()).toEqual(true);
		});
		it('graph updated with the correct background', function(){
			expect(LineChart.getBackground()).toEqual('#000');
		});
		it('graph updated with the correct flow', function(){
			expect(LineChart.getFlowList().length).toEqual(3);
		});
		it('graph updated with the correct interpolation', function(){
			expect(LineChart.getInterpolation()).toEqual('linear');
		});
		it('graph updated with the correct horizontalGrid', function(){
			expect(LineChart.getHGrid()).toEqual(true);
		});
		it('graph updated with the correct verticalGrid', function(){
			expect(LineChart.getVGrid()).toEqual(true);
		});
		
	});
	
	describe('#addFlow', function(){
		var json = {
			'ID' : 	'flusso1',
		};

		var fJson = {
			'name' : 'flusso1',
			'flowColor' : '#000',
			'marker' : 'none',
			'interpolation' : 'linear',
			'area' : '#FFF',
			'maxItem' : '5'
		};

		var newFlow;
		var LineChart;

		beforeEach(function(){
			newFlow = LineChartFlowFactory.build(fJson);
			LineChart = LineChartFactory.build();
			LineChart.addFlow(json.ID, newFlow);
		});

		afterEach(function(){
			LineChart = null;
		});	

		it('graph addFlow called with the correct parameters', function(){
			expect(LineChart.getFlowList().length).toEqual(1);
		});

	});

	describe('#deleteFlow', function(){

		var json1 = {
			'ID' : 	'flusso1',
			'name' : 'sonda 1'
		};

		var json2 = {
			'ID' : 	'flusso2',
			'name' : 'sonda 2'
		};
		var LineChart, Flow1, Flow2;

		beforeEach(function(){
			Flow1 = LineChartFlowFactory.build();
			Flow2 = LineChartFlowFactory.build();
			LineChart = LineChartFactory.build();
			LineChart.addFlow(json1.ID, Flow1);
			LineChart.addFlow(json2.ID, Flow2);
			LineChart.deleteFlow('flusso1');
		});

		afterEach(function(){
			Flow1 = null;
			Flow2 = null;
			LineChart = null;
		});

		it('delete flow from graph', function(){
			expect(LineChart.getFlowList().length).toEqual(1);
		});

	});
	
	describe('#replaceData', function(){

		var json1 = {
			'ID' : 	'flusso1',
			'name' : 'sonda 1',
			'records' : [{'NorrisRecordID' : 'record2', 'value' : [3,3] }, {'NorrisRecordID' : 'record3', 'value' : [4,4] }]
		};

		var json = {
			'ID' : 'flusso1',
			'records' :	[{'NorrisRecordID' : 'record4', 'value' : [5,5] }, {'NorrisRecordID' : 'record5', 'value' : [6,6] }]
		};

		var LineChart, Flow;

		beforeEach(function(){
			Flow = LineChartFlowFactory.build();
			Flow.initializeData(json1);
			LineChart = LineChartFactory.build();
			LineChart.addFlow(json1.ID, Flow);
			LineChart.replaceData(json);
		});

		afterEach(function(){
			Flow = null;
			LineChart = null;
		});

		it('delete flow from graph', function(){
			expect(LineChart.getFlowList()[0].flow.getData()[0].value[0]).toEqual(5);
			expect(LineChart.getFlowList()[0].flow.getData()[1].value[0]).toEqual(6);
		});

	});

	describe('#initializeData', function(){

		var data = [
			{
				'ID' : '1',
				'records' : [{ 'NorrisRecordID' : '234321', 'value' : [0,1]},{}]
			}
		];

		var newFlow;
		var LineChart;

		beforeEach(function(){
			newFlow = LineChartFlowFactory.build();
			LineChart = LineChartFactory.build();
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

	describe('#inPlaceUpdate', function(){

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
		var LineChart;

		beforeEach(function(){
			newFlow = LineChartFlowFactory.build();
			LineChart = LineChartFactory.build();
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

	describe('#streamUpdate', function(){

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
		var LineChart;

		beforeEach(function(){
			newFlow = LineChartFlowFactory.build();
			LineChart = LineChartFactory.build();
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

	describe('#deleteData', function(){

		var data = [
			{
				'ID' : '2',
				'records' : [{'NorrisRecordID' : 'record2', 'value' : [3,3] }]
			}
		];

		var delData = {
			'ID' : '2',
			'NorrisRecordID' : 'record2'
		};
		
		var newFlow;
		var LineChart;

		beforeEach(function(){
			newFlow = LineChartFlowFactory.build();
			LineChart = LineChartFactory.build();
			LineChart.addFlow(data[0].ID, newFlow);
			LineChart.initializeData(data);
			LineChart.deleteData(delData);
		});

		afterEach(function(){
			LineChart = null;
		});

		it('deleteData in the correct way', function(){
			expect(LineChart.getFlowList()[0].flow.getData().length).toEqual(0);
		});
	});

});