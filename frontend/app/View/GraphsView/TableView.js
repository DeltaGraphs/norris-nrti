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
* 1.0.2         2015-06-22  Maria Giovanna Chinellato   Fix appearance of table
*
* 1.0.1         2015-06-22  Maria Giovanna Chinellato   Fix update of data
*
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
                    if (scope.displayed.length > 0 && scope.$parent.changedP === true) {
                        console.log('changedP');
                        scope.init(); // chiama la funzione init che crea la tabella
                        scope.$parent.changedP = false;
                    }
                }
            }, true);

            // crea il codice HTML da inserire nella pagina per creare la tabella
            scope.init = function(){
            	element.empty();
                var border = 'border: 1px solid black;';
                var noBorder = 'class="table-condensed table-striped"';
                var headers = 'color: #000; background-color: #FFF;';
                
                if (scope.$parent.table.getAppearance().border !== undefined) {
                    border = 'border:' + scope.$parent.table.getAppearance().border.width + 'px solid ' + scope.$parent.table.getAppearance().border.color + ';';
                }
                var tableStyle = 'style="' + border + ' ';
                var str = scope.url.split('/');
                var id = str[str.length-1];
                var table = '<style>';

                // mette l'aspetto delle celle di riga pari e di riga dispari
                if(scope.$parent.table.getAppearance().rowOdd !== undefined && scope.$parent.table.getAppearance().rowEven !== undefined){
                    for (var td=0;td<scope.$parent.table.getHeaders().length;td++){
                        table = table + 'table #' + id +  ' tr:nth-child(odd) td:nth-child(' + (td+1) + '){ color: ' + scope.$parent.table.getAppearance().rowOdd.textColor[0] + '; ';
                        table = table + 'background-color: ' + scope.$parent.table.getAppearance().rowOdd.backgroundColor[td] + ';} ';
                        table = table + 'table #' + id +  ' tr:nth-child(even) td:nth-child(' + (td+1) + '){ color: ' + scope.$parent.table.getAppearance().rowEven.textColor[0] + '; ';
                        table = table + 'background-color: ' + scope.$parent.table.getAppearance().rowEven.backgroundColor[td] + ';}';  
                    }
                }

                table = table + '</style><div class="graphtitle">'+ scope.$parent.table.getTitle() +'</div><table id="' + id + '" st-table="displayed" st-safe-src="rowCollection" ';

                table = table + '<thead><tr>';
                for (var i=0; i<scope.$parent.table.getHeaders().length; i++) {
                    table = table + '<th ';
                    if (scope.$parent.table.getAppearance().headers !== undefined) {
                        headers = 'color:' + scope.$parent.table.getAppearance().headers.textColor[i] + '; background-color:' + scope.$parent.table.getAppearance().headers.backgroundColor[i] + '; ';
                    }
                    if (scope.$parent.table.getAppearance().border !== undefined) {
                        table = table + tableStyle + headers + ' " ';
                    } else {
                        table = table + noBorder + 'style="' + headers + ' " ';
                    }
                    if (scope.$parent.table.getSortable()) {
                        //for (var f=0; f<scope.$parent.table.getSort().columns.length; f++){ // for multicolunms sorting
                            //if (scope.$parent.table.getHeaders()[i] === scope.$parent.table.getSort().columns[f]) {
                            if (scope.$parent.table.getHeaders()[i] === scope.$parent.table.getSort().column) {
                                var ordinamento;
                                if (scope.$parent.table.getSort().ordering === 'ASC') {
                                    ordinamento = 'true';
                                } else if (scope.$parent.table.getSort().ordering === 'DESC'){
                                    ordinamento = 'reverse';
                                } 
                                table = table + 'st-sort-default="'+ ordinamento +'" st-sort="'+ scope.$parent.table.getHeaders()[i] +'"';
                            }
                        //}
                    }
                    table = table + '>'+ scope.$parent.table.getHeaders()[i] +'</th>';
                }
                table = table + '</tr></thead>';

                table = table + '<tbody><tr ng-repeat="line in displayed">';
                //i = 0;
                for (var j=0; j<scope.$parent.table.getHeaders().length; j++){
                    //table = table + '<td style="background-color:'+ scope.appearance[i][j].bg +'; color:'+ scope.appearance[i][j].text +';">{{record.'+ scope.$parent.table.getHeaders()[j] +'}}</td>';
                    //var cellText = 'color: #000;';
                    //var cellBG = 'background-color: #FFF;';
                    //if (scope.appearance[i][j] !== undefined){
                        //if (scope.appearance[i][j].bg !== undefined){
                    var cellBG = 'background-color: {{line.appearance.' + scope.$parent.table.getHeaders()[j] + '.bg}};'; // + scope.appearance[i][j].bg + ';';
                        //}
                        //if (scope.appearance[i][j].text !== undefined){
                    var cellText = 'color: {{line.appearance' + scope.$parent.table.getHeaders()[j] + '.text}};'; // + scope.appearance[i][j].text + ';';
                        //}
                    //}
                    //i++;
                    var cellStyle = 'style="' + border + cellBG + cellText + '"';
                    table = table + '<td ';
                    if (scope.$parent.table.getAppearance().border !== undefined) {
                        table = table + cellStyle;
                    } else {
                        table = table + noBorder + cellStyle;
                    }
                    table = table + '>{{line.record.'+ scope.$parent.table.getHeaders()[j] +'}}</td>';
                }
                table = table + '</tr></tbody>';

                table = table + '<tfoot><tr>' +
                                    '<td  style="background-color: #FFF;" colspan="5" class="text-center">' +
                                        '<div st-pagination="" st-items-by-page="itemsByPage" st-displayed-pages="5"></div>' +
                                    '</td>' +
                                '</tr></tfoot>';

                table = table + '</table>';
                
            	var compiled = $compile(table)(scope);
                element.append(compiled);
            };

            scope.displayed = [].concat(scope.rowCollection);
            scope.rowCollection = [];
            //scope.appearance;

            // imposta i dati da visualizzare
            scope.setData = function(){
                scope.rowCollection = []; // array che contiene una copia dei dati per permettere paginazione e ordinamento con dati dinamici
                //scope.appearance = [];
                //var appearance = ;
                for (var k=0; k<scope.$parent.table.getFlowList().length; k++) {
                    for (var i=0; i<scope.$parent.table.getFlowList()[k].flow.getData().length; i++) {
                        var appearance = {};
                        var record = {};
                        for (var j=0; j<scope.$parent.table.getHeaders().length; j++) {
                            if (scope.$parent.table.getFlowList()[k].flow.getData()[i].appearance !== undefined){
                                appearance[scope.$parent.table.getHeaders()[j]] = scope.$parent.table.getFlowList()[k].flow.getData()[i].appearance[j];
                            }
                            record[scope.$parent.table.getHeaders()[j]] = scope.$parent.table.getFlowList()[k].flow.getData()[i].value[j];
                        }
                        scope.rowCollection.push({'appearance': appearance, 'record': record});

                    }
                }
                /*console.log('appearance length ' + appearance.length);
                for (var g=0; g<appearance.length; g++) {
                    console.log('appearance['+ g +'] length ' +appearance[g].length);
                    for (var f=0; f<appearance[g].length; f++) {
                        console.log('TABLE appearance: ' + appearance[g][f].bg + ' ' + appearance[g][f].text);
                    }
                }*/
                //scope.appearance = appearance;
                scope.itemsByPage = scope.$parent.table.getMaxItemsPage();
            };
        }
    };
});