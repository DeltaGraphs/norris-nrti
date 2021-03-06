/*jshint node: true, -W106 */
'use strict';

/*
* Name : pageListModel.js
* Module : Lib::DataTier::PageListModel
* Location : /lib/dataTier/pageList
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-11   Filippo Rampado    Initial code 
* =========================================================
*/
var PageModel = require('../page/pageModel.js');

//if name is valid build object
function PageListModel(name){
	if (typeof name !== 'string' || name.trim()==='') {
		return;
	}
	this._name=name;
	this._pages=[];
}

//if page is valid add it to pages
PageListModel.prototype.addPage=function(page){
	if (page instanceof PageModel){
		this._pages.push(page);
		return true;
	}
	return 511;
};

//return a JSON with properties and data of pages
PageListModel.prototype.getData=function(){
	var pageListData=[];
	var pages=this._pages.length;

	//build pageListData by iterating every page in _pages
	for(var i=0; i<pages; i++){
		pageListData[i]={
			properties: this._pages[i].getProperties(),
			data: this._pages[i].getData()
		};
	}//for pages*/

	return pageListData;
};

//return name
PageListModel.prototype.getName=function(){
	return this._name;
};

module.exports = PageListModel;