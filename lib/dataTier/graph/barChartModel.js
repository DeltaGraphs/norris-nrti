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
var Helper = require('../../helpers/functionHelper.js');

//if params are valid build object else return error
function BarChartModel(params) {
	if(params===undefined || params.ID===undefined || typeof params.ID !== 'string'|| params.ID.trim() === ''){ // ID field is required
		console.log('Error: 312');
		return;
	}

	params.type = 'BarChart';
	this.parent.constructor.call(this, params);

	this._headers=[];
	this._barOrientation='V';
	this._sortable=false;
	this._xAxis= new AxisModel();
	this._yAxis= new AxisModel();
	this._groupingControl=false;
	this._backgroundColor='#FFFFFF';
	this._grid=true;
	this._legendOnPoint=false;
	this._flows=[];
	this.updateProperties(params);
}

BarChartModel.prototype = Object.create(GraphModel.prototype);
BarChartModel.prototype.constructor = BarChartModel;
BarChartModel.prototype.parent = GraphModel.prototype;

//if flow is valid, add it to flows
BarChartModel.prototype.addFlow = function(flow) {
	if(flow instanceof BarChartFlowModel) {
		this._flows.push(flow);
	}
};

//delete flow specified
BarChartModel.prototype.deleteFlow = function(ID) {
	if(typeof ID === 'string') {
		for(var i=0; i < this._flows.length; i++) {
			if(this._flows[i].getProperties().ID === ID) {
				this._flows.splice(i, 1);
			}
		}
	}
};

//delete all flows
BarChartModel.prototype.deleteAllFlows = function() {
	this._flows = [];
};

//return JSON with all data
BarChartModel.prototype.getData = function() {
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

//return JSON with properties
BarChartModel.prototype.getProperties = function() {
	var res = this.parent.getProperties.call(this);
	res.headers = this._headers;
	res.barOrientation = this._barOrientation;
	res.sortable = this._sortable;
	res.xAxis = this._xAxis.getProperties();
	res.yAxis = this._yAxis.getProperties();
	res.groupingControl = this._groupingControl=false;
	res.grid = this._grid;
	res.backgroundColor = this._backgroundColor;
	res.legendOnPoint = this._legendOnPoint;
	return res;
};

//updates valid properties
BarChartModel.prototype.updateProperties = function(params) {
	if (params !== undefined){
		var prop=this.parent.updateBaseProperties.call(this, params);
		if(params.headers!==undefined && Array.isArray(params.headers)){
			this._headers=prop.headers=params.headers;
		}
		if(params.barOrientation!==undefined && typeof params.barOrientation === 'string' && (params.barOrientation==='V' || params.barOrientation==='H')){
			this._barOrientation=prop.barOrientation=params.barOrientation;
		}
		if(params.sortable!==undefined && typeof params.sortable === 'boolean'){
			this._sortable=prop.sortable=params.sortable;
		}
		if(params.xAxis!==undefined){
			this._xAxis.updateProperties(params.xAxis);
			prop.xAxis=this._xAxis.getProperties();
		}
		if(params.yAxis!==undefined){
			this._yAxis.updateProperties(params.yAxis);
			prop.yAxis=this._yAxis.getProperties();
		}

		if(params.groupingControl!==undefined && typeof params.groupingControl === 'boolean'){
			this._groupingControl=prop.groupingControl=params.groupingControl;
		}
		
		if(params.backgroundColor!==undefined && Helper.isHEX(params.backgroundColor)){
			this._backgroundColor=prop.backgroundColor=params.backgroundColor;
		}
		if(params.grid!==undefined && typeof params.grid === 'boolean'){
			this._grid=prop.grid=params.grid;
		}
		if(params.legendOnPoint!==undefined && typeof params.legendOnPoint === 'boolean'){
			this._legendOnPoint=prop.legendOnPoint=params.legendOnPoint;
		}
		return prop;
	}
	//return error
};


//update record specified
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