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
                    scope.init();
                }
            }, true);

            scope.$parent.$watch('changedD', function(newValue, oldValue){
                if(newValue !== oldValue){
                    console.log('BARCHART watch changedD');                    
                    scope.setData();
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
                        //'<p><strong>Page:</strong> {{tableParams.page()}}' +
                        //'<p><strong>Count per page:</strong> {{tableParams.count()}}';     

                table = table + '<table st-table="data" class="table table-striped">';

                table = table + '<thead><tr>';
                for (var i=0; i<scope.$parent.table.getHeaders().length; i++) {
                    table = table + '<th st-sort="data.'+ scope.$parent.table.getHeaders()[i] +'">'+ scope.$parent.table.getHeaders()[i] +'</th>';
                }
                table = table + '</tr></thead>';

                table = table + '<tbody><tr ng-repeat="record in data">';
                for (var j=0; j<scope.$parent.table.getHeaders().length; j++){
                    //data-title="\''+ scope.$parent.table.getHeaders()[j] +'\'"
                	table = table + '<td>{{record.'+ scope.$parent.table.getHeaders()[j] +'}}</td>';
                }
                table = table + '</tr></tbody>';

                table = table + '<tfoot><tr>' +
                                    '<td colspan="5" class="text-center">' +
                                        '<div st-pagination="" st-items-by-page="itemsByPage" st-displayed-pages="5"></div>' +
                                    '</td>' +
                                '</tr></tfoot>';

                table = table + '</table>';
                
                console.log(table);
            	var compiled = $compile(table)(scope);

                element.append(compiled);
            };

            scope.setData = function(){
                console.log('TABLE setData');
                var data = [];
                //console.log('getData.length ' + scope.$parent.table.getFlowList()[0].flow.getData().length + ' stringify table: ' + JSON.stringify(scope.$parent.table));
                for (var i=0; i<scope.$parent.table.getFlowList()[0].flow.getData().length; i++) {
                    var record = {};
                    console.log('getHeader.length ' + scope.$parent.table.getHeaders().length);
                    for (var j=0; j<scope.$parent.table.getHeaders().length; j++) {
                        record[scope.$parent.table.getHeaders()[j]] = scope.$parent.table.getFlowList()[0].flow.getData()[i].value[j];
                    }
                    data.push(record);
                }
                //console.log('data length ' +data.length);
                /*for (var g=0; g<data.length; g++) {
                    console.log('TABLE data: ' + JSON.stringify(data[g]));
                }*/
                scope.data = data;
                scope.itemsByPage=10;
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