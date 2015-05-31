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

			var render = function() {
				for(var i=0; i<scope.pagesList.getPagesList().length; i++){
					var div = document.createElement('div');
					div.className = 'page';

					div.innerHTML = '<p> <a href="{{ scope.pagesList.getPagesList()[i].id }}"> {{ scope.pagesList.getPagesList()[i].page.getName() }} </a> </p>\
									<p>  </p>';

					document.getElementById('pagesList').appendChild(div);
				}
       		}

       		/*scope.$watch('data', function(){
       			if (scope.data)
	          		scope.render();
        	}, true);*/
	
			render();
				
		}

	};
});