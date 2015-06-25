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
* 1.0.1         2015-06-25  Maria Giovanna Chinellato	Fix initializeData
*
* 1.0.0         2015-05-22  Maria Giovanna Chinellato	Tested
*
* 0.2.0         2015-05-16  Maria Giovanna Chinellato	Modified general structure, some fixes
*
* 0.1.1         2015-05-15  Maria Giovanna Chinellato	Various fix
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add attributes and methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

angular.module('norris-nrti')
.factory('TableFlowFactory', ['FlowFactory', function(FlowFactory){

	function split(json) {
        var flowJson = {};
        var tableFlowJson = {};

        if(json !== undefined) {
	        if (json.name !== undefined) {
	            flowJson.name = json.name;
	        }

	        if (json.maxItems !== undefined) {
	            tableFlowJson.maxItems = json.maxItems;
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
		this._maxItems = null;

		var json = split(info);
		var fJson = json.flowJson;
		var tfJson = json.tableFlowJson;

		this._flow = FlowFactory.build(fJson);

        if (tfJson.maxItems !== undefined) {
            this._maxItems = tfJson.maxItems;
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
		        if (tfJson.maxItems !== undefined) {
		            this._maxItems = tfJson.maxItems;
		        }
		    }
		}
	};

	TableFlow.prototype.initializeData = function(newData, addRowOn) {
		for (var i=0; i<newData.records.length; i++) {
			if (this._maxItems === null || this._data.length < this._maxItems){
				if (addRowOn === 'bottom') {
					this._data.push(newData.records[i]);
				} else if (addRowOn === 'top') {
					this._data.unshift(newData.records[i]);
				}
			}
			else{
				if (addRowOn === 'bottom') {
					this._data.splice(0,1);
					this._data.push(newData.records[i]);
				} else if (addRowOn === 'top') {
					this._data.splice(this._data.length-1,1);
					this._data.unshift(newData.records[i]);
				}
			}
		}
	};
	TableFlow.prototype.emptyData = function() {
		this._data.splice(0);
	};
	TableFlow.prototype.inPlaceUpdate = function(newData) {
		for (var i = 0; i<this._data.length; i++){
            if (this._data[i].norrisRecordID === newData.norrisRecordID){
                this._data[i] = { 'norrisRecordID' : newData.norrisRecordID, 'value' : newData.value };
            }
        }
    };
    TableFlow.prototype.streamUpdate = function(newData, addRowOn) {
		this.initializeData(newData, addRowOn);
    };
    TableFlow.prototype.deleteData = function(delData) {
    	for (var i = 0; i<this._data.length; i++){
            if (this._data[i].norrisRecordID === delData.norrisRecordID){
                this._data.splice(i,1);
            }
        }
    };

    TableFlow.prototype.getName = function() {
    	return this._flow.getName();
    };
	TableFlow.prototype.getData = function() {
		return this._data;
	};
	TableFlow.prototype.getMaxItem = function() {
		return this._maxItems;
	};

	function TableFlowFactory() {}

	TableFlowFactory.build = function(info) {
		return new TableFlow(info);
	};

	return TableFlowFactory;

}]);