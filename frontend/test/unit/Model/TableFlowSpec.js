/*jshint node: true */
'use strict';

/*
* Name :  TableFlow.js
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
* 0.1.0			2015-05-15	Maria Giovanna Chinellato	Add test of Model::TableFlow.js
*
* 0.0.1			2015-05-15	Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

describe('TableFlowFactory', function(){

	var TableFlowFactory;

	beforeEach(angular.mock.module('norris-nrti'));

	beforeEach(inject(function(_TableFlowFactory_){
		TableFlowFactory = _TableFlowFactory_;
	}));

	describe('Default constructor', function(){
		var TableFlow;

		beforeEach(function(){
			TableFlow = TableFlowFactory.build();
		});

		afterEach(function(){
			TableFlow = null;
		});

		it('default constructor create the flow in the correct way', function(){
			expect(TableFlow.getMaxItem()).toEqual(100);
		});

	});

	describe('Constructor', function(){

		var json = {
			'dataFormat' : 'int',
			'name' : 'flusso1',
			'maxItemsSaved' : 20
		};
		var TableFlow;

		beforeEach(function(){
			TableFlow = TableFlowFactory.build(json);
		});

		afterEach(function(){
			TableFlow = null;
		});

		it('constructor create the flow with the correct max item displayed', function(){
			expect(TableFlow.getMaxItem()).toEqual(20);
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
			'maxItem' : '15'
		};
		var f = {
			'dataFormat' : 'int',
			'name' : 'flusso1'
		};
		var t = {
			'maxItem' : '15'
		};

		beforeEach(function(){
			res = TableFlow.prototype.test('split(json)');
		});

		it('json splitted in the correct way', function(){
			expect(res.flowJson).toEqual(f);
			expect(res.tableFlowJson).toEqual(t);
		});

	});*/

	describe('updateParameters', function(){
		var json = {
			'name' : 'flusso2',
			'maxItemsSaved' : 15
		};
		var TableFlow;

		beforeEach(function(){
			TableFlow = TableFlowFactory.build();
			TableFlow.updateParameters(json);
		});

		afterEach(function(){
			TableFlow = null;
		});

		it('flow updated with the correct max item displayed', function(){
			expect(TableFlow.getMaxItem()).toEqual(15);
		});

	});

	describe('inizializeData', function(){
		var data = {
			records: [
				{ 
					'NorrisRecordID' : 'record1',
					'value' : [ 'Oggi' , 'ho', 'mangiato']
				},
				{ 
					'NorrisRecordID' : 'record2',
					'value' : [ 'una', 'buonissima', 'pizza']
				},
				{ 
					'NorrisRecordID' : 'record3',
					'value' : [ 'con', 'la', 'ricotta']
				}
			]
		};
		var TableFlow;

		beforeEach(function(){
			TableFlow = TableFlowFactory.build();
			TableFlow.initializeData(data,'top');
		});

		afterEach(function(){
			TableFlow = null;
		});

		it('data inizialize in the correct way', function(){
			expect(TableFlow.getData().length).toEqual(3);
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

		var TableFlow;

		beforeEach(function(){
			TableFlow = TableFlowFactory.build();
			TableFlow.initializeData(data,'bottom');
		});

		afterEach(function(){
			TableFlow = null;
		});

		it('data empty in the correct way', function(){
			expect(TableFlow.getData().length).toEqual(3);
			TableFlow.emptyData();
			expect(TableFlow.getData().length).toEqual(0);
		});

	});

	describe('inPlaceUpdate', function(){

		var data = {
			records: [
				{ 
					'NorrisRecordID' : 'record1',
					'value' : [ 'Oggi' , 'ho', 'mangiato']
				}
			]
		};

		var update = {
			'NorrisRecordID' : 'record1',
			'value' : [ 'una', 'buonissima', 'pizza']
		};
		var TableFlow;

		beforeEach(function(){
			TableFlow = TableFlowFactory.build();
			TableFlow.initializeData(data,'bottom');
			TableFlow.inPlaceUpdate(update);
		});

		afterEach(function(){
			TableFlow = null;
		});

		it('data updated in the correct way', function(){
			expect(TableFlow.getData()[0].value[0]).toEqual('una');
			expect(TableFlow.getData()[0].value[1]).toEqual('buonissima');
			expect(TableFlow.getData()[0].value[2]).toEqual('pizza');
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
		var TableFlow;

		beforeEach(function(){
			TableFlow = TableFlowFactory.build();
			TableFlow.streamUpdate(data, 'bottom');
		});

		afterEach(function(){
			TableFlow = null;
		});

		it('streamUpdate call initializedData in the correct way', function(){
			expect(TableFlow.getData().length).toEqual(1);
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

		var TableFlow;

		beforeEach(function(){
			TableFlow = TableFlowFactory.build();
			TableFlow.initializeData(data,'top');
			TableFlow.deleteData(delData);
		});

		afterEach(function(){
			TableFlow = null;
		});

		it('data removed in the correct way', function(){
			expect(TableFlow.getData().length).toEqual(0);
		});
	});

});