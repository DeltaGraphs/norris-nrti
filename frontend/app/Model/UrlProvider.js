/*jshint node: true */
'use strict';

/*
* Name :  TableController.js
* Module : FrontEnd::Controller::GraphsController
* Location : /frontend/app/Controller/GraphsController
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-06-04 Francesco Rossetto			Add all attributes and methods
*
* 0.0.1         2015-06-04  Francesco Rossetto			Initial code      
* =================================================================================================
*/

angular.module('norris-nrti')
.factory('UrlProvider', function(){
	
	function UrlProvider() {
		this._url;
	}
	
	UrlProvider.prototype.setUrl = function(newUrl) {
		this._url = newUrl;
	};
	UrlProvider.prototype.getUrl = function() {
		return this._url;
	};
	return UrlProvider;
});