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
		restrict: 'E', // direttiva di tipo elemento (tag)
		replace: false,
		controller: 'PagesListController', // controller associato
		scope: {},
		template: '<div id="pagesList">' + 
					'<ul>' +
					'<li ng-repeat="page in pagesList">' +
						'<a ng-href="#/page/{{$index}}"> {{ page.page.getName() }} </a>' +
						'<p> {{ page.page.getDescription() }} </p>' +
					'</li>' +
					'</ul>' +
			'</div>', // template HTML inserito dalla direttiva
		link: function (scope, element, attrs) {
			scope.socketConnection(); // richiama la funzione del controller che permette di connettersi al server
		}

	};
});