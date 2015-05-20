/*jshint node: true, -W106 */
'use strict';

/*
* Name : norris.js
* Module : Norris
* Location : /lib/businessTier
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-19   Matteo Furlan    Initial code
* =========================================================
*/

var NetworkHandler=require('./networkHandler.js');
var PageListModel=require('../dataTier/pageList/pageListModel.js');

function Norris(app,server,io,namespace){
	if(app===undefined || io===undefined || namespace===undefined ||
		typeof app !== 'object' || app.lazyrouter===undefined ||
		typeof io !== 'object' || io.nsps===undefined ||
		typeof namespace !== 'string' || namespace.length<2 || namespace.indexOf('/')!==0
		){
		console.log('Error: 521');
		return;
	}
	this._app=app;
	this._io=io;
	this._networkHandler=new NetworkHandler(app,io,namespace);
	this._pageListSocket=this._networkHandler.createSocket(namespace,this,'configPageList');
	this._pageList=new PageListModel(namespace.substring(1));
}
Norris.prototype.createPage = function(params) {
	console.log(params);
	//return new Page;
};
Norris.prototype.getConfigJSON = function() {
	var data=this._pageList.getData();
	data.name=this._pageList.getName();
	return data;
};
Norris.prototype.pageChanged = function(params) {
	console.log(params);
};
module.exports = Norris;