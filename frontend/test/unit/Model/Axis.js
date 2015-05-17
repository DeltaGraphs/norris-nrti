/*
* Name :  PagesList.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =======================================================================================================================
* 0.1.1			2015-05-15	Maria Giovanna Chinellato	Fix test of Model::Axis
*
* 0.1.0			2015-05-15	Rossetto Francesco			Add test of Model::Axis, describe all method
*
* 0.0.1			2015-05-15	Rossetto Francesco			Initial code
* =======================================================================================================================
*
*/

describe('Axis', function(){
	'use strict';

	var axis;

	beforeEach(module('app'));

	beforeEach(inject(function(_Axis_){
		axis = _Axis_;
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
			axis = new Axis(json);
		});

		it('constructor create the page with the correct name', function(){
			expect(axis.getName()).toBeEqual('asse nella manica');
		});
		it('constructor create the page with the correct color', function(){
			expect(axis.getColor()).toBeEqual('#F0F');
		});
		it('constructor create the page with the correct minValue', function(){
			expect(axis.getMinValue()).toBeEqual(0);
		});
		it('constructor create the page with the correct maxValue', function(){
			expect(axis.getMaxValue()).toBeEqual(100);
		});
		it('constructor create the page with the correct ticks', function(){
			expect(axis.getTicks()).toBeEqual(10);
		});
		it('constructor create the page with the correct scale', function(){
			expect(axis.getScale()).toBeEqual('logarithmic');
		});

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

		it('axis updated with the correct name', function(){
			expect(Axis.getName()).toBeEqual('asso');
		});
		it('axis updated with the correct color', function(){
			expect(Axis.getColor()).toBeEqual('#AFA');
		});
		it('axis updated with the correct minValue', function(){
			expect(Axis.getMinValue()).toBeEqual(1);
		});
		it('axis updated with the correct maxValue', function(){
			expect(Axis.getMaxValue()).toBeEqual(101);
		});
		it('axis updated with the correct getTicks', function(){
			expect(Axis.getTicks()).toBeEqual(10);
		});
		it('axis updated with the correct scale', function(){
			expect(Axis.getScale()).toBeEqual('linear');
		});

	});
	
});