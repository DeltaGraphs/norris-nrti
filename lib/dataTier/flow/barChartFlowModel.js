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

	this.updateProperties(params);

	//adds the given records to the flow
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

//updates the flow properties
BarChartFlowModel.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this.parent.updateBaseProperties.call(this, params);
		if(params.indexKey!==undefined && typeof params.indexKey === 'string'){
			this._indexKey=prop.indexKey=params.indexKey;
		}
		if(params.valueKey!==undefined && typeof params.valueKey === 'string'){
			this._valueKey=prop.valueKey=params.valueKey;
		}
		if(params.indexFormat!==undefined && Helper.isValidFormat(params.indexFormat)){
			this._indexFormat=prop.indexFormat=params.indexFormat;
		}
		if(params.valueFormat!==undefined && Helper.isValidFormat(params.valueFormat)){
			this._valueFormat=prop.valueFormat=params.valueFormat;
		}
		if(params.flowColor!==undefined && Helper.isHEX(params.flowColor)){
			this._flowColor=prop.flowColor=params.flowColor;
		}
		return prop;
	}
	//return error
};

//updates a single record, given its index and the new value
BarChartFlowModel.prototype.updateRecord = function(index, record){
	if (record === undefined || record === null || typeof record !== 'object'|| Array.isArray(record)){
		return 111;
	}
	//checks if it's given a valid index
	if ((typeof index === 'number') && (index < this._records.length && index >= 0)){
		var oldID=this._records[index].norrisRecordID;
		this._records[index]=JSON.parse(JSON.stringify(record));
		this._records[index].norrisRecordID=oldID;
		this.validateRecord(index);
		return true;
	}
	//invalid index
	return 112;
};

//returns the flow properties
BarChartFlowModel.prototype.getProperties = function(){
	var prop=this.parent.getProperties.call(this);
	prop.indexKey=this._indexKey;
	prop.valueKey=this._valueKey;
	prop.indexFormat=this._indexFormat;
	prop.valueFormat=this._valueFormat;
	prop.flowColor=this._flowColor;
	return prop;

};

//returns a record given its index
BarChartFlowModel.prototype.getRecordByIndex = function(index){
	if (index!==undefined && index>=0 && index<this._records.length){
		return this._records[index];
	}
};

module.exports = BarChartFlowModel;