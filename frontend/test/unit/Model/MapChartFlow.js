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

describe('MapChartFlow', function(){

	var MapChartFlow;
	var Flow;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject(function(_MapChartFlow_, $injector){
		MapChartFlow = _MapChartFlow_;
		Flow = $injector.get('Flow');
	}));

	describe('Default constructor', function(){

		beforeEach(function(){
			MapChartFlow = new MapChartFlow();
		});

		afterEach(function(){
			MapChartFlow = null;
		});

		it('instance defined', function(){
			expect(MapChartFlow).toBeDefined();
		});

		it('constructor create the flow with the correct flowColor', function(){
			expect(MapChartFlow.getFlowColor()).toBeEqual('#000');
		});
		it('constructor create the flow with the correct legend on point', function(){
			expect(MapChartFlow.getLegendOnPoint()).toBeEqual(null);
		});
		it('constructor create the flow with the correct marker', function(){
			expect(MapChartFlow.getMarker()).toBeEqual('circle');
		});
		it('constructor create the flow with the correct max item displayed', function(){
			expect(MapChartFlow.getMaxItem()).toBeEqual('100');
		});
		it('constructor create the flow with the correct trace', function(){
			expect(MapChartFlow.getTrace()).toBeEqual(null);
		});

	});

	describe('Constructor', function(){

		var json = {
			'dataFormat' : 'int',
			'name' : 'flusso1',
			'flowColor' : '#F2F',
			'legendOnPoint' : 'flusso1',
			'marker' : 'furly',
			'maxItem' : '20',
			'trace' : 'bubu'
		};

		beforeEach(function(){
			MapChartFlow = new MapChartFlow(json);
		});

		afterEach(function(){
			MapChartFlow = null;
		});

		it('instance defined', function(){
			expect(MapChartFlow).toBeDefined();
		});

		/*it('constructor use the flow constructor in the correct way', function(){
			expect(MapChartFlow.parent.constructor.call).toHaveBeenCalledWith(f);
		});*/
		it('constructor create the flow with the correct flowColor', function(){
			expect(MapChartFlow.getFlowColor()).toBeEqual('#F2F');
		});
		it('constructor create the flow with the correct legend on point', function(){
			expect(MapChartFlow.getLegendOnPoint()).toBeEqual('flusso1');
		});
		it('constructor create the flow with the correct marker', function(){
			expect(MapChartFlow.getMarker()).toBeEqual('furly');
		});
		it('constructor create the flow with the correct max item displayed', function(){
			expect(MapChartFlow.getMaxItem()).toBeEqual('20');
		});
		it('constructor create the flow with the correct trace', function(){
			expect(MapChartFlow.getTrace()).toBeEqual('bubu');
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
			expect(res.flowJson).toBeEqual(f);
			expect(res.mapFlowJson).toBeEqual(m);
		});

	});*/

	describe('updateParameters', function(){
		var json = {
			'dataFormat' : 'String',
			'name' : 'flusso2',
			'flowColor' : '#F3F',
			'legendOnPoint' : 'flusso2',
			'marker' : 'furly1',
			'maxItem' : '45',
			'trace' : 'flow'
		};
				
		beforeEach(function(){
			MapChartFlow = new MapChartFlow();
			MapChartFlow = MapChartFlow.updateParameters(json);
		});

		afterEach(function(){
			MapChartFlow = null;
		});

		/*it('flow updated with the correct parameters', function(){
			expect(MapChartFlow.parent.updateParameters.call).toHaveBeenCalledWith(f);
		});*/
		it('flow updated with the correct flowColor', function(){
			expect(MapChartFlow.getFlowColor()).toBeEqual('#F3F');
		});
		it('flow updated with the correct legend on point', function(){
			expect(MapChartFlow.getLegendOnPoint()).toBeEqual('flusso2');
		});
		it('flow updated with the correct marker', function(){
			expect(MapChartFlow.getMarker()).toBeEqual('furly1');
		});
		it('flow updated with the correct max item displayed', function(){
			expect(MapChartFlow.getMaxItem()).toBeEqual('45');
		});
		it('flow updated with the correct trace', function(){
			expect(MapChartFlow.getTrace()).toBeEqual('flow');
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

		beforeEach(function(){
			MapChartFlow = new MapChartFlow();
			MapChartFlow = MapChartFlow.initializeData(data);
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

		beforeEach(function(){
			MapChartFlow = new MapChartFlow();
			MapChartFlow = MapChartFlow.initializeData(data);
			MapChartFlow = MapChartFlow.inPlaceUpdate(update);
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

		beforeEach(function(){
			MapChartFlow = new MapChartFlow();
			MapChartFlow = MapChartFlow.streamUpdate(data);
		});

		afterEach(function(){
			MapChartFlow = null;
		});

		it('streamUpdate call initializeData in the correct way', function(){
			expect(MapChartFlow.initializeData()).toHaveBeenCalledWith(data);
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
		beforeEach(function(){
			MapChartFlow = new MapChartFlow();
			MapChartFlow = MapChartFlow.initializeData(data);
			MapChartFlow = MapChartFlow.deleteData(delData);
		});

		afterEach(function(){
			MapChartFlow = null;
		});

		it('data removed in the correct way', function(){
			expect(MapChartFlow.getData().length).toEqual(0);
		});
	});

});