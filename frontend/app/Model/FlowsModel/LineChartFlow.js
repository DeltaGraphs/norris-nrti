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
* 1.0.1         2015-06-25  Maria Giovanna Chinellato	Fix initializeData
*
* 1.0.0         2015-05-18  Maria Giovanna Chinellato	Tested
*
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

angular.module('norris-nrti')
.factory('LineChartFlowFactory', ['FlowFactory', function(FlowFactory){

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
	        if (json.marker !== undefined) {
	            lineFlowJson.marker = json.marker;
	        }
	        if (json.area !== undefined) {
	            lineFlowJson.area = json.area;
	        }
	        if (json.maxItems !== undefined) {
	            lineFlowJson.maxItems = json.maxItems;
	        }
	    }

        return {
            'flowJson' : flowJson,
            'lineFlowJson' : lineFlowJson
        };
    }

    //LineChartFlow.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

	function LineChartFlow(info) {
		this._data = [];
		this._flowColor = '#000';
		this._marker = 'square';
		this._area = false;
		this._maxItems = null;

		var json = split(info);
		var fJson = json.flowJson;
		var lfJson = json.lineFlowJson;

		this._flow = FlowFactory.build(fJson);

		if (Object.keys(lfJson).length !== 0) {
		
			if (lfJson.flowColor !== undefined) {
	            this._flowColor = lfJson.flowColor;
	        }
	        if (lfJson.marker !== undefined) {
	            this._marker = lfJson.marker;
	        }
	        if (lfJson.area !== undefined) {
	            this._area = lfJson.area;
	        }
	        if (lfJson.maxItems !== undefined) {
	            this._maxItems = lfJson.maxItems;
	        }
	    }
	}

	LineChartFlow.prototype.updateParameters = function(info) { //abstract
		if (info !== undefined) {
	    	var json = split(info);
			var fJson = json.flowJson;
			var lfJson = json.lineFlowJson;

			this._flow.updateParameters(fJson);

			if (Object.keys(lfJson).length !== 0) {
				if (lfJson.flowColor !== undefined) {
		            this._flowColor = lfJson.flowColor;
		        }
		        if (lfJson.marker !== undefined) {
		            this._marker = lfJson.marker;
		        }
		        if (lfJson.area !== undefined) {
		            this._area = lfJson.area;
		        }
		        if (lfJson.maxItems !== undefined) {
		            this._maxItems = lfJson.maxItems;
		        }
		    }
		}
	};

	LineChartFlow.prototype.initializeData = function(newData) {
		for (var i=0; i<newData.records.length; i++) {
			if (this._maxItems === null || this._data.length < this._maxItems){
				this._data.push(newData.records[i]);
			}
			else{
				this._data.splice(0,1);
				this._data.push(newData.records[i]);
			}
		}
	};
	LineChartFlow.prototype.emptyData = function() {
		this._data.splice(0);
	};
	LineChartFlow.prototype.inPlaceUpdate = function(newData) {
		for (var i = 0; i<this._data.length; i++){
            if (this._data[i].norrisRecordID === newData.norrisRecordID){
                this._data[i] = { 'norrisRecordID' : newData.norrisRecordID, 'value' : newData.value };
            }
        }
    };
	LineChartFlow.prototype.streamUpdate = function(newData) {
		this.initializeData(newData);
    };
    LineChartFlow.prototype.deleteData = function(delData) {
    	for (var i = 0; i<this._data.length; i++){
            if (this._data[i].norrisRecordID === delData.norrisRecordID){
                this._data.splice(i,1);
            }
        }
    };

    LineChartFlow.prototype.getName = function() {
    	return this._flow.getName();
    };
	LineChartFlow.prototype.getData = function() {
		return this._data;
	};
	LineChartFlow.prototype.getFlowColor = function() {
		return this._flowColor;
	};
	LineChartFlow.prototype.getMarker = function() {
		return this._marker;
	};
	LineChartFlow.prototype.getArea = function() {
		return this._area;
	};
	LineChartFlow.prototype.getMaxItem = function() {
		return this._maxItems;
	};

	function LineChartFlowFactory() {}

	LineChartFlowFactory.build = function(info){
		return new LineChartFlow(info);
	};

	return LineChartFlowFactory;
}]);