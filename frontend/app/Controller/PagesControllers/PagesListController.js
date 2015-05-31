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

angular.module('app')
.controller('PagesListController', function($scope, $location, PagesList, SocketServicesFactory){

	var pagesList = new PagesList();
	var socket;
	
	this.socketConnection = function(url){
		socket = SocketServicesFactory.build(url);
		$scope.pagesList = pagesList;
		// listenOnEvents();
	};

	this.listenOnEvents = function(){
		socket.on('configPageList', function(info){
			$scope.pagesList.updateParameters(info);
		});
		socket.on('insertPage', function(info){
			$scope.pagesList.addPage(info);
		});
	};

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	
});