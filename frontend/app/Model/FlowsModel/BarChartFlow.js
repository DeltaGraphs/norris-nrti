/*jshint node: true */
'use strict';

/*
* Name :  BarChartFlow.js
* Module : FrontEnd::Model::FlowsModel
* Location : /frontend/app/Model/FlowsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.1         2015-05-15  Maria Giovanna Chinellato	Various fix
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add attributes and methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

angular.module("services")
.factory('BarChartFlow', ['Flow', function(Flow){
	var data = [];
	var flowColor;
	var legendOnPoint;

	function split(json) {
        var flowJson = {};
        if (json.dataFormat) {
            flowJson.dataFormat = json.dataFormat;
        }
        if (json.name) {
            flowJson.name = json.name;
        }

        var barFlowJson = {};
        if (json.flowColor) {
            barFlowJson.flowColor = json.flowColor;
        }
        if (json.legendOnPoint) {
            barFlowJson.legendOnPoint = json.legendOnPoint;
        }

        return {
            "flowJson" : flowJson,
            "barFlowJson" : barFlowJson
        };
    }

    function BarChartFlow(info) {
    	if (info !== undefined) {
			var json = split(info);
			var fJson = json.flowJson;
			var bfJson = json.barFlowJson;
			
			this.parent.constructor.call(this, fJson);
			//Flow.apply(this, fJson);

			if (bfJson.flowColor) {
	            flowColor = bfJson.flowColor;
	        }
	        if (bfJson.legendOnPoint) {
	            legendOnPoint = bfJson.legendOnPoint;
	        }
        }
	};

	BarChartFlow.prototype = Object.create(Flow.prototype);
	BarChartFlow.prototype.constructor = BarChartFlow;
	BarChartFlow.prototype.parent = Flow.prototype;

	BarChartFlow.prototype = {
		
		updateParameters : function(info) {
	    	var json = split(info);
			var fJson = json.flowJson;
			var bfJson = json.barFlowJson;

			if (Object.keys(fJson).length !== 0) {
				Flow.apply(this, fJson);
			}

			if (Object.keys(bfJson).length !== 0) {
				if (bfJson.flowColor) {
		            flowColor = bfJson.flowColor;
		        }
		        if (bfJson.legendOnPoint) {
		            legendOnPoint = bfJson.legendOnPoint;
		        }
		    }
		};

		initializeData : function(data) {
			return data;
		};
		inPlaceUpdate : function(data) {
			return data;
	    };

		getData : function() {
			return data;
		};
		getFlowColor : function() {
			return flowColor;
		};
		getLegendOnPoint : function() {
			return legendOnPoint;
		};
	}

	return BarChartFlow;

}]);