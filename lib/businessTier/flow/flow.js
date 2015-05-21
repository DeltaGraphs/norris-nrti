/*jshint node: true, -W106 */
'use strict';

/*
* Name : flow.js
* Module : Lib::BusinessTier::Flow
* Location : /lib/businessTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-20   Filippo Rampado    Initial code
* =========================================================
*/

var Socket=require('../../presentationTier/socket.js');

function Flow(graphSocket) {
	if (!(graphSocket instanceof Socket)){
		console.log('Error: 201');
		return;
	}
	this._graphSocket=graphSocket;
}

module.exports = Flow;
