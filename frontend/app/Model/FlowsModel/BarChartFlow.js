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

angular.module('app')
.factory('BarChartFlowFactory', ['FlowFactory', function(FlowFactory){

	function split(json) {
        var flowJson = {};
        var barFlowJson = {};

        if (json !== undefined){
	        if (json.name !== undefined) {
	            flowJson.name = json.name;
	        }

	        if (json.flowColor !== undefined) {
	            barFlowJson.flowColor = json.flowColor;
	        }
	    }

        return {
            'flowJson' : flowJson,
            'barFlowJson' : barFlowJson
        };
    }

    //BarChartFlow.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    function BarChartFlow(info) {
    	this._data = [];
		this._flowColor = '#000';
		this._flow = null;

		var json = split(info);
		var fJson = json.flowJson;
		var bfJson = json.barFlowJson;

		this._flow = FlowFactory.build(fJson);

		if (bfJson.flowColor !== undefined) {
            this._flowColor = bfJson.flowColor;
        }
	}

	BarChartFlow.prototype.updateParameters = function(info) {
    	var json = split(info);
		var fJson = json.flowJson;
		var bfJson = json.barFlowJson;

		this._flow.updateParameters(fJson);

		if (Object.keys(bfJson).length !== 0) {
			if (bfJson.flowColor !== undefined) {
	            this._flowColor = bfJson.flowColor;
	        }
	    }
	};

	BarChartFlow.prototype.initializeData = function(newData) {
		for (var i=0; i<newData.records.length; i++) {
			this._data.push(newData.records[i]);
		}
	};
	BarChartFlow.prototype.inPlaceUpdate = function(newData) {
        for (var i = 0; i<this._data.length; i++){
            if (this._data[i].NorrisRecordID === newData.NorrisRecordID){
                this._data[i] = { 'NorrisRecordID' : newData.NorrisRecordID, 'value' : newData.value };
            }
        }
    };

    BarChartFlow.prototype.getName = function() {
    	return this._flow.getName();
    };
	BarChartFlow.prototype.getData = function() {
		return this._data;
	};
	BarChartFlow.prototype.getFlowColor = function() {
		return this._flowColor;
	};

    function BarChartFlowFactory(){}

    BarChartFlowFactory.build = function(info) {
        return new BarChartFlow(info);
    };

	return BarChartFlowFactory;

}]);