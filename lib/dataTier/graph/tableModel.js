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
var FH = require('../../helpers/functionHelper.js');

//if params are valid build object else return error
function TableModel(params) {
	if(params===undefined || params.ID===undefined || typeof params.ID !== 'string'|| params.ID.trim() === ''){ // ID field is required
		console.log('Error: 342');
		return;
	}

	params.type = 'Table';
	
	this.parent.constructor.call(this, params);

	this._sortable=false;
	this._sort=null;
	this._maxItemsPage=10;
	this._headers=[];
	this._appearance= {
		border: {
			color: '#000000',
			width: 1
		},
		rowEven: {
			textColor: [],
			backgroundColor: []
		},
		rowOdd: {
			textColor: [],
			backgroundColor: []
		},
		headers: {
			textColor: [],
			backgroundColor: []			
		}
	};
	this._addRowOn='bottom';
	this._flows=[];

	this.updateProperties(params);
}

TableModel.prototype = Object.create(GraphModel.prototype);
TableModel.prototype.constructor = TableModel;
TableModel.prototype.parent = GraphModel.prototype;

//return JSON with properties
TableModel.prototype.getProperties = function() {
	var res = this.parent.getProperties.call(this);
	res.sortable = this._sortable;
	res.sort = this._sort;
	res.maxItemsPage = this._maxItemsPage;
	res.headers = this._headers;
	res.appearance = this._appearance;
	res.addRowOn = this._addRowOn;
	return res;
};

