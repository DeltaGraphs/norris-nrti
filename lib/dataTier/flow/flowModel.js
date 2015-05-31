/*jshint node: true, -W106 */
'use strict';

/*
* Name : graphModel.js
* Module : Lib::DataTier::FlowModel
* Location : /lib/dataTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-14   Filippo Rampado    Initial code
* =========================================================
*/

var FilterModel = require('./filterModel.js');
var Helper = require('../../helpers/functionHelper.js');

function FlowModel(params) {
	if(params===undefined || params.ID===undefined || typeof params.ID !== 'string'|| params.ID.trim() === ''){ // ID field is required
		console.log('Error: 251');
		return;
	}

	this._ID=params.ID;
	this._name='';
	this._type='';
	this._filters=null;
	this._records=[];

	if(typeof params.type === 'string' && (params.type==='BarChartFlow' || params.type==='LineChartFlow' || params.type==='MapChartFlow' || params.type==='TableFlow')){
        this._type=params.type;
    }
	this.updateProperties(params);
}

FlowModel.prototype.generateNorrisRecordID = function(number){
	var date = new Date();
	if (number !== undefined && typeof number === 'number'){
		return this._ID.concat(date.getTime()).concat(number);
	}
	return this._ID.concat(date.getTime()).concat(0);
};

FlowModel.prototype.getProperties = function(){
	var f=null;
	if (this._filters!==null){
		f=this._filters.getFilterText();
	}
	return {
		ID: this._ID,
		name: this._name,
		filters: f
	};
};

FlowModel.prototype.getData = function(){
	var flowData=[];
	var records= this._records.length;

	for(var i=0; i<records; i++){
		flowData[i]=this._records[i];
	}//for records

	return flowData;
};

FlowModel.prototype.validateData = function(){
	if (this._filters !== null){
		var records= this._records.length;
		for (var i=0; i<records; i++){
			this.validateRecord(i);
		}
	}
};

FlowModel.prototype.validateRecord = function(index){
	if (this._filters === null){
		this._records[index].norrisRecordIsValid = true;
	}
	if (this._filters !== null && typeof index === 'number' && index>=0 && index<this._records.length){
		if (this._filters.validateRecord(this._records[index]) === true){
			this._records[index].norrisRecordIsValid = true;
		}
		if (this._filters.validateRecord(this._records[index]) === false){
			this._records[index].norrisRecordIsValid = false;
		}
	}
};

FlowModel.prototype.updateProperties = function(params) {
	if (params !== undefined){
		//ID field can't be modified
		var prop={};
		if(params.name!==undefined && typeof params.name === 'string'){
			this._name=prop.name=params.name;
		}

		if(typeof params.filters === 'string'){
			var filter=new FilterModel(params.filters);
			if (filter.hasOwnProperty('_filterText')){	//valid FilterModel
				this._filters = filter;
				prop.filters=params.filters;
				this.validateData();
			}
		}
		return prop;
	}
	return 252;
};

FlowModel.prototype.converter = function(record, key, format) {
	return Helper.converter(record,key,format);
};

module.exports = FlowModel;
