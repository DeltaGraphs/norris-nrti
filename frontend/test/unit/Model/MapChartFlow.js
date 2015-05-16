/*
* Name :  MapChartFlow.js
* Module : UnitTest
* Location : /frontend/test/unit/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0			2015-05-15	Maria Giovanna Chinellato	Add test of Model::MapChartFlow.js
*
* 0.0.1			2015-05-15	Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

describe('MapChartFlow', function(){
	'use strict';

	var MapChartFlow;
	var Flow;

	beforeEach(module('app'));

	beforeEach(inject(function(_MapChartFlow_, $injector){
		MapChartFlow = _MapChartFlow_;
		Flow = $injector.get('Flow');
	}));

	describe('Constructor', function(){

		var json = {
			"dataFormat" : "int",
			"name" : "flusso1",
			"flowColor" : "#F2F",
			"legendOnPoin" : "flusso1",
			"marker" : "furly",
			"maxItem" : "20",
			"trace" : "bubu"
		};
		var f = {
			"dataFormat" : "int",
			"name" : "flusso1"
		};

		beforeEach(function(){
			MapChartFlow = new MapChartFlow(json);
		});

		spyOn(Flow.prototype, "apply").and.callFake(function() {return;});

		it('constructor use the flow constructor in the correct way', function(){
			expect(Flow.prototype.apply).toHaveBeenCalledWith(f); // in teoria dovrebbe essere così
		});
		it('constructor create the flow with the correct flowColor', function(){
			expect(MapChartFlow.prototype.getFlowColor()).toBeEqual("#F2F");
		});
		it('constructor create the flow with the correct legend on point', function(){
			expect(MapChartFlow.prototype.getLegendOnPoint()).toBeEqual("flusso1");
		});
		it('constructor create the flow with the correct marker', function(){
			expect(MapChartFlow.prototype.getMarker()).toBeEqual("furly");
		});
		it('constructor create the flow with the correct max item displayed', function(){
			expect(MapChartFlow.prototype.getMaxItem()).toBeEqual("20");
		});
		it('constructor create the flow with the correct trace', function(){
			expect(MapChartFlow.prototype.getTrace()).toBeEqual("bubu");
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
			"maxItem" : "15",
			"trace" : "flux"
		};
		var f = {
			"dataFormat" : "int",
			"name" : "flusso1"
		};
		var m = {
			"flowColor" : "#FFF",
			"legendOnPoin" : "flusso",
			"marker" : "furly",
			"maxItem" : "15",
			"trace" : "flux"
		};

		beforeEach(function(){
			res = MapChartFlow.prototype.test("split(json)");
		});

		it('json splitted in the correct way', function(){
			expect(res.flowJson).toBeEqual(f);
			expect(res.mapFlowJson).toBeEqual(m);
		});

	});

	describe('updateParameters', function(){
		var json = {
			"dataFormat" : "String",
			"name" : "flusso2",
			"flowColor" : "#F3F",
			"legendOnPoin" : "flusso2",
			"marker" : "furly1",
			"maxItem" : "45",
			"trace" : "flow"
		};
		var f = {
			"dataFormat" : "String",
			"name" : "flusso2"
		};
		
		beforeEach(function(){
			MapChartFlow.prototype.updateParameters(json);
		});

		spyOn(Flow.prototype, "apply").and.callFake(function() {return;});

		it('flow updated with the correct parameters', function(){
			expect(Flow.prototype.apply).toHaveBeenCalledWith(f); // in teoria dovrebbe essere così
		});
		it('flow updated with the correct flowColor', function(){
			expect(MapChartFlow.prototype.getFlowColor()).toBeEqual("#F3F");
		});
		it('flow updated with the correct legend on point', function(){
			expect(MapChartFlow.prototype.getLegendOnPoint()).toBeEqual("flusso2");
		});
		it('flow updated with the correct marker', function(){
			expect(MapChartFlow.prototype.getMarker()).toBeEqual("furly1");
		});
		it('flow updated with the correct max item displayed', function(){
			expect(MapChartFlow.prototype.getMaxItem()).toBeEqual("45");
		});
		it('flow updated with the correct trace', function(){
			expect(MapChartFlow.prototype.getTrace()).toBeEqual("flow");
		});

	});

	/*describe('inizializeData', function(){
		// data {}

		beforeEach(function(){
			MapChartFlow.prototype.inizializeData(data);
		});

		// it
	});

	describe('inPlaceUpdate', function(){
		// data {}

		beforeEach(function(){
			MapChartFlow.prototype.inPlaceUpdate(data);
		});

		// it
	});

	describe('streamUpdate', function(){
		// data {}

		beforeEach(function(){
			MapChartFlow.prototype.streamUpdate(data);
		});

		// it
	});

	describe('movieUpdate', function(){
		// data {}

		beforeEach(function(){
			MapChartFlow.prototype.movieUpdate(data);
		});

		// it
	});*/

});