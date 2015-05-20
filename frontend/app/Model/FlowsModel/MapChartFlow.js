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
.factory('MapChartFlow', ['Flow', function(Flow){
	var data = [];
	var marker = null;
	var maxItem = 100;
	var trace = null;

	MapChartFlow.prototype = Object.create(Flow.prototype);
	MapChartFlow.prototype.constructor = MapChartFlow;
	MapChartFlow.prototype.parent = Flow.prototype;

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
		var json = split(info);
		var fJson = json.flowJson;
		var mfJson = json.mapFlowJson;

		this.parent.constructor.call(this, fJson);

		if (Object.keys(mfJson).length !== 0) {
	        if (mfJson.marker !== undefined) {
	            marker = mfJson.marker;
	        }
	        if (mfJson.maxItem !== undefined) {
	            maxItem = mfJson.maxItem;
	        }
	        if (mfJson.trace !== undefined) {
	        	trace = mfJson.trace;
	        }
 	    }
	}

	MapChartFlow.prototype.updateParameters = function(info) { //abstract
		if (info !== undefined) {
	    	var json = split(info);
			var fJson = json.flowJson;
			var mfJson = json.mapFlowJson;

			this.parent.updateParameters.call(this, fJson);
	
			if (Object.keys(mfJson).length !== 0) {
				if (mfJson.marker !== undefined) {
		            marker = mfJson.marker;
		        }
		        if (mfJson.maxItem !== undefined) {
		            maxItem = mfJson.maxItem;
		        }
		        if (mfJson.trace !== undefined) {
	        		trace = mfJson.trace;
	        	}
		    }
		}
	};

	MapChartFlow.prototype.initializeData = function(newData) {
		for (var i=0; i<newData.records.length; i++) {
			data.push(newData.records[i]);
		}
	};
	MapChartFlow.prototype.inPlaceUpdate = function(newData) {
		for (var i = 0; i<data.length; i++){
            if (data[i].NorrisRecordID === newData.NorrisRecordID){
                data[i] = { 'NorrisRecordID' : newData.NorrisRecordID, 'value' : newData.value };
            }
        }
    };
	MapChartFlow.prototype.streamUpdate = function(newData) {
		this.initializeData(newData);
    };
    MapChartFlow.prototype.deleteData = function(delData) {
    	for (var i = 0; i<data.length; i++){
            if (data[i].NorrisRecordID === delData.NorrisRecordID){
                data.splice(i,1);
            }
        }
    };

	MapChartFlow.prototype.getData = function() {
		return data;
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