/*jshint node: true */
'use strict';

/*
* Name :  Flow.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.1         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.1.0			2015-05-15	Maria Giovanna Chinellato	Add test of Model::Flow.js
*
* 0.0.1			2015-05-15	Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

describe('Flow', function(){

	var Flow;

	beforeEach(angular.mock.module('app'));

	beforeEach(inject(function(_Flow_){
		Flow = _Flow_;
	}));

	describe('Constructor', function(){

		beforeEach(function(){
			Flow = new Flow();
		});

		afterEach(function(){
			Flow = null;
		});

		it('instance defined', function(){
			expect(Flow).toBeDefined();
		});

		it('constructor create the flow with the correct dataFormat', function(){
			expect(Flow.getDataFormat()).toEqual(null);
		});
		it('constructor create the flow with the correct name', function(){
			expect(Flow.getName()).toEqual(null);
		});

	});

	describe('Constructor', function(){

		var json = {
			'dataFormat' : 'int',
			'name' : 'flusso1'
		};

		beforeEach(function(){
			Flow = new Flow(json);
		});

		afterEach(function(){
			Flow = null;
		});

		it('instance defined', function(){
			expect(Flow).toBeDefined();
		});

		it('constructor create the flow with the correct dataFormat', function(){
			expect(Flow.getDataFormat()).toEqual('int');
		});
		it('constructor create the flow with the correct name', function(){
			expect(Flow.getName()).toEqual('flusso1');
		});

	});

	describe('updateParameters', function(){
		var json = {
			'dataFormat' : 'String',
			'name' : 'flussoString1'
		};

		beforeEach(function(){
			Flow = new Flow();
			Flow = Flow.updateParameters(json);
		});

		afterEach(function(){
			Flow = null;
		});

		it('flow updated with the correct dataFormat', function(){
			expect(Flow.getDataFormat()).toEqual('String');
		});
		it('flow updated with the correct name', function(){
			expect(Flow.getName()).toEqual('flussoString1');
		});

	});

});