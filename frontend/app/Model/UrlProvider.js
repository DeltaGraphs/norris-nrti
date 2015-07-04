/*jshint node: true */
'use strict';

/*
* Name :  UrlProvider.js
* Module : FrontEnd::Model
* Location : /frontend/app/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.0         2015-06-21 Francesco Rossetto			Tested
*
* 0.1.0         2015-06-09 Francesco Rossetto			Add all attributes and methods
*
* 0.0.1         2015-06-09  Francesco Rossetto			Initial code      
* =================================================================================================
*/

angular.module('norris-nrti')
.factory('UrlProvider', function(){
	
	function UrlProvider() {
		this._url = '';
	}
	
	UrlProvider.prototype.setUrl = function(newUrl) {
		this._url = newUrl;
	};
	UrlProvider.prototype.getUrl = function() {
		return this._url;
	};
	return UrlProvider;
});