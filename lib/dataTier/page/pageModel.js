/*jshint node: true, -W106 */
'use strict';

/*
* Name : pageModel.js
* Module : Lib::DataTier::PageModel
* Location : /lib/dataTier/page
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-12   Filippo Rampado    Initial code
* =========================================================
*/
var GraphModel = require('../graph/graphModel.js');

function PageModel(params) {
	if(params===undefined) {
		return;
	}
	if(params.ID===undefined || typeof params.ID !== 'string' || params.ID.trim()===''){ //field ID is required
		return;
	}

	this._ID=params.ID;
	this._name='';
	this._description='';
	this._graphsPerRow=1;
	this._graphsPerCol=-1;// default: vertical layout
	this._graphs=[];

	if(params.name!==undefined && typeof params.name === 'string'){
		this._name=params.name;
	}
	if(params.description!==undefined && typeof params.description === 'string'){
		this._description=params.description;
	}
	if(params.graphsPerRow!==undefined && typeof params.graphsPerRow === 'number'){
		this._graphsPerRow=params.graphsPerRow;
	}
	if(params.graphsPerCol!==undefined && typeof params.graphsPerCol === 'number'){
		this._graphsPerCol=params.graphsPerCol;
	}
}

PageModel.prototype.getProperties=function(){
	return {
		ID: this._ID,
		name: this._name,
		description: this._description,
		graphsPerRow: this._graphsPerRow,
		graphsPerCol: this._graphsPerCol
	};
};

PageModel.prototype.updateProperties=function(params){
	//field ID can't be modified
	if(params.name!==undefined && typeof params.name === 'string'){
		this._name=params.name;
	}
	if(params.description!==undefined && typeof params.description === 'string'){
		this._description=params.description;
	}
	if(params.graphsPerRow!==undefined && typeof params.graphsPerRow === 'number'){
		this._graphsPerRow=params.graphsPerRow;
	}
	if(params.graphsPerCol!==undefined && typeof params.graphsPerCol === 'number'){
		this._graphsPerCol=params.graphsPerCol;
	}
};

PageModel.prototype.getData=function(){
	var pageData=[];
	var graphs= this._graphs.length;

	//build pageData by iterating every graph in _graphs
	for(var i=0; i<graphs; i++){
		pageData[i]={
			properties: this._graphs[i].getProperties(),
			data: this._graphs[i].getData()
		};
	}//for graphs

	return pageData;
};

PageModel.prototype.addGraph=function(graph){
	if (graph instanceof GraphModel){
		this._graphs.push(graph);
		return true;
	}
	return 411;
};

module.exports = PageModel;