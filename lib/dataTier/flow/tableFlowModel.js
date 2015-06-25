/*jshint node: true, -W106 */
'use strict';

/*
* Name : tableFlowModel.js
* Module : Lib::DataTier::tableFlowModel
* Location : /lib/dataTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-15   Filippo Rampado    Initial code
* =========================================================
*/
var FlowModel = require('./flowModel.js');
var Helper = require('../../helpers/functionHelper.js');

function TableFlowModel(params) {
	if(params===undefined || params.ID===undefined || typeof params.ID !== 'string'|| params.ID.trim() === ''){ // ID field is required
		console.log('Error: 242');
		return;
	}

	params.type = 'TableFlow';
	this.parent.constructor.call(this, params);

	this._columnKeys=[];
	this._columnFormats=null;
	this._maxItems=50;//items displayed
	this._maxItemsSaved=500; //items saved
	
	this.updateProperties(params);
}

TableFlowModel.prototype = Object.create(FlowModel.prototype);
TableFlowModel.prototype.constructor = TableFlowModel;
TableFlowModel.prototype.parent = FlowModel.prototype;

TableFlowModel.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this.parent.updateBaseProperties.call(this, params);
		if(params.columnKeys!==undefined && Array.isArray(params.columnKeys) && params.columnKeys.length>0){
			var validKeys=true;
			var keys=params.columnKeys.length;
			for (var i=0; i<keys; i++){
				if (typeof params.columnKeys[i]!=='string'){
					validKeys=false;
				}
			}
			if (validKeys){
				this._columnKeys=params.columnKeys;
			}
			prop.columnKeys=params.columnKeys;
		}
		if(params.columnFormats!==undefined && typeof params.columnFormats==='object'){
			var validFormats=true;
			var nkeys=params.columnKeys.length;
			for (var j=0; j<nkeys; j++){
				if (params.columnFormats[this._columnKeys[j]]!==undefined && !Helper.isValidFormat(params.columnFormats[this._columnKeys[j]])){
					validFormats=false;
				}
			}
			if (validFormats){
				this._columnFormats=params.columnFormats;
			}
			prop.columnFormats=params.columnFormats;
		}
		if(params.maxItems!==undefined && typeof params.maxItems==='number' && params.maxItems>=0){
			this._maxItems=prop.maxItems=params.maxItems;
		}
		if(params.maxItemsSaved!==undefined && typeof params.maxItemsSaved==='number' && params.maxItemsSaved>=0){
			this._maxItemsSaved=prop.maxItemsSaved=params.maxItemsSaved;
		}
		return prop;
	}
	//return error
};

TableFlowModel.prototype.addRecord = function(rec){
	var record=rec;
	if(record!==undefined && record!==null && typeof record === 'object'){
		if (rec.appearance!==undefined && Array.isArray(rec.appearance) && rec.appearance.length!==0){
			var valid=true;
			for (var key in rec.appearance){
				if (rec.appearance[key].bg===undefined ||
					!Helper.isHEX(rec.appearance[key].bg) ||
					rec.appearance[key].text===undefined ||
					!Helper.isHEX(rec.appearance[key].text)){
					valid=false;
					break;
				}
			}
			if (valid){
				record.appearance=rec.appearance;
			}
			else{
				record.appearance=undefined;
			}
		}
		if (this._records.length===this._maxItemsSaved){
			//delete first element
			this._records.splice(0, 1);
		}
		this._records.push(record);
		var index=this._records.length-1;
		var ID=this.generateNorrisRecordID(index);
		this._records[index].norrisRecordID=ID;
		this.validateRecord(index);
		return ID;
	}
	return 143;
};


TableFlowModel.prototype.updateRecord = function(ID, record){
	if (record === undefined || record === null || typeof record !== 'object'|| Array.isArray(record)){
		return 141;
	}
	if (typeof ID==='string' && ID.indexOf(this._ID) !== -1) {
		var records=this._records.length;
		var i=0;
		var found=false;
		while (i<records && (!found)){
			if (this._records[i].norrisRecordID===ID){
				found=true;
			}
			else{
				i++;
			}
		}//while
		if (found){//in records[i] there is the ID						
			var oldID=this._records[i].norrisRecordID;
			this._records[i]=record;
			if (record.appearance!==undefined && Array.isArray(record.appearance) && record.appearance.length!==0){
				var valid=true;
				for (var key in record.appearance){
					if (record.appearance[key].bg===undefined ||
						!Helper.isHEX(record.appearance[key].bg) ||
						record.appearance[key].text===undefined ||
						!Helper.isHEX(record.appearance[key].text)){
						valid=false;
						break;
					}
				}
				if (valid){
					this._records[i].appearance=record.appearance;
				}
				else{
					this._records[i].appearance=undefined;
				}
			}
			this._records[i].norrisRecordID=oldID;
			this.validateRecord(i);
			return true;
		}
		//no ID in records
		return 142;
	}
	//invalid ID
	return 142;
};

TableFlowModel.prototype.getProperties = function(){
	var prop=this.parent.getProperties.call(this);
	prop.columnKeys=this._columnKeys;
	prop.columnFormats=this._columnFormats;
	prop.maxItems=this._maxItems;
	prop.maxItemsSaved=this._maxItemsSaved;
	return prop;
};

module.exports = TableFlowModel;