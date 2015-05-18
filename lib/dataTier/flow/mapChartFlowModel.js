/*jshint node: true, -W106 */
'use strict';

/*
* Name : mapChartFlowModel.js
* Module : Lib::DataTier::mapChartFlowModel
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

function MapChartFlowModel(params) {
	if(params===undefined || params.ID===undefined || typeof params.ID !== 'string'|| params.ID.trim() === ''){ // ID field is required
		console.log('Error: 232');
		return;
	}

	params.type = 'MapChartFlow';
	this.parent.constructor.call(this, params);

	this._longitudeKey=null;
	this._latitudeKey=null;
	this._longitudeFormat='coordinates';
	this._latitudeFormat='coordinates';
	this._flowColor=null;//will be random on frontEnd
	this._marker={
		type: 'shape',//shape, icon, text
		shape: 'circle',//circle, triangle, square, diamond
		icon: null,//path
		text: null,//string
	};
	this._trace={
		type: 'none',//none, line, poly
		coordinates: []
	};
	this._maxItems=50;//items displayed
	this._maxItemsSaved=500; //items saved


	if(params.longitudeKey!==undefined && typeof params.longitudeKey === 'string'){
		this._longitudeKey=params.longitudeKey;
	}
	if(params.latitudeKey!==undefined && typeof params.latitudeKey === 'string'){
		this._latitudeKey=params.latitudeKey;
	}
	if(params.longitudeFormat!==undefined && Helper.isValidMapFormat(params.longitudeFormat)){
		this._longitudeFormat=params.longitudeFormat;
	}
	if(params.latitudeFormat!==undefined && Helper.isValidMapFormat(params.latitudeFormat)){
		this._latitudeFormat=params.latitudeFormat;
	}
	if(params.flowColor!==undefined && Helper.isHEX(params.flowColor)){
		this._flowColor=params.flowColor;
	}
	if(params.marker!==undefined && Helper.isValidMapMarker(params.marker)){
		this._marker=params.marker;
	}
	if(params.trace!==undefined && Helper.isValidTrace(params.trace)){
		this._trace=params.trace;
	}
	if(params.maxItems!==undefined && typeof params.maxItems==='number' && params.maxItems>=0){
		this._maxItems=params.maxItems;
	}
	if(params.maxItemsSaved!==undefined && typeof params.maxItemsSaved==='number' && params.maxItemsSaved>=0){
		this._maxItemsSaved=params.maxItemsSaved;
	}
}

MapChartFlowModel.prototype = Object.create(FlowModel.prototype);
MapChartFlowModel.prototype.constructor = MapChartFlowModel;
MapChartFlowModel.prototype.parent = FlowModel.prototype;

MapChartFlowModel.prototype.addRecord = function(record){
	if(record!==undefined && typeof record === 'object'){
		this._records.push(record);
		var index=this._records.length-1;
		var ID=this.generateNorrisRecordID(index);
		this._records[index].norrisRecordID=ID;
		this.validateRecord(index);
		return ID;
	}
	console.log('Error: 133');
	return 133;
};

MapChartFlowModel.prototype.updateRecord = function(ID, record){
	if (record === undefined || record === null || typeof record !== 'object'|| Array.isArray(record)){
		return 131;
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
		return 132;
	}
	//invalid ID
	return 132;
};

MapChartFlowModel.prototype.deleteRecord = function(ID){
	if (ID!==undefined && typeof ID==='string' && ID.indexOf(this._ID) !== -1) {
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
		if (found){//in records[i] there is the ID_index						
			this._records.splice(i, 1);
			return true;
		}
	}
	return 134;
};

module.exports = MapChartFlowModel;