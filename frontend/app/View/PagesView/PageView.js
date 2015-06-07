/*jshint node: true */
'use strict';

/*
* Name :  PageView.js
* Module : FrontEnd::View
* Location : /frontend/app/PagesView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0			2015-05-30	Francesco Rossetto			Add all attributes and all methods	
*
* 0.0.1         2015-05-30  Francesco Rossetto			Initial code      
* =================================================================================================
*/
angular.module('app')
.directive('page', function($compile){
	return {
		restrict: 'E',
		controller : 'PageController',
		replace: false,
		scope: {
			
		},
		template: '<div id="page"></div>',
		link: function (scope, element, attrs) {
			scope.socketConnection();

			scope.render = function() {
				var parent = document.getElementById('page');
				while(parent.firstChild) {
				    parent.removeChild(parent.firstChild);
				}

				var table = document.createElement('table');
				table.className = 'graphstable';
				parent.appendChild(table);

				for(var i=0; i<scope.graphs.length; i++) {
					var line = scope.graphs[i];
					var row = table.insertRow(i);
					for(var j=0; j<line.length; j++) {
						var div = document.createElement('div');
						div.className = 'graph';
						var graph = line[j];
						switch (graph.type) {
							case 'BarChart' : 
								div.setAttribute('ng-controller', 'BarChartController');
								div.innerHTML = '<bar-chart url="'+ graph.url +'"></bar-chart>';
								break;
							case 'LineChart' : 
								div.setAttribute('ng-controller', 'LineChartController');
								div.innerHTML = '<line-chart url="'+ graph.url +'"></line-chart>';
								break;
							case 'MapChart' : 
								div.setAttribute('ng-controller', 'MapChartController');
								div.innerHTML = '<map-chart url="'+ graph.url +'"></map-chart>';
								break;
							case 'Table' :
								div.setAttribute('ng-controller', 'TableController');
								div.innerHTML = '<table-chart url="'+ graph.url +'"></table-chart>';
								break;
						}
						var cell = row.insertCell(j);
						cell.setAttribute('align', 'center');
						cell.appendChild(div);
					}
				}

				parent.setAttribute('style', 'height:'+ 900*scope.page.getGraphsPerCol() +'px; width:'+ 1300*scope.page.getGraphsPerRow() +'px;')

				var el = $compile(parent)(scope);
				element.parent().append( el );
       		};

       		scope.$watch('graphs', function(){
       			if (scope.graphs.length > 0) {
	          		scope.render();
	          	}
        	}, true);

		}

	};
});