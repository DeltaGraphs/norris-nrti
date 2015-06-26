/*jshint node: true */
'use strict';

/*
* Name :  BarChartFlow.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.2.0         2015-05-20  Maria Giovanna Chinellato	Modified general structure, some fixes
*
* 0.1.1         2015-05-20  Maria Giovanna Chinellato   Fix code
*
* 0.1.0			2015-05-20	Maria Giovanna Chinellato	Add test of Model::BarChartFlow.js
*
* 0.0.1			2015-05-19	Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

describe('BarChartFlow', function(){

	var BarChartFlowFactory;

	beforeEach(angular.mock.module('norris-nrti'));

	beforeEach(inject(function(_BarChartFlowFactory_){
		BarChartFlowFactory = _BarChartFlowFactory_;
	}));

	describe('Default constructor', function(){

		var BarChartFlow;

		beforeEach(function(){
			BarChartFlow = BarChartFlowFactory.build();
		});

		afterEach(function(){
			BarChartFlow = null;
		});

		it('instance defined', function(){
			expect(BarChartFlow).toBeDefined();
		});

		it('constructor create the flow with the correct flowColor', function(){
			expect(BarChartFlow.getName()).toEqual(null);
		});
		it('constructor create the flow with the correct flowColor', function(){
			expect(BarChartFlow.getFlowColor()).toEqual(undefined);
		});
	});

	describe('Constructor', function(){

		var json = {
			'name' : 'flusso1',
			'flowColor' : '#F2F'
		};

		var BarChartFlow;

		beforeEach(function(){
			BarChartFlow = BarChartFlowFactory.build(json);
		});

		afterEach(function(){
			BarChartFlow = null;
		});

		it('instance defined', function(){
			expect(BarChartFlow).toBeDefined();
		});

		it('constructor create the flow with the correct flowColor', function(){
			expect(BarChartFlow.getName()).toEqual('flusso1');
		});
		it('constructor create the flow with the correct flowColor', function(){
			expect(BarChartFlow.getFlowColor()).toEqual('#F2F');
		});
	});

	/*deeescribe('split', function(){
		var res;
		var json = {};
		var json1 = json;
		json = json1;
		json = {
			'dataFormat' : 'int',
			'name' : 'flusso1',
			'flowColor' : '#FFF',
			'legendOnPoin' : 'flusso'
		};
		var f = {
			'dataFormat' : 'int',
			'name' : 'flusso1'
		};
		var b = {
			'flowColor' : '#FFF',
			'legendOnPoin' : 'flusso'
		};

		beforeEach(function(){
			res = BarChartFlow.prototype.test('split(json)');
		});

		it('json splitted in the correct way', function(){
			expect(res.flowJson).toEqual(f);
			expect(res.barFlowJson).toEqual(b);
		});

	});*/

	describe('#updateParameters', function(){
		
		var json = {
			'name' : 'flusso2',
			'flowColor' : '#F1F'
		};

		var BarChartFlow;

		beforeEach(function(){
			BarChartFlow = BarChartFlowFactory.build();
			BarChartFlow.updateParameters(json);
		});

		afterEach(function(){
			BarChartFlow = null;
		});

		it('cflow updated with the correct flowColor', function(){
			expect(BarChartFlow.getFlowColor()).toEqual('#F1F');
		});

	});

	describe('#initializeData', function(){
		var data = {
			'records' : [
				{},
				{},
				{}
			]
		};
		var BarChartFlow;

		beforeEach(function(){
			BarChartFlow = BarChartFlowFactory.build();
			BarChartFlow.initializeData(data);
		});

		afterEach(function(){
			BarChartFlow = null;
		});

		it('initialize data in the correct way', function(){
			expect(BarChartFlow.getData().length).toEqual(3);
		});

	});

	describe('#emptyData', function(){

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

		var BarChartFlow;

		beforeEach(function(){
			BarChartFlow = BarChartFlowFactory.build();
			BarChartFlow.initializeData(data);
		});

		afterEach(function(){
			BarChartFlow = null;
		});

		it('data empty in the correct way', function(){
			expect(BarChartFlow.getData().length).toEqual(3);
			BarChartFlow.emptyData();
			expect(BarChartFlow.getData().length).toEqual(0);
		});

	});

	describe('#inPlaceUpdate', function(){
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

		var BarChartFlow;

		beforeEach(function(){
			BarChartFlow = BarChartFlowFactory.build();
			BarChartFlow.initializeData(data);
			BarChartFlow.inPlaceUpdate(update);
		});

		afterEach(function(){
			BarChartFlow = null;
		});

		it('data updated in the correct way', function(){
			expect(BarChartFlow.getData()[0].value[0]).toEqual(1);
			expect(BarChartFlow.getData()[0].value[1]).toEqual(2);
		});

	});

	describe('#addRecord', function(){
		var data = {
			'records' : [
				{ 
					'NorrisRecordID' : 'record1',
					'value' : [ 1, 1]
				}
			]
		};

		var add = {
			'NorrisRecordID' : 'record2',
			'value' : [ 1, 2]
		};

		var BarChartFlow;

		beforeEach(function(){
			BarChartFlow = BarChartFlowFactory.build();
			BarChartFlow.initializeData(data);
		});

		afterEach(function(){
			BarChartFlow = null;
		});

		it('data updated in the correct way', function(){
			expect(BarChartFlow.getData().length).toEqual(1);
			BarChartFlow.addRecord(add);
			expect(BarChartFlow.getData().length).toEqual(2);
		});

	});

});