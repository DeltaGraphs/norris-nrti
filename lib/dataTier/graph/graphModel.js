/*jshint node: true, -W106 */
'use strict';

/*
* Name : graphModel.js
* Module : Lib::DataTier::GraphModel
* Location : /lib/dataTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-12   Samuele Zanella    Initial code
* =========================================================
*/

function GraphModel(params) {
	this._ID;
	this._title='';
	this._enableLegend='';
	this._legend;

	if(typeof params.ID !== 'string'|| params.ID.trim() === ''){ // ID field is required
		return null;
	}
	this._ID=params.ID;

	if(typeof params.title === 'string'){
		this._title=params.title;
	}
	if(typeof params.enableLegend === 'boolean'){
		this._enableLegend=params.enableLegend;
	}
	if(params.legend!==undefined){
		this._legend=params.legend;
	}

	
}

GraphModel.prototype.getProperties = function(){
	return {
		ID: this._ID,
		title: this._title,
		enableLegend: this._enableLegend,
		legend: this._legend
	};
};

GraphModel.prototype.updateProperties = function(params) {
	//ID field can't be modified
	if(params.title!==undefined){
		this._title=params.title;
	}
	if(params.enableLegend!==undefined){
		this._enableLegend=params.enableLegend;
	}
	if(params.legend!==undefined){
		this._legend=params.legend;
	}
};

module.exports = GraphModel;
