/*jshint node: true, -W106 */
'use strict';

/*
* Name : networkHandler.js
* Module : NetworkHandler
* Location : /lib/businessTier
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-19   Matteo Furlan    Initial code
* =========================================================
*/

function NetworkHandler(app,server,io,norrisNamespace){
	if(app===undefined || server===undefined || io===undefined || norrisNamespace===undefined){
		console.log('Error: 811');
		return;
	}
	this._app=app;
	this._server=server;
	this._io=io;
	this._norrisNamespace=norrisNamespace;
}
NetworkHandler.prototype.addPageToRouting = function(namespacePage) {
	console.log(namespacePage);
	return true;
};
NetworkHandler.prototype.createSocket = function(namespace,attachedObject) {
	console.log(namespace,attachedObject);
	//return Socket;
};
module.exports = NetworkHandler;