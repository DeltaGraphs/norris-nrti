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
* 0.0.2     2015-05-22   Matteo Furlan      add updateMovie
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

	this._latitudeKey=null;
	this._longitudeKey=null;
	this._objectKey=null;
	this._latitudeFormat='coordinates';
	this._longitudeFormat='coordinates';
	this._marker={
		type: 'shape',//shape, icon, text
		shape: 'circle',//circle, triangle, square, diamond
		//icon: null,//path
		//text: null,//string
		//color: '#000'	//HEX
	};
	this._trace={
		type: 'none',//none, line, poly
		coordinates: []
		//strokeColor: '#FFF'	//HEX
		//fillColor: '#FFF'	//HEX
	};
	this._trailLength=999999;//length of trail
	this._maxItemsSaved=500; //items saved

	this.updateProperties(params);
}

MapChartFlowModel.prototype = Object.create(FlowModel.prototype);
MapChartFlowModel.prototype.constructor = MapChartFlowModel;
MapChartFlowModel.prototype.parent = FlowModel.prototype;

MapChartFlowModel.prototype.updateProperties = function(params){
	if (params!==undefined){
		var prop=this.parent.updateBaseProperties.call(this, params);
		if(params.longitudeKey!==undefined && typeof params.longitudeKey === 'string'){
			this._longitudeKey=prop.longitudeKey=params.longitudeKey;
		}
		if(params.latitudeKey!==undefined && typeof params.latitudeKey === 'string'){
			this._latitudeKey=prop.latitudeKey=params.latitudeKey;
		}
		if(params.objectKey!==undefined && typeof params.objectKey === 'string'){
			this._objectKey=prop.objectKey=params.objectKey;
		}
		if(params.longitudeFormat!==undefined && Helper.isValidMapFormat(params.longitudeFormat)){
			this._longitudeFormat=prop.longitudeFormat=params.longitudeFormat;
		}
		if(params.latitudeFormat!==undefined && Helper.isValidMapFormat(params.latitudeFormat)){
			this._latitudeFormat=prop.latitudeFormat=params.latitudeFormat;
		}
		if(params.marker!==undefined && Helper.isValidMapMarker(params.marker)){
			this._marker=prop.marker=params.marker;
		}
		if(params.trace!==undefined && Helper.isValidTrace(params.trace)){
			this._trace=prop.trace=params.trace;
		}
		if(params.trailLength!==undefined && typeof params.trailLength==='number' && params.trailLength>=1){
			this._trailLength=prop.trailLength=params.trailLength;
		}
		if(params.maxItemsSaved!==undefined && typeof params.maxItemsSaved==='number' && params.maxItemsSaved>=0){
			this._maxItemsSaved=prop.maxItemsSaved=params.maxItemsSaved;
		}
		return prop;
	}
	return 233;
};

MapChartFlowModel.prototype.addRecord = function(record){
	if(record!==undefined && record!==null && typeof record === 'object'){
		if (this._records.length>=this._maxItemsSaved){
			//delete first element
			this._records.splice(0, 1);
		}
		this._records.push(record);
		var index=this._records.length-1;
		var ID=this.generateNorrisRecordID();
		this._records[index].norrisRecordID=ID;
		this.validateRecord(index);
		return ID;
	}
	return 133;
};

MapChartFlowModel.prototype.updateRecord = function(ID, record){
	if (record === undefined || record === null || Array.isArray(record)){
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
			var oldID=this._records[i].norrisRecordID;
			this._records[i]=record;
			this._records[i].norrisRecordID=oldID;
			this.validateRecord(i);
			return true;
		}
		//no ID in records
	}
	//invalid ID
	return 132;
};


MapChartFlowModel.prototype.updateMovie = function(par){
	var params=JSON.parse(JSON.stringify(par));
	if (params === undefined || params === null || !Array.isArray(params)){
		return 131;
	}
	var found=false;
	var recordsID=[];
	var i=0;
	for (var keyParam in params) {
		if(params[keyParam][this._latitudeKey] === undefined ||
			params[keyParam][this._longitudeKey] === undefined ||
			params[keyParam][this._objectKey] === undefined){
			console.log();
		}else{
			found=false;
			for (var keyRecord in this._records) {
				if(params[keyParam][this._objectKey]===this._records[keyRecord][this._objectKey]){
					found=true;
					params[keyParam].norrisRecordID=this._records[keyRecord].norrisRecordID;
					recordsID.push(this._records[keyRecord].norrisRecordID);
					break;
				}
			}
			if(!found){
				params[keyParam].norrisRecordID=this.generateNorrisRecordID(i);
				recordsID.push(params[keyParam].norrisRecordID);
			}
		}
		i++;
	}
	this._records=params.slice(0, this._maxItemsSaved);
	this.validateData();
	return recordsID;
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

MapChartFlowModel.prototype.getProperties = function(){
	var prop=this.parent.getProperties.call(this);
	prop.longitudeKey=this._longitudeKey;
	prop.latitudeKey=this._latitudeKey;
	prop.objectKey=this._objectKey;
	prop.longitudeFormat=this._longitudeFormat;
	prop.latitudeFormat=this._latitudeFormat;
	prop.marker=this._marker;
	prop.trace=this._trace;
	prop.trailLength=this._trailLength;
	prop.maxItemsSaved=this._maxItemsSaved;
	return prop;
};

module.exports = MapChartFlowModel;
