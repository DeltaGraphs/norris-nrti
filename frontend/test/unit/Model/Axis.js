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
			'scale' : 'logarithmic'
		};

		beforeEach(function(){
			Axis = new Axis(json);
			//Axis = Axis.Axis(json);
		});

		it('instance defined', function(){
			expect(Axis).toBeDefined();
		});

		it('constructor create the page with the correct name', function(){
			var Axis2 = new Axis();
			Axis2 = Axis2.Axis(json);
			var axisName = Axis2.getName();
			expect(axisName).toBeDefined();
			expect(axisName).toEqual('asse nella manica');
		});
		it('constructor create the page with the correct color', function(){
			var axisColor = Axis.getColor();
			expect(axisColor).toBeDefined();
			expect(axisColor).toEqual('#F0F');
		});
		it('constructor create the page with the correct minValue', function(){
			var axisMinValue = Axis.getMinValue();
			expect(axisMinValue).toBeDefined();
			expect(axisMinValue).toEqual(0);
		});
		it('constructor create the page with the correct maxValue', function(){
			var axisMaxValue = Axis.getMaxValue();
			expect(axisMaxValue).toBeDefined();
			expect(axisMaxValue).toEqual(100);
		});
		it('constructor create the page with the correct ticks', function(){
			var axisTicks = Axis.getTicks();
			expect(axisTicks).toBeDefined();
			expect(axisTicks).toEqual(10);
		});
		it('constructor create the page with the correct scale', function(){
			var axisScale = Axis.getScale();
			expect(axisScale).toBeDefined();
			expect(axisScale).toEqual('logarithmic');
		});

	});

	/*describe('updateParameters', function(){

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

	});*/
	
});