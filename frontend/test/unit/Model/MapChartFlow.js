/*jshint node: true */
'use strict';

/*
* Name :  MapChartFlow.js
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
* 0.1.0			2015-05-15	Maria Giovanna Chinellato	Add test of Model::MapChartFlow.js
*
* 0.0.1			2015-05-15	Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

describe('MapChartFlowFactory', function(){

	var MapChartFlowFactory;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject(function(_MapChartFlowFactory_){
		MapChartFlowFactory = _MapChartFlowFactory_;
	}));

	describe('Default constructor', function(){
		var MapChartFlow;

		beforeEach(function(){
			MapChartFlow = MapChartFlowFactory.build();
		});

		afterEach(function(){
			MapChartFlow = null;
		});

		it('instance defined', function(){
			expect(MapChartFlow).toBeDefined();
		});

		it('constructor create the flow with the correct marker', function(){
			expect(MapChartFlow.getMarker()).toEqual(null);
		});
		it('constructor create the flow with the correct max item displayed', function(){
			expect(MapChartFlow.getMaxItem()).toEqual(100);
		});
		it('constructor create the flow with the correct trace', function(){
			expect(MapChartFlow.getTrace()).toEqual(null);
		});

	});

	describe('Constructor', function(){

		var json = {
			'name' : 'flusso1',
			'marker' : 'furly',
			'maxItem' : '20',
			'trace' : 'bubu'
		};

		var MapChartFlow;

		beforeEach(function(){
			MapChartFlow = MapChartFlowFactory.build(json);
		});

		afterEach(function(){
			MapChartFlow = null;
		});

		it('instance defined', function(){
			expect(MapChartFlow).toBeDefined();
		});

		it('constructor create the flow with the correct marker', function(){
			expect(MapChartFlow.getMarker()).toEqual('furly');
		});
		it('constructor create the flow with the correct max item displayed', function(){
			expect(MapChartFlow.getMaxItem()).toEqual('20');
		});
		it('constructor create the flow with the correct trace', function(){
			expect(MapChartFlow.getTrace()).toEqual('bubu');
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
			'maxItem' : '15',
			'trace' : 'flux'
		};
		var f = {
			'dataFormat' : 'int',
			'name' : 'flusso1'
		};
		var m = {
			'flowColor' : '#FFF',
			'legendOnPoin' : 'flusso',
			'marker' : 'furly',
			'maxItem' : '15',
			'trace' : 'flux'
		};

		beforeEach(function(){
			res = MapChartFlow.prototype.test('split(json)');
		});

		it('json splitted in the correct way', function(){
			expect(res.flowJson).toEqual(f);
			expect(res.mapFlowJson).toEqual(m);
		});

	});*/

	describe('updateParameters', function(){
		var json = {
			'name' : 'flusso2',
			'marker' : 'furly1',
			'maxItem' : '45',
			'trace' : 'flow'
		};
		var MapChartFlow;
				
		beforeEach(function(){
			MapChartFlow = MapChartFlowFactory.build();
			MapChartFlow.updateParameters(json);
		});

		afterEach(function(){
			MapChartFlow = null;
		});

		it('flow updated with the correct marker', function(){
			expect(MapChartFlow.getMarker()).toEqual('furly1');
		});
		it('flow updated with the correct max item displayed', function(){
			expect(MapChartFlow.getMaxItem()).toEqual('45');
		});
		it('flow updated with the correct trace', function(){
			expect(MapChartFlow.getTrace()).toEqual('flow');
		});

	});

	describe('initializeData', function(){
		var data = {
			records: [
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

		var MapChartFlow;

		beforeEach(function(){
			MapChartFlow = MapChartFlowFactory.build();
			MapChartFlow.initializeData(data);
		});

		afterEach(function(){
			MapChartFlow = null;
		});

		it('data initialize in the correct way', function(){
			expect(MapChartFlow.getData().length).toEqual(3);
		});
	});

	describe('inPlaceUpdate', function(){
		var data = {
			records: [
				{ 
					'NorrisRecordID' : 'record1',
					'value' : [ 12.5464546515, 11.15468766]
				}
			]
		};

		var update = {
			'NorrisRecordID' : 'record1',
			'value' : [ 14.5364864646, 11.5646546516]
		};
		var MapChartFlow;

		beforeEach(function(){
			MapChartFlow = MapChartFlowFactory.build();
			MapChartFlow.initializeData(data);
			MapChartFlow.inPlaceUpdate(update);
		});

		afterEach(function(){
			MapChartFlow = null;
		});

		it('data updated in the correct way', function(){
			expect(MapChartFlow.getData()[0].value[0]).toEqual(14.5364864646);
			expect(MapChartFlow.getData()[0].value[1]).toEqual(11.5646546516);
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
		var MapChartFlow;

		beforeEach(function(){
			MapChartFlow = MapChartFlowFactory.build();
			MapChartFlow.streamUpdate(data);
		});

		afterEach(function(){
			MapChartFlow = null;
		});

		it('streamUpdate call initializedData in the correct way', function(){
			expect(MapChartFlow.getData().length).toEqual(1);
		});
	});

	describe('deleteData', function(){

		var data = {
			records: [
				{ 
					'NorrisRecordID' : 'record1',
					'value' : [ 14.5364864646, 11.5646546516]
				}
			]
		};

		var delData = {
			'NorrisRecordID' : 'record1',
			'value' : [ 14.5364864646, 11.5646546516]
		};

		var MapChartFlow;

		beforeEach(function(){
			MapChartFlow = MapChartFlowFactory.build();
			MapChartFlow.initializeData(data);
			MapChartFlow.deleteData(delData);
		});

		afterEach(function(){
			MapChartFlow = null;
		});

		it('data removed in the correct way', function(){
			expect(MapChartFlow.getData().length).toEqual(0);
		});
	});

});