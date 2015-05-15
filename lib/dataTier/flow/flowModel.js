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
//var Helper = require('../../helpers/functionHelper.js');

function FlowModel(params) {
	if(params===undefined) {
		console.log(); // decide the number of error
		return;
	}
	if(params.ID===undefined || typeof params.ID !== 'string'|| params.ID.trim() === ''){ // ID field is required
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

	if(typeof params.name === 'string'){
		this._name=params.name;
	}

	if(typeof params.filters === 'string'){ //da sostituire con is valid 
		this._filters = new FilterModel(params.filters);
	}
}

FlowModel.prototype.generateNorrisRecordID = function(number){
	var date = new Date();
	if (number !== undefined && typeof number === 'number'){
		return this._ID.concat(date.getTime()).concat(number);
	}
	return this._ID.concat(date.getTime()).concat(0);
};

FlowModel.prototype.getProperties = function(){
	var conditions = this._filters.getConditions(); //array
	return {
		ID: this._ID,
		name: this._name,
		filters: conditions
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

FlowModel.prototype.updateRecord = function(ID_index, record){
	if (record === undefined || record.isArray()){
		return 251;
	}
	if (ID_index.indexOf(this._ID) !== -1) {
		var records= this._records.length;
		var i=0;
		var found=false;
		while (i<records && !found){
			if (this._records[i].norrisRecordID===ID_index){
				found=true;
			}
			else{
				i++;
			}
		}//while
		if (found){//in records[i] there is the ID_index						
			this._records[i]=record;
			this._records[i].norrisRecordID=this.generateNorrisRecordID(0);
			this.validateRecord(i);
			return true;
		}
		//no ID_index in records
		return 252;
	}
	if (typeof ID_index === 'number' && ID_index < this._records.length){
		this._records[ID_index]=record;
		this._records[ID_index].norrisRecordID=this.generateNorrisRecordID(0);
		this.validateRecord(ID_index);
		return true;
	}
	//invalid ID_index
	return 252;
};

FlowModel.prototype.validateData = function(){
	if (this._filters !== undefined){
		var records= this._records.length;
		for (var i=0; i<records; i++){
			this.validateRecord(i);
		}
	}
};

FlowModel.prototype.validateRecord = function(index){
	if (this._filters !== undefined){
		if (this._filters.validateRecord(this._records[index]) === true){
			this._records[index].norrisIsValid = true;
		}
		if (this._filters.validateRecord(this._records[index]) === false){
			this._records[index].norrisIsValid = false;
		}
	}
};


// FH.converter.(record,key,format)

FlowModel.prototype.updateProperties = function(params) {
	if (params !== undefined){
		//ID field can't be modified
		if(params.name!==undefined && typeof params.name === 'string'){
			this._name=params.name;
		}

		if(params.filters === 'string'){ //da sostituire con is valid 
			this._filters = new FilterModel(params.filters);
			this.validateData();
		}
	}
};

module.exports = FlowModel;
