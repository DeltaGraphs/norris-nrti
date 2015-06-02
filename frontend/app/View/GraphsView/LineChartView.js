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
* 0.0.1         2015-06-02  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/


angular.module('app')
.directive('lineChart', function(){
	return {
		restrict: 'E',
		//controller : 'LineChartController',
		replace: false,
		require: '^page',
		scope: {
			id: '@'
		},
		bindToController: true,
        template: '<div>linechart {{id}}</div>'
    };
});