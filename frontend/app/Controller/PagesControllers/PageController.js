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
.controller('PageController', ['$scope', '$location', '$routeParams', 'PagesList', 'PageFactory', 'SocketServicesFactory', function($scope, $location, $routeParams, PagesList, PageFactory, SocketServicesFactory){

	$scope.page = PagesList.prototype.getPagesList()[$routeParams.pageId].page;
	var url = 'http://norris-nrti-dev.herokuapp.com/page1';
	var socket;

	this.socketConnection = function(){
		console.log('socketconnection page: ' + url);
		socket = SocketServicesFactory.build(url);
		this.listenOnEvents();
	};

	this.listenOnEvents = function(){
		socket.on('configPage', function(info){
			$scope.page.updateParameters(info.properties);
			$scope.page.initializeData(info.data);
			$scope.graphs = matrix($scope.page.getGraphsList());

		});
		socket.on('updatePageProp', function(info){
			$scope.page.updateParameters(info);
		});
		socket.on('insertGraph', function(info){
			$scope.page.addGraph(info);
			$scope.graphs = matrix($scope.page.getGraphsList());
		});
	};

	$scope.checkType = function(graph, type){
		if (graph.graph.constructor.name === type){
			return true;
		}
		return false;
	};

	function matrix(list) {
		var array = [];
		var count = 0;
		for (var i=0;count<list.length && i<$scope.page.getGraphsPerCol(); i++) {
			array[i] = [];
			for (var j=0;count<list.length && j<$scope.page.getGraphsPerRow(); j++) {
				array[i].push(list[$scope.page.getGraphsPerRow()*i+j]);
				count++;
			}
		}
		return array;
	}

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	
}]);