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
* 0.0.2     2015-05-24   Filippo Rampado    Add error code
* =========================================================
*/
function Flow(graphSocket) {
	//check if graphsocket is not valid
	if (graphSocket===undefined || !(graphSocket.hasOwnProperty('_namespace'))){
		//return error
		console.log('Error: 201');
		return;
	}
	//else build object
	this._graphSocket=graphSocket;
}

module.exports = Flow;
