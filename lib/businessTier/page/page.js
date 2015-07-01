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
var BarChart=require('../graph/barChart.js');
var LineChart=require('../graph/lineChart.js');
var MapChart=require('../graph/mapChart.js');
var Table=require('../graph/table.js');

function Page(params,networkHandler,norris){
	if(params===undefined || networkHandler===undefined || norris===undefined ||
		norris._app===undefined || norris._io===undefined ||
		norris._networkHandler===undefined || norris._pageListSocket===undefined ||
		norris._pageList===undefined){
		console.log('Error: 421');
		return;
	}
	var pageM = new PageModel(params);
	if(pageM._name === undefined) {
		console.log('Error: 421');
		return;
	}

	this._page = pageM;
	this._networkHandler = networkHandler;
	this._norris = norris;
	this._pageNamespace = this._networkHandler._norrisNamespace + '/' + params.ID;
	this._pageSocket = this._networkHandler.createSocket(this._pageNamespace);
	this._pageSocket.attachObject(this,'configPage');
	this._graphs = [];

	//add to routing
	this._networkHandler.addPageToRouting(this._pageNamespace);
}

Page.prototype.createBarChart = function(params) {
	if(params === undefined || params.ID === undefined) {
		return null;
	}

	for (var key in this._graphs) {
		if(this._graphs[key].getProperties().ID===params.ID){
			return null;
		}
	}
	var graphSocket=this._networkHandler.createSocket(this._pageNamespace+'/'+params.ID);
	var graph = new BarChart(params, this, graphSocket);
	if(graph._dataBarChart === undefined) {
		return null;
	}
	graphSocket.attachObject(graph, 'configGraph');

	this._graphs.push(graph);
	this._page.addGraph(graph._dataBarChart);
	var graphProp=graph.getProperties();

	var data={
		ID: this._page._ID,
		data: {
			ID: graphProp.ID,
			title: graphProp.title,
			type: 'BarChart',
			socketURL: this._networkHandler._routes._baseURL + this._pageNamespace + '/' + graphProp.ID
		}
	};
	//notify page
	this._pageSocket.sendMessage('insertGraph', data);

	//notify pagelist
	this._norris.pageChanged({eventType: 'insertGraph', params: data});

	this._networkHandler.addGraphToRouting(this._pageNamespace+'/'+params.ID);
	return graph;
};

Page.prototype.createLineChart = function(params) {
	if(params === undefined || params.ID === undefined) {
		return null;
	}

	for (var key in this._graphs) {
		if(this._graphs[key].getProperties().ID===params.ID){
			return null;
		}
	}
	var graphSocket=this._networkHandler.createSocket(this._pageNamespace+'/'+params.ID);
	var graph = new LineChart(params, this, graphSocket);
	if(graph._dataLineChart === undefined) {
		return null;
	}
	graphSocket.attachObject(graph, 'configGraph');

	this._graphs.push(graph);
	this._page.addGraph(graph._dataLineChart);
	var graphProp=graph.getProperties();

	var data={
		ID: this._page._ID,
		data: {
			ID: graphProp.ID,
			title: graphProp.title,
			type: 'LineChart',
			socketURL: this._networkHandler._routes._baseURL+ this._pageNamespace + '/' + graphProp.ID
		}
	};
	//notify page
	this._pageSocket.sendMessage('insertGraph', data);

	//notify pagelist
	this._norris.pageChanged({eventType: 'insertGraph', params: data});

	this._networkHandler.addGraphToRouting(this._pageNamespace+'/'+params.ID);
	return graph;
};

Page.prototype.createMapChart = function(params) {
	if(params === undefined || params.ID === undefined) {
		return null;
	}

	for (var key in this._graphs) {
		if(this._graphs[key].getProperties().ID===params.ID){
			return null;
		}
	}
	var graphSocket=this._networkHandler.createSocket(this._pageNamespace+'/'+params.ID);
	var graph = new MapChart(params, this, graphSocket);
	if(graph._dataMapChart === undefined) {
		return null;
	}
	graphSocket.attachObject(graph, 'configGraph');

	this._graphs.push(graph);
	this._page.addGraph(graph._dataMapChart);
	var graphProp=graph.getProperties();

	var data={
		ID: this._page._ID,
		data: {
			ID: graphProp.ID,
			title: graphProp.title,
			type: 'MapChart',
			socketURL: this._networkHandler._routes._baseURL + this._pageNamespace + '/' + graphProp.ID
		}
	};
	//notify page
	this._pageSocket.sendMessage('insertGraph', data);

	//notify pagelist
	this._norris.pageChanged({eventType: 'insertGraph', params: data});

	this._networkHandler.addGraphToRouting(this._pageNamespace+'/'+params.ID);
	return graph;
};

Page.prototype.createTable = function(params) {
	if(params === undefined || params.ID === undefined) {
		return null;
	}

	for (var key in this._graphs) {
		if(this._graphs[key].getProperties().ID===params.ID){
			return null;
		}
	}
	var graphSocket=this._networkHandler.createSocket(this._pageNamespace+'/'+params.ID);
	var graph = new Table(params, this, graphSocket);
	if(graph._dataTable === undefined) {
		return null;
	}
	graphSocket.attachObject(graph, 'configGraph');

	this._graphs.push(graph);
	this._page.addGraph(graph._dataTable);
	var graphProp=graph.getProperties();

	var data={
		ID: this._page._ID,
		data: {
			ID: graphProp.ID,
			title: graphProp.title,
			type: 'Table',
			socketURL: this._networkHandler._routes._baseURL + this._pageNamespace + '/' + graphProp.ID
		}
	};
	//notify page
	this._pageSocket.sendMessage('insertGraph', data);

	//notify pagelist
	this._norris.pageChanged({eventType: 'insertGraph', params: data});

	this._networkHandler.addGraphToRouting(this._pageNamespace+'/'+params.ID);
	return graph;
};

Page.prototype.updateProperties = function(params) {

	if(params!==undefined && params!==null && typeof params==='object') {

		//call the updateProperties method in the Data Tier
		this._page.updateProperties(params);
		var data=params;
		data.ID=this._page._ID;
		//notify the page sockets
		this._pageSocket.sendMessage('updatePageProp', data);

		//notify norris about the page update
		if (params.description!==undefined || params.name!==undefined){
			this._norris.pageChanged({eventType: 'updatePage', params: data});
		}
	}
};

Page.prototype.getProperties = function() {
	return this._page.getProperties();
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
			socketURL: this._networkHandler._routes._baseURL + this._pageNamespace + '/' + PData[i].properties.ID
		});
	}
	return ret;
};

Page.prototype.graphChanged = function(params) {
	if(params!==undefined && params.eventType!==undefined && params.params!== undefined &&
		(typeof params.eventType) === 'string' && params.eventType !== '' && typeof params.params === 'object') {
		//notify the page sockets
		this._pageSocket.sendMessage(params.eventType, params.params);
		this._norris.pageChanged(params.eventType, params.params);
	}
};


module.exports = Page;