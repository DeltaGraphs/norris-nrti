/*
* Name :  PagesList.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =======================================================================================================================
* 0.1.1			2015-05-15	Francesco Rossetto			Fix test of Model::axis
*
* 0.1.1			2015-05-15	Maria Giovanna Chinellato	Fix test of Model::axis
*
* 0.1.0			2015-05-15	Francesco Rossetto			Add test of Model::axis, describe all method
*
* 0.0.1			2015-05-15	Francesco Rossetto			Initial code
* =======================================================================================================================
*
*/

describe('Axis', function(){
	'use strict';

	beforeEach(module('app'));

	var Axis = require('../../../app/Model/GraphsModel/Axis.js');

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
			var axis = new Axis(json);
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
			axis.updateParameters(json);
		});

		it('axis updated with the correct name', function(){
			expect(axis.getName()).toBeEqual('asso');
		});
		it('axis updated with the correct color', function(){
			expect(axis.getColor()).toBeEqual('#AFA');
		});
		it('axis updated with the correct minValue', function(){
			expect(axis.getMinValue()).toBeEqual(1);
		});
		it('axis updated with the correct maxValue', function(){
			expect(axis.getMaxValue()).toBeEqual(101);
		});
		it('axis updated with the correct getTicks', function(){
			expect(axis.getTicks()).toBeEqual(10);
		});
		it('axis updated with the correct scale', function(){
			expect(axis.getScale()).toBeEqual('linear');
		});

	});
	
});