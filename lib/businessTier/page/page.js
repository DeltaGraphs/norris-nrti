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

var PageModel=require('../../dataTier/pageList/pageModel.js');

function Page(params,networkHandler,norris){
	if(params===undefined || networkHandler===undefined || norris===undefined || norris instanceof 'Norris' || params===undefined){
		console.log('Error: 421');
		return;
	}
	this._networkHandler = networkHandler;
	this._norris = norris;
	this._pageNamespace = '/' + params.ID;
	this._pageSocket = this._networkHandler.createSocket(this._pageNamespace,this,'configPage');
	this._page = new PageModel(params);

	//add to routing
	this._networkHandler.addPageToRouting(this._pageNamespace);
}

Page.prototype.updateProperties = function(params) {

	//call the updateProperties method in the Data Tier
	this._page.updateProperties(params);

	//notify the page sockets
	this._pageSocket.sendMessage('updatePageProp', params);

	//notify norris about the page update
	this._norris.pageChanged({eventType: 'updatePage', params: params});
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