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

            scope.$parent.$watch('changedP', function(newValue, oldValue){
                if (newValue !== oldValue) {
                    console.log('TABLE watch changedP');
                    scope.setData();
                    scope.init();
                }
            }, true);

            scope.$parent.$watch('changedD', function(newValue, oldValue){
                if(newValue !== oldValue){
                    console.log('TABLE watch changedD');                    
                    scope.setData();
                    scope.init();
                }
            }, true);

            scope.init = function(){
                console.log('TABLE init');
            	element.empty();
                var table = '<div ng-table-pagination="tableParams" template-url="\'pager.html\'"></div>';
                table = table + '<div ng-table-pagination="tableParams">' +
                                    '<ul class="pagination ng-table-pagination">' +
                                        '<li ng-class="{\'disabled\': !page.active}" ng-repeat="page in pages" ng-switch="page.type">' +
                                            '<a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a>' +
                                            '<a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a>' +
                                            '<a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a>' +
                                            '<a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a>' +
                                            '<a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a>' +
                                            '<a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a>' +
                                        '</li>' +
                                    '</ul>' +
                                '</div>';

                table =  table + '<div class="graphtitle">'+ scope.$parent.table.getTitle() +'</div>';   

                table = table + '<div><table st-table="data" class="table table-striped"';
                    
                //da inserire dopo in base alla griglia si/no
                //
                /*if () {
                    table = table + 'class="table table-striped table-bordered">';
                } else if () {
                    table = table + 'class="table-condensed table-striped">';
                }*/

                table = table + '<thead><tr>';
                for (var i=0; i<scope.$parent.table.getHeaders().length; i++) {
                    table = table + '<th ';
                    console.log('TABLE init sortable ' + scope.$parent.table.getSortable());
                    if (scope.$parent.table.getSortable()) {
                        console.log('TABLE init headers[i] '+ scope.$parent.table.getHeaders()[i] +'column sort ' + scope.$parent.table.getSort().column);
                        if (scope.$parent.table.getHeaders()[i] === scope.$parent.table.getSort().column ) {
                            var ordinamento;
                            if (scope.$parent.table.getSort().ordering === 'ASC') {
                                ordinamento = 'true';
                            } else if (scope.$parent.table.getSort().ordering === 'DESC'){
                                ordinamento = 'reverse';
                            } 
                            console.log('TABLE init tipo sort ' + ordinamento);
                            table = table + 'st-sort-default="'+ ordinamento +'" st-sort="'+ scope.$parent.table.getHeaders()[i] +'"';
                        }
                    }
                    table = table + '>'+ scope.$parent.table.getHeaders()[i] +'</th>';
                }
                table = table + '</tr></thead>';

                table = table + '<tbody><tr ng-repeat="record in data">';
                i = 0;
                for (var j=0; j<scope.$parent.table.getHeaders().length; j++){
                    console.log('TABLE costruzione righe');
                    table = table + '<td >{{record.'+ scope.$parent.table.getHeaders()[j] +'}}</td>';
                    i++;
                }
                //style="background-color:'+ scope.appearance[i][j].bg +'; color:'+ scope.appearance[i][j].text +';"
                table = table + '</tr></tbody>';

                table = table + '<tfoot><tr>' +
                                    '<td colspan="5" class="text-center">' +
                                        '<div st-pagination="" st-items-by-page="itemsByPage" st-displayed-pages="5"></div>' +
                                    '</td>' +
                                '</tr></tfoot>';

                table = table + '</table><div>';
                
                console.log(table);
            	var compiled = $compile(table)(scope);

                element.append(compiled);
            };

            scope.data = [];
            scope.appearance = [];

            scope.setData = function(){
                console.log('TABLE setData');
                var data = [];
                var appearance = [];
                if (scope.$parent.table.getFlowList().length > 0) {
                    console.log('getData.length ' + scope.$parent.table.getFlowList()[0].flow.getData().length + ' stringify table: ' + JSON.stringify(scope.$parent.table));
                    for (var i=0; i<scope.$parent.table.getFlowList()[0].flow.getData().length; i++) {
                        var record = {};
                        var look = [];
                        for (var j=0; j<scope.$parent.table.getHeaders().length; j++) {
                            record[scope.$parent.table.getHeaders()[j]] = scope.$parent.table.getFlowList()[0].flow.getData()[i].value[j];
                            look[j] = scope.$parent.table.getFlowList()[0].flow.getData()[i].appearance[j];
                        }
                        data.push(record);
                        appearance.push(look);
                    }
                }
                console.log('appearance length ' +appearance.length);
                for (var g=0; g<appearance.length; g++) {
                    console.log('appearance['+ g +'] length ' +appearance[g].length);
                    for (var f=0; f<appearance[g].length; f++) {
                        console.log('TABLE appearance: ' + appearance[g][f].bg + ' ' + appearance[g][f].text);
                    }
                }
                scope.data = data;
                scope.appearance = appearance;
                scope.itemsByPage = scope.$parent.table.getMaxItemsPage();
                /*scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: scope.$parent.table.getMaxItemsPage()         // count per page
                }, {
                    total: data.length, // length of data
                    data: function ($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });*/
            };
        }
    };
});