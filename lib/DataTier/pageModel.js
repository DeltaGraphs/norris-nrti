/*jshint node: true, -W106 */
'use strict';

/*
* Name : pageModel.js
* Module : Lib::DataTier::PageModel
* Location : /lib/dataTier/PageModel
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2015-05-12      Filippo Rampado
* -------------------------------------------------
* Initial code.
* =================================================
*/

module.export = function PageModel(params) {
	var _ID;
	var _name='';
	var _description='';
	var _graphsPerRow=1;
	var _graphsPerCol=-1;// default: vertical layout
	var _graphs=[];

	if(params.ID===undefined){ //field ID is required
		return null;
	}
	_ID=params.ID;

	if(params.name!==undefined){
		_name=params.name;
	}
	if(params.description!==undefined){
		_description=params.description;
	}
	if(params.graphsPerRow!==undefined){
		_graphsPerRow=params.graphsPerRow;
	}
	if(params.graphsPerCol!==undefined){
		_graphsPerCol=params.graphsPerCol;
	}

	PageModel.prototype.getProperties = function(){
		return {
			ID: _ID,
			name: _name,
			description: _description,
			graphsPerRow: _graphsPerRow,
			graphsPerCol: _graphsPerCol
		};
	};

	PageModel.prototype.updateProperties = function(params){
		//field ID can't be modified
		if(params.name!==undefined){
			_name=params.name;
		}
		if(params.description!==undefined){
			_description=params.description;
		}
		if(params.graphsPerRow!==undefined){
			_graphsPerRow=params.graphsPerRow;
		}
		if(params.graphsPerCol!==undefined){
			_graphsPerCol=params.graphsPerCol;
		}
	};

	PageModel.prototype.getData = function(){
		var pageData=[];
		var graphs=_graphs.length;

		//build pageData by iterating every graph in _graphs
		for(var i=0; i<graphs; i++){
			pageData[i]={
				properties: _graphs.getProperties(),
				data: _graphs.getData()
			};
		}//for graphs

		return pageData;
	};

	PageModel.prototype.addGraph = function(graph){
		if (graph){
			_graphs.push(graph);
			return true;
		}
		return false;
	};

};
