/*jshint node: true */
'use strict';

/*
* Name :  LineChartFlow.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.2.0         2015-05-18  Maria Giovanna Chinellato	Modified general structure, some fixes
*
* 0.1.1         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.1.0			2015-05-15	Maria Giovanna Chinellato	Add test of Model::LineChartFlow.js
*
* 0.0.1			2015-05-15	Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

describe('LineChartFlowFactory', function(){

	var LineChartFlowFactory;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject(function(_LineChartFlowFactory_){
		LineChartFlowFactory = _LineChartFlowFactory_;
	}));

	describe('Default constructor', function(){

		var LineChartFlow;

		beforeEach(function() {
			LineChartFlow = LineChartFlowFactory.build();
		});

		afterEach(function() {
			LineChartFlow = null;
		});

		it('instance defined', function(){
			expect(LineChartFlow).toBeDefined();
		});

		it('constructor create the flow with the correct flowColor', function(){
			expect(LineChartFlow.getFlowColor()).toEqual('#000');
		});
		it('constructor create the flow with the correct marker', function(){
			expect(LineChartFlow.getMarker()).toEqual('square');
		});
		it('constructor create the flow with the correct interpolation', function(){
			expect(LineChartFlow.getInterpolation()).toEqual('linear');
		});
		it('constructor create the flow with the correct area color', function(){
			expect(LineChartFlow.getAreaColor()).toEqual('#FFF');
		});
		it('constructor create the flow with the correct max item displayed', function(){
			expect(LineChartFlow.getMaxItem()).toEqual(20);
		});

	});

	describe('Constructor', function(){

		var json = {
			'name' : 'flusso1',
			'flowColor' : '#F2F',
			'marker' : 'furly',
			'interpolation' : 'single',
			'area' : '#F2F',
			'maxItem' : 20
		};

		var LineChartFlow;

		beforeEach(function() {
			LineChartFlow = LineChartFlowFactory.build(json);
		});

		afterEach(function() {
			LineChartFlow = null;
		});

		it('instance defined', function(){
			expect(LineChartFlow).toBeDefined();
		});

		it('constructor create the flow with the correct flowColor', function(){
			expect(LineChartFlow.getFlowColor()).toEqual('#F2F');
		});
		it('constructor create the flow with the correct marker', function(){
			expect(LineChartFlow.getMarker()).toEqual('furly');
		});
		it('constructor create the flow with the correct interpolation', function(){
			expect(LineChartFlow.getInterpolation()).toEqual('single');
		});
		it('constructor create the flow with the correct area color', function(){
			expect(LineChartFlow.getAreaColor()).toEqual('#F2F');
		});
		it('constructor create the flow with the correct max item displayed', function(){
			expect(LineChartFlow.getMaxItem()).toEqual(20);
		});

	});

	/*describe('split', function(){
		var res;
		var json = {};
		var json1 = json;
		json = json1;
		json = {
			'dataFormat' : 'int',
			'name' : 'flusso1',
			'flowColor' : '#FFF',
			'legendOnPoin' : 'flusso',
			'marker' : 'furly',
			'interpolation' : 'single',
			'areaColor' : '#F3F',
			'maxItem' : '15'
		};
		var f = {
			'dataFormat' : 'int',
			'name' : 'flusso1'
		};
		var l = {
			'flowColor' : '#FFF',
			'legendOnPoin' : 'flusso',
			'marker' : 'furly',
			'interpolation' : 'single',
			'areaColor' : '#F3F',
			'maxItem' : '15'
		};

		beforeEach(function(){
			res = LineChartFlow.prototype.test('split(json)');
		});

		it('json splitted in the correct way', function(){
			expect(res.flowJson).toEqual(f);
			expect(res.lineFlowJson).toEqual(l);
		});

	});*/

	describe('updateParameters', function(){
		var json = {
			'name' : 'flusso2',
			'flowColor' : '#F1F',
			'marker' : 'furly1',
			'interpolation' : 'cubic',
			'area' : '#F1F',
			'maxItem' : 15
		};
		var LineChartFlow;

		beforeEach(function(){
			LineChartFlow = LineChartFlowFactory.build();
			LineChartFlow.updateParameters(json);
		});

		afterEach(function(){
			LineChartFlow = null;
		});

		it('flow updated with the correct flowColor', function(){
			expect(LineChartFlow.getFlowColor()).toEqual('#F1F');
		});
		it('flow updated with the correct marker', function(){
			expect(LineChartFlow.getMarker()).toEqual('furly1');
		});
		it('flow updated with the correct interpolation', function(){
			expect(LineChartFlow.getInterpolation()).toEqual('cubic');
		});
		it('flow updated with the correct area color', function(){
			expect(LineChartFlow.getAreaColor()).toEqual('#F1F');
		});
		it('flow updated with the correct max item displayed', function(){
			expect(LineChartFlow.getMaxItem()).toEqual(15);
		});

	});

	describe('initializeData', function(){

		var data = {
			'records' : [
				{ 
					'NorrisRecordID' : 'record1',
					'value' : [ 12.5464546515, 11.15468766]
				},
				{ 
					'NorrisRecordID' : 'record2',
					'value' : [ 12.5464546515, 11.15468766]
				},
				{ 
					'NorrisRecordID' : 'record3',
					'value' : [ 12.5464546515, 11.15468766]
				}
			]
		};

		var LineChartFlow;

		beforeEach(function(){
			LineChartFlow = LineChartFlowFactory.build();
			LineChartFlow.initializeData(data);
		});

		afterEach(function(){
			LineChartFlow = null;
		});

		it('data initialized in the correct way', function(){
			expect(LineChartFlow.getData().length).toEqual(3);
		});

	});

	describe('emptyData', function(){

		var data = {
			'records' : [
				{ 
					'NorrisRecordID' : 'record1',
					'value' : [ 12.5464546515, 11.15468766]
				},
				{ 
					'NorrisRecordID' : 'record2',
					'value' : [ 12.5464546515, 11.15468766]
				},
				{ 
					'NorrisRecordID' : 'record3',
					'value' : [ 12.5464546515, 11.15468766]
				}
			]
		};

		var LineChartFlow;

		beforeEach(function(){
			LineChartFlow = LineChartFlowFactory.build();
			LineChartFlow.initializeData(data);
		});

		afterEach(function(){
			LineChartFlow = null;
		});

		it('data empty in the correct way', function(){
			expect(LineChartFlow.getData().length).toEqual(3);
			LineChartFlow.emptyData();
			expect(LineChartFlow.getData().length).toEqual(0);
		});

	});

	describe('inPlaceUpdate', function(){
		
		var data = {
			'records' : [
				{ 
					'NorrisRecordID' : 'record1',
					'value' : [ 1, 1]
				}
			]
		};

		var update = {
			'NorrisRecordID' : 'record1',
			'value' : [ 1, 2]
		};
		var LineChartFlow;

		beforeEach(function(){
			LineChartFlow = LineChartFlowFactory.build();
			LineChartFlow.initializeData(data);
			LineChartFlow.inPlaceUpdate(update);
		});

		afterEach(function(){
			LineChartFlow = null;
		});

		it('data updated in the correct way', function(){
			expect(LineChartFlow.getData()[0].value[0]).toEqual(1);
			expect(LineChartFlow.getData()[0].value[1]).toEqual(2);
		});

		
	});

	describe('streamUpdate', function(){
		
		var data = {
			'records' : [
				{ 
					'NorrisRecordID' : 'record1',
					'value' : [ 1, 1]
				}
			]
		};
		var LineChartFlow;

		beforeEach(function(){
			LineChartFlow = LineChartFlowFactory.build();
			LineChartFlow.streamUpdate(data);
		});

		afterEach(function(){
			LineChartFlow = null;
		});

		it('streamUpdate call initializedData in the correct way', function(){
			expect(LineChartFlow.getData().length).toEqual(1);
		});
	});

});