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
	this._progressiveIndex=0;
	if(typeof params.type === 'string' && (params.type==='BarChartFlow' || params.type==='LineChartFlow' || params.type==='MapChartFlow' || params.type==='TableFlow')){
        this._type=params.type;
    }
	this.updateBaseProperties(params);
}

FlowModel.prototype.generateNorrisRecordID = function(){
	var date = new Date();
	if (this._progressiveIndex>99){
		this._progressiveIndex=0;
	}
	this._progressiveIndex++;
	return this._ID.concat('_').concat(date.getTime()).concat('_').concat(this._progressiveIndex);
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
	var records= this._records.length;
	for (var i=0; i<records; i++){
		this.validateRecord(i);
	}
};

FlowModel.prototype.validateRecord = function(index){
	if (typeof index === 'number' && index>=0 && index<this._records.length){
		this._records[index].norrisRecordIsValid = true;
		if (this._filters !== null){
			if (this._filters.validateRecord(this._records[index]) === true){
				this._records[index].norrisRecordIsValid = true;
			}
			if (this._filters.validateRecord(this._records[index]) === false){
				this._records[index].norrisRecordIsValid = false;
			}
		}
	}
};

FlowModel.prototype.updateBaseProperties = function(params) {
	if (params !== undefined){
		//ID field can't be modified
		var prop={};
		if(params.name!==undefined && typeof params.name === 'string'){
			this._name=prop.name=params.name;
		}

		if(params.filters !== undefined && typeof params.filters === 'string'){
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
