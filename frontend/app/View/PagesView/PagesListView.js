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
			url: '@'
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
			scope.socketConnection(attrs.url);
/*
			scope.render = function() {
				var parent = document.getElementById('pagesList');
				while(parent.firstChild) {
				    parent.removeChild(parent.firstChild);
				}
				for(var i=0; i<scope.pagesList.length; i++){
					var div = document.createElement('div');
					div.className = 'page';
					div.innerHTML = '<p> <a href="#/page/'+ i +'" > {{ scope.pagesList['+ i +'].page.getName() }} </a> </p>\n' +
									'<p> {{ scope.pagesList['+ i +'].page.getDescription() }} </p>';
					parent.appendChild(div);
				}
       		};

       		scope.$watch('scope.pagesList', function(){
       			if (scope.pagesList){
		          	console.log('watch render');
		          	scope.render();
	    	      	console.log('watch render fine');
	    	    }
        	}, true);
*/
		}

	};
});