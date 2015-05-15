/*
* Name :  LineChartFlow.js
* Module : FrontEnd::Model::FlowsModel
* Location : /frontend/app/Model/FlowsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add attributes and methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

app.factory('MapChartFlow', function(){
	var data = new Array();
	var flowColor;
	var legendOnPoint;
	var marker;
	var maxItem;
	var trace;

	function split(json) {
        var flowJson = {};
        if (json.dataFormat) {
            flowJson.dataFormat = json.dataFormat;
        }
        if (json.name) {
            flowJson.name = json.name;
        }

        var mapFlowJson = {};
        // data
        if (json.flowColor) {
            mapFlowJson.flowColor = json.flowColor;
        }
        if (json.legendOnPoint) {
            mapFlowJson.legendOnPoint = json.legendOnPoint;
        }
        if (json.marker) {
            mapFlowJson.marker = json.marker;
        }
        if (json.maxItem) {
            mapFlowJson.maxItem = json.maxItem;
        }
        if (json.trace) {
            mapFlowJson.trace = json.trace;
        }

        return {
            "flowJson" : flowJson,
            "mapFlowJson" : mapFlowJson
        }
    }

    var MapChartFlow = function(info) {
		var json = split(info);
		var fJson = json.flowJson;
		var mfJson = json.mapFlowJson;

		Flow.apply(this, fJson);

		// data
		if (mfJson.flowColor) {
            flowColor = mfJson.flowColor;
        }
        if (mfJson.legendOnPoint) {
            legendOnPoint = mfJson.legendOnPoint;
        }
        if (mfJson.marker) {
            marker = mfJson.marker;
        }
        if (mfJson.interpolation) {
            interpolation = mfJson.interpolation;
        }
        if (mfJson.areaColor) {
            areaColor = mfJson.areaColor;
        }
        if (mfJson.maxItem) {
            maxItem = mfJson.maxItem;
        }

	};

	MapChartFlow.prototype.updateParameters = function(info) { //abstract
    	var json = split(info);
		var fJson = json.flowJson;
		var mfJson = json.mapFlowJson;

		if (Object.keys(fJson).length != 0) {
			Flow.apply(this, fJson);
		}

		if (Object.keys(mfJson).length != 0) {
			if (mfJson.flowColor) {
	            flowColor = mfJson.flowColor;
	        }
	        if (mfJson.legendOnPoint) {
	            legendOnPoint = mfJson.legendOnPoint;
	        }
	        if (mfJson.marker) {
	            marker = mfJson.marker;
	        }
	        if (mfJson.interpolation) {
	            interpolation = mfJson.interpolation;
	        }
	        if (mfJson.areaColor) {
	            areaColor = mfJson.areaColor;
	        }
	        if (mfJson.maxItem) {
	            maxItem = mfJson.maxItem;
	        }
	    }
	};

	MapChartFlow.prototype.initializeData = function(data) {
		//
	};
	MapChartFlow.prototype.inPlaceUpdate = function(data) {
		//
    };
    MapChartFlow.prototype.streamUpdate = function(data) {
    	//
    };
    MapChartFlow.prototype.movieUpdate = function(data) {
    	//
    };

	MapChartFlow.prototype.getData = function() {
		return data;
	};
	MapChartFlow.prototype.getFlowColor = function() {
		return flowColor;
	};
	MapChartFlow.prototype.getLegendOnPoint = function() {
		return legendOnPoint;
	};
	MapChartFlow.prototype.getMarker = function() {
		return marker;
	};
	MapChartFlow.prototype.getMaxItem = function() {
		return maxItem;
	};
	MapChartFlow.prototype.getTrace = function() {
		return trace;
	};

	return MapChartFlow;

}]);