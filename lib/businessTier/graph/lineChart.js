/*jshint node: true, -W106 */
'use strict';

/*
* Name : lineChart.js
* Module : Lib::BusinessTier::LineChart
* Location : /lib/businessTier/lineChart
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-31   Samuele Zanella    Initial code
* =========================================================
*/

/*var Socket=require('../../presentationTier/socket.js');
var Page=require('../page/page.js');*/
var Graph=require('./graph.js');
var LineChartFlow=require('../flow/lineChartFlow.js');
var LineChartModel=require('../../dataTier/graph/lineChartModel.js');

//if params are valid build object, else return error
function LineChart(params, page, graphSocket) {
	if (params===undefined){
		console.log('Error: 371');
		return;
	}
	if (!(graphSocket.hasOwnProperty('_namespace'))){
		console.log('Error: 372');
		return;
	}
	if (!(page.hasOwnProperty('_page'))){
		console.log('Error: 373');
		return;
	}
	var lc=new LineChartModel(params);
	if (!lc.hasOwnProperty('_ID')){
		return;
	}
	this.parent.constructor.call(this, page, graphSocket);
	this._dataLineChart=lc;
	this._flows=[];
}

LineChart.prototype = Object.create(Graph.prototype);
LineChart.prototype.constructor = Graph;
LineChart.prototype.parent = Graph.prototype;

//if ID is valid return flow specified 
LineChart.prototype.getFlowByID = function(ID){
	if (typeof ID==='string') {
		var flows=this._flows.length;
		var i=0;
		var found=false;
		while (i<flows && (!found)){
			if (this._flows[i]._dataLineChartFlow._ID===ID){
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
	return 272;
};

//if params and records are valid create and returns a flow object and notify graph clients
LineChart.prototype.createLineChartFlow = function(params){
	var lcf=new LineChartFlow(params, this._graphSocket);
	if (!lcf.hasOwnProperty('_dataLineChartFlow')){
		return 222;
	}
	this._flows.push(lcf);
	this._dataLineChart.addFlow(lcf._dataLineChartFlow);

	var data={};
	var prop={};
	prop.ID=params.ID;
	prop.name=lcf._dataLineChartFlow._name;
	prop.marker=lcf._dataLineChartFlow._marker;
	prop.flowColor=lcf._dataLineChartFlow._flowColor;
	prop.area=lcf._dataLineChartFlow._area;
	prop.maxItems=lcf._dataLineChartFlow._maxItems;
	data.properties=prop;
	data.records=[];

	this._graphSocket.sendMessage('insertFlow', data);
	return lcf;
};

//if ID is valid delete flow and notify clients
LineChart.prototype.deleteFlow = function(ID){
	if (typeof ID==='string') {
		var flows=this._flows.length;
		var i=0;
		var found=false;
		while (i<flows && (!found)){
			if (this._flows[i]._dataLineChartFlow._ID===ID){
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

//delete all flows and notify clients
LineChart.prototype.deleteAllFlows = function(){
	while (this._flows.length>0){
		this._graphSocket.sendMessage('deleteFlow', {
			ID: this._flows[0]._dataLineChartFlow._ID
		});
		this._flows.splice(0, 1);
	}
};

//calls addRecord of flow
LineChart.prototype.addRecord = function(flowID, record){
	var flow=this.getFlowByID(flowID);
	if (flow!==272){
		return flow.addRecord(record);
	}
	return 272;
};

//calls updateRecord of flow
LineChart.prototype.updateRecord = function(flowID, ID, record){
	var flow=this.getFlowByID(flowID);
	if (flow!==272){
		return flow.updateRecord(ID, record);
	}
	return 272;
};

//update properties and notify clients
LineChart.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this._dataLineChart.updateProperties(params);
		prop.ID = this._dataLineChart.getProperties().ID;
		this._graphSocket.sendMessage('updateGraphProp', prop);
		if(prop.title !== undefined) {
			this._page.graphChanged({eventType: 'updateGraph', params: prop});
		}
	}
};

//return graph properties
LineChart.prototype.getProperties = function(){
	return this._dataLineChart.getProperties();
};

//return JSON with graph properties, flows properties and data
LineChart.prototype.getConfigJSON = function(){
	var configJSON={properties: this._dataLineChart.getProperties()};
	var flowProp=[];
	var flows=this._flows.length;
	configJSON.data=[];
	for (var i=0; i<flows; i++){
		var flowData={};
		flowProp.push(this._flows[i]._dataLineChartFlow.getProperties());
		var records=this._flows[i]._dataLineChartFlow.getData();
		flowData.ID=this._flows[i]._dataLineChartFlow._ID;
		flowData.records=[];
		for (var j=0; j<records.length; j++){
			flowData.records.push({
				norrisRecordID : records[j].norrisRecordID,
				value: [ //x,y
					records[j][this._flows[i]._dataLineChartFlow._xKey],
					records[j][this._flows[i]._dataLineChartFlow._yKey]
				]
			});
		}
		configJSON.data.push(flowData);
	}
	configJSON.properties.flows=flowProp;
	return configJSON;
};

module.exports = LineChart;
