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
* 0.0.1         2015-06-02  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/


angular.module('norris-nrti')
.directive('tableChart', function($compile){
	return {
		restrict: 'E',
		//controller : 'TableController',
		replace: false,
		scope: {
            url: '@'
		},
		bindToController: true,
        //template: '<div>table {{url}}</div>',
        link: function(scope, element, attrs){

        	attrs.$observe('url', function(value) {
                console.log('TABLE observ url ' + value);
                if (value) {
                    scope.$parent.socketConnection(value);
                }
            });

            scope.$parent.$watch('changed', function(newValue, oldValue){
                if (newValue !== oldValue) {
                    console.log('TABLE watch changedP');
                    scope.setData();
                    console.log('scope.data.length: ' +scope.data.length);
                    if (scope.data.length > 0) {
                        scope.init();
                    }
                }
            }, true);

            /*scope.$parent.$watch('changedD', function(newValue, oldValue){
                if(newValue !== oldValue){
                    console.log('TABLE watch changedD');                    
                    scope.setData();
                    scope.init();
                }
            }, true);*/

            scope.init = function(){
                console.log('TABLE init');
            	element.empty();

                var table = '<div class="graphtitle">'+ scope.$parent.table.getTitle() +'</div>';   

                table = table + '<div><table st-table="data" ';
                    
                if (table.getAppearance().border !== undefined) {
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

            scope.setData = function(){
                console.log('TABLE setData');
                var data = [];
                var appearance = [];
                for (var k=0; k<scope.$parent.table.getFlowList().length; k++) {
                    console.log('TABLE getData.length ' + scope.$parent.table.getFlowList()[k].flow.getData().length);
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
                console.log('data. length: ' + data.length);
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