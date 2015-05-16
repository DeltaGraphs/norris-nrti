/*
* Name :  BarChartFlow.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0			2015-05-15	Maria Giovanna Chinellato	Add test of Model::BarChartFlow.js
*
* 0.0.1			2015-05-15	Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

describe('BarChartFlow', function(){
	'use strict';

	var BarChartFlow;
	var Flow;

	beforeEach(module('app'));

	beforeEach(inject(function(_BarChartFlow_, $injector){
		BarChartFlow = _BarChartFlow_;
		Flow = $injector.get('Flow');
	}));

	describe('Constructor', function(){

		var json = {
			"dataFormat" : "int",
			"name" : "flusso1",
			"flowColor" : "#F2F",
			"legendOnPoin" : "flusso1",
		};
		var f = {
			"dataFormat" : "int",
			"name" : "flusso1"
		};

		beforeEach(function(){
			BarChartFlow = new BarChartFlow(json);
		});

		spyOn(Flow.prototype, "apply").and.callFake(function() {return;});

		it('constructor use the flow constructor in the correct way', function(){
			expect(Flow.prototype.apply).toHaveBeenCalledWith(f); // in teoria dovrebbe essere così
		});
		it('constructor create the flow with the correct flowColor', function(){
			expect(BarChartFlow.prototype.getFlowColor()).toBeEqual("#F2F");
		});
		it('constructor create the flow with the correct legend on point', function(){
			expect(BarChartFlow.prototype.getLegendOnPoint()).toBeEqual("flusso1");
		});
	});

	describe('split', function(){
		var res;
		var json = {};
		var json1 = json;
		json = json1;
		json = {
			"dataFormat" : "int",
			"name" : "flusso1",
			"flowColor" : "#FFF",
			"legendOnPoin" : "flusso"
		};
		var f = {
			"dataFormat" : "int",
			"name" : "flusso1"
		};
		var b = {
			"flowColor" : "#FFF",
			"legendOnPoin" : "flusso"
		};

		beforeEach(function(){
			res = BarChartFlow.prototype.test("split(json)");
		});

		it('json splitted in the correct way', function(){
			expect(res.flowJson).toBeEqual(f);
			expect(res.barFlowJson).toBeEqual(b);
		});

	});

	describe('updateParameters', function(){
		var json = {
			"dataFormat" : "String",
			"name" : "flusso2",
			"flowColor" : "#F1F",
			"legendOnPoin" : "flusso2"
		};
		var f = {
			"dataFormat" : "String",
			"name" : "flusso2"
		}

		beforeEach(function(){
			BarChartFlow.prototype.updateParameters(json);
		});

		spyOn(Flow.prototype, "apply").and.callFake(function() {return;});

		it('flow updated with the correct parameters', function(){
			expect(Flow.prototype.apply).toHaveBeenCalledWith(f); // in teoria dovrebbe essere così
		});
		it('cflow updated with the correct flowColor', function(){
			expect(BarChartFlow.prototype.getFlowColor()).toBeEqual("#F1F");
		});
		it('flow updated with the correct legend on point', function(){
			expect(BarChartFlow.prototype.getLegendOnPoint()).toBeEqual("flusso2");
		});

	});

	/*describe('inizializeData', function(){
		// data {}

		beforeEach(function(){
			BarChartFlow.prototype.inizializeData(data);
		});

		// it
	});*/

	/*describe('inPlaceUpdate', function(){
		// data {}

		beforeEach(function(){
			BarChartFlow.prototype.inPlaceUpdate(data);
		});

		// it
	});*/

});