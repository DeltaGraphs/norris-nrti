/*jshint node: true, -W106 */
'use strict';

/*
* Name : tableModel.js
* Module : Lib::DataTier::TableModel
* Location : /lib/dataTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-16   Samuele Zanella    Initial code
* =========================================================
*/

var GraphModel = require('./graphModel.js');
var TableFlowModel = require('../flow/tableFlowModel.js');

function TableModel(params) {
	if (params === undefined){
		return;
	}

	params.type = 'Table';
	
	this.parent.constructor.call(this, params);

	this._sortable=false;
	this._maxItemsPage=0;
	this._headers=[];
	this.appearance=null;
	this._flows=[];

	if(params.latitude!==undefined && typeof params.latitude === 'string'){
		this._latitude=params.latitude;
	}
	if(params.longitude!==undefined && typeof params.longitude === 'string'){
		this._longitude=params.longitude;
	}
	if(params.scale!==undefined && typeof params.scale === 'number'){
		this._scale=params.scale;
	}
	if(params.mapType!==undefined && typeof params.mapType === 'string'){
		this._mapType=params.mapType;
	}
	if(params.zoom!==undefined && typeof params.zoom === 'boolean'){
		this._zoom=params.zoom;
	}
}

MapChartModel.prototype = Object.create(GraphModel.prototype);
MapChartModel.prototype.constructor = MapChartModel;
MapChartModel.prototype.parent = GraphModel.prototype;

MapChartModel.prototype.getProperties = function() {
	var res = this.parent.getProperties.call(this);
	res.latitude = this._latitude;
	res.longitude = this._longitude;
	res.scale = this._scale;
	res.mapType = this._mapType;
	res.zoom = this._zoom;
	return res;
};

MapChartModel.prototype.updateProperties = function(params) {
	if (params !== undefined){
		this.parent.updateProperties.call(this, params);
		
		if(params.latitude!==undefined && typeof params.latitude === 'string'){
			this._latitude=params.latitude;
		}
		if(params.longitude!==undefined && typeof params.longitude === 'string'){
			this._longitude=params.longitude;
		}
		if(params.scale!==undefined && typeof params.scale === 'number'){
			this._scale=params.scale;
		}
		if(params.mapType!==undefined && typeof params.mapType === 'string'){
			this._mapType=params.mapType;
		}
		if(params.zoom!==undefined && typeof params.zoom === 'boolean'){
			this._zoom=params.zoom;
		}
	}
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

MapChartModel.prototype.updateRecord = function(flowID, index, newRecord) {
	var filteredFlows = this._flows.filter(function(flow) {return flow.getProperties().ID === flowID;});
	if(filteredFlows.length > 0) {
		var flow = filteredFlows[0];
		flow.updateRecord(index, newRecord);
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

MapChartModel.prototype.deleteRecord = function(flowID, index) {
	var filteredFlows = this._flows.filter(function(flow) {return flow.getProperties().ID === flowID;});
	if(filteredFlows.length > 0) {
		var flow = filteredFlows[0];
		return flow.deleteRecord(index);
	}
	else {
		return 231;
	}
};

module.exports = MapChartModel;