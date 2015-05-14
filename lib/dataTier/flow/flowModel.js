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

function FlowModel(params) {
	this._ID;
	this._name='';
	this._filters=null;
	this._records=[];

	if(params===undefined) {
		return;
	}

	if(params.ID===undefined || typeof params.ID !== 'string'|| params.ID.trim() === ''){ // ID field is required
		return;
	}
	this._ID=params.ID;

	if(typeof params.name === 'string'){
		this._title=params.name;
	}

	if(params.filters === 'string'){ //da sostituire con is valid 
		this._filters = new FilterModel(params.filters);
	}

	if(params.records !== undefined){
		this._records=params.records;
	}
}

FlowModel.prototype.getProperties = function(){
	var conditions = this._filters.getConditions(); //array
	return {
		ID: this._ID,
		name: this._name,
		filters: conditions
	};
};

/*FlowModel.prototype.updateProperties = function(params) {
		//ID field can't be modified
		if(params.title!==undefined && typeof params.title === 'string'){
			this._title=params.title;
		}

		if(params.type!==undefined && typeof params.type === 'string' && (params.type==='BarChart' || params.type==='LineChart' || params.type==='MapChart' || params.type==='Table')){
			this._type=params.type;
		}

		if(params.height!==undefined && typeof params.height === 'number' && params.height >= 0){
			this._height=params.height;
		}

		if(params.width!==undefined && typeof params.width === 'number' && params.width >= 0){
			this._width=params.width;
		}

		if(params.enableLegend!==undefined && typeof params.enableLegend === 'boolean'){
			this._enableLegend=params.enableLegend;
		}

		if(params.legend!==undefined && params.legend instanceof LegendModel){
			this._legend=params.legend;
		}
};*/

module.exports = FlowModel;
