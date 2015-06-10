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

	$scope.page = PagesList.prototype.getPagesList()[$routeParams.pageId].page;
	$scope.previous = false;
	$scope.next = false;
	var a = $routeParams.pageId - 1;
	console.log('$routeParams.pageId - 1 ' + a);
	if (PagesList.prototype.getPagesList()[parseInt($routeParams.pageId) - 1] !== undefined) {
		$scope.previous = true;
		console.log('$scope.previous ' + $scope.previous);
	}
	var b = $routeParams.pageId + 1;
	console.log('$routeParams.pageId + 1 ' + b);
	if (PagesList.prototype.getPagesList()[parseInt($routeParams.pageId) + 1] !== undefined) {
		$scope.next = true;
		console.log('$scope.next ' + $scope.next);
	}
	var url = $scope.page.getUrl();
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
			console.log($scope.page.getGraphsList().toString());
			console.log($scope.graphs.toString());
		});
		socket.on('updatePageProp', function(info){
			$scope.page.updateParameters(info);
		});
		socket.on('insertGraph', function(info){
			$scope.page.addGraph(info);
			$scope.graphs = matrix($scope.page.getGraphsList());
		});
	};

	function matrix(list) {
		var array = [];
		var count = 0;
		console.log('list.length ' + list.length + ' $scope.page.getGraphsPerCol() ' + $scope.page.getGraphsPerCol());
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

	$scope.graphs = [];
	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	
}]);