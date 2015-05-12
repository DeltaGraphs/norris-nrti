/*
* Name :  Graph.js
* Module : FrontEnd::Model::GraphModel
* Location : /frontend/app/Model/GraphModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.0.1         2015-05-12  Rossetto Francesco			Creazione file      
*
* 0.1.0         2015-05-12  Rossetto Francesco   		Codifica di tutti gli attributi e i metodi
* =================================================================================================
*
*/

app.factory('Page', ['Graph', function(Graph){
	var flowList;
	var title;
	var height;
	var width;
	var legend;
	var enabledLegend;
	var horizontalGrid;
	var verticalGrid;
	var url;

	var Graph = function(info) {
		name = info.name;
		titile = info.title;
		height = info.height;
		width = info.width;
		legend = new Legend(info.legend);
		enabledLegend = info.enabledLegend;
		horizontalGrid = info.horizontalGrid;
		verticalGrid = info.verticalGrid;
		url = info.url;
	};

	Graph.prototype.updateParameters = function(info) { //abstract
    	alert('Page.updateParameters not implemented');
	};
	Graph.prototype.addFlow = function(flow) { //abstract
		alert('Page.addFlow not implemented');
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