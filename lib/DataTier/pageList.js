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
		if (page){
			_pages.push(page);
			return true;
		}
		return false;
	};

	PageList.prototype.getName = function(){
		return _name;
	};

	PageList.prototype.getData = function(){
		return {};
	};
};

module.export = PageList;