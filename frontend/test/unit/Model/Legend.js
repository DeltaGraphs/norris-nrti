/*
* Name :  Legend.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =======================================================================================================================
* 0.1.0			2015-05-15	Rossetto Francesco			Add test of Model::Legend, describe all method
*
* 0.0.1			2015-05-15	Rossetto Francesco			Initial code
* =======================================================================================================================
*
*/

describe('Legend', function(){
	'use strict';

	var Legend;

	beforeEach(module('app'));

	beforeEach(inject(function(_Legend_){
		Legend = _Legend_;
	}));

	describe('Constructor', function(){

		var json = 	{
			"position" : "left",
			"fontColor" : "#AFA",
			"background" : "#F00",
		};

		beforeEach(function(){
			Legend = new Legend(json);
		});

		it('constructor create the page with the correct background', function(){
			expect(Legend.getPosition()).toBeEqual("left");
		});
		it('constructor create the page with the correct background', function(){
			expect(Legend.getFontColor()).toBeEqual("#AFA");
		});
		it('constructor create the page with the correct fontColor', function(){
			expect(Legend.getBackground()).toBeEqual("#F00");
		});

	});

	describe('updateParameters', function(){

		var json = 	{
			"position" : "top",
			"style" : "",
			"fontColor" : "#F00",
			"background" : "#AFA",
		};

		beforeEach(function(){
			Legend.updateParameters(json);
		});

		it('constructor create the page with the correct background', function(){
			expect(Legend.getPosition()).toBeEqual("top");
		});
		it('constructor create the page with the correct background', function(){
			expect(Legend.getFontColor()).toBeEqual("#F00");
		});
		it('constructor create the page with the correct fontColor', function(){
			expect(Legend.getBackground()).toBeEqual("#AFA");
		});

	});
	
});