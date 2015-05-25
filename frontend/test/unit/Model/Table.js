/*
* Name :  LineChart.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.2.2         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.2.1			2015-05-15	Maria Giovanna Chinellato	Fix test of Model::Table
*
* 0.2.0			2015-05-15	Maria Giovanna Chinellato	Add test of all the methods of LineChart classes
*
* 0.1.0			2015-05-15	Maria Giovanna Chinellato	Add test of Model::Table.js
*
* 0.0.1			2015-05-15	Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

describe('TableFactory', function(){
	'use strict';

	var TableFactory;
	var TableFlowFactory;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject(function(_TableFactory_, $injector){
		TableFactory = _TableFactory_;
		TableFlowFactory = $injector.get('TableFlowFactory');
	}));

	describe('Constructor', function(){

		var json = {
			'title' : 'fottutissimografico',
			'url' : 'localhost/page1/grafico1'
		};
		var Table;

		beforeEach(function(){
			Table = TableFactory.build(json);
		});

		afterEach(function(){
			Table = null;
		});

		it('Table created', function(){
			expect(Table).toBeDefined();
		});
		it('graph Constructor called', function(){
			expect(Table.getTitle()).toEqual('fottutissimografico');
		});
		it('graph Constructor called', function(){
			expect(Table.getUrl()).toEqual('localhost/page1/grafico1');
		});
		it('graph created with the correct headers', function(){
			expect(Table.getHeaders()).toEqual([]);
		});
		it('graph created with the correct item displayed per page', function(){
			expect(Table.getMaxItemsPage()).toEqual(20);
		});
		it('graph created with the correct add data position', function(){
			expect(Table.getAddRowOn()).toEqual('up');
		});
		it('graph created with the correct sortable', function(){
			expect(Table.getSortable()).toEqual(true);
		});
		it('graph created with the correct sort', function(){
			expect(Table.getSort()).toEqual(null);
		});
		it('graph created with the correct appearance', function(){
			expect(Table.getAppearance()).toEqual(null);
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
			'row' : 5,
			'colunms' : 8,
			'headers' : {},
			'cells' : {},
			'itemDisplayedPerPage' : 4,
			'addDataPosition' : '',
			'sortable' : true
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
		var t = {
			'row' : 5,
			'colunms' : 8,
			'headers' : {},
			'cells' : {},
			'itemDisplayedPerPage' : 4,
			'addDataPosition' : 'down',
			'sortable' : true
		};

		beforeEach(function(){
			res = Table.Test('split(json)');
		});

		it('json splitted in the correct way', function(){
			expect(res.graphJson).toEqual(g);
			expect(res.tableJson).toEqual(t);
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
			'rows' : 6,
			'colunms' : 9,
			'headers' : ['ciao','amici'],
			'itemDisplayedPerPage' : 5,
			'addDataPosition' : 'up',
			'sortable' : false,
			'appearance' : { 
				border: {
					color: '#000000',
					width: 1
				},
				rowEven: {
					textColor: ['#000000', '#000000'],
					backgroundColor: ['#FFFFFF', '#FFFFFF']
				},
				rowOdd: {
					textColor: ['#000000', '#000000'],
					backgroundColor: ['#FFFFFF', '#FFFFFF']
				},
				headers: {
					textColor: ['#000000', '#000000'],
					backgroundColor: ['#FFFFFF', '#FFFFFF']
				}
			},
			'flows' : [{'ID' : 'f1'},{'ID' : 'f2'},{'ID' : 'f3'}]
		};
		var Table;

		beforeEach(function(){
			Table = TableFactory.build();
			Table.updateParameters(json);
		});

		afterEach(function(){
			Table = null;
		});

		it('Table created', function(){
			expect(Table).toBeDefined();
		});

		it('graph updated with the correct headers', function(){
			expect(Table.getHeaders().length).toEqual(2);
		});
		it('graph updated with the correct item displayed per page', function(){
			expect(Table.getMaxItemsPage()).toEqual(20);
		});
		it('graph updated with the correct add data position', function(){
			expect(Table.getAddRowOn()).toEqual('up');
		});
		it('graph updated with the correct sortable', function(){
			expect(Table.getSortable()).toEqual(false);
		});
		it('graph updated with the correct sort', function(){
			expect(Table.getSort()).toEqual(null);
		});
		it('graph updated with the correct appearance', function(){
			expect(Table.getAppearance().border.color).toEqual('#000000');
		});
		it('graph updated with the correct flow', function(){
			expect(Table.getFlowList().length).toEqual(3);
		});
		
	});
	
	describe('addFlow', function(){

		var json = {
			'ID' : 	'flusso1',
		};

		var fJson = {
			'name' : 'flusso1',
			'maxItem' : '5'
		};

		var newFlow;
		var Table;

		beforeEach(function(){
			newFlow = TableFlowFactory.build(fJson);
			Table = TableFactory.build();
			Table.addFlow(json.ID, newFlow);
		});

		afterEach(function(){
			Table = null;
		});

		it('graph addFlow called with the correct parameters', function(){
			expect(Table.getFlowList().length).toEqual(1);
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
		var Table, Flow1, Flow2;

		beforeEach(function(){
			Flow1 = TableFlowFactory.build();
			Flow2 = TableFlowFactory.build();
			Table = TableFactory.build();
			Table.addFlow(json1.ID, Flow1);
			Table.addFlow(json2.ID, Flow2);
			Table.deleteFlow('flusso1');
		});

		afterEach(function(){
			Flow1 = null;
			Flow2 = null;
			Table = null;
		});

		it('delete flow from graph', function(){
			expect(Table.getFlowList().length).toEqual(1);
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
		var Table;

		beforeEach(function(){
			newFlow = TableFlowFactory.build();
			Table = TableFactory.build();
			Table.addFlow(data[0].ID, newFlow);
			Table.initializeData(data);
		});

		afterEach(function(){
			Table = null;
		});

		it('TableFlow inizializeData called in the right way', function(){
			expect(Table.getFlowList()[0].flow.getData().length).toEqual(2);
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
		var Table;

		beforeEach(function(){
			newFlow = TableFlowFactory.build();
			Table = TableFactory.build();
			Table.addFlow(data[0].ID, newFlow);
			Table.initializeData(data);
		});

		afterEach(function(){
			Table = null;
		});

		it('TableFlow inPlaceUpdate called in the right way', function(){
			expect(Table.getFlowList()[0].flow.getData()[0].value[0]).toEqual(3);
			Table.inPlaceUpdate(data1);
			expect(Table.getFlowList()[0].flow.getData()[0].value[0]).toEqual(4);
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
		var Table;

		beforeEach(function(){
			newFlow = TableFlowFactory.build();
			Table = TableFactory.build();
			Table.addFlow(data[0].ID, newFlow);
			Table.initializeData(data);
		});

		afterEach(function(){
			Table = null;
		});

		it('inizialize flowList', function(){
			expect(Table.getFlowList()[0].flow.getData().length).toEqual(1);
			Table.streamUpdate(data1);
			expect(Table.getFlowList()[0].flow.getData().length).toEqual(2);
		});
	});

});