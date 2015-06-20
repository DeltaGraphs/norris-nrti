/*jshint node: true */
'use strict';

/*
* Name :  norris-nrti.js
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

var norrisConfig = function($routeProvider) {
    $routeProvider /* inizio definizione di routeProvider */
        .when('/', {
            //controller: 'PagesListController',
            template: '<pages-list></pages-list>'
        })
        .when('/page/:pageId', {
        	//controller : 'PageController',
        	template: '<page></page>'
        })
    ; /* fine definizione di routeProvider */
};

var norris = angular.module('norris-nrti', ['ngRoute', 'smart-table','nvd3ChartDirectives']).config(norrisConfig); /* definisce un
namespace (chiamato modulo) */
