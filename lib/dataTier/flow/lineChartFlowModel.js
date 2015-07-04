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
	this._area=false;//true or false
	this._maxItems=50;//items displayed
	this._maxItemsSaved=500; //items saved

	this.updateProperties(params);
}

LineChartFlowModel.prototype = Object.create(FlowModel.prototype);
LineChartFlowModel.prototype.constructor = LineChartFlowModel;
LineChartFlowModel.prototype.parent = FlowModel.prototype;

LineChartFlowModel.prototype.updateProperties = function(params){
	if (params !== undefined){
		var prop=this.parent.updateBaseProperties.call(this, params);
		if(params.xKey!==undefined && typeof params.xKey === 'string'){
			this._xKey=prop.xKey=params.xKey;
		}
		if(params.yKey!==undefined && typeof params.yKey === 'string'){
			this._yKey=prop.yKey=params.yKey;
		}
		if(params.xFormat!==undefined && Helper.isValidFormat(params.xFormat)){
			this._xFormat=prop.xFormat=params.xFormat;
		}
		if(params.yFormat!==undefined && Helper.isValidFormat(params.yFormat)){
			this._yFormat=prop.yFormat=params.yFormat;
		}
		if(params.flowColor!==undefined && Helper.isHEX(params.flowColor)){
			this._flowColor=prop.flowColor=params.flowColor;
		}
		if(params.marker!==undefined && Helper.isValidMarker(params.marker)){
			this._marker=prop.marker=params.marker;
		}
		if(params.area!==undefined && (typeof params.area === 'boolean')){
			this._area=prop.area=params.area;
		}
		if(params.maxItems!==undefined && typeof params.maxItems==='number' && params.maxItems>=0){
			this._maxItems=prop.maxItems=params.maxItems;
		}
		if(params.maxItemsSaved!==undefined && typeof params.maxItemsSaved==='number' && params.maxItemsSaved>=0){
			this._maxItemsSaved=prop.maxItemsSaved=params.maxItemsSaved;
		}
		return prop;
	}
	//return ;
};

LineChartFlowModel.prototype.addRecord = function(record){
	if(record!==undefined && record!==null && typeof record === 'object'){
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
	console.log('Error: 123');
	return 123;
};


LineChartFlowModel.prototype.updateRecord = function(ID, record){
	if (record === undefined || record === null || Array.isArray(record)){
		return 121;
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
	return 122;
};

LineChartFlowModel.prototype.getProperties = function(){
	var prop=this.parent.getProperties.call(this);
	prop.xKey=this._xKey;
	prop.yKey=this._yKey;
	prop.xFormat=this._xFormat;
	prop.yFormat=this._yFormat;
	prop.flowColor=this._flowColor;
	prop.marker=this._marker;
	prop.area=this._area;
	prop.maxItems=this._maxItems;
	prop.maxItemsSaved=this._maxItemsSaved;

	return prop;
};

module.exports = LineChartFlowModel;