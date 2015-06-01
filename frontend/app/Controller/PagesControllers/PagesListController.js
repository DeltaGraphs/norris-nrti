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

	var s;
	var pagesList;
	
	this.socketConnection = function(ciao){
		console.log(ciao);
		s = SocketServicesFactory.build(ciao);
		console.log(s.constructor.name);
		this.listenOnEvents();
	};

	this.listenOnEvents = function(){
		console.log('listen on event');
		console.log(JSON.stringify(s));
		s.on('configPageList', function(info){
			console.log('configPageList');
			console.log(JSON.stringify(info));
			//pagesList = new PagesList(info);
			//$scope.pagesList = pagesList.getPagesList();
		});
		s.on('insertPage', function(info){
			//pagesList.addPage(info);
			//$scope.pagesList = pagesList.getPagesList();
		});
		console.log('fine events');
	};

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	
}]);