/*
* Name :  LineChart.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
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

	describe('Constructor', function(){

		var json = {
			"title" : "grafico1",
			"URLSocket" : "http://localhost/page1/grafico1"
		};

		beforeEach(function(){
			Table = new Table(json);
		});

		spyOn(Graph.prototype, "apply").and.callFake(function() {return;});

		it('constructor use the graph constructor in the correct way', function(){
			expect(Graph.prototype.apply).toHaveBeenCalledWith(json);
		});

	});

	describe('split', function(){
		var res;
		var json = {};
		var json1 = json;
		json = json1;
		json = {
			"title" : "grafico",
			"height" : 300,
			"width" : 300,
			"enabledLegend" : true,
			"legend" : {},
			"horizontalGrid" : true,
			"verticalGrid" : true,
			"row" : 5,
			"colunms" : 8,
			"headers" : {},
			"cells" : {},
			"itemDisplayedPerPage" : 4,
			"addDataPosition" : "",
			"sortable" : true
		};
		var g = {
			"title" : "grafico",
			"height" : 300,
			"width" : 300,
			"enabledLegend" : true,
			"legend" : {},
			"horizontalGrid" : true,
			"verticalGrid" : true
		};
		var t = {
			"row" : 5,
			"colunms" : 8,
			"headers" : {},
			"cells" : {},
			"itemDisplayedPerPage" : 4,
			"addDataPosition" : "down",
			"sortable" : true
		};

		beforeEach(function(){
			res = Table.Test("split(json)");
		});

		it('json splitted in the correct way', function(){
			expect(res.graphJson).toBeEqual(g);
			expect(res.tableJson).toBeEqual(t);
		});

	});


	describe('updateParameters', function(){
		var json = {
			"title" : "graficonuovo",
			"height" : 400,
			"width" : 400,
			"enabledLegend" : false,
			"horizontalGrid" : false,
			"verticalGrid" : false,
			"row" : 6,
			"colunms" : 9,
			"headers" : {},
			"cells" : {},
			"itemDisplayedPerPage" : 5,
			"addDataPosition" : "up",
			"sortable" : false
		};

		beforeEach(function(){
			Table.prototype.updateParameters(json);
		});

		spyOn(TableFlow.prototype, "TableFlow").and.returnValue({});
		spyOn(TableFlow.prototype, "addFlow").and.callFake(function() {return;});
		spyOn(Graph.prototype, "apply").and.callFake(function() {return;});
		spyOn(Axis, "Axis").and.returnValue({});
		spyOn(Cell, "Cell").and.returnValue({});

		it('graph updated with the correct row', function(){
			expect(LineChart.prototype.getRow()).toBeEqual(6);
		});
		it('graph updated with the correct colunms', function(){
			expect(LineChart.prototype.getColunms()).toBeEqual(9);
		});
		it('graph updated with the correct headers', function(){
			expect(LineChart.prototype.getHeaders()).toBeEqual({});
		});
		it('graph updated with the correct cells', function(){
			expect(LineChart.prototype.getCells()).toBeEqual({});
		});
		it('graph updated with the correct item displayed per page', function(){
			expect(LineChart.prototype.getItemDisplayedPerPage()).toBeEqual(5);
		});
		it('graph updated with the correct add data position', function(){
			expect(LineChart.prototype.getAddDataPosition()).toBeEqual("up");
		});
		it('graph updated with the correct sortable', function(){
			expect(LineChart.prototype.getSortable()).toBeEqual(false);
		});
		
	});
	
	describe('addFlow', function(){

		var json = {
			"ID" : 	"flusso1",
			"name" : "sonda 1"
		};

		var newflow = TableFlow({});

		//spyOn(Graph.prototype, "addFlow").and.callFake(function() {return;});
		spyOn(Graph.prototype, "addFlow.call").and.callFake(function() {return;});

		beforeEach(function(){
			Table.prototype.addflow(json.ID, newflow);
		});

		it('add flow into linechart', function(){
			expect(Graph.prototype.addFlow.call).toHaveBeenCalledWith(json.ID, newflow);
		});

	});

	describe("inizializeData", function(){

		var data = [
			{
				"ID" : "1",
				"records" : []
			},
			{
				"ID" : "2",
				"records" : []
			}
		];

		spyOn(TableFlow.prototype, "inizializeData").and.callFake(function() {return;});

		beforeEach(function(){
			Table.prototype.inizializeData(data);
		});

		it('inizialize flowList', function(){
			expect(TableFlow.prototype.inizializeData.calls.count()).toEqual(2);
		});
	});

	describe("inPlaceUpdate", function(){

		var data = 	{
			"ID" : "2",
			"records" : []
		};

		spyOn(TableFlow.prototype, "inPlaceUpdate").and.callFake(function() {return;});

		beforeEach(function(){
			Table.prototype.inPlaceUpdate(data);
		});

		it('inizialize flowList', function(){
			expect(TableFlow.prototype.inPlaceUpdate).toHaveBeenCalledWith(data);
		});
	});

	describe("streamUpdate", function(){

		var data = 	{
			"ID" : "2",
			"records" : []
		};

		spyOn(TableFlow.prototype, "streamUpdate").and.callFake(function() {return;});

		beforeEach(function(){
			Table.prototype.streamUpdate(data);
		});

		it('inizialize flowList', function(){
			expect(TableFlow.prototype.streamUpdate).toHaveBeenCalledWith(data);
		});
	});

});