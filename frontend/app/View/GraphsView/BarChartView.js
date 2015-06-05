/*jshint node: true */
'use strict';

/*
* Name :  barChart.js
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
.directive('barChart', function($compile){
	return {
		restrict: 'E',
		//controller : 'BarChartController',
		replace: false,
		scope: {
            url: '@'
		},
		bindToController: true,
        //template: '<div></div>',
        link: function(scope, element, attrs){

            scope.exampleData = [
                {
                    "key": "Series 1",
                    "values": [ [ 1025409600000 , 0] , [ 1028088000000 , -6.3382185140371] , [ 1030766400000 , -5.9507873460847] , [ 1033358400000 , -11.569146943813] , [ 1036040400000 , -5.4767332317425] , [ 1038632400000 , 0.50794682203014] , [ 1041310800000 , -5.5310285460542] , [ 1043989200000 , -5.7838296963382] , [ 1046408400000 , -7.3249341615649] , [ 1049086800000 , -6.7078630712489] , [ 1051675200000 , 0.44227126150934] , [ 1054353600000 , 7.2481659343222] , [ 1056945600000 , 9.2512381306992] ]             },
                {
                    "key": "Series 2",
                    "values": [ [ 1025409600000 , 0] , [ 1028088000000 , 0] , [ 1030766400000 , 0] , [ 1033358400000 , 0] , [ 1036040400000 , 0] , [ 1038632400000 , 0] , [ 1041310800000 , 0] , [ 1043989200000 , 0] , [ 1046408400000 , 0] , [ 1049086800000 , 0] , [ 1051675200000 , 0] , [ 1054353600000 , 0] , [ 1056945600000 , 0] , [ 1059624000000 , 0] , [ 1062302400000 , 0] , [ 1064894400000 , 0] , [ 1067576400000 , 0] , [ 1070168400000 , 0] , [ 1072846800000 , 0] , [ 1075525200000 , -0.049184266875945] ]
                },
                {
                    "key": "Series 3",
                    "values": [ [ 1025409600000 , 0] , [ 1028088000000 , -6.3382185140371] , [ 1030766400000 , -5.9507873460847] , [ 1033358400000 , -11.569146943813] , [ 1036040400000 , -5.4767332317425] , [ 1038632400000 , 0.50794682203014] , [ 1041310800000 , -5.5310285460542] , [ 1043989200000 , -5.7838296963382] , [ 1046408400000 , -7.3249341615649] , [ 1049086800000 , -6.7078630712489] , [ 1051675200000 , 0.44227126150934] , [ 1054353600000 , 7.2481659343222] , [ 1056945600000 , 9.2512381306992] ]
                },
                {
                    "key": "Series 4",
                    "values": [ [ 1025409600000 , -7.0674410638835] , [ 1028088000000 , -14.663359292964] , [ 1030766400000 , -14.104393060540] , [ 1033358400000 , -23.114477037218] , [ 1036040400000 , -16.774256687841] , [ 1038632400000 , -11.902028464000] , [ 1041310800000 , -16.883038668422] , [ 1043989200000 , -19.104223676831] , [ 1046408400000 , -20.420523282736] , [ 1049086800000 , -19.660555051587] , [ 1051675200000 , -13.106911231646] , [ 1054353600000 , -8.2448460302143] , [ 1056945600000 , -7.0313058730976] ]
                }
            ];

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

            scope.$parent.$watch('changedD', function(newValue, oldValue){
                if(newValue !== oldValue){
                    console.log('BARCHART watch changedD');                    
                    //scope.render();
                }
            }, true);

            scope.$parent.$watch('changedF', function(newValue, oldValue){
                if(newValue !== oldValue){
                    console.log('BARCHART watch changedF');                    
                    //scope.legend();
                }
            }, true);

            var  chart;

            scope.init = function(){


                element.append('<nvd3-multi-bar-chart data="exampleData" id="exampleId" ng-attr-x_axis_tick_format="xAxisTickFormatFunction()" width="1000" height="600" ng-attr-show_x_axis="true" ng-attr-show_y_axis="true"><svg></svg></nvd3-multi-bar-chart>');
                $compile(element.contents())(scope);
                /*
                showXAxis="true" showYAxis="true" 

                var parent = element.children()[0];
                var str = scope.url.split('/');
                var id = str[str.length-1];
                parent.setAttribute('id', id);
                parent.setAttribute('width', scope.$parent.barChart.getWidth());
                parent.setAttribute('height', scope.$parent.barChart.getHeight());
                parent.setAttribute('interactive', 'true');
                if (scope.$parent.barChart.getLegend() !== null){
                    parent.setAttribute('showLegend', 'true');
                }
                else{
                    parent.setAttribute('showLegend', 'false');
                }
                if (scope.$parent.barChart.getBarsGrouping() === 'stacked'){ // cosa bisogna mettere
                    parent.setAttribute('stacked', 'true');
                }
                if (scope.$parent.barChart.getBarsGrouping() === 'grouped'){
                    parent.setAttribute('grouped', 'true');
                }*/
                /*if (scope.$parent.barChart.getLegendOnPoint()){
                    parent.setAttribute('tooltips', 'true');
                }
                else{
                    parent.setAttribute('tooltips', 'false');
                }
                parent.setAttribute('rotate-labels', '90');

                var el = $compile(parent)(scope);
                element.append( el );
*/
                /*    d3.select(".nv-legendWrap")
                        .attr("transform", "translate(100,100)");*/

            };

            scope.setData = function(){

            };

            /*scope.legend = function() {
                var parent = element.children()[1];
                while(parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                }
                console.log('legend ' + JSON.stringify(scope.$parent.barChart.getLegend()));
                if (scope.$parent.barChart.getLegend() !== null) {
                    parent.setAttribute('style', 'background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + '; color: '+ scope.$parent.barChart.getLegend().getFontColor());
                    var ul = document.createElement('ul');
                    ul.setAttribute('style', 'list-style-type: none');
                    parent.appendChild(ul);
                    for (var i=0; i<scope.$parent.barChart.getFlowList().length; i++) {
                        var li = document.createElement('li');
                        var square = document.createElement('div');
                        square.setAttribute('style', 'height: 15px; width: 15px; float: left; background-color: ' + scope.$parent.barChart.getFlowList()[i].flow.getTrace().strokeColor);
                        var spanText = document.createElement('div');
                        var text = document.createTextNode('\u00A0\u00A0\u00A0\u00A0' + scope.$parent.barChart.getFlowList()[i].flow.getName());
                        spanText.appendChild(text);
                        li.appendChild(square);
                        li.appendChild(spanText);
                        console.log(ul);
                        ul.appendChild(li);
                    }
                }

            };*/

        }
    };
});