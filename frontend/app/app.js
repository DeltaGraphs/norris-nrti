/*jshint node: true */
'use strict';

/*
* Name :  app.js
* Module : FrontEnd
* Location : /frontend/app
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.1.0			2015-05-31	Rossetto Francesco			Modified structure of appConfig
*
* 0.0.2         2015-05-15  Maria Giovanna Chinellato   Add code of config file
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

var appConfig = function($routeProvider) {
    $routeProvider /* inizio definizione di routeProvider */
        .when('/', {
            //controller: 'PagesListController',
            templateUrl: 'index.html'
        })
        .when('/page/:pageId', {
        	controller : 'PageController',
        	templateUrl: 'View/page.html'
        })
        .when('/m', {
            controller: 'MapChartController',
            templateUrl: 'View/mapchart.html'
        })
    ; /* fine definizione di routeProvider */
};

var app = angular.module('app', []).config(appConfig); /* definisce un
namespace (chiamato modulo) */