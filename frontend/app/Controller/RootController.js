/*jshint node: true */
'use strict';

/*
* Name :  RootController.js
* Module : FrontEnd::Controller
* Location : /frontend/app/Controller
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.0         2015-06-12 Francesco Rossetto			Tested
*
* 0.1.0         2015-06-09 Francesco Rossetto			Add all attributes and methods
*
* 0.0.1         2015-06-09  Francesco Rossetto			Initial code      
* =================================================================================================
*/

angular.module('norris-nrti')
.controller('RootController', ['$scope', 'UrlProvider', function($scope, UrlProvider){
    $scope.url = '';
    $scope.$watch('url', function(newValue, oldValue) {            
        UrlProvider.prototype.setUrl(newValue);
    }, true);
}]);