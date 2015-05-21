/*jshint node: true, -W106 */
'use strict';

/*
* Name : norris.js
* Module : Norris
* Location : /lib/businessTier/norris
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-19   Matteo Furlan    Initial code
* =========================================================
*/

var NetworkHandler=require('../networkHandler/networkHandler.js');
var PageListModel=require('../../dataTier/pageList/pageListModel.js');
var Page=require('../page/page.js');

function Norris(app,io,namespace){
	if(app===undefined || io===undefined || namespace===undefined ||
		typeof app !== 'function' || app.lazyrouter===undefined ||
		typeof io !== 'object' || io.nsps===undefined ||
		typeof namespace !== 'string' || namespace.length<1 || namespace.indexOf('/')!==0
		){
		console.log('Error: 521');
		return;
	}
	var plm=new PageListModel(namespace.substring(1));
	if(plm._name===undefined){
		console.log('Error: 521');
		return;
	}
	this._pageList=plm;
	this._app=app;
	this._io=io;
	this._networkHandler=new NetworkHandler(this._app,this._io,namespace);
	this._pageListSocket=this._networkHandler.createSocket(namespace,this,'configPageList');
	this._pages=[];
}
Norris.prototype.createPage = function(params) {
	//check duplicated ID
	if(params===undefined || params.ID===undefined){
		return null;
	}
	for (var key in this._pages) {
		if(this._pages[key]._page._ID===params.ID){
			console.log('Error: 522');
			return null;
		}
	}

	//create the new page object
	var newPage = new Page(params,this._networkHandler,this);

	// return null if the Page isn't instantiated
	if(newPage===undefined){
		return null;
	}

	//add the page to the pageList in the Data Tier
	this._pageList.addPage(newPage._page);

	//notify the clients
	var pageProp = newPage._page.getProperties();
	var PData = newPage._page.getData();
	var message = pageJSON(pageProp, PData, this._networkHandler._routes._baseURL);
	this._pageListSocket.sendMessage('insertPage', message);

	//add the page to array of pages
	this._pages.push(newPage);

	//return the created page
	return newPage;
};

function pageJSON(pProp, pData, baseURL) {
	var ret = {};
	ret.ID = pProp.ID;
	ret.name = pProp.name;
	ret.description = pProp.description;
	ret.URLSocket = baseURL + '/' + pProp.ID;
	ret.graphs = [];
	for(var j=0; j < pData.length; j++) {
		var graph = {};
		graph.ID = pData[j].properties.ID;
		graph.title = pData[j].properties.title;
		graph.type = pData[j].properties.type;
		graph.URLSocket = baseURL + '/' + pProp.ID + '/' + pData[j].properties.ID;
		ret.graphs.push(graph);
	}
	return ret;
}

Norris.prototype.getConfigJSON = function() {
	var PLData = this._pageList.getData();

	//create the object that will be returned
	var ret = {};

	//add the properties relative to the pageList
	ret.name = this._pageList.getName();

	//add the data relative to each page
	ret.data = [];
	for(var i=0; i < PLData.length; i++) {
		ret.data.push(pageJSON(PLData[i].properties, PLData[i].data, this._networkHandler._routes._baseURL));
	}

	return ret;
};
Norris.prototype.pageChanged = function(params) {
	if(params!==undefined && params.eventType!==undefined && params.params!== undefined &&
		typeof params.eventType === 'string' && params.eventType !== '' && typeof params.params === 'object') {
		this._pageListSocket.sendMessage(params.eventType, params.params);
	}
};

module.exports = Norris;