/*jshint node: true */
'use strict';

/*
* Name :  MapChart.js
* Module : FrontEnd::View
* Location : /frontend/app/View
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.0.1         2015-05-25  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/


angular.module('app')
.directive('mapChart', function(){
	return {
		restrict: 'E',
		controller : 'MapChartController',
		replace: false,
		scope: {
			grafico: '@'
		},
		link: function (scope, element, attrs) {
			scope.socketConnection();
			scope.listenOnEvent();
		},
		//template: // google map
	};
});