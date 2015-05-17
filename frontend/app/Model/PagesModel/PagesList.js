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
* 0.1.0         2015-05-12  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

angular.module('app')
.factory('PagesList', ['Page', function(Page){

	function PagesList(info) {
		this.pagesList = [];

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
		},

		getPagesList: function(){
			return this.pagesList;
		}
	};

	return( PagesList );
}]);