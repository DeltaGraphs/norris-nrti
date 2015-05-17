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
	'use strict';

	var Flow;

	beforeEach(module('app'));

	beforeEach(inject(function(_Flow_){
		Flow = _Flow_;
	}));

	describe('Constructor', function(){

		var json = {
			'dataFormat' : 'int',
			'name' : 'flusso1'
		};

		beforeEach(function(){
			Flow = new Flow(json);
		});

		it('constructor create the flow with the correct title', function(){
			expect(Flow.prototype.getDataFormat()).toBeEqual('int');
		});
		it('constructor create the flow with the correct url', function(){
			expect(Flow.prototype.getName()).toBeEqual('flusso1');
		});

	});

	describe('updateParameters', function(){
		var json = {
			'dataFormat' : 'String',
			'name' : 'flussoString1'
		};

		beforeEach(function(){
			Flow.prototype.updateParameters(json);
		});

		it('flow updated with the correct title', function(){
			expect(Flow.prototype.getDataFormat()).toBeEqual('String');
		});
		it('flow updated with the correct height', function(){
			expect(Flow.prototype.getName()).toBeEqual('flussoString1');
		});

	});

});