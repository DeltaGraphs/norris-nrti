/*jshint node: true, -W106 */
'use strict';

/*
* Name : linechartModel.js
* Module : Lib::DataTier::LineChartModel
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
var LineChartFlowModel = require('../flow/lineChartFlowModel.');

LineChartModel.prototype = GraphModel;
LineChartModel.prototype.constructor = LineChartModel;
LineChartModel.prototype.parent = GraphModel;

function LineChartModel(params) {
	
	this.parent.init.call(params);

	this._xAxis='';
	this._yAxis='';
	this._backgroundColor='';
	this._flows=[];
	this._viewFinder=false;
	this._horizontalGrid=false;
	this._verticalGrid=false;

	if(params.xAxis!==undefined && typeof params.xAxis === 'string'){
		this._xAxis=params.xAxis;
	}
	if(params.yAxis!==undefined && typeof params.yAxis === 'string'){
		this._yAxis=params.yAxis;
	}
	if(params.backgroundColor!==undefined && (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(params.backgroundColor))){
		this._backgroundColor=params.backgroundColor;
	}
	if(params.horizontalGrid!==undefined && typeof params.horizontalGrid === 'boolean'){
		this._horizontalGrid=params.horizontalGrid;
	}
	if(params.verticalGrid!==undefined && typeof params.verticalGrid === 'boolean'){
		this._verticalGrid=params.verticalGrid;
	}
	if(params.viewFinder!==undefined && typeof params.viewFinder === 'boolean'){
		this._viewFinder=params.viewFinder;
	}
}

LineChartModel.prototype.getProperties = function() {
	var res = this.parent.getProperties.call();
	res.horizontalGrid = this._horizontalGrid;
	res.verticalGrid = this._verticalGrid;
	res.viewFinder = this._viewFinder;
	res.xAxis = this._xAxis;
	res.yAxis = this._yAxis;
	res.backgroundColor = this._backgroundColor;
	return res;
};

LineChartModel.prototype.updateProperties = function(params) {
	this.parent.updateProperties.call(params);
	if(params.xAxis!==undefined && typeof params.xAxis === 'string'){
		this._xAxis=params.xAxis;
	}
	if(params.yAxis!==undefined && typeof params.yAxis === 'string'){
		this._yAxis=params.yAxis;
	}
	if(params.backgroundColor!==undefined && (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(params.backgroundColor))){
		this._backgroundColor=params.backgroundColor;
	}
	if(params.horizontalGrid!==undefined && typeof params.horizontalGrid === 'boolean'){
		this._horizontalGrid=params.horizontalGrid;
	}
	if(params.verticalGrid!==undefined && typeof params.verticalGrid === 'boolean'){
		this._verticalGrid=params.verticalGrid;
	}
	if(params.viewFinder!==undefined && typeof params.viewFinder === 'boolean'){
		this._viewFinder=params.viewFinder;
	}
};

LineChartModel.prototype.addFlow = function(flow) {
	if(flow instanceof LineChartFlowModel) {
		this._flows.push(flow);
	}
};

LineChartModel.prototype.deleteFlow = function(ID) {
	if(typeof ID === 'string') {
		for(var i=0; i < this._flows.length; i++) {
			if(this._flows[i].getProperties().ID === ID) {
				this._flows.splice(i, 1);
			}
		}
	}
};

LineChartModel.prototype.deleteAllFlows = function() {
	this._flows = [];
};

LineChartModel.prototype.updateRecord = function(flowID, index, newRecord) {
	var filteredFlows = this._flows.filter(function(flow) {return flow.getProperties().ID === flowID;});
	if(filteredFlows.length > 0) {
		var flow = filteredFlows[0];
		flow.updateRecord(index, newRecord);
	}
};

LineChartModel.prototype.addRecord = function(flowID, record) {
	var filteredFlows = this._flows.filter(function(flow) {return flow.getProperties().ID === flowID;});
	if(filteredFlows.length > 0) {
		var flow = filteredFlows[0];
		return flow.addRecord(record);
	}
	else {
		return 221;
	}
};

module.exports = LineChartModel;