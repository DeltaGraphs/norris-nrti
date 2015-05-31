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
		template: '<div id="pagesList"></div>',
		link: function (scope, element, attrs) {
			scope.socketConnection(attrs.url);

			scope.render = function() {
				var parent = document.getElementById('pagesList');
				while(parent.firstChild) {
				    parent.removeChild(parent.firstChild);
				}
				for(var i=0; i<scope.pagesList.getPagesList().length; i++){
					var div = document.createElement('div');
					div.className = 'page';

					div.innerHTML = '<p> <a href="#/page/{{i}}"> {{ scope.pagesList.getPagesList()[i].page.getName() }} </a> </p>\n' +
									'<p> {{ scope.pagesList.getPagesList()[i].page.getDescription() }} </p>';

					parent.appendChild(div);
				}
       		};

       		//render();

       		scope.$watch('scope.pagesList.getPagesList()', function(){
	          	scope.render();
        	}, true);
				
		}

	};
});