//updates valid properties
TableModel.prototype.updateProperties = function(params) {
	if (params !== undefined){
		var prop=this.parent.updateBaseProperties.call(this, params);
		if(params.sortable!==undefined && typeof params.sortable === 'boolean'){
			this._sortable=prop.sortable=params.sortable;
		}
		if(params.sort!==undefined && params.sort.column!==undefined && params.sort.ordering!==undefined && Array.isArray(params.sort.column) && Array.isArray(params.sort.ordering)){
			var check=true;
			for(var ii=0; ii<params.sort.ordering.length;ii++){
				if(!(params.sort.ordering[ii] === 'ASC' || params.sort.ordering[ii] === 'DESC')){
					check=false;
					break;
				}
			}
			if(check){
				this._sort=prop.sort=params.sort;
			}
		}
		if(params.maxItemsPage!==undefined && typeof params.maxItemsPage === 'number' && params.maxItemsPage > 0){
			this._maxItemsPage=prop.maxItemsPage=params.maxItemsPage;
		}
		if(params.headers!==undefined && Array.isArray(params.headers)){
			var prevHLength = this._headers.length;
			this._headers=params.headers;
			if(prevHLength === 0) {
				for(var i=0; i<params.headers.length; i++) {
					this._appearance.rowEven.textColor[i] = '#000000';
					this._appearance.rowEven.backgroundColor[i] = '#FFFFFF';
					this._appearance.rowOdd.textColor[i] = '#000000';
					this._appearance.rowOdd.backgroundColor[i] = '#FFFFFF';
					this._appearance.headers.textColor[i] = '#000000';
					this._appearance.headers.backgroundColor[i] = '#FFFFFF';
				}
			}
			else {
				if(this._headers.length > prevHLength) {
					//add columns to the appearance arrays
					for(var j=0; j<this._headers.length - prevHLength; j++) {
						this._appearance.rowEven.textColor.push('#000000');
						this._appearance.rowEven.backgroundColor.push('#FFFFFF');
						this._appearance.rowOdd.textColor.push('#000000');
						this._appearance.rowOdd.backgroundColor.push('#FFFFFF');
						this._appearance.headers.textColor.push('#000000');
						this._appearance.headers.backgroundColor.push('#FFFFFF');
					}
				}
				else if(this._headers.length < prevHLength) {
					//remove columns from the appearance arrays
					for(var k=0; k<prevHLength - this._headers.length; k++) {
						this._appearance.rowEven.textColor.pop();
						this._appearance.rowEven.backgroundColor.pop();
						this._appearance.rowOdd.textColor.pop();
						this._appearance.rowOdd.backgroundColor.pop();
						this._appearance.headers.textColor.pop();
						this._appearance.headers.backgroundColor.pop();
					}
				}
			}
			prop.headers=params.headers;
		}
		if(params.appearance!==undefined && typeof params.appearance) {
			if(params.appearance.border!==undefined && typeof params.appearance.border === 'object') {
				if(params.appearance.border.color !== undefined && typeof params.appearance.border.color === 'string' && FH.isHEX(params.appearance.border.color)) {
					this._appearance.border.color = params.appearance.border.color;
				}
				if(params.appearance.border.width !== undefined && typeof params.appearance.border.width === 'number') {
					this._appearance.border.width = params.appearance.border.width;
				}
			}
			if(params.appearance.rowEven!==undefined && typeof params.appearance.rowEven) {
				//setting rowEven values to the one in the parameters
				if(params.appearance.rowEven.textColor !== undefined && typeof params.appearance.rowEven.textColor === 'string' && FH.isHEX(params.appearance.rowEven.textColor)) {
					for(var f=0; f < this._appearance.rowEven.textColor.length; f++) {
						this._appearance.rowEven.textColor[f] = params.appearance.rowEven.textColor;
					}
				}
				else if(params.appearance.rowEven.textColor !== undefined && Array.isArray(params.appearance.rowEven.textColor)) {
					this._appearance.rowEven.textColor = params.appearance.rowEven.textColor;
				}
				if(params.appearance.rowEven.backgroundColor !== undefined && typeof params.appearance.rowEven.backgroundColor === 'string' && FH.isHEX(params.appearance.rowEven.backgroundColor)) {
					for(var l=0; l < this._appearance.rowEven.backgroundColor.length; l++) {
						this._appearance.rowEven.backgroundColor[l] = params.appearance.rowEven.backgroundColor;
					}
				}
				else if(params.appearance.rowEven.backgroundColor !== undefined && Array.isArray(params.appearance.rowEven.backgroundColor)) {
					this._appearance.rowEven.backgroundColor = params.appearance.rowEven.backgroundColor;
				}
			}
			if(params.appearance.rowOdd!==undefined && typeof params.appearance.rowOdd) {
				//setting rowOdd values to the one in the parameters
				if(params.appearance.rowOdd.textColor !== undefined && typeof params.appearance.rowOdd.textColor === 'string' && FH.isHEX(params.appearance.rowOdd.textColor)) {
					for(var m=0; m < this._appearance.rowOdd.textColor.length; m++) {
						this._appearance.rowOdd.textColor[m] = params.appearance.rowOdd.textColor;
					}
				}
				else if(params.appearance.rowOdd.textColor !== undefined && Array.isArray(params.appearance.rowOdd.textColor)) {
					this._appearance.rowOdd.textColor = params.appearance.rowOdd.textColor;
				}
				if(params.appearance.rowOdd.backgroundColor !== undefined && typeof params.appearance.rowOdd.backgroundColor === 'string' && FH.isHEX(params.appearance.rowOdd.backgroundColor)) {
					for(var n=0; n < this._appearance.rowOdd.backgroundColor.length; n++) {
						this._appearance.rowOdd.backgroundColor[n] = params.appearance.rowOdd.backgroundColor;
					}
				}
				else if(params.appearance.rowOdd.backgroundColor !== undefined && Array.isArray(params.appearance.rowOdd.backgroundColor)) {
					this._appearance.rowOdd.backgroundColor = params.appearance.rowOdd.backgroundColor;
				}
			}
			if(params.appearance.headers!==undefined && typeof params.appearance.headers) {
				//setting headers values to the one in the parameters
				if(params.appearance.headers.textColor !== undefined && typeof params.appearance.headers.textColor === 'string' && FH.isHEX(params.appearance.headers.textColor)) {
					for(var r=0; r < this._appearance.headers.textColor.length; r++) {
						this._appearance.headers.textColor[r] = params.appearance.headers.textColor;
					}
				}
				else if(params.appearance.headers.textColor !== undefined && Array.isArray(params.appearance.headers.textColor)) {
					this._appearance.headers.textColor = params.appearance.headers.textColor;
				}
				if(params.appearance.headers.backgroundColor !== undefined && typeof params.appearance.headers.backgroundColor === 'string' && FH.isHEX(params.appearance.headers.backgroundColor)) {
					for(var s=0; s < this._appearance.headers.backgroundColor.length; s++) {
						this._appearance.headers.backgroundColor[s] = params.appearance.headers.backgroundColor;
					}
				}
				else if(params.appearance.headers.backgroundColor !== undefined && Array.isArray(params.appearance.headers.backgroundColor)) {
					this._appearance.headers.backgroundColor = params.appearance.headers.backgroundColor;
				}
			}
			prop.appearance=params.appearance;
		}
		if(params.addRowOn!==undefined && typeof params.addRowOn === 'string' && (params.addRowOn==='bottom' || params.addRowOn==='top')){
			this._addRowOn=prop.addRowOn=params.addRowOn;
		}
		return prop;
	}
	//return error
};

//return JSON with all data
TableModel.prototype.getData = function() {
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

//if flow is valid, add it to flows
TableModel.prototype.addFlow = function(flow) {
	if(flow instanceof TableFlowModel) {
		this._flows.push(flow);
	}
};

//delete flow specified
TableModel.prototype.deleteFlow = function(ID) {
	if(typeof ID === 'string') {
		for(var i=0; i < this._flows.length; i++) {
			if(this._flows[i].getProperties().ID === ID) {
				this._flows.splice(i, 1);
			}
		}
	}
};

//delete all flows
TableModel.prototype.deleteAllFlows = function() {
	this._flows = [];
};

//update record specified
TableModel.prototype.updateRecord = function(flowID, ID, newRecord) {
	var filteredFlows = this._flows.filter(function(flow) {return flow.getProperties().ID === flowID;});
	if(filteredFlows.length > 0) {
		var flow = filteredFlows[0];
		return flow.updateRecord(ID, newRecord);
	}
	else {
		console.log('Error: 241');
		return 241;
	}
};

//add record specified
TableModel.prototype.addRecord = function(flowID, record) {
	var filteredFlows = this._flows.filter(function(flow) {return flow.getProperties().ID === flowID;});
	if(filteredFlows.length > 0) {
		var flow = filteredFlows[0];
		return flow.addRecord(record);
	}
	else {
		return 241;
	}
};

module.exports = TableModel;