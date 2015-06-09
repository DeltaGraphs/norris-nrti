/*jshint node: true */
'use strict';

/*
* Name :  TableController.js
* Module : FrontEnd::Controller::GraphsController
* Location : /frontend/app/Controller/GraphsController
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-06-04 Francesco Rossetto			Add all attributes and methods
*
* 0.0.1         2015-06-04  Francesco Rossetto			Initial code      
* =================================================================================================
*/

angular.module('norris-nrti')
.controller('RootController', ['$scope', 'UrlProvider', function($scope, UrlProvider){
	console.log('dentro root controller');
    $scope.url;
    $scope.$watch('url', function(newValue, oldValue) {
    	console.log('dentro watch root');
    	console.log('newValue: ' + newValue + ', oldValue: ' +oldValue );              
        UrlProvider.prototype.setUrl(newValue);
    }, true);
}]);