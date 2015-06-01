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


angular.module('app')
.directive('pagesList', function(){
	return {
		restrict: 'E',
		controller : 'PagesListController',
		replace: false,
		scope: {
			url: '@'
		},
		bindToController: true,
		template: '<div id="pagesList"></div>',
		link: function (scope, element, attrs) {
			scope.socketConnection(attrs.url);
			scope.listenOnEvents();

			scope.render = function() {
				var parent = document.getElementById('pagesList');
				while(parent.firstChild) {
				    parent.removeChild(parent.firstChild);
				}
				for(var i=0; i<scope.pagesList.length; i++){
					var div = document.createElement('div');
					div.className = 'page';

					div.innerHTML = '<p> <a href="#/page/{{i}}"> {{ scope.pagesList[i].page.getName() }} </a> </p>\n' +
									'<p> {{ scope.pagesList[i].page.getDescription() }} </p>';

					parent.appendChild(div);
				}
       		};

       		scope.$watch('scope.pagesList', function(){
	          	scope.render();
        	}, true);
				
		}

	};
});