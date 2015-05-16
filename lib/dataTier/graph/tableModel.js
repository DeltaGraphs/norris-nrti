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
	this._sort=null;
	this._maxItemsPage=10;
	this._headers=[];
	this._addRowOn='bottom';
	this._flows=[];

	if(params.sortable!==undefined && typeof params.sortable === 'boolean'){
		this._sortable=params.sortable;
	}
	if(params.sort!==undefined && params.sort.column!==undefined && params.sort.ordering!==undefined && typeof params.sort.column === 'string' && typeof params.sort.ordering === 'string' && (params.sort.ordering === 'ASC' || params.sort.ordering === 'DESC')){
		this._sort=params.sort;
	}
	if(params.maxItemsPage!==undefined && typeof params.maxItemsPage === 'number' && params.maxItemsPage > 0){
		this._maxItemsPage=params.maxItemsPage;
	}
	if(params.headers!==undefined && typeof params.headers === 'string'){
		this._headers=params.headers;
	}
	if(params.addRowOn!==undefined && typeof params.addRowOn === 'string' && (params.addRowOn==='bottom' || params.addRowOn==='top')){
		this._addRowOn=params.addRowOn;
	}
}

TableModel.prototype = Object.create(GraphModel.prototype);
TableModel.prototype.constructor = TableModel;
TableModel.prototype.parent = GraphModel.prototype;

TableModel.prototype.getProperties = function() {
	var res = this.parent.getProperties.call(this);
	res.sortable = this._sortable;
	res.sort = this._sort;
	res.maxItemsPage = this._maxItemsPage;
	res.headers = this._headers;
	res.addRowOn = this._addRowOn;
	return res;
};

TableModel.prototype.updateProperties = function(params) {
	if (params !== undefined){
		this.parent.updateProperties.call(this, params);
		
		if(params.sortable!==undefined && typeof params.sortable === 'boolean'){
			this._sortable=params.sortable;
		}
		if(params.sort!==undefined && params.sort.column!==undefined && params.sort.ordering!==undefined && typeof params.sort.column === 'string' && typeof params.sort.ordering === 'string' && (params.sort.ordering === 'ASC' || params.sort.ordering === 'DESC')){
			this._longitude=params.sort;
		}
		if(params.maxItemsPage!==undefined && typeof params.maxItemsPage === 'number' && params.maxItemsPage > 0){
			this._maxItemsPage=params.maxItemsPage;
		}
		if(params.headers!==undefined && typeof params.headers === 'string'){
			this._headers=params.headers;
		}
		if(params.addRowOn!==undefined && typeof params.addRowOn === 'string' && (params.addRowOn==='bottom' || params.addRowOn==='top')){
			this._addRowOn=params.addRowOn;
		}
	}
};

TableModel.prototype.addFlow = function(flow) {
	if(flow instanceof TableFlowModel) {
		this._flows.push(flow);
	}
};

TableModel.prototype.deleteFlow = function(ID) {
	if(typeof ID === 'string') {
		for(var i=0; i < this._flows.length; i++) {
			if(this._flows[i].getProperties().ID === ID) {
				this._flows.splice(i, 1);
			}
		}
	}
};

TableModel.prototype.deleteAllFlows = function() {
	this._flows = [];
};

TableModel.prototype.updateRecord = function(flowID, index, newRecord) {
	var filteredFlows = this._flows.filter(function(flow) {return flow.getProperties().ID === flowID;});
	if(filteredFlows.length > 0) {
		var flow = filteredFlows[0];
		flow.updateRecord(index, newRecord);
	}
};

TableModel.prototype.addRecord = function(flowID, record) {
	var filteredFlows = this._flows.filter(function(flow) {return flow.getProperties().ID === flowID;});
	if(filteredFlows.length > 0) {
		var flow = filteredFlows[0];
		return flow.addRecord(record);
	}
	else {
		return 231;
	}
};

module.exports = TableModel;