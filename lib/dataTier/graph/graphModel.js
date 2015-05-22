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

var LegendModel = require('./legendModel.js');

function GraphModel(params) {
	if(params===undefined || params.ID===undefined || typeof params.ID !== 'string'|| params.ID.trim() === ''){ // ID field is required
		console.log('Error: 352');
		return;
	}
	
	this._ID=params.ID;
	this._title='';
	this._type='';
	this._height=400;
	this._width=500;
	this._enableLegend=false;
	this._legend= new LegendModel();
	this.updateBaseProperties(params);
}

GraphModel.prototype.getProperties = function(){
	return {
		ID: this._ID,
		title: this._title,
		type: this._type,
		height: this._height,
		width: this._width,
		enableLegend: this._enableLegend,
		legend: this._legend.getProperties()
	};
};

GraphModel.prototype.updateBaseProperties = function(params) {
	if (params !== undefined){
		//ID field can't be modified
		var prop={};
		if(params.title!==undefined && typeof params.title === 'string'){
			this._title=prop.title=params.title;
		}

		if(params.type!==undefined && typeof params.type === 'string' && (params.type==='BarChart' || params.type==='LineChart' || params.type==='MapChart' || params.type==='Table')){
			this._type=prop.type=params.type;
		}

		if(params.height!==undefined && typeof params.height === 'number' && params.height >= 0){
			this._height=prop.height=params.height;
		}

		if(params.width!==undefined && typeof params.width === 'number' && params.width >= 0){
			this._width=prop.width=params.width;
		}

		if(params.enableLegend!==undefined && typeof params.enableLegend === 'boolean'){
			this._enableLegend=prop.enableLegend=params.enableLegend;
		}

		if(params.legend!==undefined){
			this._legend.updateProperties(params.legend);
			prop.legend=this._legend;
		}
		return prop;
	}
	return 351;
};

module.exports = GraphModel;
