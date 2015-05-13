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
function PageListModel(name){
	if (typeof name !== 'string' || name.trim()==='') {
		console.log('return null - can not istance object');
		return null;
	}
	this._name=name;
	this._pages=[];
}

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

PageListModel.prototype.getName=function(){
	return this._name;
};

PageListModel.prototype.addPage=function(page){
	//if (page.constructor === PageModel){
	if (page){
		this._pages.push(page);
		return true;
	}
	return false;
};

module.exports = PageListModel;