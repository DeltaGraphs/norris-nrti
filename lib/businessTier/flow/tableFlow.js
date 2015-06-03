/*jshint node: true, -W106 */
'use strict';

/*
* Name : tableFlow.js
* Module : Lib::BusinessTier::TableFlow
* Location : /lib/businessTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-06-03   Matteo Furlan    Initial code
* =========================================================
*/

var TableFlowModel=require('../../dataTier/flow/tableFlowModel.js');
var Flow=require('./flow.js');

function TableFlow(params, graphSocket) {
	
	var tf=new TableFlowModel(params);
	if (!tf.hasOwnProperty('_ID')){
		return;
	}

	this.parent.constructor.call(this, graphSocket);
	
}

TableFlow.prototype = Object.create(Flow.prototype);
TableFlow.prototype.constructor = Flow;
TableFlow.prototype.parent = Flow.prototype;

module.exports = TableFlow;
