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


angular.module('app')
.directive('tableChart', function($compile, ngTableParams){
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
                    //scope.$parent.socketConnection(value);
                    scope.setData();
                    scope.init();
                }
            });

            scope.$parent.$watch('changedP', function(newValue, oldValue){
                if (newValue !== oldValue) {
                    console.log('TABLE watch changedP');
                    //scope.init();
                }
            }, true);

            /*scope.$parent.$watch('changedP', function(newValue, oldValue){
                if(newValue !== oldValue){
                    console.log('BARCHART watch changedP');                    
                    scope.render();
                }
            }, true);*/

            scope.init = function(){
                console.log('TABLE init');
            	element.empty();
                /*var  table = '<div class="ng-cloak ng-table-pager" ng-if="params.data.length">' +
                                    '<div ng-if="params.settings().counts.length" class="ng-table-counts btn-group pull-right">' +
                                        '<button ng-repeat="count in params.settings().counts" type="button"' +
                                            'ng-class="{\'active\':params.count() == count}"' +
                                            'ng-click="params.count(count)" class="btn btn-default">' +
                                            '<span ng-bind="count"></span>' +
                                        '</button>' +
                                    '</div>' +
                                    '<ul class="pagination ng-table-pagination">' +
                                        '<li ng-class="{\'disabled\': !page.active && !page.current, \'active\': page.current}" ng-repeat="page in pages" ng-switch="page.type">' +
                                            '<a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a>' +
                                            '<a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a>' +
                                            '<a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a>' +
                                            '<a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a>' +
                                            '<a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a>' +
                                            '<a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a>' +
                                        '</li>' +
                                    '</ul>' +
                                '</div>';
                table = '<div ng-table-pagination="tableParams">' +
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
                            '</div>';*/
                var table =     '<div class="graphtitle">'+ scope.$parent.table.getTitle() +'</div>' +
                            '<p><strong>Page:</strong> {{tableParams.page()}}' +
                            '<p><strong>Count per page:</strong> {{tableParams.count()}}' +                                
                            '<table ng-table="tableParams" class="table"><tr ng-repeat="record in data">';

                for (var i=0; i<scope.$parent.table.getHeaders().length; i++){

                	table = table + '<td data-title="\''+ scope.$parent.table.getHeaders()[i] +'\'">{{record.'+ scope.$parent.table.getHeaders()[i] +'}}</td>';
                }
                table = table + '</tr></table>';
                
                console.log(table);
            	var compiled = $compile(table)(scope);

                element.append(compiled);
            };

            scope.setData = function(){
                console.log('TABLE setData');
                var data = [];
                console.log('getData.length ' + scope.$parent.table.getFlowList()[0].flow.getData().length + ' stringify table: ' + JSON.stringify(scope.$parent.table));
                for (var i=0; i<scope.$parent.table.getFlowList()[0].flow.getData().length; i++) {
                    var record = {};
                    console.log('getHeader.length ' + scope.$parent.table.getHeaders().length);
                    for (var j=0; j<scope.$parent.table.getHeaders().length; j++) {
                        record[scope.$parent.table.getHeaders()[j]] = scope.$parent.table.getFlowList()[0].flow.getData()[i].value[j];
                    }
                    data.push(record);
                }
                console.log('data length ' +data.length);
                for (var g=0; g<data.length; g++) {
                    console.log('TABLE data: ' + JSON.stringify(data[g]));
                }
                scope.data = data;
                scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: scope.$parent.table.getMaxItemsPage()         // count per page
                }, {
                    total: data.length, // length of data
                    data: function ($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            };
        }
    };
});