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

angular.module('app')
.factory('PagesList', ['Page', function(Page){

	var pagesList = [];

	function PagesList(info) {

		if (info !== undefined) {
			if (info.data !== undefined) {
				for (var i=0; i<info.data.length; i++){
					var count = 0;
					for (var j=0; j<pagesList.length; j++) {
						if (pagesList[j].id === info.data[i].ID){
							count++;
						}
					}
	    			if(count === 0) {
	    				var page = new Page(info.data[i]);
	       				pagesList.push({ 'id' : info.data[i].ID, 'page' : page});
					}
					// error
				}
			}
		}
	}
	
	PagesList.prototype = {

		constructor : PagesList,

		addPage: function(page) { // da cambiare DP
			var filteredPages = pagesList.filter(function(page) {return page.ID === pagesList.id;});
			if(filteredPages.length === 0) {
				var newPage = new Page(page);
   				pagesList.push({ 'id' : page.ID, 'page' : newPage});
			}
			// error
		},

		getPagesList: function(){
			return pagesList;
		}
	};

	return( PagesList );
}]);