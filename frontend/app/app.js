/*
* Name :  app.js
* Module : FrontEnd
* Location : /frontend/app
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.0.2         2015-05-15  Maria Giovanna Chinellato   Add code of config file
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module("config", [] );
angular.module("services", [ "ngResource", "config" ] );
angular.module("controllers", [ "services", "utils", "config" ] );
angular.module("utils", [ "services", "config" ] );

var appConfig = function($routeProvider) {
	/*$routeProvider

	;*/
};

var app = angular.module('app', ["ngRoute", "controllers", "utils", "config"]).config(appConfig);