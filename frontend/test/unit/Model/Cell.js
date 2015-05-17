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

describe('Cell', function(){

	var Cell;

	beforeEach(module('app'));

	beforeEach(inject(function(_Cell_){
		Cell = _Cell_;
	}));

	describe('Default constructor', function(){

		beforeEach(function(){
			Cell = new Cell();
		});

		afterEach(function(){
			Cell = null;
		});

		it('constructor create the page with the correct background', function(){
			expect(Cell.getBackground()).toBeEqual('#FFF');
		});
		it('constructor create the page with the correct fontColor', function(){
			expect(Cell.getFontColor()).toBeEqual('#000');
		});

	});

	describe('Constructor', function(){

		var json = 	{
			'background' : '#AFA',
			'fontColor' : '#F00',
		};

		beforeEach(function(){
			Cell = new Cell(json);
		});

		afterEach(function(){
			Cell = null;
		});

		it('constructor create the page with the correct background', function(){
			expect(Cell.getBackground()).toBeEqual('#AFA');
		});
		it('constructor create the page with the correct fontColor', function(){
			expect(Cell.getFontColor()).toBeEqual('#F00');
		});

	});

	describe('updateParameters', function(){

		var json = 	{
			'background' : '#F00',
			'fontColor' : '#AFA',
		};

		beforeEach(function(){
			Cell.updateParameters(json);
		});

		afterEach(function(){
			Cell = null;
		});

		it('Cell updated with the correct name', function(){
			expect(Cell.getBackground()).toBeEqual('#F00');
		});
		it('Cell updated with the correct color', function(){
			expect(Cell.getFontColor()).toBeEqual('#AFA');
		});

	});
	
});