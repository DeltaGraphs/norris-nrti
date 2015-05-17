/*jshint node: true */
'use strict';

/*
* Name :  Axis.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =======================================================================================================================
* 0.1.2         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.1.1			2015-05-15	Francesco Rossetto			Fix test of Model::Axis
*
* 0.1.1			2015-05-15	Maria Giovanna Chinellato	Fix test of Model::Axis
*
* 0.1.0			2015-05-15	Francesco Rossetto			Add test of Model::Axis, describe all method
*
* 0.0.1			2015-05-15	Francesco Rossetto			Initial code
* =======================================================================================================================
*
*/

describe('Axis', function(){

	var Axis = null;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject(function (_Axis_) {
		Axis = _Axis_;
	}));

	describe('Constructor', function(){

		var json = 	{
			'name' : 'asse nella manica',
			'color' : '#F0F',
			'minValue' : 0,
			'maxValue' : 100,
			'ticks' : 10,
			'scale' : 'logarithmic',
		};

		beforeEach(function(){
			Axis = new Axis(json);
		});

		it('instance defined', function(){
			expect(Axis).toBeDefined();
		});

		/*it('constructor create the page with the correct name', function(){
			expect(Axis.getName()).
			expect(Axis.getName()).toBeEqual('asse nella manica');
		});
		it('constructor create the page with the correct color', function(){
			expect(Axis.getColor()).toBeEqual('#F0F');
		});
		it('constructor create the page with the correct minValue', function(){
			expect(Axis.getMinValue()).toBeEqual(0);
		});
		it('constructor create the page with the correct maxValue', function(){
			expect(Axis.getMaxValue()).toBeEqual(100);
		});
		it('constructor create the page with the correct ticks', function(){
			expect(Axis.getTicks()).toBeEqual(10);
		});
		it('constructor create the page with the correct scale', function(){
			expect(Axis.getScale()).toBeEqual('logarithmic');
		});*/

	});

	describe('updateParameters', function(){

		var json = 	{
			'name' : 'asso',
			'color' : '#AFA',
			'minValue' : 1,
			'maxValue' : 101,
			'ticks' : 10,
			'scale' : 'linear',
		};

		beforeEach(function(){
			Axis.updateParameters(json);
		});

		it('Axis updated with the correct name', function(){
			expect(Axis.getName()).toBeEqual('asso');
		});
		it('Axis updated with the correct color', function(){
			expect(Axis.getColor()).toBeEqual('#AFA');
		});
		it('Axis updated with the correct minValue', function(){
			expect(Axis.getMinValue()).toBeEqual(1);
		});
		it('Axis updated with the correct maxValue', function(){
			expect(Axis.getMaxValue()).toBeEqual(101);
		});
		it('Axis updated with the correct getTicks', function(){
			expect(Axis.getTicks()).toBeEqual(10);
		});
		it('Axis updated with the correct scale', function(){
			expect(Axis.getScale()).toBeEqual('linear');
		});

	});
	
});