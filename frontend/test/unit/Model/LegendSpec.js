/*jshint node: true */
'use strict';

/*
* Name :  Legend.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =======================================================================================================================
* 0.1.1         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.1.0			2015-05-15	Rossetto Francesco			Add test of Model::Legend, describe all method
*
* 0.0.1			2015-05-15	Rossetto Francesco			Initial code
* =======================================================================================================================
*
*/

describe('LegendFactory', function(){

	var LegendFactory;

	beforeEach(angular.mock.module('norris-nrti'));

	beforeEach(inject(function(_LegendFactory_){
		LegendFactory = _LegendFactory_;
	}));

	describe('Default constructor', function(){

		var Legend;

		beforeEach(function(){
			Legend = LegendFactory.build();
		});

		afterEach(function(){
			Legend = null;
		});

		it('instance defined', function(){
			expect(Legend).toBeDefined();
		});

		it('constructor create the page with the correct position', function(){
			expect(Legend.getPosition()).toEqual('E');
		});
		it('constructor create the page with the correct font color', function(){
			expect(Legend.getFontColor()).toEqual('#000');
		});
		it('constructor create the page with the correct background', function(){
			expect(Legend.getBackgroundColor()).toEqual('#FFF');
		});

	});

	describe('Constructor', function(){

		var json = 	{
			'position' : 'W',
			'fontColor' : '#AFA',
			'backgroundColor' : '#F00',
		};
		var Legend;

		beforeEach(function(){
			Legend = LegendFactory.build(json);
		});

		afterEach(function(){
			Legend = null;
		});

		it('instance defined', function(){
			expect(Legend).toBeDefined();
		});

		it('constructor create the page with the correct position', function(){
			expect(Legend.getPosition()).toEqual('W');
		});
		it('constructor create the page with the correct font color', function(){
			expect(Legend.getFontColor()).toEqual('#AFA');
		});
		it('constructor create the page with the correct background', function(){
			expect(Legend.getBackgroundColor()).toEqual('#F00');
		});

	});

	describe('updateParameters', function(){

		var json = 	{
			'position' : 'S',
			'fontColor' : '#F00',
			'backgroundColor' : '#AFA',
		};
		var Legend;

		beforeEach(function(){
			Legend = LegendFactory.build();
			Legend.updateParameters(json);
		});

		afterEach(function(){
			Legend = null;
		});

		it('constructor create the page with the correct position', function(){
			expect(Legend.getPosition()).toEqual('S');
		});
		it('constructor create the page with the correct font color', function(){
			expect(Legend.getFontColor()).toEqual('#F00');
		});
		it('constructor create the page with the correct background', function(){
			expect(Legend.getBackgroundColor()).toEqual('#AFA');
		});

	});
	
});