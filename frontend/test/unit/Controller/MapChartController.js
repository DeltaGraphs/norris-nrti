/*jshint node: true */
'use strict';

/*
* Name :  MapChartController.js
* Module : UnitTest
* Location : /frontend/test/unit/Controller
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-05-25  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-25  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

describe('MapChartController', function(){
	var scope;
	var controller;

	beforeEach(angular.mock.module('app'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller('MapChartController', {
            '$scope': scope
        });
    }));

	describe('socketConnectio', function(){

	});

	describe('listenOnEvent', function(){

	});

});