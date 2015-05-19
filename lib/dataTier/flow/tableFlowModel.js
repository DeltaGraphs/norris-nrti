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

function TableFlowModel(params) {
	if(params===undefined || params.ID===undefined || typeof params.ID !== 'string'|| params.ID.trim() === ''){ // ID field is required
		console.log('Error: 242');
		return;
	}

	params.type = 'TableFlow';
	this.parent.constructor.call(this, params);

	this._columnKeys=[];
	this._columnFormats=[];
	this._fontColorKey='#000000';//text black
	this._backgroungColorKey='#FFFFFF';//white background
	this._maxItems=50;//items displayed
	this._maxItemsSaved=500; //items saved

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
	}
	if(params.columnFormats!==undefined && Array.isArray(params.columnFormats) && params.columnFormats.length>0){
		var validFormat=true;
		var formats=params.columnFormats.length;
		for (var j=0; j<formats; j++){
			if (typeof params.columnFormats[j]!=='string'){
				validFormat=false;
			}
		}
		if (validFormat){
			this._columnFormats=params.columnFormats;
		}
	}
	if(params.fontColorKey!==undefined && typeof params.fontColorKey === 'string'){
		this._fontColorKey=params.fontColorKey;
	}
	if(params.backgroungColorKey!==undefined && typeof params.backgroungColorKey === 'string'){
		this._backgroungColorKey=params.backgroungColorKey;
	}
	if(params.maxItems!==undefined && typeof params.maxItems==='number' && params.maxItems>=0){
		this._maxItems=params.maxItems;
	}
	if(params.maxItemsSaved!==undefined && typeof params.maxItemsSaved==='number' && params.maxItemsSaved>=0){
		this._maxItemsSaved=params.maxItemsSaved;
	}
}

TableFlowModel.prototype = Object.create(FlowModel.prototype);
TableFlowModel.prototype.constructor = TableFlowModel;
TableFlowModel.prototype.parent = FlowModel.prototype;

TableFlowModel.prototype.addRecord = function(record){
	if(record!==undefined && record!==null && typeof record === 'object'){
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
			this._records[i]=record;
			this.validateRecord(i);
			return true;
		}
		//no ID in records
		return 142;
	}
	//invalid ID
	return 142;
};

module.exports = TableFlowModel;