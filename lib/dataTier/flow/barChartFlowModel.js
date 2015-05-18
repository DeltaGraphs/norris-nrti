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
	if(params===undefined || params.ID===undefined || typeof params.ID !== 'string'|| params.ID.trim() === ''){ // ID field is required
		console.log('Error: 212');
		return;
	}

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
	if(params.flowColor!==undefined && Helper.isHEX(params.flowColor)){
		this._flowColor=params.flowColor;
	}
	if(records!==undefined && Array.isArray(records)){
		var nRecords=records.length;
		for (var i=0; i<nRecords; i++){
			if (typeof records[i] === 'object'){
				this._records[i]=records[i];
				this._records[i].norrisRecordID=this.generateNorrisRecordID(i);
			}
		}
		this.validateData();
	}
}

BarChartFlowModel.prototype = Object.create(FlowModel.prototype);
BarChartFlowModel.prototype.constructor = BarChartFlowModel;
BarChartFlowModel.prototype.parent = FlowModel.prototype;

BarChartFlowModel.prototype.updateRecord = function(index, record){
	if (record === undefined || record === null || typeof record !== 'object'|| Array.isArray(record)){
		return 213;
	}
	if ((typeof index === 'number') && (index < this._records.length && index >= 0)){
		this._records[index]=record;
		this.validateRecord(index);
		return true;
	}
	//invalid index
	return 214;
};

module.exports = BarChartFlowModel;