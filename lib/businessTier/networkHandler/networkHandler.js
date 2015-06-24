/*jshint node: true, -W106 */
'use strict';

/*
* Name : networkHandler.js
* Module : NetworkHandler
* Location : /lib/businessTier/networkHandler
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-20   Matteo Furlan      Working version with addRoutingPath
* 0.0.1     2015-05-19   Matteo Furlan      Initial code
* =========================================================
*/

var Socket=require('../../presentationTier/socket.js');
var Routes=require('../../presentationTier/routes.js');

function NetworkHandler(app,io,norrisNamespace,baseURL){
	if(app===undefined || io===undefined || norrisNamespace===undefined ||
		typeof app !== 'function' || app.lazyrouter===undefined ||
		typeof io !== 'object' || io.nsps===undefined ||
		typeof norrisNamespace !== 'string' || norrisNamespace.length<2 || norrisNamespace.indexOf('/')!==0
		){
		console.log('Error: 811');
		return;
	}
	this._app = app;
	this._io=io;
	this._norrisNamespace=norrisNamespace;
	this._routes=new Routes(this._app,this._norrisNamespace,baseURL);
}
NetworkHandler.prototype.addPageToRouting = function(namespacePage) {
	if(typeof namespacePage !== 'string' || namespacePage.length<1 || namespacePage.indexOf('/')!==0){
		return false;
	}
	return this._routes.addRoutingPath(namespacePage,'page'); //page is page.ejs;
};
NetworkHandler.prototype.addGraphToRouting = function(namespaceGraph) {
	if(typeof namespaceGraph !== 'string' || namespaceGraph.length<1 || namespaceGraph.indexOf('/')!==0){
		return false;
	}
	return this._routes.addRoutingPath(namespaceGraph,'graph'); //page is page.ejs;
};
NetworkHandler.prototype.createSocket = function(namespace) {
	var sock=new Socket(this._io,namespace);
	//sock.attachObject(attachedObject,onConnectionEvent);
	return sock;
};
module.exports = NetworkHandler;