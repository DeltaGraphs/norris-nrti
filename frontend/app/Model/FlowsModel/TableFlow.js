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
.factory('TableFlowFactory', ['FlowFactory', function(FlowFactory){

	function split(json) {
        var flowJson = {};
        var tableFlowJson = {};

        if(json !== undefined) {
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
    	this._data = [];
		this._maxItem = 100;

		var json = split(info);
		var fJson = json.flowJson;
		var tfJson = json.tableFlowJson;

		this._flow = FlowFactory.build(fJson);

        if (tfJson.maxItem !== undefined) {
            this._maxItem = tfJson.maxItem;
        }
	}

	TableFlow.prototype.updateParameters = function(info) { // abstract
		if (info !== undefined) {
	    	var json = split(info);
			var fJson = json.flowJson;
			var tfJson = json.tableFlowJson;

			if (Object.keys(fJson).length !== 0) {
				this._flow.updateParameters(fJson);
			}

			if (Object.keys(tfJson).length !== 0) {
		        if (tfJson.maxItem !== undefined) {
		            this._maxItem = tfJson.maxItem;
		        }
		    }
		}
	};

	TableFlow.prototype.initializeData = function(newData) {
		for (var i=0; i<newData.records.length; i++) {
			this._data.push(newData.records[i]);
		}
	};
	TableFlow.prototype.inPlaceUpdate = function(newData) {
		for (var i = 0; i<this._data.length; i++){
            if (this._data[i].NorrisRecordID === newData.NorrisRecordID){
                this._data[i] = { 'NorrisRecordID' : newData.NorrisRecordID, 'value' : newData.value };
            }
        }
    };
    TableFlow.prototype.streamUpdate = function(newData) {
		this.initializeData(newData);
    };

    TableFlow.prototype.getName = function() {
    	return this._flow.getName();
    };
	TableFlow.prototype.getData = function() {
		return this._data;
	};
	TableFlow.prototype.getMaxItem = function() {
		return this._maxItem;
	};

	function TableFlowFactory() {}

	TableFlowFactory.build = function(info) {
		return new TableFlow(info);
	};

	return TableFlowFactory;

}]);