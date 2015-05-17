/*jshint node: true */
'use strict';

/*
* Name :  TableFlow.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.1         2015-05-17  Maria Giovanna Chinellato   Fix code
*
* 0.1.0			2015-05-15	Maria Giovanna Chinellato	Add test of Model::TableFlow.js
*
* 0.0.1			2015-05-15	Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

describe('TableFlow', ['Flow', function(){

	var TableFlow;
	var Flow;

	beforeEach(module('app'));

	beforeEach(inject(function(_TableFlow_, $injector){
		TableFlow = _TableFlow_;
		Flow = $injector.get('Flow');
	}));

	describe('Constructor', function(){

		var json = {
			'dataFormat' : 'int',
			'name' : 'flusso1',
			'maxItem' : '20'
		};
		var f = {
			'dataFormat' : 'int',
			'name' : 'flusso1'
		};

		beforeEach(function(){
			TableFlow = new TableFlow(json);
		});

		spyOn(Flow.prototype, 'apply').and.callFake(function() {return;});

		it('constructor use the flow constructor in the correct way', function(){
			expect(Flow.prototype.apply).toHaveBeenCalledWith(f); // in teoria dovrebbe essere così
		});
		it('constructor create the flow with the correct max item displayed', function(){
			expect(TableFlow.prototype.getMaxItem()).toBeEqual('20');
		});

	});

	describe('split', function(){
		var res;
		var json = {};
		var json1 = json;
		json = json1;
		json = {
			'dataFormat' : 'int',
			'name' : 'flusso1',
			'maxItem' : '15'
		};
		var f = {
			'dataFormat' : 'int',
			'name' : 'flusso1'
		};
		var t = {
			'maxItem' : '15'
		};

		beforeEach(function(){
			res = TableFlow.prototype.test('split(json)');
		});

		it('json splitted in the correct way', function(){
			expect(res.flowJson).toBeEqual(f);
			expect(res.tableFlowJson).toBeEqual(t);
		});

	});

	describe('updateParameters', function(){
		var json = {
			'dataFormat' : 'String',
			'name' : 'flusso2',
			'maxItem' : '15'
		};
		var f = {
			'dataFormat' : 'String',
			'name' : 'flusso2'
		};


		beforeEach(function(){
			TableFlow.prototype.updateParameters(json);
		});

		spyOn(Flow.prototype, 'apply').and.callFake(function() {return;});

		it('flow updated with the correct parameters', function(){
			expect(Flow.prototype.apply).toHaveBeenCalledWith(f); // in teoria dovrebbe essere così
		});
		it('flow updated with the correct max item displayed', function(){
			expect(TableFlow.prototype.getMaxItem()).toBeEqual('15');
		});

	});

	/*describe('inizializeData', function(){
		// data {}

		beforeEach(function(){
			TableFlow.prototype.inizializeData(data);
		});

		// it
	});

	describe('inPlaceUpdate', function(){
		// data {}

		beforeEach(function(){
			TableFlow.prototype.inPlaceUpdate(data);
		});

		// it
	});

	describe('streamUpdate', function(){
		// data {}

		beforeEach(function(){
			TableFlow.prototype.streamUpdate(data);
		});

		// it
	});*/

}]);