/*jshint node: true */
'use strict';

/*
* Name :  url.js
* Module : FrontEnd::View
* Location : /frontend/app/PagesView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0			2015-06-04	Francesco Rossetto			Add all attributes and all methods	
*
* 0.0.1         2015-06-04  Francesco Rossetto			Initial code      
* =================================================================================================
*/
angular.module('app')
.directive('url', function(){
	return {
		restrict: 'A',
		replace: false,
		transclude: true,
		link: function (scope, element, attrs) {
			scope.url=attrs.url;
		}

	};
});