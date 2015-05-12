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

module.export = function GraphModel(params) {
	var _ID;
	var _title='';
	var _enableLegend='';
	var _legend;



	if(params.ID===undefined || params.ID === ''){ // ID field is required
		return null;
	}
	_ID=params.ID;

	if(params.title!==undefined){
		_title=params.title;
	}
	if(params.enableLegend!==undefined){
		_enableLegend=params.enableLegend;
	}
	if(params.legend!==undefined){
		_legend=params.legend;
	}

	GraphModel.prototype.getProperties = function(){
		return {
			ID: _ID,
			title: _title,
			enableLegend: _enableLegend,
			legend: _legend
		};
	};

	GraphModel.prototype.updateProperties = function(params) {
		//ID field can't be modified
		if(params.title!==undefined){
			_title=params.title;
		}
		if(params.enableLegend!==undefined){
			_enableLegend=params.enableLegend;
		}
		if(params.legend!==undefined){
			_legend=params.legend;
		}
	};
};