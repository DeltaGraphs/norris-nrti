/*jshint node: true */
'use strict';

/*
* Name :  SocketServices.js
* Module : UnitTest
* Location : /frontend/test/unit/Controller
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.1         2015-06-24  Maria Giovanna Chinellato   Fix module
*
* 0.1.0         2015-06-23  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-06-23  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/
var mockSocket = angular.module('mockSocket', []);

angular.module('mockSocket')
.factory('SocketServicesFactory', function ($rootScope) {

	 function SocketServices() {
        this.events = {};

        return {
            on: function(eventName, callback){
				if(!this.events[eventName]){
					this.events[eventName] = [];
				}
				this.events[eventName].push(callback);
			},
            emit:function(eventName, data, emitCallback){
				if(this.events[eventName]){
					angular.forEach(this.events[eventName], function(callback){
						$rootScope.$apply(function() {
							callback(data);
						});
					});
				}
				if(emitCallback){
					emitCallback();
				}
			}
        };
    }

	function SocketServicesFactory() {}

    SocketServicesFactory.build = function () {
        return new SocketServices();
    };

    return SocketServicesFactory;
});