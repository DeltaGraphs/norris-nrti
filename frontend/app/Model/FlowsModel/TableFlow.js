/*jshint node: true */
'use strict';

/*
* Name :  TableFlow.js
* Module : FrontEnd::Model::FlowsModel
* Location : /frontend/app/Model/FlowsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.2         2015-05-18  Maria Giovanna Chinellato	Modified general structure, some fixes
*
* 0.1.1         2015-05-15  Maria Giovanna Chinellato	Various fix
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add attributes and methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

angular.module("services")
.factory('TableFlow', ['Flow', function(Flow){

	var data = [];
	var maxItem;

	function split(json) {
        var flowJson = {};
        if (json.dataFormat !== undefined) {
            flowJson.dataFormat = json.dataFormat;
        }
        if (json.name !== undefined) {
            flowJson.name = json.name;
        }

        var tableFlowJson = {};
        if (json.maxItem !== undefined) {
            tableFlowJson.maxItem = json.maxItem;
        }

        return {
            "flowJson" : flowJson,
            "tableFlowJson" : tableFlowJson
        };
    }

    function TableFlow(info) {
    	if (info !== undefined) {
			var json = split(info);
			var fJson = json.flowJson;
			var tfJson = json.tableFlowJson;

			this.parent.constructor.call(this, fJson);

	        if (tfJson.maxItem !== undefined) {
	            maxItem = tfJson.maxItem;
	        }
	    }

	}

	TableFlow.prototype = Object.create(Flow.prototype);
	TableFlow.prototype.constructor = TableFlow;
	TableFlow.prototype.parent = Flow.prototype;

	TableFlow.prototype = {
		updateParameters : function(info) { // abstract
			if (info !== undefined) {
		    	var json = split(info);
				var fJson = json.flowJson;
				var mfJson = json.mapFlowJson;

				if (Object.keys(fJson).length !== 0) {
					Flow.apply(this, fJson);
				}

				if (Object.keys(mfJson).length !== 0) {
			        if (mfJson.maxItem) {
			            maxItem = mfJson.maxItem;
			        }
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

		getData : function() {
			return data;
		},
		getMaxItem : function() {
			return maxItem;
		}
	};

	return( TableFlow );

}]);