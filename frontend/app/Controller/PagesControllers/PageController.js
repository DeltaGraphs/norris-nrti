/*jshint node: true */
'use strict';

/*
* Name :  PageController.js
* Module : FrontEnd::Controller::PagesController
* Location : /frontend/app/Controller/PagesController
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-05-31  Francesco Rossetto		   Add all attributes and all methods
*
* 0.0.1         2015-05-31  Francesco Rossetto		   Initial code      
* =================================================================================================
*
*/

angular.module('norris-nrti')
.controller('PageController', ['$scope', '$location', '$routeParams', 'PagesList', 'PageFactory', 'SocketServicesFactory', function($scope, $location, $routeParams, PagesList, PageFactory, SocketServicesFactory){

	var page = PagesList.prototype.getPagesList()[$routeParams.pageId].page; // recupera la pagina corrente
	$scope.page = page;
	/*$scope.previous = false;
	$scope.next = false;
	var a = $routeParams.pageId - 1;
	if (PagesList.prototype.getPagesList()[parseInt($routeParams.pageId) - 1] !== undefined) {
		$scope.previous = true; // se è presente una pagina precedente mette il flag a true
	}
	var b = $routeParams.pageId + 1;
	if (PagesList.prototype.getPagesList()[parseInt($routeParams.pageId) + 1] !== undefined) {
		$scope.next = true; // se è presente una pagina successiva mette il flag a true
	}*/
	var url = $scope.page.getUrl(); // recupera l'url a cui deve connettersi il socket

	var socket;

	// funzione che connette il socket all'url e chiama la funzione listenOnEvent
	this.socketConnection = function(){
		socket = SocketServicesFactory.build(url);
		this.listenOnEvents();
	};

	// funzione che mette in ascolto il socket su alcuni eventi
	this.listenOnEvents = function(){
		socket.on('configPage', function(info){ // ascolta sull'evento 'configPage' (ricevuto come risposta alla connessione)
			$scope.page.updateParameters(info.properties); // modifica i campi di default con i valori esatti della pagina
			$scope.page.initializeData(info.data); // inizializza i dati della pagina (aggiunge i grafici presenti in essa)
			$scope.graphs = matrix($scope.page.getGraphsList());
		});
		/*socket.on('updatePageProp', function(info){ // ascolta sull'evento 'updatePageProp'
			$scope.page.updateParameters(info); // aggiorna le proprietà della pagina
		});*/
		socket.on('insertGraph', function(info){ // ascolta sull'evento 'insertGraph'
			$scope.page.addGraph(info); // inserisce un nuovo grafico alla lista dei grafici presente in $scope.page
			$scope.graphs = matrix($scope.page.getGraphsList());
		});
	};

	/*this.previous = function(id){
		console.log('prev');
		$location.path('/page/' + id);
	};

	this.next = function(id){
		console.log('next');
		$location.path('/page/' + id);
	};*/

	// funzione di utilità che dispone i grafici in un array per la successiva visualizzazione
	function matrix(list) {
		var array = [];
		var count = 0;
		var graphsPerCol = $scope.page.getGraphsPerCol();
		var graphsPerRow = $scope.page.getGraphsPerRow();
		if (graphsPerCol === -1){
			graphsPerRow = 1;
			graphsPerCol = list.length;
		}
		if (graphsPerRow === -1){
			graphsPerRow = list.length;
			graphsPerCol = 1;
		}
		for (var i=0;count<list.length && i<graphsPerCol; i++) {
			array[i] = [];
			for (var j=0;count<list.length && j<graphsPerRow; j++) {
				array[i].push(list[graphsPerRow*i+j]);
				count++;
			}
		}
		return array;
	}

	// vengono rese disponibili alcune funzioni sullo $scope
	$scope.graphs = [];
	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	//$scope.previous = this.previous;
	//$scope.next = this.next;
	
}]);