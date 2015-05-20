/*jshint node: true */
'use strict';

/*
* Name :  SocketServices.js
* Module : FrontEnd::Model
* Location : /frontend/app/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-05-12  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

angular.module('app')
.factory('SocketServices', function ($scope, $rootScope) {
    return {
        on: function (eventName, callback) {
            $scope.socket.on(eventName, function () {  
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply($scope.socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            $scope.socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply($rootScope.socket, args);
                    }
                });
            })
        }
    };
});