/*jshint node: true, -W106 */
'use strict';

/*
* Name : barchartModel.js
* Module : Lib::DataTier::BarChartModel
* Location : /lib/dataTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-12   Samuele Zanella    Initial code
* =========================================================
*/

var GraphModel = require('./graphModel');

function BarChartModel(params) {

	BarChartModel.prototype = new GraphModel(params);

	this._headers;
	this._barOrientation='';
	this._sortable='';
	this._xAxis;
	this._yAxis;

	if(params.headers!==undefined){
		this._headers=params.headers;
	}
	if(params.barOrientation!==undefined){
		this._barOrientation=params.barOrientation;
	}
	if(params.sortable!==undefined){
		this._sortable=params.sortable;
	}
	if(params.xAxis!==undefined){
		this._xAxis=params.xAxis;
	}
	if(params.yAxis!==undefined){
		this._yAxis=params.yAxis;
	}
}

module.exports = BarChartModel;