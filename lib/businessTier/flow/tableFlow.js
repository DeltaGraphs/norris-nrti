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
	if (graphSocket===undefined || !(graphSocket.hasOwnProperty('_namespace'))){
		console.log('Error: 201');
		return;
	}
	var tf=new TableFlowModel(params);
	if (!tf.hasOwnProperty('_ID')){
		return;
	}
	this.parent.constructor.call(this, graphSocket);
	this._dataTableFlow=tf;
}

TableFlow.prototype = Object.create(Flow.prototype);
TableFlow.prototype.constructor = Flow;
TableFlow.prototype.parent = Flow.prototype;

TableFlow.prototype.addRecord = function(record){
	var res=this._dataTableFlow.addRecord(record);
	if (res!==143 && this._dataTableFlow.getRecordByID(res).norrisRecordIsValid){
		var columnKeys=this._dataTableFlow._columnKeys;
		var newValue=[];
		for (var key in columnKeys) {
			if (record[columnKeys[key]]!==undefined && typeof record[columnKeys[key]]==='number'){
				newValue.push(record[columnKeys[key]]);
			}
		}
		var data={
			action: 'insertRecords',
			ID: this._dataTableFlow._ID,
			records: [{
				norrisRecordID: res,
				value: newValue
			}]
		};
		this._graphSocket.sendMessage('updateFlowData', data);
	}
	return res;
};

TableFlow.prototype.updateRecord = function(ID, record){

};

TableFlow.prototype.getReplaceDataJSON = function(){

};

TableFlow.prototype.updateProperties = function(params){

};


module.exports = TableFlow;
