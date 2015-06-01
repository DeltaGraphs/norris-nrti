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
.factory('SocketServicesFactory', function ($rootScope) {

    function SocketServices(url) {
        var socket = io.connect(url);
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {  
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }

    function SocketServicesFactory() {}

    SocketServicesFactory.build = function (url) {
        return new SocketServices(url);
    }

    return SocketServicesFactory;

});