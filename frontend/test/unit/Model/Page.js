/*
* Name :  PagesList.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =======================================================================================================================
* 0.1.0			2015-05-13	Rossetto Francesco			Codifica del test sul Model Page, descritti tutti i metodi
*
* 0.0.1			2015-05-13	Rossetto Francesco			Creazione file
*
* =======================================================================================================================
*
*/

describe('Page', function(){
	'use strict';

	var Page;

	beforeEach(module('app'));

	beforeEach(inject(function(_Page_){
		Page = _Page_;
	}));

	/*window.mock = function( constr, name ) {
		var keys = [];
		for( var key in constr.prototype ) {
			keys.push( key );
		}
		return keys.length > 0 ? jasmine.createSpyObj( name || "mock", keys ) : {};
	};*/

	describe('Constructor', function(){

		var json = 	{
			"ID" : "page1",
			"name" : "Pagina Uno",
			"description" : "questa è la pagina uno",
			"graphsPerRow" : 4,
			"graphsPerCol" : 4,
			"URLSocket" : "http://localhost/page1",
			"graphs" : [
				{ 
					"ID" : "grafico1", 
					"type" : "LineChart" 
				},
				{ 
					"ID" : "grafico2", 
					"type" : "BarChart" 
				},
				{ 
					"ID" : "grafico3", 
					"type" : "MapChart" 
				}
			]
		};
		//var lineChart = mock( LineChart );
		spyOn(LineChart.prototype, "LineChart").and.returnValue({});
		//var barChart = mock( BarChart );
		spyOn(BarChart.prototype, "BarChart").and.returnValue({});
		//var mapChart = mock( mapChart );
		spyOn(MapChart.prototype, "MapChart").and.returnValue({});
		//var table = mock( Table );
		spyOn(Table.prototype, "Table").and.returnValue({});

		beforeEach(function(){
			Page = new Page(json);
		});

		it('constructor create the page with the correct name', function(){
			expect(Page.getName()).toBeEqual("Pagina Uno");
		});
		it('constructor create the page with the correct description', function(){
			expect(Page.getDescription()).toBeEqual("questa è la pagina uno");
		});
		it('constructor create the page with the correct number of graphsPerRow', function(){
			expect(Page.getGraphsPerRow()).toBeEqual(4);
		});
		it('constructor create the page with the correct number of graphsPerCol', function(){
			expect(Page.getGraphsPerCol()).toBeEqual(4);
		});
		it('constructor create the page with the correct URLSocket', function(){
			expect(Page.getUrl()).toBeEqual("http://localhost/page1");
		});
		it('constructor create the page with the correct number of graphs', function(){
			expect(Page.getGraphsList().length).toBeEqual(3);
		});

	});

	describe('updatePage', function(){

		var json = 	{
			"ID" : "pageN",
			"name" : "Pagina n-esima",
			"description" : "questa è la pagina n-esima",
			"graphsPerRow" : 4,
			"graphsPerCol" : 4,
			"URLSocket" : "http://localhost/pageN"
		};

		beforeEach(function(){
			Page.updatePage(json);
		});

		it('page updated with the correct name', function(){
			expect(Page.getName()).toBeEqual("Pagina n-esima");
		});
		it('page updated with the correct description', function(){
			expect(Page.getDescription()).toBeEqual("questa è la pagina n-esima");
		});
		it('page updated with the correct number of graphsPerRow', function(){
			expect(Page.getGraphsPerRow()).toBeEqual(4);
		});
		it('page updated with the correct number of graphsPerCol', function(){
			expect(Page.getGraphsPerCol()).toBeEqual(4);
		});
		it('page updated with the correct URLSocket', function(){
			expect(Page.getUrl()).toBeEqual("http://localhost/pageN");
		});

	});

	describe('addGraph', function(){

		var json = {
			"ID" : "graficoN",
			"type" : "Table"
		};
		//var lineChart = mock( LineChart );
		spyOn(LineChart.prototype, "LineChart").and.returnValue({});
		//var barChart = mock( BarChart );
		spyOn(BarChart.prototype, "BarChart").and.returnValue({});
		//var mapChart = mock( mapChart );
		spyOn(MapChart.prototype, "MapChart").and.returnValue({});
		//var table = mock( Table );
		spyOn(Table.prototype, "Table").and.returnValue({});

		beforeEach(function(){
			Page.addGraph(json);
		});

		it('graphs added correctly to the list', function(){
			expect(Page.getGraphsList().length).toBeEqual(4);
		});

	});
	
});