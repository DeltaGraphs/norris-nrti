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
            	while(element.firstChild) {
                    element.removeChild(element.firstChild);
                }
                /*var table = '<p><strong>Page:</strong> {{tableParams.page()}}' +
                                '<p><strong>Count per page:</strong> {{tableParams.count()}}' +

                                '<table ng-table="tableParams" class="table">' +
                                    '<tr ng-repeat="user in data">' +
                                        '<td data-title="Name">' +
                                            '{{user.name}}' +
                                        '</td>' +
                                        '<td data-title="Age">' +
                                            '{{user.age}}' +
                                        '</td>' +
                                    '</tr>' +
                                '</table>';*/
                var table = '<p><strong>Page:</strong> {{tableParams.page()}}' +
                            '<p><strong>Count per page:</strong> {{tableParams.count()}}' +                                
                            '<table ng-table="tableParams" [class="ng-table-responsive"]><tr ng-repeat="record in data">';
                for (var i=0; i<scope.$parent.table.getHeaders().length; i++){
                	table = table + '<td data-title="'+ scope.$parent.table.getHeaders()[i] +'">{{record.'+ scope.$parent.table.getHeaders()[i] +'}}</td>';
                }
                table = table + '</tr></table>';
                console.log(table);
            	var compiled = $compile(table)(scope);

                element.append(compiled);

            };

            scope.setData = function(){
                console.log('TABLE setData');
                var data = [];
                for (var i=0; i<scope.$parent.table.getFlowList()[0].flow.getData().length; i++) {
                    var record;
                    for (var j=0; j<scope.$parent.table.getHeaders().length; i++) {
                        record[scope.$parent.table.getHeaders()[j]] = scope.$parent.table.getFlowList()[0].flow.getData()[i][j];
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
                    getData: function ($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            };
        }
    };
});