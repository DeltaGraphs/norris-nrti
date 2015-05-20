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
* 0.0.1     2015-05-19   Matteo Furlan    Initial code
* =========================================================
*/

var Socket=require('../../presentationTier/socket.js');
var Routes=require('../../presentationTier/routes.js');

function NetworkHandler(app,io,norrisNamespace){
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
	this._routes=new Routes(this._app,this._norrisNamespace);
	this._routes.addRoutingPath(this._norrisNamespace,'pageList'); //page is pageList.ejs;
}
NetworkHandler.prototype.addPageToRouting = function(namespacePage) {
	if(typeof namespacePage !== 'string' || namespacePage.length<2 || namespacePage.indexOf('/')!==0){
		return false;
	}
	return this._routes.addRoutingPath(namespacePage,'page'); //page is page.ejs;
};
NetworkHandler.prototype.createSocket = function(namespace,attachedObject) {
	var sock=new Socket(this._io,namespace);
	sock.attachedObject(attachedObject,'configPageList');
	return sock;
};
module.exports = NetworkHandler;