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
	if(nsp===undefined || typeof nsp !=='string') {
		return;
	}
	console.dir('printing socketio constructor');
	console.dir(io.prototype.constructor.name);
	this._namespace = io.of(nsp);
	this._attachedObj = null;
	this._onConnectionEvent = '';


	var clientHandle = function (socket) {
        console.log(' new client connected to ' + nsp);
        socket.emit(this._onConnectionEvent, this._attachedObj.getConfigJSON());
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
	}
};

module.exports = Socket;