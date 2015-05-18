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

describe('Legend', function(){

	var Legend;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject(function(_Legend_){
		Legend = _Legend_;
	}));

	describe('Default constructor', function(){

		beforeEach(function(){
			Legend = new Legend();
		});

		afterEach(function(){
			Legend = null;
		});

		it('instance defined', function(){
			expect(Legend).toBeDefined();
		});

		it('constructor create the page with the correct position', function(){
			expect(Legend.getPosition()).toEqual('right');
		});
		it('constructor create the page with the correct font color', function(){
			expect(Legend.getFontColor()).toEqual('#000');
		});
		it('constructor create the page with the correct background', function(){
			expect(Legend.getBackground()).toEqual('#FFF');
		});

	});

	describe('Constructor', function(){

		var json = 	{
			'position' : 'left',
			'fontColor' : '#AFA',
			'background' : '#F00',
		};

		beforeEach(function(){
			Legend = new Legend(json);
		});

		afterEach(function(){
			Legend = null;
		});

		it('instance defined', function(){
			expect(Legend).toBeDefined();
		});

		it('constructor create the page with the correct position', function(){
			expect(Legend.getPosition()).toEqual('left');
		});
		it('constructor create the page with the correct font color', function(){
			expect(Legend.getFontColor()).toEqual('#AFA');
		});
		it('constructor create the page with the correct background', function(){
			expect(Legend.getBackground()).toEqual('#F00');
		});

	});

	describe('updateParameters', function(){

		var json = 	{
			'position' : 'top',
			'fontColor' : '#F00',
			'background' : '#AFA',
		};

		beforeEach(function(){
			Legend = new Legend();
			Legend = Legend.updateParameters(json);
		});

		afterEach(function(){
			Legend = null;
		});

		it('constructor create the page with the correct position', function(){
			expect(Legend.getPosition()).toEqual('top');
		});
		it('constructor create the page with the correct font color', function(){
			expect(Legend.getFontColor()).toEqual('#F00');
		});
		it('constructor create the page with the correct background', function(){
			expect(Legend.getBackground()).toEqual('#AFA');
		});

	});
	
});