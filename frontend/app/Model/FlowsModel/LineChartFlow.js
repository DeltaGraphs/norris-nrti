/*jshint node: true */
'use strict';

/*
* Name :  LineChartFlow.js
* Module : FrontEnd::Model::FlowsModel
* Location : /frontend/app/Model/FlowsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.3         2015-05-18  Maria Giovanna Chinellato	Modified general structure, some fixes
*
* 0.1.2         2015-05-15  Maria Giovanna Chinellato	Various fix
*
* 0.1.1			2015-05-15	Francesco Rossetto			Various fix
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add attributes and methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

angular.module('services')
.factory('LineChartFlow', ['Flow', function(Flow){
	
	var data = [];
	var flowColor = '#000';
	var legendOnPoint = '';
	var marker = 'square';
	var interpolation = 'linear';
	var areaColor = '#FFF';
	var maxItem = 20;

	function split(json) {
        var flowJson = {};
        if (json.dataFormat !== undefined) {
            flowJson.dataFormat = json.dataFormat;
        }
        if (json.name !== undefined) {
            flowJson.name = json.name;
        }

        var lineFlowJson = {};
        if (json.flowColor !== undefined) {
            lineFlowJson.flowColor = json.flowColor;
        }
        if (json.legendOnPoint !== undefined) {
            lineFlowJson.legendOnPoint = json.legendOnPoint;
        }
        if (json.marker !== undefined) {
            lineFlowJson.marker = json.marker;
        }
        if (json.interpolation !== undefined) {
            lineFlowJson.interpolation = json.interpolation;
        }
        if (json.areaColor !== undefined) {
            lineFlowJson.areaColor = json.areaColor;
        }
        if (json.maxItem !== undefined) {
            lineFlowJson.maxItem = json.maxItem;
        }

        return {
            'flowJson' : flowJson,
            'lineFlowJson' : lineFlowJson
        };
    }

	function LineChartFlow(info) {
		if (info !== undefined) {
			var json = split(info);
			var fJson = json.flowJson;
			var lfJson = json.lineFlowJson;

			this.parent.constructor.call(this, fJson);
			
			if (lfJson.flowColor !== undefined) {
	            flowColor = lfJson.flowColor;
	        }
	        if (lfJson.legendOnPoint !== undefined) {
	            legendOnPoint = lfJson.legendOnPoint;
	        }
	        if (lfJson.marker !== undefined) {
	            marker = lfJson.marker;
	        }
	        if (lfJson.interpolation !== undefined) {
	            interpolation = lfJson.interpolation;
	        }
	        if (lfJson.areaColor !== undefined) {
	            areaColor = lfJson.areaColor;
	        }
	        if (lfJson.maxItem !== undefined) {
	            maxItem = lfJson.maxItem;
	        }
	    }

	}

	LineChartFlow.prototype = Object.create(Flow.prototype);
	LineChartFlow.prototype.constructor = LineChartFlow;
	LineChartFlow.prototype.parent = Flow.prototype;

	LineChartFlow.prototype = {
		updateParameters : function(info) { //abstract
			if (info !== undefined) {
		    	var json = split(info);
				var fJson = json.flowJson;
				var lfJson = json.lineFlowJson;

				if (Object.keys(fJson).length !== 0) {
					Flow.apply(this, fJson);
				}

				if (Object.keys(lfJson).length !== 0) {
					if (lfJson.flowColor !== undefined) {
			            flowColor = lfJson.flowColor;
			        }
			        if (lfJson.legendOnPoint !== undefined) {
			            legendOnPoint = lfJson.legendOnPoint;
			        }
			        if (lfJson.marker !== undefined) {
			            marker = lfJson.marker;
			        }
			        if (lfJson.interpolation !== undefined) {
			            interpolation = lfJson.interpolation;
			        }
			        if (lfJson.areaColor !== undefined) {
			            areaColor = lfJson.areaColor;
			        }
			        if (lfJson.maxItem !== undefined) {
			            maxItem = lfJson.maxItem;
			        }
			    }
			}
		},

		initializeData : function(data) {
			return data;
		},
		inPlaceUpdate : function(data) {
			return data;
	    },
    	streamUpdate : function(data) {
	    	return data;
	    },

		getData : function() {
			return data;
		},
		getFlowColor : function() {
			return flowColor;
		},
		getLegendOnPoint : function() {
			return legendOnPoint;
		},
		getMarker : function() {
			return marker;
		},
		getInterpolation : function() {
			return interpolation;
		},
		getAreaColor : function() {
			return areaColor;
		},
		getMaxItem : function() {
			return maxItem;
		}
	};

	return LineChartFlow;
}]);