/*jshint node: true, -W106 */
'use strict';

/*
* Name : lineChartFlowModel.js
* Module : Lib::DataTier::lineChartFlowModel
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

function LineChartFlowModel(params) {
	if(params===undefined || params.ID===undefined || typeof params.ID !== 'string'|| params.ID.trim() === ''){ // ID field is required
		console.log('Error: 222');
		return;
	}

	params.type = 'LineChartFlow';
	this.parent.constructor.call(this, params);

	this._xKey=null;
	this._yKey=null;
	this._xFormat=null;//raw data will be displayed
	this._yFormat=null;//raw data will be displayed
	this._flowColor=null;//will be random on frontEnd
	this._marker='none';//circle, triangle, square, diamond
	this._interpolation='linear';//linear, step, basis, cardinal, monotone
	this._area='none';//none or HEX
	this._maxItems=50;//items displayed
	this._maxItemsSaved=500; //items saved


	if(params.xKey!==undefined && typeof params.xKey === 'string'){
		this._xKey=params.xKey;
	}
	if(params.yKey!==undefined && typeof params.yKey === 'string'){
		this._yKey=params.yKey;
	}
	if(params.xFormat!==undefined && Helper.isValidFormat(params.xFormat)){
		this._xFormat=params.xFormat;
	}
	if(params.yFormat!==undefined && Helper.isValidFormat(params.yFormat)){
		this._yFormat=params.yFormat;
	}
	if(params.flowColor!==undefined && Helper.isHEX(params.flowColor)){
		this._flowColor=params.flowColor;
	}
	if(params.marker!==undefined && Helper.isValidMarker(params.marker)){
		this._marker=params.marker;
	}
	if(params.interpolation!==undefined && Helper.isValidInterpolation(params.interpolation)){
		this._interpolation=params.interpolation;
	}
	if(params.area!==undefined && (params.area === 'none' || Helper.isHEX(params.area))){
		this._area=params.area;
	}
	if(params.maxItems!==undefined && typeof params.maxItems==='number' && params.maxItems>=0){
		this._maxItems=params.maxItems;
	}
	if(params.maxItemsSaved!==undefined && typeof params.maxItemsSaved==='number' && params.maxItemsSaved>=0){
		this._maxItemsSaved=params.maxItemsSaved;
	}
}

LineChartFlowModel.prototype = Object.create(FlowModel.prototype);
LineChartFlowModel.prototype.constructor = LineChartFlowModel;
LineChartFlowModel.prototype.parent = FlowModel.prototype;

LineChartFlowModel.prototype.addRecord = function(record){
	if(record!==undefined && typeof record === 'object'){
		this._records.push(record);
		var index=this._records.length-1;
		var ID=this.generateNorrisRecordID(index);
		this._records[index].norrisRecordID=ID;
		this.validateRecord(index);
		return ID;
	}
	console.log('Error: 121');
	return 121;
};


LineChartFlowModel.prototype.updateRecord = function(ID, record){
	if (record === undefined || record === null || typeof record !== 'object'|| Array.isArray(record)){
		return 213;
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
		return 214;
	}
	//invalid ID
	return 214;
};

module.exports = LineChartFlowModel;