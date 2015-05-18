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

describe('LineChartFlow', function(){

	var LineChartFlow;
	var Flow;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject(function(_LineChartFlow_, $injector){
		LineChartFlow = _LineChartFlow_;
		Flow = $injector.get('Flow');
	}));

	describe('Constructor', function(){

		beforeEach(function() {
			LineChartFlow = new LineChartFlow(json);
		});

		afterEach(function() {
			LineChartFlow = null;
		});

		it('instance defined', function(){
			expect(LineChartFlow).toBeDefined();
		});

		it('constructor create the flow with the correct flowColor', function(){
			expect(LineChartFlow.prototype.getFlowColor()).toEqual('#000');
		});
		it('constructor create the flow with the correct legend on point', function(){
			expect(LineChartFlow.prototype.getLegendOnPoint()).toEqual('');
		});
		it('constructor create the flow with the correct marker', function(){
			expect(LineChartFlow.prototype.getMarker()).toEqual('square');
		});
		it('constructor create the flow with the correct interpolation', function(){
			expect(LineChartFlow.prototype.getInterpolation()).toEqual('linear');
		});
		it('constructor create the flow with the correct area color', function(){
			expect(LineChartFlow.prototype.getAreaColor()).toEqual('#FFF');
		});
		it('constructor create the flow with the correct max item displayed', function(){
			expect(LineChartFlow.prototype.getMaxItem()).toEqual('20');
		});

	});

	describe('Constructor', function(){

		var json = {
			'dataFormat' : 'int',
			'name' : 'flusso1',
			'flowColor' : '#F2F',
			'legendOnPoin' : 'flusso1',
			'marker' : 'furly',
			'interpolation' : 'single',
			'areaColor' : '#F2F',
			'maxItem' : '20'
		};
		var f = {
			'dataFormat' : 'int',
			'name' : 'flusso1'
		};

		beforeEach(function() {
			LineChartFlow = new LineChartFlow(json);
		});

		afterEach(function() {
			LineChartFlow = null;
		});

		it('instance defined', function(){
			expect(LineChartFlow).toBeDefined();
		});

		it('constructor use the flow constructor in the correct way', function(){
			expect(LineChartFlow.parent.constructor.call).toHaveBeenCalledWith(f); // in teoria dovrebbe essere così
		});
		it('constructor create the flow with the correct flowColor', function(){
			expect(LineChartFlow.prototype.getFlowColor()).toEqual('#F2F');
		});
		it('constructor create the flow with the correct legend on point', function(){
			expect(LineChartFlow.prototype.getLegendOnPoint()).toEqual('flusso1');
		});
		it('constructor create the flow with the correct marker', function(){
			expect(LineChartFlow.prototype.getMarker()).toEqual('furly');
		});
		it('constructor create the flow with the correct interpolation', function(){
			expect(LineChartFlow.prototype.getInterpolation()).toEqual('single');
		});
		it('constructor create the flow with the correct area color', function(){
			expect(LineChartFlow.prototype.getAreaColor()).toEqual('#F2F');
		});
		it('constructor create the flow with the correct max item displayed', function(){
			expect(LineChartFlow.prototype.getMaxItem()).toEqual('20');
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
			'dataFormat' : 'String',
			'name' : 'flusso2',
			'flowColor' : '#F1F',
			'legendOnPoin' : 'flusso2',
			'marker' : 'furly1',
			'interpolation' : 'cubic',
			'areaColor' : '#F1F',
			'maxItem' : '15'
		};
		var f = {
			'dataFormat' : 'String',
			'name' : 'flusso2'
		};

		beforeEach(function(){
			LineChartFlow = new LineChartFlow();
			LineChartFlow = LineChartFlow.updateParameters(json);
		});

		afterEach(function(){
			LineChartFlow = null;
		});

		it('flow updated with the correct parameters', function(){
			expect(LineChartFlow.parent.updateParameters.call).toHaveBeenCalledWith(f); // in teoria dovrebbe essere così
		});
		it('flow updated with the correct flowColor', function(){
			expect(LineChartFlow.prototype.getFlowColor()).toEqual('#F1F');
		});
		it('flow updated with the correct legend on point', function(){
			expect(LineChartFlow.prototype.getLegendOnPoint()).toEqual('flusso2');
		});
		it('flow updated with the correct marker', function(){
			expect(LineChartFlow.prototype.getMarker()).toEqual('furly1');
		});
		it('flow updated with the correct interpolation', function(){
			expect(LineChartFlow.prototype.getInterpolation()).toEqual('cubic');
		});
		it('flow updated with the correct area color', function(){
			expect(LineChartFlow.prototype.getAreaColor()).toEqual('#F1F');
		});
		it('flow updated with the correct max item displayed', function(){
			expect(LineChartFlow.prototype.getMaxItem()).toEqual('15');
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
			LineChartFlow = new LineChartFlow();
			LineChartFlow = LineChartFlow.inizializeData(data);
		});

		afterEach(function(){
			LineChartFlow = null;
		});

		it('data inizialized in the correct way'), function(){
			expect(LineChartFlow.getData().length).toEqual(3);
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
			LineChartFlow = new LineChartFlow();
			LineChartFlow = LineChartFlow.inizializeData(data);
			LineChartFlow = LineChartFlow.inPlaceUpdate(update);
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
			records: [
				{ 
					'NorrisRecordID' : 'record1',
					'value' : [ 1, 1]
				}
			]
		};

		beforeEach(function(){
			LineChartFlow = new LineChartFlow();
			LineChartFlow = LineChartFlow.streamUpdate(data);
		});

		afterEach(function(){
			LineChartFlow = null;
		});

		it('streamUpdate call inizializedData in the correct way', function(){
			expect(LineChartFlow.inizializedData()).toHaveBeenCalledWith(data);
		});
	});

});