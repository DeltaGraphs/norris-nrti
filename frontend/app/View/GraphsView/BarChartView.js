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
        //template: '<nvd3-multi-bar-chart data="exampleData" id="exampleId" width="1000" height="600" showxaxis="true" showyaxis="true" rotatelabels="90"><svg></svg></nvd3-multi-bar-chart>',
        link: function(scope, element, attrs){

         /*scope.exampleData = [
         {
         'key': 'Series 1',
         'values': [ [ 1025409600000 , 0] , [ 1028088000000 , -6.3382185140371] , [ 1030766400000 , -5.9507873460847] , [ 1033358400000 , -11.569146943813] , [ 1036040400000 , -5.4767332317425] , [ 1038632400000 , 0.50794682203014] , [ 1041310800000 , -5.5310285460542] , [ 1043989200000 , -5.7838296963382] , [ 1046408400000 , -7.3249341615649] , [ 1049086800000 , -6.7078630712489] , [ 1051675200000 , 0.44227126150934] , [ 1054353600000 , 7.2481659343222] , [ 1056945600000 , 9.2512381306992] ]
         },
         {
         'key': 'Series 3',
         'values': [ [ 1025409600000 , 0] , [ 1028088000000 , -6.3382185140371] , [ 1030766400000 , -5.9507873460847] , [ 1033358400000 , -11.569146943813] , [ 1036040400000 , -5.4767332317425] , [ 1038632400000 , 0.50794682203014] , [ 1041310800000 , -5.5310285460542] , [ 1043989200000 , -5.7838296963382] , [ 1046408400000 , -7.3249341615649] , [ 1049086800000 , -6.7078630712489] , [ 1051675200000 , 0.44227126150934] , [ 1054353600000 , 7.2481659343222] , [ 1056945600000 , 9.2512381306992] ]
         },
         {
         'key': 'Series 4',
         'values': [ [ 1025409600000 , -7.0674410638835] , [ 1028088000000 , -14.663359292964] , [ 1030766400000 , -14.104393060540] , [ 1033358400000 , -23.114477037218] , [ 1036040400000 , -16.774256687841] , [ 1038632400000 , -11.902028464000] , [ 1041310800000 , -16.883038668422] , [ 1043989200000 , -19.104223676831] , [ 1046408400000 , -20.420523282736] , [ 1049086800000 , -19.660555051587] , [ 1051675200000 , -13.106911231646] , [ 1054353600000 , -8.2448460302143] , [ 1056945600000 , -7.0313058730976] ]
         }
         ];*/



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
                    scope.setData();
                }
            }, true);

            /*scope.$parent.$watch('changedF', function(newValue, oldValue){
                if(newValue !== oldValue){
                    console.log('BARCHART watch changedF');                    
                    //scope.legend();
                }
            }, true);*/

            scope.init = function(){  
                while(element.firstChild) {
                    element.removeChild(element.firstChild);
                }
                console.log('BARCHART init');
                var barchart, legend, onPoint, control;
                var str = scope.url.split('/');
                var id = str[str.length-1];
                if (scope.$parent.barChart.getLegend() !== null){
                    legend = true;
                }
                else{
                    legend = false;
                }
                if (scope.$parent.barChart.getGroupingControl()){
                    control = true;
                }
                else{
                    control = false;
                }
                if (scope.$parent.barChart.getLegendOnPoint()){
                    onPoint = true;
                }
                else{
                    onPoint = false;
                }
                if (scope.$parent.barChart.getBarOrientation() === 'V'){
                    barchart = '<nvd3-multi-bar-chart data="data" nodata=" " id="'+ id +'" ';
                    barchart = barchart + 'xaxisticksformat="xAxisTickFormatFunction()" showxaxis="true" showyaxis="true" ';
                    barchart = barchart + 'rotatelabels="-90" interactive="true" tooltips="'+ onPoint +'" showlegend="'+ legend +'" ';
                    barchart = barchart + 'xaxislabel="'+ scope.$parent.barChart.getX().getName() +'" ';
                    barchart = barchart + 'showcontrols="'+ control +'" color="colorFunction()">';
                    //barchart = barchart + 'width="'+ scope.$parent.barChart.getWidth() +'" height="'+ scope.$parent.barChart.getHeight() +'">';
                    barchart = barchart + '<svg width="'+ scope.$parent.barChart.getWidth() +'" height="'+ scope.$parent.barChart.getHeight() +'"></svg></nvd3-multi-bar-chart>';
                }else if(scope.$parent.barChart.getBarOrientation() === 'H'){
                    barchart = '<nvd3-multi-bar-horizontal-chart data="data" nodata=" " id="'+ id +'" ';
                    barchart = barchart + 'xaxisticksformat="xAxisTickFormatFunction()" yaxistickformat="yAxisTickFormatFunction()" showxaxis="true" showyaxis="true" ';
                    barchart = barchart + 'rotatelabels="-90" interactive="true" tooltips="'+ onPoint +'" showlegend="'+ legend +'" ';
                    barchart = barchart + 'xaxislabel="'+ scope.$parent.barChart.getX().getName() +'" ';
                    barchart = barchart + 'showcontrols="'+ control +'" color="colorFunction()">';
                    //barchart = barchart + 'width="'+ scope.$parent.barChart.getWidth() +'" height="'+ scope.$parent.barChart.getHeight() +'">';
                    barchart = barchart + '<svg width="'+ scope.$parent.barChart.getWidth() +'" height="'+ scope.$parent.barChart.getHeight() +'"></svg></nvd3-multi-bar-horizontal-chart>';
                }
                
                /*switch (scope.$parent.barChart.getLegend().getPosition()) {
                    case 'N':

                        break;
                    case 'E':

                        break;
                    case 'S':

                        break;
                    case 'W':
                        
                        break;
                    case 'NE':
                        
                        break;
                    case 'NW':
                        
                        break;
                    case 'SE':
                        
                        break;
                    case 'SW':
                        break;
                }*/

                /*d3.select("nv-legendWrap")
                    .attr("transform", null)
                    .attr("transform", "translate(100,100)");
                */

                var compiled = $compile(barchart)(scope);
                element.append(compiled);

            };
            
            scope.colorArray = [];
            scope.colorFunction = function() {
                return function(d, i) {
                    return scope.colorArray;
                };
            };

            scope.setData = function(){
                var data = [];
                var colorArray = [];

                for (var i=0; i<scope.$parent.barChart.getFlowList().length; i++) {
                    var key;
                    var values = [];
                    key = scope.$parent.barChart.getFlowList()[i].flow.getName();
                    colorArray.push(scope.$parent.barChart.getFlowList()[i].flow.getFlowColor());
                    console.log('length ' + scope.$parent.barChart.getFlowList().length);
                    for (var j=0; j<scope.$parent.barChart.getFlowList()[i].flow.getData().length; j++) {
                        var value = [scope.$parent.barChart.getHeaders()[j], scope.$parent.barChart.getFlowList()[i].flow.getData()[j].value[1]];
                        values.push(value);
                    }
                    data.push({ 'key': key, 'values': values});
                    console.log('barchart data ' + data.toString());
                }
                scope.data = data;
                scope.colorArray = colorArray;

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