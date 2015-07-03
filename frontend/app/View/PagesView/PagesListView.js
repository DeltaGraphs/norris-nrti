/*jshint node: true */
'use strict';

/*
* Name :  PagesListView.js
* Module : FrontEnd::View::PagesView
* Location : /frontend/app/PagesView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.1         2015-06-25  Maria Giovanna Chinellato   Fix test
*
* 1.0.0         2015-06-14  Maria Giovanna Chinellato   Tested
*
* 0.0.2         2015-06-04  Maria Giovanna Chinellato   Add link function, observe and watch      
*
* 0.0.1         2015-05-30  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/


angular.module('norris-nrti')
.directive('pagesList', function(){
	return {
		restrict: 'E', // direttiva di tipo elemento (tag)
		replace: false,
		controller: 'PagesListController', // controller associato
		scope: {},
		template: '<div id="pagesList">' + 
					'<ul>' +
					'<li class="page-li" ng-repeat="page in pagesList">' +
						'<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
						'<a class="page-link" ng-href="#/page/{{$index}}"> {{ page.page.getName() }} </a>' +
						'<p class="page-link-desc"> {{ page.page.getDescription() }} </p>' +
					'</li>' +
					'</ul>' +
			'</div>', // template HTML inserito dalla direttiva
		link: function (scope, element, attrs) {
			scope.socketConnection(); // richiama la funzione del controller che permette di connettersi al server
		}

	};
});
