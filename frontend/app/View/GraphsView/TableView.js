/*jshint node: true */
'use strict';

/*
* Name :  TableView.js
* Module : FrontEnd::View::GraphsView
* Location : /frontend/app/View/GraphsView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.0         2015-06-13  Francesco Rossetto          Tested
*
* 0.1.0         2015-06-05  Maria Giovanna Chinellato   Add function: init and setData, fix code   
*
* 0.0.2         2015-06-04  Maria Giovanna Chinellato   Add link function, observe and watch      
*
* 0.0.1         2015-06-02  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/


angular.module('norris-nrti')
.directive('tableChart', function($compile){
	return { // attributo della direttiva
		restrict: 'E', // direttiva di tipo elemento (tag)
		replace: false,
		scope: {
            url: '@'
		},
		bindToController: true,
        link: function(scope, element, attrs){

        	attrs.$observe('url', function(value) {
                if (value) {
                    scope.$parent.socketConnection(value); // richiama la funzione del controller che permette di connettersi al server
                }
            });

            scope.$parent.$watch('changed', function(newValue, oldValue){
                if (newValue !== oldValue) {
                    scope.setData(); // chiama la funzione che organizza i dati da visualizzare
                    if (scope.data.length > 0) {
                        scope.init(); // chiama la funzione init che crea la tabella
                    }
                }
            }, true);

            // crea il codice HTML da inserire nella pagina per creare la tabella
            scope.init = function(){
            	element.empty();

                var table = '<div class="graphtitle">'+ scope.$parent.table.getTitle() +'</div>';   

                table = table + '<div><table st-table="data" ';
                    
                if (scope.$parent.table.getAppearance().border !== undefined) {
                    table = table + 'class="table table-striped table-bordered">';
                } else {
                    table = table + 'class="table-condensed table-striped">';
                }

                table = table + '<thead><tr>';
                for (var i=0; i<scope.$parent.table.getHeaders().length; i++) {
                    table = table + '<th ';
                    if (scope.$parent.table.getSortable()) {
                        if (scope.$parent.table.getHeaders()[i] === scope.$parent.table.getSort().column ) {
                            var ordinamento;
                            if (scope.$parent.table.getSort().ordering === 'ASC') {
                                ordinamento = 'true';
                            } else if (scope.$parent.table.getSort().ordering === 'DESC'){
                                ordinamento = 'reverse';
                            } 
                            table = table + 'st-sort-default="'+ ordinamento +'" st-sort="'+ scope.$parent.table.getHeaders()[i] +'"';
                        }
                    }
                    table = table + '>'+ scope.$parent.table.getHeaders()[i] +'</th>';
                }
                table = table + '</tr></thead>';

                table = table + '<tbody><tr ng-repeat="record in data">';
                i = 0;
                for (var j=0; j<scope.$parent.table.getHeaders().length; j++){
                    table = table + '<td style="background-color:'+ scope.appearance[i][j].bg +'; color:'+ scope.appearance[i][j].text +';">{{record.'+ scope.$parent.table.getHeaders()[j] +'}}</td>';
                    i++;
                }
                table = table + '</tr></tbody>';

                table = table + '<tfoot><tr>' +
                                    '<td colspan="5" class="text-center">' +
                                        '<div st-pagination="" st-items-by-page="itemsByPage" st-displayed-pages="5"></div>' +
                                    '</td>' +
                                '</tr></tfoot>';

                table = table + '</table><div>';
                
            	var compiled = $compile(table)(scope);
                element.append(compiled);
            };

            scope.data = [];
            scope.appearance = [];

            // imposta i dati da visualizzare
            scope.setData = function(){
                var data = [];
                var appearance = [];
                for (var k=0; k<scope.$parent.table.getFlowList().length; k++) {
                    for (var i=0; i<scope.$parent.table.getFlowList()[k].flow.getData().length; i++) {
                        var record = {};
                        var look = [];
                        for (var j=0; j<scope.$parent.table.getHeaders().length; j++) {
                            record[scope.$parent.table.getHeaders()[j]] = scope.$parent.table.getFlowList()[k].flow.getData()[i].value[j];
                            look[j] = scope.$parent.table.getFlowList()[k].flow.getData()[i].appearance[j];
                        }
                        data.push(record);
                        appearance.push(look);
                    }
                }
                /*console.log('appearance length ' + appearance.length);
                for (var g=0; g<appearance.length; g++) {
                    console.log('appearance['+ g +'] length ' +appearance[g].length);
                    for (var f=0; f<appearance[g].length; f++) {
                        console.log('TABLE appearance: ' + appearance[g][f].bg + ' ' + appearance[g][f].text);
                    }
                }*/
                scope.data = data;
                scope.appearance = appearance;
                scope.itemsByPage = scope.$parent.table.getMaxItemsPage();
            };
        }
    };
});