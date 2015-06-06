/*jshint node: true, -W106 */
'use strict';

/*
* Name : table.js
* Module : Lib::BusinessTier::Table
* Location : /lib/businessTier/table
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-06-06   Filippo Rampado    Initial code
* =========================================================
*/

/*var Socket=require('../../presentationTier/socket.js');
var Page=require('../page/page.js');*/
var Graph=require('./graph.js');
var TableFlow=require('../flow/tableFlow.js');
var TableModel=require('../../dataTier/graph/tableModel.js');

function Table(params, page, graphSocket) {
	if (params===undefined){
		console.log('Error: 371');
		return;
	}
	if (!(graphSocket.hasOwnProperty('_namespace'))){
		console.log('Error: 392');
		return;
	}
	if (!(page.hasOwnProperty('_page'))){
		console.log('Error: 393');
		return;
	}
	var tm=new TableModel(params);
	if (!tm.hasOwnProperty('_ID')){
		return;
	}
	this.parent.constructor.call(this, page, graphSocket);
	this._dataTable=tm;
	this._flows=[];
}

Table.prototype = Object.create(Graph.prototype);
Table.prototype.constructor = Graph;
Table.prototype.parent = Graph.prototype;

Table.prototype.getFlowByID = function(ID){
	if (typeof ID==='string') {
		var flows=this._flows.length;
		var i=0;
		var found=false;
		while (i<flows && (!found)){
			if (this._flows[i]._dataTableFlow._ID===ID){
				found=true;
			}
			else{
				i++;
			}
		}//while
		if (found){//in flows[i] there is the ID
			return this._flows[i];
		}
		//no ID in flows
	}
	return 292;
};

Table.prototype.createTableFlow = function(params){
	var tf=new TableFlow(params, this._graphSocket);
	if (!tf.hasOwnProperty('_dataTableFlow')){
		return 242;
	}
	this._flows.push(tf);
	this._dataTable.addFlow(tf._dataTableFlow);

	var prop={};
	prop.ID=params.ID;
	prop.name=tf._dataTableFlow._name;
	prop.marker=tf._dataTableFlow._marker;
	prop.flowColor=tf._dataTableFlow._flowColor;
	prop.interpolation=tf._dataTableFlow._interpolation;
	prop.area=tf._dataTableFlow._area;
	prop.maxItems=tf._dataTableFlow._maxItems;

	this._graphSocket.sendMessage('insertFlow', prop);
	return tf;
};

Table.prototype.deleteFlow = function(ID){
	if (typeof ID==='string') {
		var flows=this._flows.length;
		var i=0;
		var found=false;
		while (i<flows && (!found)){
			if (this._flows[i]._dataTableFlow._ID===ID){
				found=true;
			}
			else{
				i++;
			}
		}//while
		if (found){//in flows[i] there is the ID			
			this._graphSocket.sendMessage('deleteFlow', {ID: ID});
			this._flows.splice(i, 1);
			return true;
		}
		//no ID in flows
	}
	return 273;
};

Table.prototype.deleteAllFlows = function(){
	while (this._flows.length>0){
		this._graphSocket.sendMessage('deleteFlow', {
			ID: this._flows[0]._dataTableFlow._ID
		});
		this._flows.splice(0, 1);
	}
};

Table.prototype.addRecord = function(flowID, record){
	var flow=this.getFlowByID(flowID);
	if (flow!==292){
		return flow.addRecord(record);
	}
	return 292;
};

Table.prototype.updateRecord = function(flowID, ID, record){
	var flow=this.getFlowByID(flowID);
	if (flow!==292){
		return flow.updateRecord(ID, record);
	}
	return 292;
};

Table.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this._dataTable.updateProperties(params);
		this._graphSocket.sendMessage('updateGraphProp', prop);
	}
};

Table.prototype.getProperties = function(){
	return this._dataTable.getProperties();
};

Table.prototype.getConfigJSON = function(){
	var configJSON={};
	configJSON.properties=this._dataTable.getProperties();
	var flowProp=[];
	var flows=this._flows.length;
	configJSON.data=[];
	for (var f=0; f<flows; f++){
		var flowData={};
		flowData.ID=this._flows[f]._dataTableFlow._ID;
		flowData.records=[];
		flowProp.push(this._flows[f]._dataTableFlow.getProperties());
		var records=this._flows[f]._dataTableFlow.getData();
		var columnKeys=this._flows[f]._dataTableFlow._columnKeys;
		for (var i=0; i<records.length; i++){//scan all records
			if (records[i].norrisRecordIsValid){//if current record is valid, send it
				var record=[];
				for (var j=0; j<columnKeys.length; j++){//insert all valid columns
					if (records[i][columnKeys[j]]!==undefined){
						record.push(records[i][columnKeys[j]]);
					}
				}
				records.push({
					norrisRecordID : records[i].norrisRecordID,
					value: record
					//add appearance
				});
			}
		}
		configJSON.data.push(flowData);
	}
	configJSON.properties.flows=flowProp;
	return configJSON;
};

module.exports = Table;
