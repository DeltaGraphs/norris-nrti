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
.directive('tableChart', function($compile){
	return {
		restrict: 'E',
		//controller : 'TableController',
		replace: false,
		scope: {
            url: '@'
		},
		bindToController: true,
        //template: '<div>table {{url}}</div>'
        link: function(scope, element, attrs){

        	attrs.$observe('url', function(value) {
                console.log('BARCHART observ url ' + value);
                if (value) {
                    scope.$parent.socketConnection(value);
                }
            });

            scope.$parent.$watch('changedP', function(newValue, oldValue){
                if (newValue !== oldValue) {
                    console.log('BARCHART watch changedP');
                    scope.init();
                }
            }, true);

            /*scope.$parent.$watch('changedP', function(newValue, oldValue){
                if(newValue !== oldValue){
                    console.log('BARCHART watch changedP');                    
                    scope.render();
                }
            }, true);*/

            scope.init = function(){
            	while(element.firstChild) {
                    element.removeChild(element.firstChild);
                }

                var table = '<table ng-table="" [class="ng-table-responsive"]><tr ng-repeat="record in data">';
                for (var i=0; i<scope.$parent.table.getHeaders().length; i++){
                	table = table + '<td data-title="'+ scope.$parent.table.getHeaders()[i] +'">{{record.'+ scope.$parent.table.getHeaders()[i] +'}}</td>';
                }
                table = table + '</tr></table>';
            	var compiled = $compile(barchart)(scope);
                element.append(compiled);

            };

            scope.setData = function(){

            };
        }
    };
});