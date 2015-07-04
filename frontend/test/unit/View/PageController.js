/*jshint node: true */
'use strict';

/*
* Name :  SocketServices.js
* Module : UnitTest
* Location : /frontend/test/unit/Controller
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.1         2015-06-24  Maria Giovanna Chinellato   Fix module
*
* 0.1.0         2015-06-23  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-06-23  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/
var mockPageController = angular.module('mockPageController', []);

angular.module('mockPageController')
.controller('PageController', ['$scope', '$location', '$routeParams', 'PageFactory', 'SocketServicesFactory', function($scope, $location, $routeParams, PageFactory, SocketServicesFactory){

	$scope.page = PageFactory.build();

	//$scope.graphs = [];

	var url = $scope.page.getUrl(); // recupera l'url a cui deve connettersi il socket

	var flag = 0;

	var socket;

	// funzione che connette il socket all'url e chiama la funzione listenOnEvent
	this.socketConnection = function(){
		socket = SocketServicesFactory.build(url);
		this.listenOnEvents();
	};

	// funzione che mette in ascolto il socket su alcuni eventi
	this.listenOnEvents = function(){
		socket.on('configPage', function(){
			flag++;
		});
	};

	$scope.graphs = [];
	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;

}]);