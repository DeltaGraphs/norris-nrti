/*jshint node: true */
'use strict';

/*
* Name :  ngIf.js
* Module : FrontEnd::View
* Location : /frontend/app/View
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-06-03  Maria Giovanna Chinellato   Add all attributes and all methods  
*
* 0.0.1         2015-06-03  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/


angular.module('app')
.directive('ngIf', function() {
    return {
        link: function(scope, element, attrs) {
            if(scope.$eval(attrs.ngIf)) {
                // remove '<div ng-if...></div>'
                element.replaceWith(element.children());
            } else {
                element.replaceWith(' ');
            }
        }
    };
});