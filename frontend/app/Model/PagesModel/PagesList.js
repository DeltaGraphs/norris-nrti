/*jshint node: true */
'use strict';

/*
* Name :  PagesList.js
* Module : FrontEnd::Model::PagesModel
* Location : /frontend/app/Model/PagesModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.1         2015-05-18  Maria Giovanna Chinellato	Fix attributes
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

angular.module('services')
.factory('PagesList', ['Page', function(Page){

	var pagesList = [];

	function PagesList(info) {

		if (info !== undefined) {
			if (info.data !== undefined) {
				for (var i=0; i<info.data.length; i++){
					if (this.pagesList[info.data[i].ID] === null) {
						var page = new Page(info.data[i]);
						this.pagesList[info.data[i].ID] = page;
					}
					// error
				}
			}
		}
	}
	
	PagesList.prototype = {

		addPage: function(page){ // da cambiare DP
			if (this.pagesList[page.ID] === null) {
				var newPage = new Page(page);
				this.pagesList[page.ID] = newPage;
			}
			// error
			return this;
		},

		getPagesList: function(){
			return this.pagesList;
		}
	};

	return( PagesList );
}]);