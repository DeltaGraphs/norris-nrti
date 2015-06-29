/*jshint node: true */
'use strict';

/*
* Name :  PageView.js
* Module : FrontEnd::View::PagesView
* Location : /frontend/app/PagesView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.1         2015-06-14  Maria Giovanna Chinellato   Fix page size     
*
* 1.0.0         2015-06-14  Francesco Rossetto		    Tested     
*
* 0.1.1         2015-06-04  Maria Giovanna Chinellato   Fix link function      
*
* 0.1.0			2015-05-30	Francesco Rossetto			Add all attributes and all methods	
*
* 0.0.1         2015-05-30  Francesco Rossetto			Initial code      
* =================================================================================================
*/
angular.module('norris-nrti')
.directive('page', function($compile, $routeParams){
	return {
		restrict: 'E', // direttiva di tipo elemento (tag)
		controller : 'PageController',
		replace: false,
		scope: {},
		template: '<div id="page" style="width: 100%;"></div>', // template HTML inserito dalla direttiva
		link: function (scope, element, attrs) {
			scope.socketConnection(); // richiama la funzione del controller che permette di connettersi al server

			scope.render = function() {
				parent = element.children()[0];
				element.empty();

				var commands = document.createElement('div');
				commands.setAttribute('class', 'commands');
				/*if (scope.previous) { // controlla se è presente una pagina precedente
					var previous = document.createElement('div');
					//previous.setAttribute('style', 'float:left;');
					var pIndex = parseInt($routeParams.pageId) - 1;
					previous.innerHTML = '<a ng-click="previous('+pIndex+')" target="_self">PREVIOUS PAGE</a>'; // inserisce il link alla pagina precedente
					commands.appendChild(previous);
				}
				var list = document.createElement('div');
				list.innerHTML = '<a ng-href="/" target="_self">RETURN TO PAGES LIST</a>';
				//list.setAttribute('style', 'float:left;');
				commands.appendChild(list);
				if (scope.next) { // controlla se è presente una pagina successiva
					var next = document.createElement('div');
					//next.setAttribute('style', 'float:left;');
					var nIndex = parseInt($routeParams.pageId) + 1;
					next.innerHTML = '<a ng-click="next('+nIndex+')" target="_self">NEXT PAGE</a>'; // inserisce il link alla pagina successiva
					commands.appendChild(next);
				}*/
				var list = document.createElement('div');
				list.innerHTML = '<a ng-href="#/" target="_self">RETURN TO PAGES LIST</a>';
				commands.appendChild(list);
				parent.appendChild(commands);

				var table = document.createElement('table');
				table.className = 'graphstable';
				table.setAttribute('style', 'width: 100%;');
				parent.appendChild(table);

				// crea la tabella con i grafici
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
								div.setAttribute('style', 'margin: 50px;');
								div.innerHTML = '<bar-chart url="'+ graph.url +'"></bar-chart>';
								break;
							case 'LineChart' : 
								div.setAttribute('ng-controller', 'LineChartController');
								div.setAttribute('style', 'margin: 50px;');
								div.innerHTML = '<line-chart url="'+ graph.url +'"></line-chart>';
								break;
							case 'MapChart' : 
								div.setAttribute('ng-controller', 'MapChartController');
								div.setAttribute('style', 'margin: 50px;');
								div.innerHTML = '<map-chart url="'+ graph.url +'"></map-chart>';
								break;
							case 'Table' :
								div.setAttribute('ng-controller', 'TableController');
								div.setAttribute('style', 'margin: 50px;');
								div.innerHTML = '<table-chart url="'+ graph.url +'"></table-chart>';
								break;
						}
						var cell = row.insertCell(j);
						cell.setAttribute('align', 'center');
						cell.appendChild(div);
					}
				}

				//parent.setAttribute('style', 'height:'+ 1000*scope.graphs.length +'px; width:'+ 1500*scope.graphs[0].length +'px;');

				var el = $compile(parent)(scope);
				element.parent().append( el );
       		};

       		scope.$watch('graphs', function(){ // ad ogni inserimento o modifica della lista dei grafici viene chiamata la funzione render che ne aggiorna la visualizzazione
       			if (scope.graphs.length > 0) {
	          		scope.render();
	          	}
        	}, true);

		}

	};
});