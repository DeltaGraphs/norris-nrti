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
* 0.2.0         2015-05-18  Maria Giovanna Chinellato	Modified general structure, some fixes
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

angular.module('app')
.factory('LineChartFlow', ['Flow', function(Flow){

	var data = [];
	var flowColor = '#000';
	var legendOnPoint = '';
	var marker = 'square';
	var interpolation = 'linear';
	var areaColor = '#FFF';
	var maxItem = 20;

	LineChartFlow.prototype = Object.create(Flow.prototype);
	LineChartFlow.prototype.constructor = LineChartFlow;
	LineChartFlow.prototype.parent = Flow.prototype;

	function split(json) {
        var flowJson = {};
        var lineFlowJson = {};

        if (json !== undefined) {
	        if (json.dataFormat !== undefined) {
	            flowJson.dataFormat = json.dataFormat;
	        }
	        if (json.name !== undefined) {
	            flowJson.name = json.name;
	        }

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
	    }

        return {
            'flowJson' : flowJson,
            'lineFlowJson' : lineFlowJson
        };
    }

    //LineChartFlow.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

	function LineChartFlow(info) {
		var json = split(info);
		var fJson = json.flowJson;
		var lfJson = json.lineFlowJson;

		this.parent.constructor.call(this, fJson);

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

	LineChartFlow.prototype.updateParameters = function(info) { //abstract
		if (info !== undefined) {
	    	var json = split(info);
			var fJson = json.flowJson;
			var lfJson = json.lineFlowJson;

			this.parent.updateParameters.call(this, fJson);

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
	};

	LineChartFlow.prototype.initializeData = function(newData) {
		for (var i=0; i<newData.records.length; i++) {
			data.push(newData.records[i]);
		}
	};
	LineChartFlow.prototype.inPlaceUpdate = function(newData) {
		for (var i = 0; i<data.length; i++){
            if (data[i].NorrisRecordID === newData.NorrisRecordID){
                data[i] = { 'NorrisRecordID' : newData.NorrisRecordID, 'value' : newData.value };
            }
        }
    };
	LineChartFlow.prototype.streamUpdate = function(newData) {
		this.initializeData(newData);
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

	return( LineChartFlow );
}]);