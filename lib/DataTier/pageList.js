/*jshint node: true, -W106 */
'use strict';

/*
* Name : pageList.js
* Module : Lib::DataTier::Middleware::MiddlewareLoader
* Location : /lib/controller/middleware
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-05-11      Filippo Rampado
* -------------------------------------------------
* Codifica modulo.
* =================================================
*/

var PageList = function(name) {
	if (typeof name !== 'string') {
		return null;
	}
	var _name=name;
	var _pages=[];

	PageList.prototype.addPage = function(page){
		if ( page ){
			_pages.push(page);
			return true;
		}
		return false;
	};

	PageList.prototype.getName = function(){
		return _name;
	};

	PageList.prototype.getData = function(){
		var pageListdata=[];
		var pages=_pages.length;

		//build pageListData by iterating every page in _pages
		for(var i=0; i<pages; i++){
			var pageData=_pages[i].getData();
			var graphs=pageData.graphs.length;
			var graphsData=[];

			//build graphsData by iterating every graph in this page
			for (var j=0; j<graphs; j++){
				graphsData[j]={
					ID: pageData.graphs[j].ID,
					title: pageData.graphs[j].title,
					type: pageData.graphs[j].type,
				};
			}//for graphs

			pageListdata[i]={
				ID: pageData.ID,
				name: pageData.name,
				description: pageData.description,
				graphs: graphsData
			};
		}//for pages

		return {
			name: _name,
			data: pageListdata
		};
	};
};

module.export = PageList;