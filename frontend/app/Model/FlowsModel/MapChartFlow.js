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

angular.module('services')
.factory('MapChartFlow', ['Flow', function(Flow){
	var data = [];
	var flowColor = '#000';
	var legendOnPoint = null;
	var marker = 'circle';
	var maxItem = 100;
	var trace = null;

	function split(json) {
        var flowJson = {};
        if (json.dataFormat !== undefined) {
            flowJson.dataFormat = json.dataFormat;
        }
        if (json.name !== undefined) {
            flowJson.name = json.name;
        }

        var mapFlowJson = {};
        if (json.flowColor !== undefined) {
            mapFlowJson.flowColor = json.flowColor;
        }
        if (json.legendOnPoint !== undefined) {
            mapFlowJson.legendOnPoint = json.legendOnPoint;
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

        return {
            'flowJson' : flowJson,
            'mapFlowJson' : mapFlowJson
        };
    }

    function MapChartFlow(info) {
    	if (info !== undefined) {
			var json = split(info);
			var fJson = json.flowJson;
			var mfJson = json.mapFlowJson;

			this.parent.constructor.call(this, fJson);

			if (mfJson.flowColor !== undefined) {
	            flowColor = mfJson.flowColor;
	        }
	        if (mfJson.legendOnPoint !== undefined) {
	            legendOnPoint = mfJson.legendOnPoint;
	        }
	        if (mfJson.marker !== undefined) {
	            marker = mfJson.marker;
	        }
	        if (mfJson.maxItem !== undefined) {
	            maxItem = mfJson.maxItem;
	        }
        }
	}

	MapChartFlow.prototype = Object.create(Flow.prototype);
	MapChartFlow.prototype.constructor = MapChartFlow;
	MapChartFlow.prototype.parent = Flow.prototype;

	MapChartFlow.prototype = {

		updateParameters : function(info) { //abstract
			if (info !== undefined) {
		    	var json = split(info);
				var fJson = json.flowJson;
				var mfJson = json.mapFlowJson;

				if (Object.keys(fJson).length !== 0) {
					this.parent.updateParameters.call(this, fJson);
				}

				if (Object.keys(mfJson).length !== 0) {
					if (mfJson.flowColor !== undefined) {
			            flowColor = mfJson.flowColor;
			        }
			        if (mfJson.legendOnPoint !== undefined) {
			            legendOnPoint = mfJson.legendOnPoint;
			        }
			        if (mfJson.marker !== undefined) {
			            marker = mfJson.marker;
			        }
			        if (mfJson.maxItem !== undefined) {
			            maxItem = mfJson.maxItem;
			        }
			    }
			}
			return this;
		},

		initializeData : function(newData) {
			if (newData !== undefined) {
				for (var i=0, i<newData.records.length; i++) {
					data.push(newData.records[i]);
				}
			}
			return this;
		},
		inPlaceUpdate : function(newData) {
			if (newData !== undefined) {
				var filteredData = data.filter(function(newData.NorrisRecordID) {return newData.NorrisRecordID === data.NorrisRecordID;});
			    if(filteredData.length > 0) {
			    	filteredData[0] = newData; //funziona in stile riferimenti??
	    		}
			}
			return this;
	    },
		streamUpdate : function(newData) {
			this.prototype.initializeData(newData);
			return this;
	    },
	    deleteData : function() {
			if (data !== undefined) {
				var filteredFlows = flowList.filter(function(flowID) {return flowID === flowList.id;});
			    if(filteredFlows.length > 0) {
			    	filteredFlows.splice(0,1);
	    		}
			}
			return this;
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