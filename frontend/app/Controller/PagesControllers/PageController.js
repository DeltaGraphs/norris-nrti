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

angular.module('app')
.controller('PageController', function($scope, $location, PageFactory, SocketServicesFactory){

	var url = $scope.page.getUrl();
	var socket;
	
	this.socketConnection = function(){
		socket = SocketServicesFactory.build(url);
		// listenOnEvents();
	};

	this.listenOnEvents = function(){
		socket.on('configPage', function(info){
			$scope.page = PageFactory.build(info);
		});
		socket.on('updatePageProp', function(info){
			$scope.page.updateParameters(info);
		});
		socket.on('insertGraph', function(info){
			$scope.page.addGraph(info);
		});
	};

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	
});