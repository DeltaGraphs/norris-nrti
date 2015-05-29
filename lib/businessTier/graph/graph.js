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

/*var Socket=require('../../presentationTier/socket.js');
var Page=require('../page/page.js');*/
function Graph(page, graphSocket) {
	if (page===undefined && !(page.hasOwnProperty('_page'))){
		console.log('Error: 302');
		return;
	}
	if (graphSocket===undefined && !(graphSocket.hasOwnProperty('_namespace'))){
		console.log('Error: 301');
		return;
	}
	this._page=page;
	this._graphSocket=graphSocket;
	
	this._graphSocket.attachObject(this, 'configGraph');
}

module.exports = Graph;
