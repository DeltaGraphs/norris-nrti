/*
* Name :  LineChartFlow.js
* Module : FrontEnd::Model::FlowsModel
* Location : /frontend/app/Model/FlowsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add attributes and methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

app.factory('TableFlow', function(){
	var data = new Array();
	var maxItem;

	function split(json) {
        var flowJson = {};
        if (json.dataFormat) {
            flowJson.dataFormat = json.dataFormat;
        }
        if (json.name) {
            flowJson.name = json.name;
        }

        var tableFlowJson = {};
        // data
        if (json.maxItem) {
            tableFlowJson.maxItem = json.maxItem;
        }

        return {
            "flowJson" : flowJson,
            "tableFlowJson" : tableFlowJson
        }
    }

    var TableFlow = function(info) {
		var json = split(info);
		var fJson = json.flowJson;
		var tfJson = json.tableFlowJson;

		Flow.apply(this, fJson);
		// data
        if (tfJson.maxItem) {
            maxItem = tfJson.maxItem;
        }

	};

	TableFlow.prototype.updateParameters = function(info) { //abstract
    	var json = split(info);
		var fJson = json.flowJson;
		var mfJson = json.mapFlowJson;

		if (Object.keys(fJson).length != 0) {
			Flow.apply(this, fJson);
		}

		if (Object.keys(mfJson).length != 0) {
	        if (mfJson.maxItem) {
	            maxItem = mfJson.maxItem;
	        }
	    }
	};

	TableFlow.prototype.inPlaceUpdate = function(data) {
		//
    };
    TableFlow.prototype.streamUpdate = function(data) {
    	//
    };

	TableFlow.prototype.getData = function() {
		return data;
	};
	TableFlow.prototype.getMaxItem = function() {
		return maxItem;
	};

	return TableFlow;

}]);