/*jshint node: true, -W106 */
'use strict';

/*
* Name : graph.js
* Module : Lib::BusinessTier::Graph
* Location : /lib/businessTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-20   Filippo Rampado    Initial code
* =========================================================
*/

var Socket=require('../../presentationTier/socket.js');
var Page=require('../page/page.js');
function Graph(graphSocket, page) {
	if (!graphSocket instanceof Socket){
		console.log('Error: 301');
		return;
	}
	if (!page instanceof Page){
		console.log('Error: 302');
		return;
	}
	this._graphSocket=graphSocket;
	this._page=page;

	this._graphSocket.attachObject(this, 'configGraph');
}

module.exports = Graph;
