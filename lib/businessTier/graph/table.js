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
* 0.0.2     2015-06-29   Matteo Furlan      fix structure of returned JSON by getConfigJSON
* =========================================================
*/

var Graph=require('./graph.js');
var TableFlow=require('../flow/tableFlow.js');
var TableModel=require('../../dataTier/graph/tableModel.js');

//if params are valid build object, else return error
function Table(params, page, graphSocket) {
	if (params===undefined){
		console.log('Error: 391');
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

//if ID is valid return flow specified 
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

//if params and records are valid create and returns a flow object and notify graph clients
Table.prototype.createTableFlow = function(params){
	var tf=new TableFlow(params, this._graphSocket);
	if (!tf.hasOwnProperty('_dataTableFlow')){
		return 242;
	}
	this._flows.push(tf);
	this._dataTable.addFlow(tf._dataTableFlow);

	var data={};
	var prop={};
	prop.ID=params.ID;
	prop.name=tf._dataTableFlow._name;
	prop.maxItems=tf._dataTableFlow._maxItems;
	data.properties=prop;
	data.records=[];

	this._graphSocket.sendMessage('insertFlow', data);
	return tf;
};

//if ID is valid delete flow and notify clients
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
	return 293;
};

//delete all flows and notify clients
Table.prototype.deleteAllFlows = function(){
	while (this._flows.length>0){
		this._graphSocket.sendMessage('deleteFlow', {
			ID: this._flows[0]._dataTableFlow._ID
		});
		this._flows.splice(0, 1);
	}
};

//calls addRecord of flow
Table.prototype.addRecord = function(flowID, record){
	var flow=this.getFlowByID(flowID);
	if (flow!==292){
		return flow.addRecord(record);
	}
	return 292;
};

//calls updateRecord of flow
Table.prototype.updateRecord = function(flowID, ID, record){
	var flow=this.getFlowByID(flowID);
	if (flow!==292){
		return flow.updateRecord(ID, record);
	}
	return 292;
};

//update properties and notify clients
Table.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this._dataTable.updateProperties(params);
		prop.ID = this._dataTable.getProperties().ID;
		this._graphSocket.sendMessage('updateGraphProp', prop);
		if(prop.title !== undefined) {
			this._page.graphChanged({eventType: 'updateGraph', params: prop});
		}
	}
};

//return graph properties
Table.prototype.getProperties = function(){
	return this._dataTable.getProperties();
};

//return JSON with graph properties, flows properties and data
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
				var appearance=records[i].appearance;
				for (var j=0; j<columnKeys.length; j++){//insert all valid columns
					if (records[i][columnKeys[j]]!==undefined){
						record.push(records[i][columnKeys[j]]);
					}
				}
				flowData.records.push({
					norrisRecordID : records[i].norrisRecordID,
					value: record,
					appearance: appearance
				});
			}
		}
		configJSON.data.push(flowData);
	}
	configJSON.properties.flows=flowProp;
	return configJSON;
};

module.exports = Table;
