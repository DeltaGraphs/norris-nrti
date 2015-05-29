/*jshint node: true, -W106 */
'use strict';

/*
* Name : mapChartModel.js
* Module : Lib::DataTier::MapChartModel
* Location : /lib/dataTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-13   Samuele Zanella    Initial code
* =========================================================
*/

var GraphModel = require('./graphModel.js');
var MapChartFlowModel = require('../flow/mapChartFlowModel.js');

function MapChartModel(params) {
	if(params===undefined || params.ID===undefined || typeof params.ID !== 'string'|| params.ID.trim() === ''){ // ID field is required
		console.log('Error: 332');
		return;
	}

	params.type = 'MapChart';
	
	this.parent.constructor.call(this, params);

	this._latitude=0;
	this._longitude=0;
	this._mapType='roadmap';
	this._mapWidth=3000;
	this._mapHeight=2000;
	this._flows=[];
	this._legendOnPoint=false;

	this.updateProperties(params);
}

MapChartModel.prototype = Object.create(GraphModel.prototype);
MapChartModel.prototype.constructor = MapChartModel;
MapChartModel.prototype.parent = GraphModel.prototype;

MapChartModel.prototype.getProperties = function() {
	var res = this.parent.getProperties.call(this);
	res.latitude = this._latitude;
	res.longitude = this._longitude;
	res.mapType = this._mapType;
	res.mapWidth = this._mapWidth;
	res.mapHeight = this._mapHeight;
	res.legendOnPoint = this._legendOnPoint;
	return res;
};

MapChartModel.prototype.updateProperties = function(params) {
	if (params !== undefined){
		var prop=this.parent.updateBaseProperties.call(this, params);
		if(params.latitude!==undefined && typeof params.latitude === 'number'){
			this._latitude=prop.latitude=params.latitude;
		}
		if(params.longitude!==undefined && typeof params.longitude === 'number'){
			this._longitude=prop.longitude=params.longitude;
		}
		if(params.mapType!==undefined && typeof params.mapType === 'string' && (params.mapType==='roadmap' || params.mapType==='satellite' || params.mapType==='hybrid' || params.mapType==='terrain')){
			this._mapType=prop.mapType=params.mapType;
		}
		if(params.mapWidth!==undefined && typeof params.mapWidth === 'number' && params.mapWidth>0){
			this._mapWidth=prop.mapWidth=params.mapWidth;
		}
		if(params.mapHeight!==undefined && typeof params.mapHeight === 'number' && params.mapHeight>0){
			this._mapHeight=prop.mapHeight=params.mapHeight;
		}
		if(params.legendOnPoint!==undefined && typeof params.legendOnPoint === 'boolean'){
			this._legendOnPoint=prop.legendOnPoint=params.legendOnPoint;
		}
		return prop;
	}
	return 331;
};

MapChartModel.prototype.getData = function() {
	var graphData=[];
	var flows= this._flows.length;

	//build graphData by iterating every flow in _flows
	for(var i=0; i<flows; i++){
		graphData[i]={
			properties: this._flows[i].getProperties(),
			data: this._flows[i].getData()
		};
	}//for flows

	return graphData;
};

MapChartModel.prototype.addFlow = function(flow) {
	if(flow instanceof MapChartFlowModel) {
		this._flows.push(flow);
	}
};

MapChartModel.prototype.deleteFlow = function(ID) {
	if(typeof ID === 'string') {
		for(var i=0; i < this._flows.length; i++) {
			if(this._flows[i].getProperties().ID === ID) {
				this._flows.splice(i, 1);
			}
		}
	}
};

MapChartModel.prototype.deleteAllFlows = function() {
	this._flows = [];
};

MapChartModel.prototype.updateRecord = function(flowID, ID, newRecord) {
	var filteredFlows = this._flows.filter(function(flow) {return flow.getProperties().ID === flowID;});
	if(filteredFlows.length > 0) {
		var flow = filteredFlows[0];
		return flow.updateRecord(ID, newRecord);
	}
	else {
		console.log('Error: 231');
		return 231;
	}
};

MapChartModel.prototype.addRecord = function(flowID, record) {
	var filteredFlows = this._flows.filter(function(flow) {return flow.getProperties().ID === flowID;});
	if(filteredFlows.length > 0) {
		var flow = filteredFlows[0];
		return flow.addRecord(record);
	}
	else {
		return 231;
	}
};

MapChartModel.prototype.deleteRecord = function(flowID, ID) {
	var filteredFlows = this._flows.filter(function(flow) {return flow.getProperties().ID === flowID;});
	if(filteredFlows.length > 0) {
		var flow = filteredFlows[0];
		return flow.deleteRecord(ID);
	}
	else {
		return 231;
	}
};

module.exports = MapChartModel;