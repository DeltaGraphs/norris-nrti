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

describe('PageFactory', function(){

	var PageFactory;

	beforeEach(angular.mock.module('norris-nrti'));

	beforeEach(inject(function(_PageFactory_){
		PageFactory = _PageFactory_;
	}));

	describe('Default constructor', function(){
		var Page;

		beforeEach(function(){
			Page = PageFactory.build();
		});

		afterEach(function(){
			Page = null;
		});

		it('instance defined', function(){
			expect(Page).toBeDefined();
		});

		it('constructor create the page with the correct name', function(){
			expect(Page.getName()).toEqual('Titolo di default');
		});
		it('constructor create the page with the correct description', function(){
			expect(Page.getDescription()).toEqual('');
		});
		it('constructor create the page with the correct number of graphsPerRow', function(){
			expect(Page.getGraphsPerRow()).toEqual(1);
		});
		it('constructor create the page with the correct number of graphsPerCol', function(){
			expect(Page.getGraphsPerCol()).toEqual(5);
		});
		it('constructor create the page with the correct socketURL', function(){
			expect(Page.getUrl()).toEqual(null);
		});
		it('constructor create the page with the correct number of graphs', function(){
			expect(Page.getGraphsList().length).toEqual(0);
		});

	});

	describe('Constructor', function(){

		var json = 	{
			'properties' : {
				'ID' : 'page1',
				'name' : 'Pagina Uno',
				'description' : 'questa è la pagina uno',
				'graphsPerRow' : 4,
				'graphsPerCol' : 4,
				'socketURL' : 'http://localhost/page1'
			},
			'data' : [
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
		
		var Page;

		beforeEach(function(){
			Page = PageFactory.build(json);
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
		it('constructor create the page with the correct socketURL', function(){
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
			'socketURL' : 'http://localhost/pageN'
		};
		var Page;

		beforeEach(function(){
			Page = PageFactory.build();
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
		it('page updated with the correct socketURL', function(){
			expect(Page.getUrl()).toEqual('http://localhost/pageN');
		});

	});

	describe('addGraph', function(){

		var json = {
			'ID' : 'graficoN',
			'type' : 'Table'
		};

		var Page;
		
		beforeEach(function(){
			Page = PageFactory.build();
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