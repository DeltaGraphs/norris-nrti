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
	        if (json.interpolation !== undefined) {
	            lineFlowJson.interpolation = json.interpolation;
	        }
	        if (json.area !== undefined) {
	            lineFlowJson.area = json.area;
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
		this._data = [];
		this._flowColor = '#000';
		this._marker = 'square';
		this._interpolation = 'linear';
		this._areaColor = '#FFF';
		this._maxItem = 20;

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
	        if (lfJson.interpolation !== undefined) {
	            this._interpolation = lfJson.interpolation;
	        }
	        if (lfJson.area !== undefined) {
	            this._areaColor = lfJson.area;
	        }
	        if (lfJson.maxItem !== undefined) {
	            this._maxItem = lfJson.maxItem;
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
		        if (lfJson.interpolation !== undefined) {
		            this._interpolation = lfJson.interpolation;
		        }
		        if (lfJson.area !== undefined) {
		            this._areaColor = lfJson.area;
		        }
		        if (lfJson.maxItem !== undefined) {
		            this._maxItem = lfJson.maxItem;
		        }
		    }
		}
	};

	LineChartFlow.prototype.initializeData = function(newData) {
		for (var i=0; i<newData.records.length; i++) {
			this._data.push(newData.records[i]);
		}
	};
	LineChartFlow.prototype.emptyData = function() {
		this._data.splice(0);
	};
	LineChartFlow.prototype.inPlaceUpdate = function(newData) {
		for (var i = 0; i<this._data.length; i++){
            if (this._data[i].NorrisRecordID === newData.NorrisRecordID){
                this._data[i] = { 'NorrisRecordID' : newData.NorrisRecordID, 'value' : newData.value };
            }
        }
    };
	LineChartFlow.prototype.streamUpdate = function(newData) {
		this.initializeData(newData);
    };
    LineChartFlow.prototype.deleteData = function(delData) {
    	for (var i = 0; i<this._data.length; i++){
            if (this._data[i].NorrisRecordID === delData.NorrisRecordID){
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
	LineChartFlow.prototype.getInterpolation = function() {
		return this._interpolation;
	};
	LineChartFlow.prototype.getAreaColor = function() {
		return this._areaColor;
	};
	LineChartFlow.prototype.getMaxItem = function() {
		return this._maxItem;
	};

	function LineChartFlowFactory() {}

	LineChartFlowFactory.build = function(info){
		return new LineChartFlow(info);
	};

	return LineChartFlowFactory;
}]);