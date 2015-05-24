/*jshint node: true */
'use strict';

/*
* Name :  MapChartFlow.js
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
.factory('MapChartFlowFactory', ['FlowFactory', function(FlowFactory){

	function split(json) {
        var flowJson = {};
        var mapFlowJson = {};

        if (json !== undefined) {
	        if (json.name !== undefined) {
	            flowJson.name = json.name;
	        }

	        if (json.marker !== undefined) {
	            mapFlowJson.marker = json.marker;
	        }
	        if (json.maxItem !== undefined) {
	            mapFlowJson.maxItem = json.maxItem;
	        }
	        if (json.trace !== undefined) {
	            mapFlowJson.trace = json.trace;
	        }
	    }

        return {
            'flowJson' : flowJson,
            'mapFlowJson' : mapFlowJson
        };
    }

    //MapChartFlow.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    function MapChartFlow(info) {
    	this._data = [];
		this._marker = null;
		this._maxItem = 100;
		this._trace = null;

		var json = split(info);
		var fJson = json.flowJson;
		var mfJson = json.mapFlowJson;

		this._flow = FlowFactory.build(fJson);

		if (Object.keys(mfJson).length !== 0) {
	        if (mfJson.marker !== undefined) {
	            this._marker = mfJson.marker;
	        }
	        if (mfJson.maxItem !== undefined) {
	            this._maxItem = mfJson.maxItem;
	        }
	        if (mfJson.trace !== undefined) {
	        	this._trace = mfJson.trace;
	        }
 	    }
	}

	MapChartFlow.prototype.updateParameters = function(info) { //abstract
		if (info !== undefined) {
	    	var json = split(info);
			var fJson = json.flowJson;
			var mfJson = json.mapFlowJson;

			this._flow = FlowFactory.build(fJson);
			this._flow.updateParameters(fJson);
	
			if (Object.keys(mfJson).length !== 0) {
				if (mfJson.marker !== undefined) {
		            this._marker = mfJson.marker;
		        }
		        if (mfJson.maxItem !== undefined) {
		            this._maxItem = mfJson.maxItem;
		        }
		        if (mfJson.trace !== undefined) {
	        		this._trace = mfJson.trace;
	        	}
		    }
		}
	};

	MapChartFlow.prototype.initializeData = function(newData) {
		for (var i=0; i<newData.records.length; i++) {
			this._data.push(newData.records[i]);
		}
	};
	MapChartFlow.prototype.inPlaceUpdate = function(newData) {
		for (var i = 0; i<this._data.length; i++){
            if (this._data[i].NorrisRecordID === newData.NorrisRecordID){
                this._data[i] = { 'NorrisRecordID' : newData.NorrisRecordID, 'value' : newData.value };
            }
        }
    };
	MapChartFlow.prototype.streamUpdate = function(newData) {
		this.initializeData(newData);
    };
    MapChartFlow.prototype.deleteData = function(delData) {
    	for (var i = 0; i<data.length; i++){
            if (this._data[i].NorrisRecordID === delData.NorrisRecordID){
                this._data.splice(i,1);
            }
        }
    };

    MapChartFlow.prototype.getName = function() {
    	return this._flow.getName();
    };
	MapChartFlow.prototype.getData = function() {
		return this._data;
	};
	MapChartFlow.prototype.getMarker = function() {
		return this._marker;
	};
	MapChartFlow.prototype.getMaxItem = function() {
		return this._maxItem;
	};
	MapChartFlow.prototype.getTrace = function() {
		return this._trace;
	};

	function MapChartFlowFactory() {}

	MapChartFlowFactory.build = function(info) {
		return new MapChartFlow(info);
	};

	return MapChartFlowFactory;

}]);