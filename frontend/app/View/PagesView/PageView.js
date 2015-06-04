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
		/*
					'<h1> ciao </h1>' +
					'<table>' +
						'<tr ng-repeat="line in /graphs">' +
							'<td ng-repeat="graph in line">' +
								'<div ng-if="checkType(graph, \'LineChart\')" ng-controller="LineChartController">' +
                                	'<line-chart urllc="{{graph.graph.getUrl()}}"></line-chart>' +
                                '</div>' +
								'<div ng-if="checkType(graph, \'BarChart\')" ng-controller="BarChartController">' +
                                	'<bar-chart urlbc="{{graph.graph.getUrl()}}"></bar-chart>' +
                                '</div>' +
								'<div ng-if="checkType(graph, \'MapChart\')" ng-controller="MapChartController">' +
                                	'<map-chart urlmc="{{graph.graph.getUrl()}}"></map-chart>' +
                                '</div>' +
								'<div ng-if="checkType(graph, \'Table\')" ng-controller="TableController">' +
                                	'<table-chart urltc="{{graph.graph.getUrl()}}"></table-chart>' +
                                '</div>' +
							'</td>' +
						'</tr>' +
					'</table>' +
				'</div>',*/
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
						var graph = line[j].graph;
						switch (graph.constructor.name) {
							case 'BarChart' : 
								div.setAttribute('ng-controller', 'BarChartController');
								div.innerHTML = '<bar-chart urlbc="'+ graph.getUrl() +'"></bar-chart>';
								break;
							case 'LineChart' : 
								div.setAttribute('ng-controller', 'LineChartController');
								div.innerHTML = '<line-chart urllc="'+ graph.getUrl() +'"></line-chart>';
								break;
							case 'MapChart' : 
								div.setAttribute('ng-controller', 'MapChartController');
								div.innerHTML = '<map-chart urlmc="'+ graph.getUrl() +'"></map-chart>';
								break;
							case 'Table' :
								div.setAttribute('ng-controller', 'TableController');
								div.innerHTML = '<table-chart urltc="'+ graph.getUrl() +'"></table-chart>';
								break;
						}
						var cell = row.insertCell(j);
						cell.appendChild(div);
					}
				}
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