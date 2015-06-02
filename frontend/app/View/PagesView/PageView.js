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
.directive('page', function(){
	return {
		restrict: 'E',
		controller : 'PageController',
		replace: false,
		scope: {
			
		},
		template: '<div id="page">' +
					'<h1> ciao </h1>' +
					'<table>' +
						'<tr ng-repeat="line in graphs">' +
							'<td ng-repeat="graph in line">' +
								'<div> ohi ({{$index}},{{$parent.$index}})</div>' +
							'</td>' +
						'</tr>' +
					'</table>' +
				'</div>',
		link: function (scope) {
			scope.socketConnection();
/*
			scope.render = function() {
				var parent = document.getElementById('page');
				while(parent.firstChild) {
				    parent.removeChild(parent.firstChild);
				}

				var table = document.createElement('div');
				table.className = 'graphstable';
				table.appendChild('table');
				arrayDiv = [];
				for(var i=0; i<scope.page.getGraphsList().length; i++) {
					var div = document.createElement('div');
					div.className = 'graph';
					switch (scope.page.getGraphsList()[i].graph.contructor.name) {
						case 'BarChart' : 
							div.innerHTML = '<bar-chart id=barchart"'+ i +'" barChart="{{ scope.page.getGraphsList()[i].graph }}">';
							break;
						case 'LineChart' : 
							div.innerHTML = '<line-chart id=linechart"'+ i +'" lineChart="{{ scope.page.getGraphsList()[i].graph }}">';
							break;
						case 'MapChart' : 
							div.innerHTML = '<map-chart id=mapchart"'+ i +'" mapChart="{{ scope.page.getGraphsList()[i].graph }}">';
							break;
						case 'Table' :
							div.innerHTML = '<table id=table"'+ i +'" table="{{ scope.page.getGraphsList()[i].graph }}">';
							break;
					}
					arrayDiv.push(div);
				}
				
				for (var i=0; i<scope.page.getGraphsPerRow(); i++) {
					for (var j=0; j<scope.page.getGraphsPerCol(); j++) {
						div = arrayDiv[i*scope.page.getGraphsPerRow() + j];
						parent.appendChild(div);
					}
				}
       		};

       		scope.render();

       		scope.$watch('scope.page.getGraphsList()', function(){
	          	scope.render();
        	}, true);
*/
		}

	};
});