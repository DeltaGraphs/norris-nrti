/*
* Name :  LineChart.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.1.1         2015-05-15  Maria Giovanna Chinellato	Fix all methods
*
* 0.1.0         2015-05-13  Maria Giovanna Chinellato	Add all methods
*
* 0.0.2         2015-05-13  Francesco Rossetto   		Add all attributes and some methods
*
* 0.0.1         2015-05-13  Francesco Rossetto			Initial code      
* ===============================================================================================================
*
*/

app.factory('LineChart', ['Graph', 'Axis', 'ViewFinder', 'LineChartFlow', function(Graph, Axis, ViewFinder, LineChartFlow){
	var axisX;
	var axisY;
	var viewFinder = null;
	var enabledViewFinder;
	var background;

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
		if (json.legend) {
			graphJson.legend = json.legend;
		}
		if (json.enabledLegend) {
			graphJson.enabledLegend = json.enabledLegend;
		}
		if (json.horizontalGrid) {
			graphJson.horizontalGrid = json.horizontalGrid;
		}
		if (json.verticalGrid) {
			graphJson.verticalGrid = json.verticalGrid;
		}
		if (json.url) {
			graphJson.url = json.url;
		}

		var lineJson = {};
		if (json.axisX) {
			lineJson.axisX = json.axisX;
		}
		if (json.axisY) {
			lineJson.axisY = json.axisY;
		}
		if (json.viewFinder) {
			lineJson.viewFinder = json.viewFinder;
		}
		if (json.enabledViewFinder) {
			lineJson.enabledViewFinder = json.enabledViewFinder;
		}
		if (json.background) {
			lineJson.background = json.background;
		}

		return {
			"graphJson" : graphJson,
			"lineJson" : lineJson
		}
	}

    // create our new custom object that reuse the original object constructor
    var LineChart = function(info) {
        Graph.apply(this, info); // info has only title and url
    };

    // reuse the original object prototype
	LineChart.prototype = new Graph();

    // Now let's override our original updateParameters method
    LineChart.prototype.updateParameters = function(info) {
    	json = json = split(info);
    	gJson = json.graphJson;
    	lJson = json.lineJson;
    	if (Object.keys(gJson).length != 0) {
    		Graph.apply(this, gJson);
    	}
    	if (Object.keys(lJson).length != 0) {
    		if (lJson.axisX) {
    			axisX = new Axis(lJson.axisX);
			}
			if (lJson.axisY) {
	       		axisY = new Axis(lJson.axisY);
	       	}
	       	if (lJson.enabledViewFinder != null) {
        		enabledViewFinder = lJson.enabledViewFinder;
        		if (enabledViewFinder) {
	           		viewFinder = new ViewFinder(lJson.viewFinder);
	           	}
	        }
	        if (lJson.background) {
        		background = lJson.background;
        	}
    	}
    };

    LineChart.prototype.addFlow = function(flow) {
    	if (typeof flow === 'LineChartFlow'){
    		var newflow = new LineChartFlow(flow);
    		Graph.prototype.addFlow.call(this, flow.ID, newflow);
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
    LineChart.prototype.getBackground() {
    	return background;
    };

    return LineChart;
}]);