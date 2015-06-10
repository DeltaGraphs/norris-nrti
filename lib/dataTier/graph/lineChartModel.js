/*jshint node: true, -W106 */
'use strict';

/*
* Name : lineChartModel.js
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
var LineChartFlowModel = require('../flow/lineChartFlowModel.js');
var AxisModel = require('../graph/axisModel.js');
var Helper = require('../../helpers/functionHelper.js');

function LineChartModel(params) {
	if(params===undefined || params.ID===undefined || typeof params.ID !== 'string'|| params.ID.trim() === ''){ // ID field is required
		console.log('Error: 322');
		return;
	}

	params.type = 'LineChart';
	
	this.parent.constructor.call(this, params);

	this._xAxis=new AxisModel();
	this._yAxis=new AxisModel();
	this._backgroundColor='#FFFFFF';
	this._flows=[];
	this._viewFinder=false;
	this._interpolation='linear';//linear, step, basis, cardinal, monotone	
	this._horizontalGrid=false;
	this._verticalGrid=false;
	this._legendOnPoint=false;

	this.updateProperties(params);
}

LineChartModel.prototype = Object.create(GraphModel.prototype);
LineChartModel.prototype.constructor = LineChartModel;
LineChartModel.prototype.parent = GraphModel.prototype;

LineChartModel.prototype.getProperties = function() {
	var res = this.parent.getProperties.call(this);
	res.horizontalGrid = this._horizontalGrid;
	res.verticalGrid = this._verticalGrid;
	res.viewFinder = this._viewFinder;
	res.xAxis = this._xAxis.getProperties();
	res.yAxis = this._yAxis.getProperties();
	res.interpolation=this._interpolation;
	res.backgroundColor = this._backgroundColor;
	res.legendOnPoint = this._legendOnPoint;
	return res;
};

LineChartModel.prototype.updateProperties = function(params) {
	if (params !== undefined){
		var prop=this.parent.updateBaseProperties.call(this, params);
		if(params.xAxis!==undefined){
			this._xAxis.updateProperties(params.xAxis);
			prop.xAxis=this._xAxis.getProperties();
		}
		if(params.yAxis!==undefined){
			this._yAxis.updateProperties(params.yAxis);
			prop.yAxis=this._yAxis.getProperties();
		}
		if(params.backgroundColor!==undefined && (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(params.backgroundColor))){
			this._backgroundColor=prop.backgroundColor=params.backgroundColor;
		}
		if(params.horizontalGrid!==undefined && typeof params.horizontalGrid === 'boolean'){
			this._horizontalGrid=prop.horizontalGrid=params.horizontalGrid;
		}
		if(params.verticalGrid!==undefined && typeof params.verticalGrid === 'boolean'){
			this._verticalGrid=prop.verticalGrid=params.verticalGrid;
		}
		if(params.viewFinder!==undefined && typeof params.viewFinder === 'boolean'){
			this._viewFinder=prop.viewFinder=params.viewFinder;
		}
		if(params.interpolation!==undefined && Helper.isValidInterpolation(params.interpolation)){
			this._interpolation=params.interpolation;
		}
		if(params.legendOnPoint!==undefined && typeof params.legendOnPoint === 'boolean'){
			this._legendOnPoint=prop.legendOnPoint=params.legendOnPoint;
		}
		return prop;
	}
	//return error;
};

LineChartModel.prototype.getData = function() {
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
		return flow.updateRecord(index, newRecord);
	}
	else {
		console.log('Error: 221');
		return 221;
	}
};

LineChartModel.prototype.addRecord = function(flowID, record) {
	var filteredFlows = this._flows.filter(function(flow) {return flow.getProperties().ID === flowID;});
	if(filteredFlows.length > 0) {
		var flow = filteredFlows[0];
		return flow.addRecord(record);
	}
	else {
		console.log('Error: 221');
		return 221;
	}
};

module.exports = LineChartModel;