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

describe('Table', function(){
	'use strict';

	var Table;
	var Graph;
	var Cell;
	var TableFlow;

	beforeEach(module('app'));

	beforeEach(inject(function(_Table_, $injector){
		Table = _Table_;
		Graph = $injector.get('Graph');
		Cell = $injector.get('Cell');
		TableFlow = $injector.get('TableFlow');
	}));

	describe('Default constructor', function(){

		beforeEach(function(){
			Table = new Table();
		});

		afterEach(function(){
			Tabel = null;
		});

		it('Table created', function(){
			expect(Table).toBeDefined();
		});

		it('graph created with the correct row', function(){
			expect(Table.getRows()).toEqual(0);
		});
		it('graph created with the correct colunms', function(){
			expect(Table.getColunms()).toEqual(0);
		});
		it('graph created with the correct headers', function(){
			expect(Table.getHeaders()).toEqual([]);
		});
		it('graph created with the correct cells', function(){
			expect(Table.getCells()).toEqual([]);
		});
		it('graph created with the correct item displayed per page', function(){
			expect(Table.getItemDisplayedPerPage()).toEqual(20);
		});
		it('graph created with the correct add data position', function(){
			expect(Table.getAddDataPosition()).toEqual('up');
		});
		it('graph created with the correct sortable', function(){
			expect(Table.getSortable()).toEqual(true);
		});
		it('graph created with the correct flow', function(){
			expect(BarChart.addFlow.calls.count()).toEqual(0);
		});

	});

	describe('Default constructor', function(){

		var json = {
			'title' : 'graficonuovo',
			'height' : 400,
			'width' : 400,
			'enabledLegend' : false,
			'horizontalGrid' : false,
			'verticalGrid' : false,
			'rows' : 6,
			'colunms' : 9,
			'headers' : {},
			'cells' : {},
			'itemDisplayedPerPage' : 5,
			'addDataPosition' : 'up',
			'sortable' : false,
			'flows' : [{},{},{}]
		};

		beforeEach(function(){
			Table = new Table();
		});

		afterEach(function(){
			Tabel = null;
		})

		it('graph created with the correct row', function(){
			expect(Table.getRows()).toEqual(6);
		});
		it('graph created with the correct colunms', function(){
			expect(Table.getColunms()).toEqual(9);
		});
		it('graph created with the correct headers', function(){
			expect(Table.getHeaders()).toEqual({});
		});
		it('graph created with the correct cells', function(){
			expect(Table.getCells()).toEqual({});
		});
		it('graph created with the correct item displayed per page', function(){
			expect(Table.getItemDisplayedPerPage()).toEqual(5);
		});
		it('graph created with the correct add data position', function(){
			expect(Table.getAddDataPosition()).toEqual('up');
		});
		it('graph created with the correct sortable', function(){
			expect(Table.getSortable()).toEqual(false);
		});
		it('graph created with the correct flow', function(){
			expect(BarChart.addFlow.calls.count()).toEqual(3);
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
			'row' : 6,
			'colunms' : 9,
			'headers' : {},
			'cells' : {},
			'itemDisplayedPerPage' : 5,
			'addDataPosition' : 'up',
			'sortable' : false
		};

		beforeEach(function(){
			Table = new Table();
			Table = Table.updateParameters(json);
		});

		afterEach(function(){
			Tabel = null;
		})

		it('graph updated with the correct row', function(){
			expect(Table.getRows()).toEqual(6);
		});
		it('graph updated with the correct colunms', function(){
			expect(Table.getColunms()).toEqual(9);
		});
		it('graph updated with the correct headers', function(){
			expect(Table.getHeaders()).toEqual({});
		});
		it('graph updated with the correct cells', function(){
			expect(Table.getCells()).toEqual({});
		});
		it('graph updated with the correct item displayed per page', function(){
			expect(Table.getItemDisplayedPerPage()).toEqual(5);
		});
		it('graph updated with the correct add data position', function(){
			expect(Table.getAddDataPosition()).toEqual('up');
		});
		it('graph updated with the correct sortable', function(){
			expect(Table.getSortable()).toEqual(false);
		});
		
	});
	
	describe('addFlow', function(){

		var json = {
			'ID' : 	'flusso1',
			'name' : 'sonda 1'
		};

		beforeEach(function(){
			var newFlow = new TableFlow(json);
			Table = new Table();
			Table = Table.addflow(json.ID, newflow);
		});

		afterEach(function(){
			Tabel = null;
		})

		/*it('add flow into linechart', function(){
			expect(Graph.prototype.addFlow.call).toHaveBeenCalledWith(json.ID, newflow);
		});*/

	});

	describe('inizializeData', function(){

		var data = [
			{
				'ID' : '1',
				'records' : []
			},
			{
				'ID' : '2',
				'records' : []
			}
		];

		beforeEach(function(){
			Table = new Table();
			Table = Table.inizializeData(data);
		});

		afterEach(function(){
			Tabel = null;
		})

		it('inizialize flowList', function(){
			expect(TableFlow.inizializeData.calls.count()).toEqual(2);
		});
	});

	describe('inPlaceUpdate', function(){

		var data = 	{
			'ID' : '2',
			'records' : []
		};

		beforeEach(function(){
			Table = new Table();
			Table = Table.inPlaceUpdate(data);
		});

		afterEach(function(){
			Tabel = null;
		})

		it('inizialize flowList', function(){
			expect(TableFlow.inPlaceUpdate).toHaveBeenCalledWith(data);
		});
	});

	describe('streamUpdate', function(){

		var data = 	{
			'ID' : '2',
			'records' : []
		};

		beforeEach(function(){
			Table = new Table();
			Table = Table.streamUpdate(data);
		});

		afterEach(function(){
			Tabel = null;
		})

		it('inizialize flowList', function(){
			expect(TableFlow.streamUpdate).toHaveBeenCalledWith(data);
		});
	});

});