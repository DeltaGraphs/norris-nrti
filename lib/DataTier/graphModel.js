/*jshint node: true, -W106 */
'use strict';

/*
* Name : graphModel.js
* Module : Lib::DataTier::GraphModel
* Location : /lib/dataTier/graphModel
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2015-05-12      Samuele Zanella
* -------------------------------------------------
* Initial code.
* =================================================
*/
/*
module.export = function GraphModel(params) {
	var _ID;
	var _title='';
	var _enableLegend='';
	var _legend;

	if(params.ID===undefined){ // ID field is required
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

	PageListModel.prototype.getProperties = function(){
		return {
			ID: _ID,
			title: _title,
			enableLegend: _enableLegend;
			legend: _legend;
		};
	};

	PageListModel.prototype.updateProperties = function(params) {
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
	}
};
/*