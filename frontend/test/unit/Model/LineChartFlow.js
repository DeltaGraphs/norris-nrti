/*
* Name :  LineChartFlow.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0			2015-05-15	Maria Giovanna Chinellato	Add test of Model::LineChartFlow.js
*
* 0.0.1			2015-05-15	Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

describe('LineChartFlow', function(){
	'use strict';

	var LineChartFlow;
	var Flow;

	beforeEach(module('app'));

	beforeEach(inject(function(_LineChartFlow_, $injector){
		LineChartFlow = _LineChartFlow_;
		Flow = $injector.get('Flow');
	}));

	describe('Constructor', function(){

		json = {
			"dataFormat" : "int",
			"name" : "flusso1",
			"flowColor" : "#F2F",
			"legendOnPoin" : "flusso1",
			"marker" : "furly",
			"interpolation" : "single",
			"areaColor" : "#F2F",
			"maxItem" : "20"
		};
		var f = {
			"dataFormat" : "int",
			"name" : "flusso1"
		};
		var l = {
			"flowColor" : "#F2F",
			"legendOnPoin" : "flusso1", // forse da mettere nel grafico e non nel flusso
			"marker" : "furly",
			"interpolation" : "single",
			"areaColor" : "#F2F",
			"maxItem" : "20"
		};

		beforeEach(function(){
			LineChartFlow = new LineChartFlow(json);
		});

		spyOn(Flow.prototype, "apply").and.callFake(function() {return;});

		it('constructor use the flow constructor in the correct way', function(){
			expect(Flow.prototype.apply).toHaveBeenCalledWith(f); // in teoria dovrebbe essere così
		});
		it('constructor create the flow with the correct flowColor', function(){
			expect(LineChartFlow.prototype.getFlowColor()).toBeEqual("#F2F");
		});
		it('constructor create the flow with the correct legend on point', function(){
			expect(LineChartFlow.prototype.getLegendOnPoint()).toBeEqual("flusso1");
		});
		it('constructor create the flow with the correct marker', function(){
			expect(LineChartFlow.prototype.getMarker()).toBeEqual("furly");
		});
		it('constructor create the flow with the correct interpolation', function(){
			expect(LineChartFlow.prototype.getInterpolation()).toBeEqual("single");
		});
		it('constructor create the flow with the correct area color', function(){
			expect(LineChartFlow.prototype.getAreaColor()).toBeEqual("#F2F");
		});
		it('constructor create the flow with the correct max item displayed', function(){
			expect(LineChartFlow.prototype.getMaxItem()).toBeEqual("20");
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
			"legendOnPoin" : "flusso",
			"marker" : "furly",
			"interpolation" : "single",
			"areaColor" : "#F3F",
			"maxItem" : "15"
		};
		var f = {
			"dataFormat" : "int",
			"name" : "flusso1"
		};
		var l = {
			"flowColor" : "#FFF",
			"legendOnPoin" : "flusso",
			"marker" : "furly",
			"interpolation" : "single",
			"areaColor" : "#F3F",
			"maxItem" : "15"
		};

		beforeEach(function(){
			res = LineChartFlow.prototype.test("split(json)");
		});

		it('json splitted in the correct way', function(){
			expect(res.flowJson).toBeEqual(f);
			expect(res.lineFlowJson).toBeEqual(l);
		});

	});

	describe('updateParameters', function(){
		json = {
			"dataFormat" : "String",
			"name" : "flusso2",
			"flowColor" : "#F1F",
			"legendOnPoin" : "flusso2",
			"marker" : "furly1",
			"interpolation" : "cubic",
			"areaColor" : "#F1F",
			"maxItem" : "15"
		};

		beforeEach(function(){
			LineChartFlow.prototype.updateParameters(json);
		});

		spyOn(Flow.prototype, "apply").and.callFake(function() {return;});

		it('flow updated with the correct parameters', function(){
			expect(Flow.prototype.apply).toHaveBeenCalledWith(f); // in teoria dovrebbe essere così
		});
		it('flow updated with the correct flowColor', function(){
			expect(LineChartFlow.prototype.getFlowColor()).toBeEqual("#F1F");
		});
		it('flow updated with the correct legend on point', function(){
			expect(LineChartFlow.prototype.getLegendOnPoint()).toBeEqual("flusso2");
		});
		it('flow updated with the correct marker', function(){
			expect(LineChartFlow.prototype.getMarker()).toBeEqual("furly1");
		});
		it('flow updated with the correct interpolation', function(){
			expect(LineChartFlow.prototype.getInterpolation()).toBeEqual("cubic");
		});
		it('flow updated with the correct area color', function(){
			expect(LineChartFlow.prototype.getAreaColor()).toBeEqual("#F1F");
		});
		it('flow updated with the correct max item displayed', function(){
			expect(LineChartFlow.prototype.getMaxItem()).toBeEqual("15");
		});

	});

	describe('inizializeData', function(){
		// data {}

		beforeEach(function(){
			LineChartFlow.prototype.inizializeData(data);
		});

		// it
	});

	describe('inPlaceUpdate', function(){
		// data {}

		beforeEach(function(){
			LineChartFlow.prototype.inPlaceUpdate(data);
		});

		// it
	});

	describe('streamUpdate', function(){
		// data {}

		beforeEach(function(){
			LineChartFlow.prototype.streamUpdate(data);
		});

		// it
	});

});