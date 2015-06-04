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
.directive('tableChart', function(){
	return {
		restrict: 'E',
		//controller : 'TableController',
		replace: false,
		scope: {
            urltc: '@'
		},
		bindToController: true,
        template: '<div>table {{urltc}}</div>'
    };
});