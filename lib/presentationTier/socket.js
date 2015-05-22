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


function Socket(io, nsp) {
	if(nsp===undefined || typeof nsp !=='string' || io.nsps===undefined) {
		console.log('Error: 921');
		return;
	}
	this._namespace = io.of(nsp);
	this._attachedObj=null;
}

Socket.prototype.sendMessage = function(event, data) {
	if(event!==undefined && data!==undefined) {
		this._namespace.emit(event, data);
	}
};

Socket.prototype.attachObject = function(obj, onConnectionEvent) {
	if(obj!==undefined && onConnectionEvent!==undefined) {
		this._attachedObj = obj;
		var clientHandle = function (socket) {
			console.log(' new client connected to ' + this._namespace);
			socket.emit(onConnectionEvent, obj.getConfigJSON());
		};
		this._namespace.on('connection', clientHandle);
	}else{
		console.log('Error: 922');
	}
};

module.exports = Socket;