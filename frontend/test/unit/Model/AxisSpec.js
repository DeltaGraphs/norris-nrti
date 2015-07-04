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
* 0.1.2         2015-05-20  Maria Giovanna Chinellato   Fix code
*
* 0.1.1			2015-05-20	Francesco Rossetto			Fix test of Model::Axis
*
* 0.1.1			2015-05-20	Maria Giovanna Chinellato	Fix test of Model::Axis
*
* 0.1.0			2015-05-20	Francesco Rossetto			Add test of Model::Axis, describe all method
*
* 0.0.1			2015-05-19	Francesco Rossetto			Initial code
* =======================================================================================================================
*
*/

describe('Axis', function(){

	var AxisFactory = null;

	beforeEach(angular.mock.module('norris-nrti'));

	beforeEach(inject(function (_AxisFactory_) {
		AxisFactory = _AxisFactory_;
	}));

	describe('Default constructor', function(){

		var Axis;

		beforeEach(function(){
			Axis = AxisFactory.build();
		});

		afterEach(function(){
			Axis = null;
		});

		it('instance defined', function(){
			expect(Axis).toBeDefined();
		});
		it('constructor create the page with the correct name', function(){
			expect(Axis.getName()).toEqual(null);
		});
		it('constructor create the page with the correct color', function(){
			expect(Axis.getColor()).toEqual('#FFF');
		});
		it('constructor create the page with the correct minValue', function(){
			expect(Axis.getMinValue()).toEqual(null);
		});
		it('constructor create the page with the correct maxValue', function(){
			expect(Axis.getMaxValue()).toEqual(null);
		});
		it('constructor create the page with the correct ticks', function(){
			expect(Axis.getTicks()).toEqual(10);
		});
		it('constructor create the page with the correct scale', function(){
			expect(Axis.getScale()).toEqual('linear');
		});

	});

	describe('Constructor', function(){

		var json = 	{
			'name' : 'asse nella manica',
			'color' : '#F0F',
			'minIndex' : 0,
			'maxIndex' : 100,
			'ticks' : 10,
			'scale' : 'logarithmic'
		};
		var Axis;

		beforeEach(function(){
			Axis = AxisFactory.build(json);
		});

		afterEach(function(){
			Axis = null;
		});

		it('instance defined', function(){
			expect(Axis).toBeDefined();
		});

		it('constructor create the page with the correct name', function(){
			expect(Axis.getName()).toEqual('asse nella manica');
		});
		it('constructor create the page with the correct color', function(){
			expect(Axis.getColor()).toEqual('#F0F');
		});
		it('constructor create the page with the correct minValue', function(){
			expect(Axis.getMinValue()).toEqual(0);
		});
		it('constructor create the page with the correct maxValue', function(){
			expect(Axis.getMaxValue()).toEqual(100);
		});
		it('constructor create the page with the correct ticks', function(){
			expect(Axis.getTicks()).toEqual(10);
		});
		it('constructor create the page with the correct scale', function(){
			expect(Axis.getScale()).toEqual('logarithmic');
		});

	});

	describe('#updateParameters', function(){

		var json = 	{
			'name' : 'asso',
			'color' : '#AFA',
			'minIndex' : 1,
			'maxIndex' : 101,
			'ticks' : 10,
			'scale' : 'linear',
		};
		var Axis;

		beforeEach(function(){
			Axis = AxisFactory.build();
			Axis.updateParameters(json);
		});

		afterEach(function(){
			Axis = null;
		});

		it('Axis updated with the correct name', function(){
			expect(Axis.getName()).toEqual('asso');
		});
		it('Axis updated with the correct color', function(){
			expect(Axis.getColor()).toEqual('#AFA');
		});
		it('Axis updated with the correct minValue', function(){
			expect(Axis.getMinValue()).toEqual(1);
		});
		it('Axis updated with the correct maxValue', function(){
			expect(Axis.getMaxValue()).toEqual(101);
		});
		it('Axis updated with the correct getTicks', function(){
			expect(Axis.getTicks()).toEqual(10);
		});
		it('Axis updated with the correct scale', function(){
			expect(Axis.getScale()).toEqual('linear');
		});

	});
	
});