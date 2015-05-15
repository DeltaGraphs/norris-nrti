/*jshint node: true, -W106 */
'use strict';

/*
* Name : barChartFlowModel.js
* Module : Lib::DataTier::BarChartFlowModel
* Location : /lib/dataTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-14   Matteo Furlan      Initial code
* =========================================================
* 0.0.2     2015-05-15   Filippo Rampado    Add first methods
* =========================================================
*/
var FlowModel = require('./flowModel.js');
var Helper = require('../../helpers/functionHelper.js');

function BarChartFlowModel(params, records) {

	params.type = 'BarChartFlow';
	this.parent.constructor.call(this, params);

	this._indexKey=null;
	this._valueKey=null;
	this._indexFormat=null;	//raw data will be displayed
	this._valueFormat=null;	//raw data will be displayed
	this._flowColor=null;	//will be random on frontEnd

	if(params.indexKey!==undefined && typeof params.indexKey === 'string'){
		this._indexKey=params.indexKey;
	}
	if(params.valueKey!==undefined && typeof params.valueKey === 'string'){
		this._valueKey=params.valueKey;
	}
	if(params.indexFormat!==undefined && Helper.isValidFormat(params.indexFormat)){
		this._indexFormat=params.indexFormat;
	}
	if(params.valueFormat!==undefined && Helper.isValidFormat(params.valueFormat)){
		this._valueFormat=params.valueFormat;
	}
	if(params.flowcolor!==undefined && (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(params.flowcolor))){
		this._flowcolor=params.flowcolor;
	}

	if(records!==undefined && records.isArray()){
		var nRecords=params.records.length;
		for (var i=0; i<nRecords; i++){
			this._records[i]=records[i];
			this._records[i].norrisRecordID=this.generateNorrisRecordID(i);
		}
		this.validateData();
	}
}

BarChartFlowModel.prototype = Object.create(FlowModel.prototype);
BarChartFlowModel.prototype.constructor = BarChartFlowModel;
BarChartFlowModel.prototype.parent = FlowModel.prototype;

module.exports = BarChartFlowModel;