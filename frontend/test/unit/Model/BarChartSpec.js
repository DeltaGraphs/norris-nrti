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

describe('BarChartFactory', function(){
	'use strict';

	var BarChartFactory;
	var BarChartFlowFactory;

	beforeEach(angular.mock.module('norris-nrti'));

	beforeEach(inject(function(_BarChartFactory_, $injector){
		BarChartFactory = _BarChartFactory_;
		BarChartFlowFactory = $injector.get('BarChartFlowFactory');
	}));

	describe('Constructor', function(){

		var json = {
			'title' : 'fottutissimografico',
			'socketURL' : 'localhost/page1/grafico1'
		};
		var BarChart;

		beforeEach(function(){
			BarChart = BarChartFactory.build(json);
		});

		afterEach(function(){
			BarChart = null;
		});

		it('BarChart created', function(){
			expect(BarChart).toBeDefined();
		});
		it('graph Constructor called', function(){
			expect(BarChart.getTitle()).toEqual('fottutissimografico');
		});
		it('graph Constructor called', function(){
			expect(BarChart.getUrl()).toEqual('localhost/page1/grafico1');
		});
		it('graph created with the correct axisX', function(){
			expect(BarChart.getX()).toEqual(null);
		});
		it('graph created with the correct axisY', function(){
			expect(BarChart.getY()).toEqual(null);
		});
		it('graph created with the correct barOrientation', function(){
			expect(BarChart.getBarOrientation()).toEqual('V');
		});
		it('graph created with the correct headers', function(){
			expect(BarChart.getHeaders()).toEqual([]);
		});
		it('graph created with the correct background', function(){
			expect(BarChart.getBackground()).toEqual('#FFF');
		});
		it('graph created with the correct sortable', function(){
			expect(BarChart.getSortable()).toEqual(true);
		});
		it('graph created with the correct grouping control', function(){
			expect(BarChart.getGroupingControl()).toEqual(true);
		});
		it('graph created with the correct legendOnPoint', function(){
			expect(BarChart.getLegendOnPoint()).toEqual(false);
		});
		it('graph created with the correct flow', function(){
			expect(BarChart.getFlowList().length).toEqual(0);
		});
		it('graph created with the correct horizontalGrid', function(){
			expect(BarChart.getHGrid()).toEqual(false);
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
			'axisX' : {},
			'axisY' : {},
			'barOrientation' : 'vertical',
			'headers' : ['colonna1'],
			'backgroundColor' : '#F0F',
			'sortable' : false,
			'groupingControl' : false,
			'legendOnPoint' : true,
			'grid' : false,
			'flows' : [{'ID' : 'f1'},{ 'ID' : 'f2'},{'ID' : 'f3'}]
		};
		var BarChart;

		beforeEach(function(){
			BarChart = BarChartFactory.build();
			BarChart.updateParameters(json);
		});

		afterEach(function(){
			BarChart = null;
		});	

		it('BarChart created', function(){
			expect(BarChart).toBeDefined();
		});
		it('graph updated with the correct axisX', function(){
			expect(BarChart.getX()).toEqual(null);
		});
		it('graph updated with the correct axisY', function(){
			expect(BarChart.getY()).toEqual(null);
		});
		it('graph updated with the correct barOrientation', function(){
			expect(BarChart.getBarOrientation()).toEqual('vertical');
		});
		it('graph updated with the correct headers', function(){
			expect(BarChart.getHeaders().length).toEqual(1);
		});
		it('graph updated with the correct background', function(){
			expect(BarChart.getBackground()).toEqual('#F0F');
		});
		it('graph updated with the correct sortable', function(){
			expect(BarChart.getSortable()).toEqual(false);
		});
		it('graph updated with the correct grouping control', function(){
			expect(BarChart.getGroupingControl()).toEqual(false);
		});
		it('graph updated with the correct legendOnPoint', function(){
			expect(BarChart.getLegendOnPoint()).toEqual(true);
		});
		it('graph updated with the correct flow', function(){
			expect(BarChart.getFlowList().length).toEqual(3);
		});
		it('graph updated with the correct horizontalGrid', function(){
			expect(BarChart.getHGrid()).toEqual(false);
		});
		
	});
	
	describe('addFlow', function(){

		var json = {
			'ID' : 	'flusso1'
		};
		var fJson = {
			'name' : 'flusso1',
			'flowColor' : '#F2F'
		};
		var newflow;
		var BarChart;

		beforeEach(function(){
			newflow = BarChartFlowFactory.build(fJson);
			BarChart = BarChartFactory.build();
			BarChart.addFlow(json.ID, newflow);
		});

		afterEach(function(){
			BarChart = null;
		});	

		it('graph addFlow called with the correct parameters', function(){
			expect(BarChart.getFlowList().length).toEqual(1);
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
		var BarChart, Flow1, Flow2;

		beforeEach(function(){
			Flow1 = BarChartFlowFactory.build();
			Flow2 = BarChartFlowFactory.build();
			BarChart = BarChartFactory.build();
			BarChart.addFlow(json1.ID, Flow1);
			BarChart.addFlow(json2.ID, Flow2);
			BarChart.deleteFlow('flusso1');
		});

		afterEach(function(){
			Flow1 = null;
			Flow2 = null;
			BarChart = null;
		});

		it('delete flow from graph', function(){
			expect(BarChart.getFlowList().length).toEqual(1);
		});

	});

	describe('replaceData', function(){

		var json1 = {
			'ID' : 	'flusso1',
			'name' : 'sonda 1',
			'records' : [{'NorrisRecordID' : 'record2', 'value' : [3,3] }, {'NorrisRecordID' : 'record3', 'value' : [4,4] }]
		};

		var json = {
			'ID' : 'flusso1',
			'records' :	[{'NorrisRecordID' : 'record4', 'value' : [5,5] }, {'NorrisRecordID' : 'record5', 'value' : [6,6] }]
		};

		var BarChart, Flow;

		beforeEach(function(){
			Flow = BarChartFlowFactory.build();
			Flow.initializeData(json1);
			BarChart = BarChartFactory.build();
			BarChart.addFlow(json1.ID, Flow);
			BarChart.replaceData(json);
		});

		afterEach(function(){
			Flow = null;
			BarChart = null;
		});

		it('delete flow from graph', function(){
			expect(BarChart.getFlowList()[0].flow.getData()[0].value[0]).toEqual(5);
			expect(BarChart.getFlowList()[0].flow.getData()[1].value[0]).toEqual(6);
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
		var BarChart;

		beforeEach(function(){
			newFlow = BarChartFlowFactory.build();
			BarChart = BarChartFactory.build();
			BarChart.addFlow(data[0].ID, newFlow);
			BarChart.initializeData(data);
		});

		afterEach(function(){
			BarChart = null;
		});	

		it('BarChartFlow inizializeData called in the right way', function(){
			expect(BarChart.getFlowList()[0].flow.getData().length).toEqual(2);
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
		var BarChart;

		beforeEach(function(){
			newFlow = BarChartFlowFactory.build();
			BarChart = BarChartFactory.build();
			BarChart.addFlow(data[0].ID, newFlow);
			BarChart.initializeData(data);
		});

		afterEach(function(){
			BarChart = null;
		});	

		it('BarChartFlow inPlaceUpdate called in the right way', function(){
			expect(BarChart.getFlowList()[0].flow.getData()[0].value[0]).toEqual(3);
			BarChart.inPlaceUpdate(data1);
			expect(BarChart.getFlowList()[0].flow.getData()[0].value[0]).toEqual(4);
		});
	});

	describe('deleteData', function(){

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
		var BarChart;

		beforeEach(function(){
			newFlow = BarChartFlowFactory.build();
			BarChart = BarChartFactory.build();
			BarChart.addFlow(data[0].ID, newFlow);
			BarChart.initializeData(data);
			BarChart.deleteData(delData);
		});

		afterEach(function(){
			BarChart = null;
		});

		it('deleteData in the correct way', function(){
			expect(BarChart.getFlowList()[0].flow.getData().length).toEqual(0);
		});
	});

});