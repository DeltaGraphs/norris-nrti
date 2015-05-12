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

module.export = function BarChartModel(params) {

	BarChartModel.prototype = new GraphModel(params);

	var _headers;
	var _barOrientation='';
	var _sortable='';
	var _xAxis;
	var _yAxis;

	if(params.headers!==undefined){
		_headers=params.headers;
	}
	if(params.barOrientation!==undefined){
		_barOrientation=params.barOrientation;
	}
	if(params.sortable!==undefined){
		_sortable=params.sortable;
	}
	if(params.xAxis!==undefined){
		_xAxis=params.xAxis;
	}
	if(params.yAxis!==undefined){
		_yAxis=params.yAxis;
	}
};