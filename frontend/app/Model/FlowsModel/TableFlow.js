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
* 0.2.0         2015-05-18  Maria Giovanna Chinellato	Modified general structure, some fixes
*
* 0.1.1         2015-05-15  Maria Giovanna Chinellato	Various fix
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add attributes and methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

angular.module('app')
.factory('TableFlow', ['Flow', function(Flow){

	var data = [];
	var maxItem = 100;

	TableFlow.prototype = Object.create(Flow.prototype);
	TableFlow.prototype.constructor = TableFlow;
	TableFlow.prototype.parent = Flow.prototype;

	function split(json) {
        var flowJson = {};
        var tableFlowJson = {};

        if(json !== undefined) {
	        if (json.dataFormat !== undefined) {
	            flowJson.dataFormat = json.dataFormat;
	        }
	        if (json.name !== undefined) {
	            flowJson.name = json.name;
	        }

	        
	        if (json.maxItem !== undefined) {
	            tableFlowJson.maxItem = json.maxItem;
	        }
	    }

        return {
            'flowJson' : flowJson,
            'tableFlowJson' : tableFlowJson
        };
    }

    //TableFlow.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    function TableFlow(info) {
		var json = split(info);
		var fJson = json.flowJson;
		var tfJson = json.tableFlowJson;

		this.parent.constructor.call(this, fJson);

        if (tfJson.maxItem !== undefined) {
            maxItem = tfJson.maxItem;
        }
	}

	TableFlow.prototype.updateParameters = function(info) { // abstract
		if (info !== undefined) {
	    	var json = split(info);
			var fJson = json.flowJson;
			var mfJson = json.mapFlowJson;

			if (Object.keys(fJson).length !== 0) {
				this.parent.updateParameters.call(this, fJson);
			}

			if (Object.keys(mfJson).length !== 0) {
		        if (mfJson.maxItem !== undefined) {
		            maxItem = mfJson.maxItem;
		        }
		    }
		}
	};

	TableFlow.prototype.initializeData = function(newData) {
		for (var i=0; i<newData.records.length; i++) {
			data.push(newData.records[i]);
		}
	};
	TableFlow.prototype.inPlaceUpdate = function(newData) {
		for (var i = 0; i<data.length; i++){
            if (data[i].NorrisRecordID === newData.NorrisRecordID){
                data[i] = { 'NorrisRecordID' : newData.NorrisRecordID, 'value' : newData.value };
            }
        }
    };
    TableFlow.prototype.streamUpdate = function(newData) {
		this.initializeData(newData);
    };

	TableFlow.prototype.getData = function() {
		return data;
	};
	TableFlow.prototype.getMaxItem = function() {
		return maxItem;
	};

	return( TableFlow );

}]);