/*jshint node: true, -W106 */
'use strict';

/*
* Name : barChartModel.js
* Module : Lib::DataTier::BarChartModel
* Location : /lib/dataTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-12   Samuele Zanella    Initial code
* =========================================================
*/

var GraphModel = require('./graphModel.js');
var BarChartFlowModel = require('../flow/barChartFlowModel.js');
var AxisModel = require('../graph/axisModel.js');

function BarChartModel(params) {
	if (params === undefined){
		return;
	}

	params.type = 'BarChart';
	
	this.parent.constructor.call(this, params);

	this._headers=[];
	this._barOrientation='';
	this._sortable=false;
	this._xAxis= new AxisModel();
	this._yAxis= new AxisModel();
	this._backgroundColor='#FFFFFF';
	this._flows=[];

	if(params.headers!==undefined && Array.isArray(params.headers)){
		this._headers=params.headers;
	}
	if(params.barOrientation!==undefined && typeof params.barOrientation === 'string'/*POSSIBLE VALUES*/){
		this._barOrientation=params.barOrientation;
	}
	if(params.sortable!==undefined && typeof params.sortable === 'boolean'){
		this._sortable=params.sortable;
	}
	if(params.xAxis!==undefined){
		this._xAxis.updateProperties(params.xAxis);
	}
	if(params.yAxis!==undefined){
		this._yAxis.updateProperties(params.yAxis);
	}
	if(params.backgroundColor!==undefined && (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(params.backgroundColor))){
		this._backgroundColor=params.backgroundColor;
	}
}

BarChartModel.prototype = Object.create(GraphModel.prototype);
BarChartModel.prototype.constructor = BarChartModel;
BarChartModel.prototype.parent = GraphModel.prototype;


BarChartModel.prototype.getProperties = function() {
	var res = this.parent.getProperties.call(this);
	res.headers = this._headers;
	res.barOrientation = this._barOrientation;
	res.sortable = this._sortable;
	res.xAxis = this._xAxis.getProperties();
	res.yAxis = this._yAxis.getProperties();
	res.backgroundColor = this._backgroundColor;
	return res;
};

BarChartModel.prototype.updateProperties = function(params) {
	if (params !== undefined){
		this.parent.updateProperties.call(this, params);
		if(params.headers!==undefined && Array.isArray(params.headers)){
			this._headers=params.headers;
		}
		if(params.barOrientation!==undefined && typeof params.sortable === 'boolean'){
			this._barOrientation=params.barOrientation;
		}
		if(params.sortable!==undefined && typeof params.sortable === 'boolean'){
			this._sortable=params.sortable;
		}
		if(params.xAxis!==undefined){
			this._xAxis.updateProperties(params.xAxis);
		}
		if(params.yAxis!==undefined){
			this._yAxis.updateProperties(params.yAxis);
		}
		if(params.backgroundColor!==undefined && (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(params.backgroundColor))){
			this._backgroundColor=params.backgroundColor;
		}
	}
};

BarChartModel.prototype.getData = function() {
	return this._flows;
};

BarChartModel.prototype.addFlow = function(flow) {
	if(flow instanceof BarChartFlowModel) {
		this._flows.push(flow);
	}
};

BarChartModel.prototype.deleteFlow = function(ID) {
	if(typeof ID === 'string') {
		for(var i=0; i < this._flows.length; i++) {
			if(this._flows[i].getProperties().ID === ID) {
				this._flows.splice(i, 1);
			}
		}
	}
};

BarChartModel.prototype.deleteAllFlows = function() {
	this._flows = [];
};

BarChartModel.prototype.updateRecord = function(flowID, index, newRecord) {
	var filteredFlows = this._flows.filter(function(flow) {return flow.getProperties().ID === flowID;});
	if(filteredFlows.length > 0) {
		var flow = filteredFlows[0];
		return flow.updateRecord(index, newRecord);
	}
	else {
		console.log('Error: 211');
		return 211;
	}
};

module.exports = BarChartModel;