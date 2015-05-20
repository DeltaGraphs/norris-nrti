/*jshint node: true */
'use strict';

/*
* Name :  PagesList.js
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

angular.module('app')
.controller('PagesListController', function($scope, $location, PagesList, SocketServices){

	var pagesList = new PagesList();
	var socket;
	
	this.socketConnection = function(socketUrl){
		socket = io.connect(socketUrl);
		$scope.socket = socket;
		// listenOnEvents();
	};

	this.listenOnEvents = function(){
		socket.on('configPageList', function(info){
			pagesList = new PagesList(info);
		});
		socket.on('insertPage', function(info){
			pagesList.addPage(info);
		});
	};

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	$scope.pagesList = pagesList.getPagesList();
	
});