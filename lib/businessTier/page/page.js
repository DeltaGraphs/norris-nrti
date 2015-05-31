/*jshint node: true, -W106 */
'use strict';

/*
* Name : page.js
* Module : Page
* Location : /lib/businessTier/page
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-19   Matteo Furlan    Initial code
* =========================================================
*/

var PageModel=require('../../dataTier/page/pageModel.js');
//var BarChart=require('../graph/barChart.js');
var LineChart=require('../graph/lineChart.js');
var MapChart=require('../graph/mapChart.js');
//var Table=require('../graph/table.js');

function Page(params,networkHandler,norris){
	if(params===undefined || networkHandler===undefined || norris===undefined ||
		norris._app===undefined || norris._io===undefined ||
		norris._networkHandler===undefined || norris._pageListSocket===undefined ||
		norris._pageList===undefined){
		console.log('Error: 421');
		return;
	}
	
	var pageM = new PageModel(params);
	if(pageM._ID === undefined) {
		console.log('Error: 421');
		return;
	}

	this._page = pageM;
	this._networkHandler = networkHandler;
	this._norris = norris;
	this._pageNamespace = '/' + params.ID;
	this._pageSocket = this._networkHandler.createSocket(this._pageNamespace);
	this._pageSocket.attachObject(this,'configPage');
	this._graphs = [];

	//add to routing
	this._networkHandler.addPageToRouting(this._pageNamespace);
}

/*Page.prototype.createBarChart = function(params) {
	var graph = new BarChart(params);
	if(graph._ID === undefined) {
		return null;
	}
	this._graphs.push(graph);
	this._page.addGraph(graph._dataGraph);
	return graph;
};
*/
Page.prototype.createLineChart = function(params) {
	/*OLD
	var graph = new LineChart(params);
	if(graph._ID === undefined) {
		return null;
	}
	this._graphs.push(graph);
	this._page.addGraph(graph._dataGraph);
	return graph;*/

	if(params.ID === undefined) {
		return null;
	}
	var graphSocket=this._networkHandler.createSocket(this._pageNamespace+'/'+params.ID);
	var graph = new LineChart(params, this, graphSocket);
	graphSocket.attachObject(graph, 'configGraph');

	this._graphs.push(graph);
	this._page.addGraph(graph._dataLineChart);
	var graphProp=graph.getProperties();

	var data={
		ID: this._page.getProperties().ID,
		graph: {
			ID: graphProp.ID,
			title: graphProp.title,
			type: 'LineChart',
			URLSocket: this._networkHandler._routes._baseURL + '/' + this._pageNamespace + '/' + graphProp.ID
		}
	};
	this._pageSocket.sendMessage('insertGraph', data);

	this._networkHandler.addGraphToRouting(this._pageNamespace+'/'+params.ID);
	return graph;

};

Page.prototype.createMapChart = function(params) {
	if(params.ID === undefined) {
		return null;
	}
	var graphSocket=this._networkHandler.createSocket(this._pageNamespace+'/'+params.ID);
	var graph = new MapChart(params, this, graphSocket);
	graphSocket.attachObject(graph, 'configGraph');

	this._graphs.push(graph);
	this._page.addGraph(graph._dataMapChart);
	var graphProp=graph.getProperties();

	var data={
		ID: this._page.getProperties().ID,
		graph: {
			ID: graphProp.ID,
			title: graphProp.title,
			type: 'MapChart',
			URLSocket: this._networkHandler._routes._baseURL + '/' + this._pageNamespace + '/' + graphProp.ID
		}
	};
	this._pageSocket.sendMessage('insertGraph', data);

	this._networkHandler.addGraphToRouting(this._pageNamespace+'/'+params.ID);
	return graph;
};

/*Page.prototype.createTable = function(params) {
	var graph = new Table(params);
	if(graph._ID === undefined) {
		return null;
	}
	this._graphs.push(graph);
	this._page.addGraph(graph._dataGraph);
	return graph;
};*/

Page.prototype.updateProperties = function(params) {

	if(params!==undefined && params!==null && typeof params==='object') {

		//call the updateProperties method in the Data Tier
		this._page.updateProperties(params);

		//notify the page sockets
		this._pageSocket.sendMessage('updatePageProp', params);

		//notify norris about the page update
		this._norris.pageChanged({eventType: 'updatePage', params: params});
	}
};

Page.prototype.getConfigJSON = function() {
	var ret = {
		properties: this._page.getProperties(),
		data: []
	};
	var PData = this._page.getData();
	for(var i=0; i < PData.length; i++) {
		ret.data.push({
			ID: PData[i].properties.ID,
			title: PData[i].properties.title,
			URLSocket: this._networkHandler._routes._baseURL + '/' + this._pageNamespace
		});
	}
	return ret;
};

Page.prototype.graphChanged = function(params) {
	if(params!==undefined && params.eventType!==undefined && params.params!== undefined &&
		typeof params.eventType === 'string' && params.eventType !== '' && typeof params.params === 'object') {
		//notify the page sockets
		this._pageSocket.sendMessage(params.eventType, params.params);
	}

	//notify norris about the graph update
	this._norris.pageChanged(params);
};


module.exports = Page;