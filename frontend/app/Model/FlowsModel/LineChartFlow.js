/*
* Name :  LineChartFlow.js
* Module : FrontEnd::Model::FlowsModel
* Location : /frontend/app/Model/FlowsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
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

app.factory('LineChartFlow', ['Flow', function(Flow){
	var data = new Array();
	var flowColor = "#000";
	var legendOnPoint = "";
	var marker = "square";
	var interpolation = "linear";
	var areaColor = "#FFF";
	var maxItem = 20;

	function split(json) {
        var flowJson = {};
        if (json.dataFormat) {
            flowJson.dataFormat = json.dataFormat;
        }
        if (json.name) {
            flowJson.name = json.name;
        }

        var lineFlowJson = {};
        if (json.flowColor) {
            lineFlowJson.flowColor = json.flowColor;
        }
        if (json.legendOnPoint) {
            lineFlowJson.legendOnPoint = json.legendOnPoint;
        }
        if (json.marker) {
            lineFlowJson.marker = json.marker;
        }
        if (json.interpolation) {
            lineFlowJson.interpolation = json.interpolation;
        }
        if (json.areaColor) {
            lineFlowJson.areaColor = json.areaColor;
        }
        if (json.maxItem) {
            lineFlowJson.maxItem = json.maxItem;
        }

        return {
            "flowJson" : flowJson,
            "lineFlowJson" : lineFlowJson
        }
    }

	var LineChartFlow = function(info) {
		var json = split(info);
		var fJson = json.flowJson;
		var lfJson = json.lineFlowJson;

		Flow.apply(this, fJson);

		// data
		if (lfJson.flowColor) {
            flowColor = lfJson.flowColor;
        }
        if (lfJson.legendOnPoint) {
            legendOnPoint = lfJson.legendOnPoint;
        }
        if (lfJson.marker) {
            marker = lfJson.marker;
        }
        if (lfJson.interpolation) {
            interpolation = lfJson.interpolation;
        }
        if (lfJson.areaColor) {
            areaColor = lfJson.areaColor;
        }
        if (lfJson.maxItem) {
            maxItem = lfJson.maxItem;
        }

	};

	var LineChartFlow.prototype = new Flow();

	LineChartFlow.prototype.updateParameters = function(info) { //abstract
    	var json = split(info);
		var fJson = json.flowJson;
		var lfJson = json.lineFlowJson;

		if (Object.keys(fJson).length != 0) {
			Flow.apply(this, fJson);
		}

		if (Object.keys(lfJson).length != 0) {
			if (lfJson.flowColor) {
	            flowColor = lfJson.flowColor;
	        }
	        if (lfJson.legendOnPoint) {
	            legendOnPoint = lfJson.legendOnPoint;
	        }
	        if (lfJson.marker) {
	            marker = lfJson.marker;
	        }
	        if (lfJson.interpolation) {
	            interpolation = lfJson.interpolation;
	        }
	        if (lfJson.areaColor) {
	            areaColor = lfJson.areaColor;
	        }
	        if (lfJson.maxItem) {
	            maxItem = lfJson.maxItem;
	        }
	    }
	};

	LineChartFlow.prototype.initializeData = function(data) {
		
	};
	LineChartFlow.prototype.inPlaceUpdate = function(data) {
		//
    };
    LineChartFlow.prototype.streamUpdate = function(data) {
    	//
    };

	LineChartFlow.prototype.getData = function() {
		return data;
	};
	LineChartFlow.prototype.getFlowColor = function() {
		return flowColor;
	};
	LineChartFlow.prototype.getLegendOnPoint = function() {
		return legendOnPoint;
	};
	LineChartFlow.prototype.getMarker = function() {
		return marker;
	};
	LineChartFlow.prototype.getInterpolation = function() {
		return interpolation;
	};
	LineChartFlow.prototype.getAreaColor = function() {
		return areaColor;
	};
	LineChartFlow.prototype.getMaxItem = function() {
		return maxItem;
	};

	return LineChartFlow;
}]);