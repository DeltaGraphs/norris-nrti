/*jshint node: true, -W106 */
'use strict';

/*
* Name : mapChart.js
* Module : Lib::BusinessTier::MapChart
* Location : /lib/businessTier/mapChart
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-20   Filippo Rampado    Initial code
* =========================================================
* 0.0.2     2015-05-29   Matteo Furlan      fix structure of returned JSON by getConfigJSON
* =========================================================
*/

var Graph=require('./graph.js');
var MapChartFlow=require('../flow/mapChartFlow.js');
var MapChartModel=require('../../dataTier/graph/mapChartModel.js');

//if params are valid build object, else return error
function MapChart(params, page, graphSocket) {
	if (params===undefined){
		console.log('Error: 381');
		return;
	}
	if (!(page.hasOwnProperty('_page'))){
		console.log('Error: 383');
		return;
	}
	if (!(graphSocket.hasOwnProperty('_namespace'))){
		console.log('Error: 382');
		return;
	}
	var mc=new MapChartModel(params);
	if (!mc.hasOwnProperty('_ID')){
		return;
	}
	this.parent.constructor.call(this, page, graphSocket);
	this._dataMapChart=mc;
	this._flows=[];
}

MapChart.prototype = Object.create(Graph.prototype);
MapChart.prototype.constructor = Graph;
MapChart.prototype.parent = Graph.prototype;

//if ID is valid return flow specified 
MapChart.prototype.getFlowByID = function(ID){
	if (typeof ID==='string') {
		var flows=this._flows.length;
		var i=0;
		var found=false;
		while (i<flows && (!found)){
			if (this._flows[i]._dataMapChartFlow._ID===ID){
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
	return 282;
};

//if params and records are valid create and returns a flow object and notify graph clients
MapChart.prototype.createMapChartFlow = function(params){
	var mcf=new MapChartFlow(params, this._graphSocket);
	if (!mcf.hasOwnProperty('_dataMapChartFlow')){
		return 232;
	}
	this._flows.push(mcf);
	this._dataMapChart.addFlow(mcf._dataLineChartFlow);

	var data={};
	var prop={};
	prop.ID=params.ID;
	prop.name=mcf._dataMapChartFlow._name;
	prop.marker=mcf._dataMapChartFlow._marker;
	prop.trace=mcf._dataMapChartFlow._trace;
	prop.maxItems=mcf._dataMapChartFlow._maxItems;
	data.properties=prop;
	data.records=[];

	this._graphSocket.sendMessage('insertFlow', data);
	return mcf;
};

//if ID is valid delete flow and notify clients
MapChart.prototype.deleteFlow = function(ID){
	if (typeof ID==='string') {
		var flows=this._flows.length;
		var i=0;
		var found=false;
		while (i<flows && (!found)){
			if (this._flows[i]._dataMapChartFlow._ID===ID){
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
	return 283;
};

//delete all flows and notify clients
MapChart.prototype.deleteAllFlows = function(){
	while (this._flows.length>0){
		this._graphSocket.sendMessage('deleteFlow', {
			ID: this._flows[0]._dataMapChartFlow._ID
		});
		this._flows.splice(0, 1);
	}
};

MapChart.prototype.addRecord = function(flowID, record){
	var flow=this.getFlowByID(flowID);
	if (flow!==282){
		return flow.addRecord(record);
	}
	return 282;
};

MapChart.prototype.deleteRecord = function(flowID, ID){
	var flow=this.getFlowByID(flowID);
	if (flow!==282){
		return flow.deleteRecord(ID);
	}
	return 282;
};

//calls updateRecord of flow
MapChart.prototype.updateRecord = function(flowID, ID, record){
	var flow=this.getFlowByID(flowID);
	if (flow!==282){
		return flow.updateRecord(ID, record);
	}
	return 282;
};

//calls updateMovie of flow
MapChart.prototype.updateMovie = function(flowID, records){
	var flow=this.getFlowByID(flowID);
	if (flow!==282){
		return flow.updateMovie(records);
	}
	return 282;
};

//update properties and notify clients
MapChart.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this._dataMapChart.updateProperties(params);
		prop.ID = this._dataMapChart.getProperties().ID;
		this._graphSocket.sendMessage('updateGraphProp', prop);
		if(prop.title !== undefined) {
			this._page.graphChanged({eventType: 'updateGraph', params: prop});
		}
	}
};

//return graph properties
MapChart.prototype.getProperties = function(){
	return this._dataMapChart.getProperties();
};

//return JSON with graph properties, flows properties and data
MapChart.prototype.getConfigJSON = function(){
	var configJSON={properties: this._dataMapChart.getProperties()};
	var flowProp=[];
	var flows=this._flows.length;
	configJSON.data=[];
	for (var i=0; i<flows; i++){
		var flowData={};
		flowProp.push(this._flows[i]._dataMapChartFlow.getProperties());
		var records=this._flows[i]._dataMapChartFlow.getData();
		flowData.ID=this._flows[i]._dataMapChartFlow._ID;
		flowData.records=[];
		for (var j=0; j<records.length; j++){
			flowData.records.push({
				norrisRecordID : records[j].norrisRecordID,
				markerID: records[j][this._flows[i]._dataMapChartFlow._objectKey],
				value: [ //lat,long
					records[j][this._flows[i]._dataMapChartFlow._latitudeKey],
					records[j][this._flows[i]._dataMapChartFlow._longitudeKey]
				]
			});
		}
		configJSON.data.push(flowData);
	}
	configJSON.properties.flows=flowProp;
	return configJSON;
};

module.exports = MapChart;
