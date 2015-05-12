/**
    * Name: PagesList.js
    * Package: FrontEnd::Model::PagesModel
    * Author: Maria Giovanna Chinellato
    * Date: 2015/05/12
    *
    * Changes:
    * Version   Date        Changes 		Author
    * {0}.{1}   2015-05-12  Creazione file  Maria Giovanna Chinellato
    *
    * {0}.{2}   2015-05-12  Codifica modulo Maria Giovanna Chinellato
    *
    * ------------------------------------------------------------
    * Copyright (C) 2015 DeltaGraphs
    * 
    * This file is part of Norris.js.
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