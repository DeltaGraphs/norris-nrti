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
.controller('PagesListController', ['$scope', '$location', 'PagesList', 'SocketServicesFactory', function($scope, $location, PagesList, SocketServicesFactory){

	var socket;
	
	this.socketConnection = function(url){
		socket = SocketServicesFactory.build(url);
		$scope.pagesList = PagesList.getPagesList();
		this.listenOnEvents();
	};

	this.listenOnEvents = function(){
		socket.on('configPageList', function(info){
			PagesList.updateParameters(info);
			$scope.pagesList = PagesList.getPagesList();
		});
		socket.on('insertPage', function(info){
			PagesList.addPage(info);
			$scope.pagesList = PagesList.getPagesList();
		});
	};

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	
}]);