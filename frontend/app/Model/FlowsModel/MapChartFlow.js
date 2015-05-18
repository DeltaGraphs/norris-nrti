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
* 0.1.1         2015-05-15  Maria Giovanna Chinellato	Various fix
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add attributes and methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

angular.module('services')
.factory('MapChartFlow', ['Flow', function(Flow){
	var data = [];
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
            'flowJson' : flowJson,
            'mapFlowJson' : mapFlowJson
        };
    }

    var MapChartFlow = function(info) {
    	if (info !== undefined) {
			var json = split(info);
			var fJson = json.flowJson;
			var mfJson = json.mapFlowJson;

			this.parent.constructor.call(this, fJson);

			if (mfJson.flowColor) {
	            flowColor = mfJson.flowColor;
	        }
	        if (mfJson.legendOnPoint) {
	            legendOnPoint = mfJson.legendOnPoint;
	        }
	        if (mfJson.marker) {
	            marker = mfJson.marker;
	        }
	        if (mfJson.maxItem) {
	            maxItem = mfJson.maxItem;
	        }
        }
	};

	MapChartFlow.prototype = {

		updateParameters : function(info) { //abstract
	    	var json = split(info);
			var fJson = json.flowJson;
			var mfJson = json.mapFlowJson;

			if (Object.keys(fJson).length !== 0) {
				Flow.apply(this, fJson);
			}

			if (Object.keys(mfJson).length !== 0) {
				if (mfJson.flowColor) {
		            flowColor = mfJson.flowColor;
		        }
		        if (mfJson.legendOnPoint) {
		            legendOnPoint = mfJson.legendOnPoint;
		        }
		        if (mfJson.marker) {
		            marker = mfJson.marker;
		        }
		        if (mfJson.maxItem) {
		            maxItem = mfJson.maxItem;
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
	    movieUpdate : function(data) {
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
		getMaxItem : function() {
			return maxItem;
		},
		getTrace : function() {
			return trace;
		},

	};

	return MapChartFlow;

}]);