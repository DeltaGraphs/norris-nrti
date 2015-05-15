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

BarChartModel.prototype = new GraphModel({ID: 'ex'});
BarChartModel.prototype.constructor = BarChartModel;
BarChartModel.prototype.parent = GraphModel.prototype;

function BarChartModel(params) {

	params.type = 'BarChart';
	
	this.parent.constructor.call(this, params);

	this._headers=[];
	this._barOrientation='';
	this._sortable=false;
	this._xAxis='';
	this._yAxis='';
	this._backgroundColor='';
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
	if(params.xAxis!==undefined && typeof params.xAxis === 'string'){
		this._xAxis=params.xAxis;
	}
	if(params.yAxis!==undefined && typeof params.yAxis === 'string'){
		this._yAxis=params.yAxis;
	}
	if(params.backgroundColor!==undefined && (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(params.backgroundColor))){
		this._backgroundColor=params.backgroundColor;
	}
}


BarChartModel.prototype.getProperties = function() {
	var res = this.parent.getProperties.call(this);
	res.headers = this._headers;
	res.barOrientation = this._barOrientation;
	res.sortable = this._sortable;
	res.xAxis = this._xAxis;
	res.yAxis = this._yAxis;
	res.backgroundColor = this._backgroundColor;
	return res;
};

BarChartModel.prototype.updateProperties = function(params) {
	this.parent.updateProperties.call(params);
	if(params.headers!==undefined && Array.isArray(params.headers)){
		this._headers=params.headers;
	}
	if(params.barOrientation!==undefined && typeof params.sortable === 'boolean'){
		this._barOrientation=params.barOrientation;
	}
	if(params.sortable!==undefined && typeof params.sortable === 'boolean'){
		this._sortable=params.sortable;
	}
	if(params.xAxis!==undefined && typeof params.xAxis === 'string'){
		this._xAxis=params.xAxis;
	}
	if(params.yAxis!==undefined && typeof params.yAxis === 'string'){
		this._yAxis=params.yAxis;
	}
	if(params.backgroundColor!==undefined && (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(params.backgroundColor))){
		this._backgroundColor=params.backgroundColor;
	}
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