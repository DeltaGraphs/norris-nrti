/*jshint node: true */
'use strict';

/*
* Name :  LineChart.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.2.2			2015-05-15	Francesco Rossetto			Various fix, insert inzializeData
*
* 0.2.1         2015-05-15  Maria Giovanna Chinellato	Fix all methods
*
* 0.2.0         2015-05-13  Maria Giovanna Chinellato	Add all methods
*
* 0.1.0         2015-05-13  Francesco Rossetto   		Add all attributes and some methods
*
* 0.0.1         2015-05-13  Francesco Rossetto			Initial code      
* ===============================================================================================================
*
*/

app.factory('LineChart', ['Graph', 'Axis', 'ViewFinder', 'LineChartFlow', function(Graph, Axis, ViewFinder, LineChartFlow){
	var axisX = null;
	var axisY = null;
	var viewFinder = null;
	var enabledViewFinder = false;
	var background = "#FFF";

	function split(json) {
		var graphJson = {};
		if (json.title) {
			graphJson.title = json.title;
		}
		if (json.height) {
			graphJson.height = json.height;
		}
		if (json.width) {
			graphJson.width = json.width;
		}
		if (json.enabledLegend !== null) {
			graphJson.enabledLegend = json.enabledLegend;
			if (enabledLegend && json.legend) {
				graphJson.legend = json.legend;
			}
		}
		if (json.horizontalGrid !== null) {
			graphJson.horizontalGrid = json.horizontalGrid;
		}
		if (json.verticalGrid !== null) {
			graphJson.verticalGrid = json.verticalGrid;
		}

		var lineJson = {};
		if (json.axisX) {
			lineJson.axisX = json.axisX;
		}
		if (json.axisY) {
			lineJson.axisY = json.axisY;
		}
		if (json.enabledViewFinder !== null) {
			lineJson.enabledViewFinder = json.enabledViewFinder;
			if (enabledViewFinder && json.viewFinder) {
				lineJson.viewFinder = json.viewFinder;
			}
		}
		if (json.background) {
			lineJson.background = json.background;
		}

		return {
			"graphJson" : graphJson,
			"lineJson" : lineJson
		};
	};
	LineChart.prototype.test = function _Test(expressionStr) { return eval(expressionStr); }

    // create our new custom object that reuse the original object constructor
    var LineChart = function(info) {
        Graph.apply(this, info); // info has only title and url
    };

    // reuse the original object prototype
	LineChart.prototype = new Graph();

    // Now let's override our method
    LineChart.prototype.updateParameters = function(info) {
    	var json = split(info);
    	var gJson = json.graphJson;
    	var lJson = json.lineJson;
    	if (Object.keys(gJson).length !== 0) {
    		Graph.apply(this, gJson);
    	}
    	if (Object.keys(lJson).length !== 0) {
    		if (lJson.axisX) {
    			axisX = new Axis(lJson.axisX);
			}
			if (lJson.axisY) {
	       		axisY = new Axis(lJson.axisY);
	       	}
	       	if (lJson.enabledViewFinder !== null) {
        		enabledViewFinder = lJson.enabledViewFinder;
        		if (enabledViewFinder) {
	           		viewFinder = new ViewFinder(lJson.viewFinder);
	           	}
	        }
	        if (lJson.background) {
        		background = lJson.background;
        	}
    	}
    	if (info.flows) {
    		for (var i=0; i<info.flows.length; i++) {
    			var newflow = new LineChartFlow(info.flows[i]);
    			LineChart.prototype.addFlow(flows[i].ID,newflow);
    		}
    	}
    };

    LineChart.prototype.addFlow = function(ID,flow) {
    	if (typeof flow === 'LineChartFlow') {
    		Graph.prototype.addFlow.call(this, ID, flow);
    	}
    };

    LineChart.prototype.initializeData = function(data) {  //inizialization data of flows
    	for (var i=0; i<data.length; i++) {
    		flowList[data[i].ID].inizializeData(data[i].records);
    	}
    };
    
    // update data
    LineChart.prototype.inPlaceUpdate = function(data) {
    	flowList[data.ID].inPlaceUpdate(data.records);
    };
    LineChart.prototype.streamUpdate = function(data) {
    	flowList[data.ID].streamUpdate(data.records);
    };

    // get method
    LineChart.prototype.getX = function() {
    	return axisX;
    };
    LineChart.prototype.getY = function() {
    	return axisY;
    };
    LineChart.prototype.getViewFinder = function() {
    	if (enabledViewFinder) {
    		return viewFinder;
    	}
    };
    LineChart.prototype.getBackground = function() {
    	return background;
    };

    return LineChart;
}]);