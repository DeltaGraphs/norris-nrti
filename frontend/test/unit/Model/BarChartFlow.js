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
* 0.2.0         2015-05-18  Maria Giovanna Chinellato	Modified general structure, some fixes
*
* 0.1.1         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.1.0			2015-05-15	Maria Giovanna Chinellato	Add test of Model::BarChartFlow.js
*
* 0.0.1			2015-05-15	Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

describe('BarChartFlow', function(){

	var BarChartFlow;
	var Flow;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject(function(_BarChartFlow_, $injector){
		BarChartFlow = _BarChartFlow_;
		Flow = $injector.get('Flow');
	}));

	describe('Default constructor', function(){

		beforeEach(function(){
			BarChartFlow = new BarChartFlow();
		});

		afterEach(function(){
			BarChartFlow = null;
		});

		it('instance defined', function(){
			expect(BarChartFlow).toBeDefined();
		});

		it('constructor create the flow with the correct flowColor', function(){
			expect(BarChartFlow.getFlowColor()).toEqual('#000');
		});
		it('constructor create the flow with the correct legend on point', function(){
			expect(BarChartFlow.getLegendOnPoint()).toEqual('null');
		});
	});

	describe('Constructor', function(){

		var json = {
			'dataFormat' : 'int',
			'name' : 'flusso1',
			'flowColor' : '#F2F',
			'legendOnPoin' : 'flusso1',
		};
		var f = {
			'dataFormat' : 'int',
			'name' : 'flusso1'
		};

		beforeEach(function(){
			BarChartFlow = new BarChartFlow(json);
		});

		afterEach(function(){
			BarChartFlow = null;
		});

		it('instance defined', function(){
			expect(BarChartFlow).toBeDefined();
		});

		it('constructor use the flow constructor in the correct way', function(){
			expect(BarChartFlow.parent.constructor.call).toHaveBeenCalledWith(this, f); // in teoria dovrebbe essere così
		});
		it('constructor create the flow with the correct flowColor', function(){
			expect(BarChartFlow.getFlowColor()).toEqual('#F2F');
		});
		it('constructor create the flow with the correct legend on point', function(){
			expect(BarChartFlow.getLegendOnPoint()).toEqual('flusso1');
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

	describe('updateParameters', function(){
		
		var json = {
			'dataFormat' : 'String',
			'name' : 'flusso2',
			'flowColor' : '#F1F',
			'legendOnPoin' : 'flusso2'
		};
		var f = {
			'dataFormat' : 'String',
			'name' : 'flusso2'
		};

		beforeEach(function(){
			BarChartFlow = new BarChartFlow();
			BarChartFlow = BarChartFlow.updateParameters(json);
		});

		afterEach(function(){
			BarChartFlow = null;
		});

		it('flow updated with the correct parameters', function(){
			expect(BarChartFlow.parent.updateParameters.call).toHaveBeenCalledWith(f); // in teoria dovrebbe essere così
		});
		it('cflow updated with the correct flowColor', function(){
			expect(BarChartFlow.getFlowColor()).toEqual('#F1F');
		});
		it('flow updated with the correct legend on point', function(){
			expect(BarChartFlow.getLegendOnPoint()).toEqual('flusso2');
		});

	});

	describe('inizializeData', function(){
		var data = {
			records: [
				{},
				{},
				{}
			]
		};

		beforeEach(function(){
			BarChartFlow = new BarChartFlow();
			BarChartFlow = BarChartFlow.inizializeData(data);
		});

		afterEach(function(){
			BarChartFlow = null;
		});

		it('data inizialized in the correct way', function(){
			expect(BarChartFlow.getData().length).toEqual(3);
		});

	});

	describe('inPlaceUpdate', function(){
		var data = {
			records: [
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

		beforeEach(function(){
			BarChartFlow = new BarChartFlow();
			BarChartFlow = BarChartFlow.inizializeData(data);
			BarChartFlow = BarChartFlow.inPlaceUpdate(update);
		});

		afterEach(function(){
			BarChartFlow = null;
		});

		it('data updated in the correct way', function(){
			expect(BarChartFlow.getData()[0].value[0]).toEqual(1);
			expect(BarChartFlow.getData()[0].value[1]).toEqual(2);
		});

	});

});