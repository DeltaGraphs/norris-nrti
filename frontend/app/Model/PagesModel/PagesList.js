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
* 1.0.0         2015-05-19  Maria Giovanna Chinellato	Tested
*
* 0.1.1         2015-05-18  Maria Giovanna Chinellato	Fix attributes
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

angular.module('norris-nrti')
.factory('PagesList', ['PageFactory', function(PageFactory){

	// campi dati di Pageslist
	var pagesList = [];

	// Costruttore di PagesList
	function PagesList(info) {

		if (info !== undefined) { // controlla che il JSON 'info' sia defito
			if (info.data !== undefined) { // controlla che il campo 'data' del JSON sia definito
				for (var i=0; i<info.data.length; i++){ // scorre l'array di pagine da inserire della lista
					var count = 0;
					for (var j=0; j<pagesList.length; j++) { // conta le pagine presenti in lista con lo stesso id della nuova pagina
						if (pagesList[j].id === info.data[i].properties.ID){
							count++;
						}
					}
	    			if(count === 0) { // controlla che non siano presenti pagine con lo stesso id della nuova pagina 
	    				var page = PageFactory.build(info.data[i]); // crea una nuova pagina
	       				pagesList.push({ 'id' : info.data[i].properties.ID, 'page' : page}); // inserisce la pagina nella lista delle pagine
					} 
					// error
				}
			}
		}
	}
	
	PagesList.prototype.addPage = function(page) {
		var count = 0;
		for (var j=0; j<pagesList.length; j++) {
			if (pagesList[j].id === page.properties.ID){
				count++;
			}
		}
		if (count === 0){
			var newPage = PageFactory.build(page); // crea una nuova pagina
			pagesList.push({ 'id' : page.properties.ID, 'page' : newPage}); // aggiunge la nuova pagina alla lista
		}
		// error
	};

	// chiama la funzione updatePage della pagina che necessità di aggiornamenti
	PagesList.prototype.updatePage = function(info) {
		for (var j=0; j<pagesList.length; j++) {
			if (pagesList[j].id === info.ID){
				pagesList[j].page.updateParameters(info);
			}
		}
	};

	PagesList.prototype.getPagesList = function(){
		return pagesList; // ritorna la lista della pagine
	};

	return( PagesList );
}]);