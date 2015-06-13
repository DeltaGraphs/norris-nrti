/*jshint node: true */
'use strict';

/*
* Name :  PagesListController.js
* Module : FrontEnd::Controller::PagesController
* Location : /frontend/app/Controller/PagesController
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-05-20  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-20  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

angular.module('norris-nrti')
.controller('PagesListController', ['$scope', '$location', 'PagesList', 'SocketServicesFactory', 'UrlProvider', function($scope, $location, PagesList, SocketServicesFactory, UrlProvider){

	var socket;
	var pagesList;

	var url = UrlProvider.prototype.getUrl(); // recupera l'url a cui deve connettersi il socket

	// funzione che connette il socket all'url e chiama la funzione listenOnEvent
	this.socketConnection = function() {
		socket = SocketServicesFactory.build(url);
		this.listenOnEvents();
	};

	// funzione che mette in ascolto il socket su alcuni eventi
	this.listenOnEvents = function() {
		socket.on('configPageList', function(info){ // ascolta sull'evento 'configPageList' (ricevuto come risposta alla connessione)
			pagesList = new PagesList(info); // crea una nuova PagesList
			$scope.pagesList = pagesList.getPagesList(); // rende disponibile la lista delle pagine sullo scope
		});
		socket.on('insertPage', function(info) { // ascolta sull'evento 'insertPage'
			pagesList.addPage(info); // aggiunge una pagina alla lista
			$scope.pagesList = pagesList.getPagesList(); // rende disponibile la lista delle pagine sullo scope
		});
		socket.on('updatePage', function(info) { // ascolta sull'evento 'updatePage'
			$scope.pagesList = pagesList.getPagesList(); // rende disponibile la lista delle pagine sullo scope
		});

	};

	// vengono rese disponibili alcune funzioni sullo $scope
	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	
}]);