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
	console.dir('ID PARAMETRO '+params.ID);
	this._ID;
	this._title='';
	this._type='';
	this._height=0;
	this._width=0;
	this._enableLegend='';
	this._legend=null;

	if(params.ID===undefined || typeof params.ID !== 'string'|| params.ID.trim() === ''){ // ID field is required
		return null;
	}
	this._ID=params.ID;

	if(typeof params.title === 'string'){
		this._title=params.title;
	}

	if(typeof params.type === 'string' && (params.type==='BarChart' || params.type==='LineChart' || params.type==='MapChart' || params.type==='Table')){
		this._type=params.type;
	}

	if(typeof params.height === 'number' && params.height >= 0){
		this._height=params.height;
	}

	if(typeof params.width === 'number' && params.width >= 0){
		this._width=params.width;
	}

	if(typeof params.enableLegend === 'boolean'){
		this._enableLegend=params.enableLegend;
	}

	if(params.legend!==undefined && params.legend instanceof LegendModel){
		this._legend=params.legend;
	}
}

	GraphModel.prototype.getProperties = function(){
		return {
			ID: this._ID,
			title: this._title,
			type: this._type,
			height: this._height,
			width: this._width,
			enableLegend: this._enableLegend,
			legend: this._legend
		};
	};

	GraphModel.prototype.updateProperties = function(params) {
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
	};

module.exports = GraphModel;
