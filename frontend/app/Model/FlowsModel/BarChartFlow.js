/*
* Name :  BarChartFlow.js
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

app.factory('BarChartFlow', [ 'Flow', function(Flow){
	var data = new Array();
	var flowColor;
	var legendOnPoint;
	var marker;
	var interpolation;
	var areaColor;
	var maxItem;

	function split(json) {
        var flowJson = {};
        if (json.dataFormat) {
            flowJson.dataFormat = json.dataFormat;
        }
        if (json.name) {
            flowJson.name = json.name;
        }

        var barFlowJson = {};
        // data
        if (json.flowColor) {
            barFlowJson.flowColor = json.flowColor;
        }
        if (json.legendOnPoint) {
            barFlowJson.legendOnPoint = json.legendOnPoint;
        }

        return {
            "flowJson" : flowJson,
            "barFlowJson" : barFlowJson
        }
    }

    var BarChartFlow = function(info) {
		var json = split(info);
		var fJson = json.flowJson;
		var bfJson = json.barFlowJson;

		Flow.apply(this, fJson);

		// data
		if (bfJson.flowColor) {
            flowColor = bfJson.flowColor;
        }
        if (bfJson.legendOnPoint) {
            legendOnPoint = bfJson.legendOnPoint;
        }

	};

	BarChartFlow.prototype.updateParameters = function(info) {
    	var json = split(info);
		var fJson = json.flowJson;
		var bfJson = json.barFlowJson;

		if (Object.keys(fJson).length != 0) {
			Flow.apply(this, fJson);
		}

		if (Object.keys(bfJson).length != 0) {
			if (bfJson.flowColor) {
	            flowColor = bfJson.flowColor;
	        }
	        if (bfJson.legendOnPoint) {
	            legendOnPoint = bfJson.legendOnPoint;
	        }
	    }
	};

	BarChartFlow.prototype.initializeData = function(data) {
		//
	};
	BarChartFlow.prototype.inPlaceUpdate = function(data) {
		//
    };

	BarChartFlow.prototype.getData = function() {
		return data;
	};
	BarChartFlow.prototype.getFlowColor = function() {
		return flowColor;
	};
	BarChartFlow.prototype.getLegendOnPoint = function() {
		return legendOnPoint;
	};

	return BarChartFlow;

}]);