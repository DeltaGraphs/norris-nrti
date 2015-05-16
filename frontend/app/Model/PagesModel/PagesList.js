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

app.factory('PagesList', ['Page', function(Page){
	var pagesList = new Array();
	return {
		PagesList: function(info){
			for (var i=0; i<info.data.length; i++){
				if (pagesList[info.data[i].ID] === null) {
					var page = new Page(info.data[i]);
					pagesList[info.data[i].ID] = page;
				}
				// error
			}
		},
		addPage: function(page){ // da cambiare DP
			if (pagesList[page.ID] === null) {
				var newPage = new Page(page);
				pagesList[page.ID] = newPage;
			}
			// error
		},
		getPagesList: function(){
			return pagesList;
		}
	};
}]);