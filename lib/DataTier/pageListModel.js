/*jshint node: true, -W106 */
'use strict';

/*
* Name : pageListModel.js
* Module : Lib::DataTier::PageListModel
* Location : /lib/dataTier/pagelistModel
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-05-11      Filippo Rampado
* -------------------------------------------------
* Initial code.
* =================================================
*/

var PageListModel = function(name) {
	if (typeof name !== 'string') {
		return null;
	}
	var _name=name;
	var _pages=[];

	PageListModel.prototype.getName = function(){
		return _name;
	};

	PageListModel.prototype.getData = function(){
		var pageListData=[];
		var pages=_pages.length;

		//build pageListData by iterating every page in _pages
		for(var i=0; i<pages; i++){
			pageListData[i]={
				properties: _pages.getProperties(),
				data: _pages.getData()
			};
		}//for pages*/

		return pageListData;
	};

	PageListModel.prototype.addPage = function(page){
		if (page){
			_pages.push(page);
			return true;
		}
		return false;
	};
};

module.export = PageListModel;