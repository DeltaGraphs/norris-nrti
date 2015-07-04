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
* 0.0.2     2015-05-20   Matteo Furlan      Working version with attachObject
* =========================================================
*/

//if params are valid build object else return error
function Socket(io, nsp) {
	if(nsp===undefined || typeof nsp !=='string' || io.nsps===undefined) {
		console.log('Error: 921');
		return;
	}
	this._namespace = io.of(nsp);
	this._attachedObj=null;
	this._onConnectionEvent='';
	this._nsp=nsp;
}

//send an event with passed data 
Socket.prototype.sendMessage = function(event, data) {
	if(event!==undefined && data!==undefined) {
		this._namespace.emit(event, data);
	}
};

//specify name of connection event to object 
Socket.prototype.attachObject = function(obj, onConnectionEvent) {
	if(obj!==undefined && onConnectionEvent!==undefined) {
		this._attachedObj = obj;
		this._onConnectionEvent = onConnectionEvent;
		var nsp=this._nsp;
		/* istanbul ignore next */
		var clientHandle = function (socket) {
			socket.emit(onConnectionEvent, obj.getConfigJSON());
		};
		this._namespace.on('connection', clientHandle);
	}else{
		console.log('Error: 922');
	}
};

module.exports = Socket;
