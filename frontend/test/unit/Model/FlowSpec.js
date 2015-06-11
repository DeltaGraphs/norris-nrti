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

describe('FlowFactory', function(){

	var FlowFactory;

	beforeEach(angular.mock.module('norris-nrti'));

	beforeEach(inject(function(_FlowFactory_){
		FlowFactory = _FlowFactory_;
	}));

	describe('Constructor', function(){

		var Flow;

		beforeEach(function(){
			Flow = FlowFactory.build();
		});

		afterEach(function(){
			Flow = null;
		});

		it('instance defined', function(){
			expect(Flow).toBeDefined();
		});
		it('constructor create the flow with the correct name', function(){
			expect(Flow.getName()).toEqual(null);
		});

	});

	describe('Constructor', function(){

		var json = {
			'name' : 'flusso1'
		};
		var Flow;

		beforeEach(function(){
			Flow = FlowFactory.build(json);
		});

		afterEach(function(){
			Flow = null;
		});

		it('instance defined', function(){
			expect(Flow).toBeDefined();
		});
		it('constructor create the flow with the correct name', function(){
			expect(Flow.getName()).toEqual('flusso1');
		});

	});

	describe('updateParameters', function(){
		var json = {
			'name' : 'flussoString1'
		};
		var Flow;

		beforeEach(function(){
			Flow = FlowFactory.build();
			Flow.updateParameters(json);
		});

		afterEach(function(){
			Flow = null;
		});
		it('flow updated with the correct name', function(){
			expect(Flow.getName()).toEqual('flussoString1');
		});

	});

});