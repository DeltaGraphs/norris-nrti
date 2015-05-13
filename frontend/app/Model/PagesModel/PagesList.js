/*
* Name :  PagesList.js
* Module : FrontEnd::Model::PagesModel
* Location : /frontend/app/Model/PagesModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-05-12  Maria Giovanna Chinellato   Codifica di tutti gli attributi e i metodi
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato   Creazione file      
* =================================================================================================
*
*/

app.factory('PagesList', ['Page', function(Page){
	var pagesList = new Array();
	return {
		PagesList: function(info){
			for (var i=0; i<info.data.length; i++){
				if (pagesList[info.data[i].id] === null){
					var page = new Page(info.data[i]);
					pagesList[info.data[i].id] = page;
				}
				else
					// error
			}
		},
		addPage: function(page){ // da cambiare DP
			var newPage = new Page(page);
			if (pagesList[page.id] != null)
				pagesList[page.id] = newPage;
			else
					// error
		},
		getPagesList: function(){
			return pagesList;
		}
	};
}]);