/*jshint node: true, -W106 */
'use strict';

/*
* Name : socket.js
* Module : Lib::PresentationTier::Socket
* Location : /lib/presentationTier
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-17   Samuele Zanella    Initial code
* =========================================================
*/


function Socket(nsp) {
	if(nsp===undefined && nsp.constructor.name!=='Namespace') {
		return;
	}
	this._namespace = nsp;
	this._attachedObj = null;
}

Socket.prototype.sendMessage = function(event, data) {
	if(event!==undefined && data!==undefined) {
		this._namespace.emit(event, JSON.stringify(data));
	}
};

Socket.prototype.attachObject = function(obj) {
	if(obj!==undefined) {
		this._attachedObj = obj;
	}
};

module.exports = Socket;