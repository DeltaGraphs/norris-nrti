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
* 0.0.2     2015-06-24   Filippo Rampado	Fix addRecord
* =========================================================
*/

var TableFlowModel=require('../../dataTier/flow/tableFlowModel.js');
var Flow=require('./flow.js');

//build the object if graphsocket and params are valid
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

//if record is valid, add the record and notify the clients
TableFlow.prototype.addRecord = function(record){
	var res=this._dataTableFlow.addRecord(record);
	if (res!==143 && this._dataTableFlow.getRecordByID(res).norrisRecordIsValid){
		var columnKeys=this._dataTableFlow._columnKeys;
		var appearance=this._dataTableFlow.getRecordByID(res).appearance;
		var newValue=[];
		for (var key in columnKeys) {
			if (record[columnKeys[key]]!==undefined){
				newValue.push(record[columnKeys[key]]);
			}
		}
		var data={
			action: 'insertRecords',
			ID: this._dataTableFlow._ID,
			records: [{
				norrisRecordID: res,
				value: newValue,
				appearance: appearance
			}]
		};
		this._graphSocket.sendMessage('updateFlowData', data);
	}
	return res;
};

//if ID and record are valid, updates the record and notify the clients to remove, add or simply modify the record 
TableFlow.prototype.updateRecord = function(ID, record){
	var oldValid=this._dataTableFlow.getRecordByID(ID).norrisRecordIsValid;
	var res=this._dataTableFlow.updateRecord(ID, record);
	var newValid=this._dataTableFlow.getRecordByID(ID).norrisRecordIsValid;
	if (res===true ){
		if (oldValid && !newValid){
			var data={
				action: 'deleteRecord',
				ID: this._dataTableFlow._ID,
				norrisRecordID: ID
			};
			this._graphSocket.sendMessage('updateFlowData', data);
		}
		if (newValid){
			var columnKeys=this._dataTableFlow._columnKeys;
			var appearance=this._dataTableFlow.getRecordByID(ID).appearance;
			var newValue=[];
			for (var key in columnKeys) {
				if (record[columnKeys[key]]!==undefined){
					newValue.push(record[columnKeys[key]]);
				}
			}
			if (!oldValid){
				var data2={
					action: 'insertRecords',
					ID: this._dataTableFlow._ID,
					records: [{
						norrisRecordID: ID,
						value: newValue,
						appearance: appearance
					}]
				};
				this._graphSocket.sendMessage('updateFlowData', data2);
			}
			if (oldValid){
				var data3={
					action: 'updateRecord',
					ID: this._dataTableFlow._ID,
					norrisRecordID: ID,
					value: newValue,
					appearance: appearance
				};
				this._graphSocket.sendMessage('updateFlowData', data3);
			}
		}
	}
	return res;
};

//it returns a JSON with all records
TableFlow.prototype.getReplaceDataJSON = function(){
	var records=[];
	var dataRecords=this._dataTableFlow._records;
	var columnKeys=this._dataTableFlow._columnKeys;
	for (var i=0; i<dataRecords.length; i++){//scan all records
		if (dataRecords[i].norrisRecordIsValid){//if current record is valid, send it
			var record=[];
			var appearance=dataRecords[i].appearance;
			for (var j=0; j<columnKeys.length; j++){//insert all valid columns
				if (dataRecords[i][columnKeys[j]]!==undefined){
					record.push(dataRecords[i][columnKeys[j]]);
				}
			}
			records.push({
				norrisRecordID : dataRecords[i].norrisRecordID,
				value: record,
				appearance: appearance
			});
		}
	}
	return {
		action: 'replaceData',
		ID: this._dataTableFlow._ID,
		records: records
	};
};

//it updates properties and notify clients about it
TableFlow.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this._dataTableFlow.updateProperties(params);
		prop.ID=this._dataTableFlow._ID;
		if (prop.filters !== undefined){//filters changed
			this._graphSocket.sendMessage('updateFlowData', this.getReplaceDataJSON());
		}
		this._graphSocket.sendMessage('updateFlowProp', prop);
	}
};

//it returns model properties
TableFlow.prototype.getProperties = function(){
	return this._dataTableFlow.getProperties();
};

//returns the flow data
TableFlow.prototype.getData = function(){
	return this._dataTableFlow.getData();
};

module.exports = TableFlow;