/*jshint node: true */
'use strict';

/*
* Name :  Graph.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GrapshModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.4			2015-05-15	Francesco Rossetto			Various fix
*
* 0.1.3			2015-05-14	Maria Giovanna Chinellato	Add method getFlowList
*
* 0.1.3			2015-05-14	Francesco Rossetto			Fix constructor
*
* 0.1.2			2015-05-13	Francesco Rossetto			Fix constructor 
*
* 0.1.1			2015-05-12	Maria Giovanna Chinellato	Fix attributes
*
* 0.1.0         2015-05-12  Francesco Rossetto   		Add all attributes and all methods
*
* 0.0.1         2015-05-12  Francesco Rossetto			Initial code    
* =================================================================================================
*
*/

app.factory('Graph', ['Flow', 'Legend', function(Flow, Legend){
	var flowList = new Array();
	var title;
	var height;
	var width;
	var legend = null;
	var enabledLegend = false;
	var horizontalGrid = true;
	var verticalGrid = true;
	var url;

	var Graph = function(info) {
		if (info.title) {
			title = info.title;
		}
		if (info.url) {
			url = info.url;
		}

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
		if (info.enabledLegend !== null) {
			enabledLegend = info.enabledLegend;
			if (enabledLegend && info.legend) {
				legend = new Legend(info.legend);
			}
		}
		if (info.horizontalGrid !== null) {
			horizontalGrid = info.horizontalGrid;
		}
		if (info.verticalGrid !== null) {
			verticalGrid = info.verticalGrid;
		}
	};
	Graph.prototype.addFlow = function(id, flow) { //abstract
		if (flowList[id] === null) {
			flowList[id] = flow;
		}
		// error
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
	Graph.prototype.getFlowList = function() {
		return flowList;
	};
	return Graph;
}]);