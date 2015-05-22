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
*/

/*var Socket=require('../../presentationTier/socket.js');
var Page=require('../page/page.js');*/
var Graph=require('./graph.js');
var MapChartFlow=require('../flow/mapChartFlow.js');
var MapChartModel=require('../../dataTier/graph/mapChartModel.js');
var Helper = require('../../helpers/functionHelper.js');

function MapChart(params, page, graphSocket) {
	if (params===undefined){
		console.log('Error: 381');
		return;
	}
	if (!(graphSocket.hasOwnProperty('_namespace'))){
		console.log('Error: 382');
		return;
	}
	if (!(page.hasOwnProperty('_page'))){
		console.log('Error: 383');
		return;
	}
	var mc=new MapChartModel(params);
	if (!mc.hasOwnProperty('ID')){
		return;
	}
	this.parent.constructor.call(this, page, graphSocket);
	this._dataMapChart=mc;
	this._flows=[];
	console.log('mapChart constructor success');
}

MapChart.prototype = Object.create(Graph.prototype);
MapChart.prototype.constructor = Graph;
MapChart.prototype.parent = Graph.prototype;

MapChart.prototype.getFlowByID = function(ID){
	if (typeof ID==='string') {
		var flows=this._flows.length;
		var i=0;
		var found=false;
		while (i<flows && (!found)){
			if (this._flows[i].ID===ID){
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

MapChart.prototype.createMapChartFlow = function(params){
	var mcf=new MapChartFlow(params, this._graphSocket);
	if (!mcf.hasOwnProperty('dataMapChartFlow')){
		return 232;
	}
	this._flows.push(mcf);

	var prop={ID: params.ID};
	if(params.name!==undefined && typeof params.name === 'string'){
		prop.name=params.name;
	}
	if(params.marker!==undefined && Helper.isValidMapMarker(params.marker)){
		prop.marker=params.marker;
	}
	if(params.trace!==undefined && Helper.isValidTrace(params.trace)){
		prop.trace=params.trace;
	}
	if(params.trailLength!==undefined && typeof params.trailLength==='number' && params.trailLength>=1){
		prop.trailLength=params.trailLength;
	}
	this._graphSocket.sendMessage('insertFlow', prop);

	return mcf;
};

MapChart.prototype.deleteFlow = function(ID){
	if (typeof ID==='string') {
		var flows=this._flows.length;
		var i=0;
		var found=false;
		while (i<flows && (!found)){
			if (this._flows[i].ID===ID){
				found=true;
			}
			else{
				i++;
			}
		}//while
		if (found){//in flows[i] there is the ID			
			this._graphSocket.sendMessage('deleteFlow', ID);
			this._flows.splice(i, 1);
			return true;
		}
		//no ID in flows
	}
	return 283;
};

MapChart.prototype.deleteAllFloww = function(){
	while (this._flows.length>0){
		this._graphSocket.sendMessage('deleteFlow', this._flows[0].ID);
		this._flows.splice(0, 1);
	}
};

MapChart.prototype.addRecord = function(flowID, record){
	return this.getFlowByID(flowID).addRecord(record);
};

MapChart.prototype.deleteRecord = function(flowID, ID){
	return this.getFlowByID(flowID).deleteRecord(ID);
};

MapChart.prototype.updateRecord = function(flowID, ID, record){
	return this.getFlowByID(flowID).updateRecord(ID, record);
};


MapChart.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this._dataMapChart.updateProperties(params);
		prop.ID=this._dataMapChart.ID;
		this._graphSocket.sendMessage('updateGraphProp', prop);
	}
};

MapChart.prototype.getConfigJSON = function(){
	var configJSON={};
	configJSON.properties=this._dataMapChart.getProperties();
	var flowProp=[];
	var flowData=[];
	var flows=this._flows.length;
	for (var i=0; i<flows; i++){
		flowProp.push(this._flows[i]._dataMapChartFlow.getProperties());
		var records=this._flows[i]._dataMapChartFlow.getData();
		flowData.push({
			ID: flowProp.ID,
			records: records
		});
	}
	configJSON.properties.flows=flowProp;
	configJSON.data=flowData;
	return configJSON;
};

module.exports = MapChart;
