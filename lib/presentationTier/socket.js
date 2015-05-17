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
	this._namespace = null;
	this._attachedObj = null;

	if(nsp!==undefined/* && nsp instanceof io.Namespace*/) {
		this._namespace = nsp;
	}
}

Socket.prototype.attachObject = function(obj) {
	this._attachedObj = obj;
};

module.exports = Socket;