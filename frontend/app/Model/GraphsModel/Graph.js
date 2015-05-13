/*
* Name :  Graph.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GrapshModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.2			2015-05-13	Francesco Rossetto			Effettuate piccole correzioni al costruttore e a addFLow
*
* 0.1.1			2015-05-12	Maria Giovanna Chinellato	Effettuate piccole correzioni agli attributi
*
* 0.1.0         2015-05-12  Francesco Rossetto   		Codifica di tutti gli attributi e i metodi
*
* 0.0.1         2015-05-12  Francesco Rossetto			Creazione file      
* =================================================================================================
*
*/

app.factory('Graph', ['Flow', 'Legend', function(Flow, Legend){
	var flowList = new Array();
	var title;
	var height;
	var width;
	var legend;
	var enabledLegend;
	var horizontalGrid;
	var verticalGrid;
	var url;

	var Graph = function(info) {
		title = info.title;
		height = info.height;
		width = info.width;
		enabledLegend = info.enabledLegend;
		if (enabledLegend) {
			legend = new Legend(info.legend);
		}
		horizontalGrid = info.horizontalGrid;
		verticalGrid = info.verticalGrid;
		url = info.url;
	};

	Graph.prototype.updateParameters = function(info) { //abstract
		if (info.title) {
			title = info.title;
		}
		if (info.height) {
			height = info.height;
		}
		if (info.width) {
			width = info.width;
		}
		if (info.legend) {
			legend = info.legend;
		}
		if (info.enabledLegend) {
			enabledLegend = info.enabledLegend;
		}
		if (info.horizontalGrid) {
			horizontalGrid = info.horizontalGrid;
		}
		if (info.verticalGrid) {
			verticalGrid = info.verticalGrid;
		}
		if (info.url) {
			url = info.url;
		}
	};
	Graph.prototype.addFlow = function(id, flow) { //abstract
		if (flowList[id] === null) {
			flowList[id] = flow;
		} else {
			//error
		}
	};
	Graph.prototype.deleteFlow = function(flowID) {
		delete flowList[flowID];
	};
	Graph.prototype.getTitle = function() {
		return title;
	};
	Graph.prototype.getHeight = function() {
		return height;
	};
	Graph.prototype.getWidth = function() {
		return width;
	};
	Graph.prototype.getLegend = function() {
		if (enabledLegend) {
			return legend;
		} else {
			return null;
		}
	};
	Graph.prototype.getHGrid = function() {
		return horizontalGrid;
	};
	Graph.prototype.getVGrid = function() {
		return verticalGrid;
	};
	Graph.prototype.getUrl = function() {
		return url;
	};
	return Graph;
});