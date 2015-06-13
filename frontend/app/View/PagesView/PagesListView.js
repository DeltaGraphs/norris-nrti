/*jshint node: true */
'use strict';

/*
* Name :  PagesListView.js
* Module : FrontEnd::View
* Location : /frontend/app/PagesView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.0.1         2015-05-30  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/


angular.module('norris-nrti')
.directive('pagesList', function(){
	return {
		restrict: 'E',
		replace: false,
		controller: 'PagesListController',
		scope: {

		},
		template: '<div id="pagesList">' + 
					'<ul>' +
					'<li ng-repeat="page in pagesList">' +
						'<a ng-href="#/page/{{$index}}"> {{ page.page.getName() }} </a>' +
						'<p> {{ page.page.getDescription() }} </p>' +
					'</li>' +
					'</ul>' +
			'</div>',
		link: function (scope, element, attrs) {
			scope.socketConnection();
		}

	};
});