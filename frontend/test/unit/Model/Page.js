/*jshint node: true */
'use strict';

/*
* Name :  PagesList.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =======================================================================================================================
* 0.1.1         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.1.0			2015-05-13	Rossetto Francesco			Add test of Model::Page, describe all method
*
* 0.0.1			2015-05-13	Rossetto Francesco			Initial code
*
* =======================================================================================================================
*
*/

describe('Page', function(){

	var Page;
	var LineChart;
	var BarChart;
	var MapChart;
	var Table;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject(function(_Page_, $injector){
		Page = _Page_;
		LineChart = $injector.get('LineChart');
		BarChart = $injector.get('BarChart');
		MapChart = $injector.get('MapChart');
		Table = $injector.get('Table');
	}));

	describe('Default constructor', function(){

		beforeEach(function(){
			Page = new Page();
		});

		afterEach(function(){
			Page = null;
		});

		it('instance defined', function(){
			expect(Page).toBeDefined();
		});

		it('constructor create the page with the correct name', function(){
			expect(Page.getName()).toEqual(null);
		});
		it('constructor create the page with the correct description', function(){
			expect(Page.getDescription()).toEqual(null);
		});
		it('constructor create the page with the correct number of graphsPerRow', function(){
			expect(Page.getGraphsPerRow()).toEqual(null);
		});
		it('constructor create the page with the correct number of graphsPerCol', function(){
			expect(Page.getGraphsPerCol()).toEqual(null);
		});
		it('constructor create the page with the correct URLSocket', function(){
			expect(Page.getUrl()).toEqual(null);
		});
		it('constructor create the page with the correct number of graphs', function(){
			expect(Page.getGraphsList().length).toEqual(0);
		});

	});

	describe('Constructor', function(){

		var json = 	{
			'ID' : 'page1',
			'name' : 'Pagina Uno',
			'description' : 'questa è la pagina uno',
			'graphsPerRow' : 4,
			'graphsPerCol' : 4,
			'URLSocket' : 'http://localhost/page1',
			'graphs' : [
				{ 
					'ID' : 'grafico1', 
					'type' : 'LineChart' 
				},
				{ 
					'ID' : 'grafico2', 
					'type' : 'BarChart' 
				},
				{ 
					'ID' : 'grafico3', 
					'type' : 'MapChart' 
				}
			]
		};
		
		beforeEach(function(){
			Page = new Page(json);
		});

		afterEach(function(){
			Page = null;
		});

		it('instance defined', function(){
			expect(Page).toBeDefined();
		});

		it('constructor create the page with the correct name', function(){
			expect(Page.getName()).toEqual('Pagina Uno');
		});
		it('constructor create the page with the correct description', function(){
			expect(Page.getDescription()).toEqual('questa è la pagina uno');
		});
		it('constructor create the page with the correct number of graphsPerRow', function(){
			expect(Page.getGraphsPerRow()).toEqual(4);
		});
		it('constructor create the page with the correct number of graphsPerCol', function(){
			expect(Page.getGraphsPerCol()).toEqual(4);
		});
		it('constructor create the page with the correct URLSocket', function(){
			expect(Page.getUrl()).toEqual('http://localhost/page1');
		});
		it('constructor create the page with the correct number of graphs', function(){
			expect(Page.getGraphsList().length).toEqual(3);
		});

	});

	
	describe('updateParameters', function(){

		var json = 	{
			'ID' : 'pageN',
			'name' : 'Pagina n-esima',
			'description' : 'questa è la pagina n-esima',
			'graphsPerRow' : 4,
			'graphsPerCol' : 4,
			'URLSocket' : 'http://localhost/pageN'
		};

		beforeEach(function(){
			Page = new Page();
			Page.updateParameters(json);
		});

		afterEach(function(){
			Page = null;
		});

		it('page updated with the correct name', function(){
			expect(Page.getName()).toEqual('Pagina n-esima');
		});
		it('page updated with the correct description', function(){
			expect(Page.getDescription()).toEqual('questa è la pagina n-esima');
		});
		it('page updated with the correct number of graphsPerRow', function(){
			expect(Page.getGraphsPerRow()).toEqual(4);
		});
		it('page updated with the correct number of graphsPerCol', function(){
			expect(Page.getGraphsPerCol()).toEqual(4);
		});
		it('page updated with the correct URLSocket', function(){
			expect(Page.getUrl()).toEqual('http://localhost/pageN');
		});

	});

	describe('addGraph', function(){

		var json = {
			'ID' : 'graficoN',
			'type' : 'Table'
		};

		beforeEach(function(){
			Page = new Page();
			Page.addGraph(json);
		});

		afterEach(function(){
			Page = null;
		});

		it('graphs added correctly to the list', function(){
			expect(Page.getGraphsList().length).toEqual(1);
		});

	});
	
});