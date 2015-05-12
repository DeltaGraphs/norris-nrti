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

var PageListModel = function(name) {
	if (typeof name !== 'string') {
		return null;
	}
	PageListModel.prototype={
		_name: name,
		_pages: []
	};
};

PageListModel.prototype={

	getData: function(){
		var pageListData=[];
		var pages=this._pages.length;

		//build pageListData by iterating every page in _pages
		for(var i=0; i<pages; i++){
			pageListData[i]={
				properties: this._pages.getProperties(),
				data: this._pages.getData()
			};
		}//for pages*/

		return pageListData;
	},

	getName: function(){
		return this._name;
	},

	addPage: function(page){
		if (page){
			this._pages.push(page);
			return true;
		}
		return false;
	}
};

module.export = PageListModel;