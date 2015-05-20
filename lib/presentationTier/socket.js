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


function Socket(io, nsp, obj, onConnectionEvent) {
	if(nsp===undefined || typeof nsp !=='string' || io.nsps===undefined || obj===undefined || onConnectionEvent===undefined) {
		console.log('Error: 921');
		return;
	}
	this._namespace = io.of(nsp);
	this._attachedObj = obj;
	this._onConnectionEvent = onConnectionEvent;

	var aObj = this._attachedObj;
	var onCE = this._onConnectionEvent;
	var clientHandle = function (socket) {
        console.log(' new client connected to ' + nsp);
		console.dir(this._attachedObj);
        socket.emit(onCE, aObj.getConfigJSON());
    };
    this._namespace.on('connection', clientHandle);
}

Socket.prototype.sendMessage = function(event, data) {
	if(event!==undefined && data!==undefined) {
		this._namespace.emit(event, data);
	}
};

Socket.prototype.attachObject = function(obj, onConnectionEvent) {
	if(obj!==undefined && onConnectionEvent!==undefined) {
		this._attachedObj = obj;
		this._onConnectionEvent = onConnectionEvent;
	}else{
		console.log('Error: 922');
	}
};

module.exports = Socket;