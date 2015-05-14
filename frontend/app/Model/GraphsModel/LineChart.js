/*
* Name :  LineChart.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.1.0         2015-05-13  Francesco Rossetto   		Codifica di tutti gli attributi e alcuni dei metodi
*
* 0.0.1         2015-05-13  Francesco Rossetto			Creazione file      
* ===============================================================================================================
*
*/

app.factory('LineChart', ['Graph', 'Axis', 'ViewFinder', function(Graph, Axis, ViewFinder){
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
			graphJson.axisX = json.axisX;
		}
		if (json.axisY) {
			graphJson.axisY = json.axisY;
		}
		if (json.viewFinder) {
			graphJson.viewFinder = json.viewFinder;
		}
		if (json.enabledViewFinder) {
			graphJson.enabledViewFinder = json.enabledViewFinder;
		}
		if (json.background) {
			graphJson.background = json.background;
		}

		return {
			"graphJson" : graphJson,
			"lineJson" : lineJson
		}
	}

    // create our new custom object that reuse the original object constructor
    var LineChart = function(info) {
    	json = split(info);
    	gJson = json.graphJson;
    	lJson = json.lineJson;
        Graph.apply(this, gJson);

        axisX = new Axis(lJson.axisX);
		axisY = new Axis(lJson.axisY);
		enabledViewFinder = lJson.enabledViewFinder;
		if (enabledViewFinder != null) {
			viewFinder = new ViewFinder(lJson.viewFinder);
		}
		background = lJson.background;
    };

    // reuse the original object prototype
	LineChart.prototype = new Graph();

    // Now let's override our original updateParameters method
    LineChart.prototype.updateParameters = function(info) {
    	json = json = split(info);
    	gJson = json.graphJson;
    	lJson = json.lineJson;
    	if (Object.keys(gJson).length != 0) {
    		//chiamata super a graph
    	} 
    	//........
    };
    return LineChart;
});