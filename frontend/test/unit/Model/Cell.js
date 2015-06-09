/*jshint node: true */
'use strict';
/*
* Name :  Cell.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =======================================================================================================================
* 0.1.1         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.1.0			2015-05-15	Rossetto Francesco			Add test of Model::Cell, describe all method
*
* 0.0.1			2015-05-15	Rossetto Francesco			Initial code
* =======================================================================================================================
*
*/

describe('CellFactory', function(){

	var CellFactory;

	beforeEach(angular.mock.module('norris-nrti'));

	beforeEach(inject(function(_CellFactory_){
		CellFactory = _CellFactory_;
	}));

	describe('Default constructor', function(){
		var Cell;

		beforeEach(function(){
			Cell = CellFactory.build();
		});

		afterEach(function(){
			Cell = null;
		});

		it('instance defined', function(){
			expect(Cell).toBeDefined();
		});
		
		it('constructor create the page with the correct background', function(){
			expect(Cell.getBackground()).toEqual('#FFF');
		});
		it('constructor create the page with the correct fontColor', function(){
			expect(Cell.getFontColor()).toEqual('#000');
		});

	});

	describe('Constructor', function(){

		var json = 	{
			'background' : '#AFA',
			'fontColor' : '#F00',
		};
		var Cell;

		beforeEach(function(){
			Cell = CellFactory.build(json);
		});

		afterEach(function(){
			Cell = null;
		});

		it('instance defined', function(){
			expect(Cell).toBeDefined();
		});
		it('constructor create the page with the correct background', function(){
			expect(Cell.getBackground()).toEqual('#AFA');
		});
		it('constructor create the page with the correct fontColor', function(){
			expect(Cell.getFontColor()).toEqual('#F00');
		});

	});

	describe('updateParameters', function(){

		var json = 	{
			'background' : '#F00',
			'fontColor' : '#AFA',
		};
		var Cell;

		beforeEach(function(){
			Cell = CellFactory.build();
			Cell.updateParameters(json);
		});

		afterEach(function(){
			Cell = null;
		});

		it('Cell updated with the correct name', function(){
			expect(Cell.getBackground()).toEqual('#F00');
		});
		it('Cell updated with the correct color', function(){
			expect(Cell.getFontColor()).toEqual('#AFA');
		});

	});
	
});