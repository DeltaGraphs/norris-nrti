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
	var url =  $scope.page.getUrl();
	var socket;

	console.log($scope.page.getName());
	console.log($scope.page.getGraphsList().length);
	this.socketConnection = function(){
		console.log('socketconnection page');
		console.log(url);
		socket = SocketServicesFactory.build(url);
		this.listenOnEvents();
	};

	this.listenOnEvents = function(){
		socket.on('configPage', function(info){
			console.log('configPage');
			console.log(JSON.stringify(info));
			$scope.page.updateParameters(info.properties);
			console.log('a');
			$scope.page.initializeData(info.data);
			console.log('b');
			$scope.graphs = matrix($scope.page.getGraphsList());
			console.log('c');

		});
		socket.on('updatePageProp', function(info){
			console.log('updatePageProp');
			$scope.page.updateParameters(info);
		});
		socket.on('insertGraph', function(info){
			console.log('insertGraph');
			$scope.page.addGraph(info);
			$scope.graphs = matrix($scope.page.getGraphsList());
		});
	};

	function matrix(list) {
		var array = new Array($scope.page.getGraphsPerRow());
		for (var i=0; i<array.length; i++) {
			array[i] = new Array($scope.page.getGraphsPerCol());
			for (var j=0; j<array[i].length; j++) {
				array[i].push(list[$scope.page.getGraphsPerRow()*i+j]);
			}
		}
		return array;
	}

	$scope.socketConnection = this.socketConnection;
	$scope.listenOnEvents = this.listenOnEvents;
	
}]);