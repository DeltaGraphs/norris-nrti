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
* 0.2.0			2015-05-18	Francesco Rossetto			Modified general structure, some fixes
*
* 0.1.1         2015-05-15  Maria Giovanna Chinellato	Various fixes
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add attributes and methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

angular.module('services')
.factory('BarChartFlow', ['Flow', function(Flow){
	var data = [];
	var flowColor = '#000';
	var legendOnPoint = null;

	BarChartFlow.prototype = Object.create(Flow.prototype);
	BarChartFlow.prototype.constructor = BarChartFlow;
	BarChartFlow.prototype.parent = Flow.prototype;

	function split(json) {
        var flowJson = {};
        if (json.dataFormat !== undefined) {
            flowJson.dataFormat = json.dataFormat;
        }
        if (json.name !== undefined) {
            flowJson.name = json.name;
        }

        var barFlowJson = {};
        if (json.flowColor !== undefined) {
            barFlowJson.flowColor = json.flowColor;
        }
        if (json.legendOnPoint !== undefined) {
            barFlowJson.legendOnPoint = json.legendOnPoint;
        }

        return {
            'flowJson' : flowJson,
            'barFlowJson' : barFlowJson
        };
    }

    //BarChartFlow.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    function BarChartFlow(info) {
		var json = split(info);
		var fJson = json.flowJson;
		var bfJson = json.barFlowJson;
		
		this.parent.constructor.call(this, fJson);

		if (bfJson.flowColor !== undefined) {
            flowColor = bfJson.flowColor;
        }
        if (bfJson.legendOnPoint !== undefined) {
            legendOnPoint = bfJson.legendOnPoint;
        }
	}

	BarChartFlow.prototype.updateParameters = function(info) {
		if (info !== undefined) {
	    	var json = split(info);
			var fJson = json.flowJson;
			var bfJson = json.barFlowJson;

			this.parent.updateParameters.call(this, fJson);

			if (Object.keys(bfJson).length !== 0) {
				if (bfJson.flowColor !== undefined) {
		            flowColor = bfJson.flowColor;
		        }
		        if (bfJson.legendOnPoint !== undefined) {
		            legendOnPoint = bfJson.legendOnPoint;
		        }
		    }
	    }
	    return this;
	};

	BarChartFlow.prototype.initializeData = function(newData) {
		for (var i=0; i<newData.records.length; i++) {
			data.push(newData.records[i]);
		}
		return this;
	};
	BarChartFlow.prototype.inPlaceUpdate = function(newData) {
        for (var i = 0; i<data.length; i++){
            if (data[i].NorrisRecordID === newData.NorrisRecordID){
                data[i] = { 'NorrisRecordID' : newData.NorrisRecordID, 'value' : newData.value };
            }
        }
        return this;
		/*var filteredData = data.filter(function(newData) {return newData.NorrisRecordID === data.NorrisRecordID;});
	    if (filteredData.length > 0) {
	    	filteredData[0] = { 'NorrisRecordID' : newData.NorrisRecordID, 'value' : newData.value}; //funziona in stile riferimenti??
		}
		return this;*/
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