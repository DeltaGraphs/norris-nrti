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
.directive('lineChart', function($compile){
	return {
		restrict: 'E',
		//controller : 'LineChartController',
		replace: false,
        scope: {
            url: '@'
		},
		//bindToController: true,
        //template: '<div>ciao, sono il line chart</div>',
        link: function(scope, element, attrs){

        	attrs.$observe('url', function(value) {
                console.log('LINECHART observ url ' + value);
                if (value) {
                    scope.$parent.socketConnection(value);
                }
            });

            scope.$parent.$watch('changedP', function(newValue, oldValue){
                if (newValue !== oldValue) {
                    console.log('LINECHART watch changedP');
                    scope.init();
                }
            }, true);

            scope.$parent.$watch('changedD', function(newValue, oldValue){
                if(newValue !== oldValue){
                    console.log('LINECHART watch changedD');                    
                    scope.setData();
                }
            }, true);

            scope.$parent.$watch('changedF', function(newValue, oldValue){
                if(newValue !== oldValue){
                    console.log('LINECHART watch changedF');                    
                    //scope.legend();
                }
            }, true);

            scope.init = function(){
                console.log('LINECHART init');

                var linechart, legend, onPoint;
                var str = scope.url.split('/');
                var id = str[str.length-1];

                element.empty();

                if (scope.$parent.lineChart.getLegend() !== null){
                    legend = true;
                } else {
                    legend = false;
                }
                if (scope.$parent.lineChart.getLegendOnPoint()){
                    onPoint = true;
                } else {
                    onPoint = false;
                }
                console.log('LINECHART creo');
                if (scope.$parent.lineChart.getViewFinder() === true) {
                    linechart = '<div class="graphtitle">'+ scope.$parent.lineChart.getTitle() +'</div>' +
                                '<nvd3-line-with-focus-chart data="data" nodata=" " id="'+ id +'" ' +
                                'yaxistickformat="yAxisTickFormatFunction()" xaxistickformat="xAxisTickFormatFunction()" x2axistickformat="xAxisTickFormatFunction()" ' +
                                'margin="{left:30,top:30,bottom:30,right:30}" margin2="{left:30,top:30,bottom:30,right:30}" interactive="true" showlegend="'+ legend +'" tooltips="'+ onPoint +'" ' +
                                'color="colorFunction()" ' + 
                                'xaxisrotatelabels="-90" x2axisrotatelables="-90" interpolate="' + scope.$parent.lineChart.getInterpolation() +'">' + // perchè colorFunction ritorna null per adesso
                                '<svg style="width:'+ scope.$parent.lineChart.getWidth() +'px; height:'+ scope.$parent.lineChart.getHeight() +'px;"></svg></nvd3-line-with-focus-chart>';
                } else {
                    linechart = '<div class="graphtitle">'+ scope.$parent.lineChart.getTitle() +'</div>' +
                                '<nvd3-line-chart data="data" id="'+ id +'" ' +
                                'yaxistickformat="yAxisTickFormatFunction()" xaxistickformat="xAxisTickFormatFunction()" ' +
                                'margin="{left:30,top:30,bottom:30,right:30}" interactive="true" showlegend="'+ legend +'" tooltips="'+ onPoint +'" ' +
                                'xaxisrotatelabels="-90" interpolate="' + scope.$parent.lineChart.getInterpolation() +'" ' +
                                'color="colorFunction()" ' +
                                'showxaxis="true" showyaxis="true">' +
                                '<svg style="width:'+ scope.$parent.lineChart.getWidth() +'px; height:'+ scope.$parent.lineChart.getHeight() +'px;"></svg></nvd3-line-chart>';
                }

                var compiled = $compile(linechart)(scope);
                element.append(compiled);

            };

            scope.xAxisTickFormatFunction = function(){
                return function(d){
                    return d;
                };
            };

            scope.yAxisTickFormatFunction = function(){
                return function(d){
                    return d;
                };
            };

            scope.colorArray = [];
            scope.colorFunction = function() {
                return function(d, i) {
                    return scope.colorArray[i];
                };
            };

            scope.data;
            

            scope.setData = function(){
                var data = [];
                var colorArray = [];

                console.log('LINECHART setdata length ' + scope.$parent.lineChart.getFlowList().length);
                for (var i=0; i<scope.$parent.lineChart.getFlowList().length; i++) {
                    var key = scope.$parent.lineChart.getFlowList()[i].flow.getName();
                    var area = scope.$parent.lineChart.getFlowList()[i].flow.getArea();
                    colorArray.push(scope.$parent.lineChart.getFlowList()[i].flow.getFlowColor());
                    var values = [];
                    for (var j=0; j<scope.$parent.lineChart.getFlowList()[i].flow.getData().length; j++) {
                        var value = [scope.$parent.lineChart.getFlowList()[i].flow.getData()[j].value[0], scope.$parent.lineChart.getFlowList()[i].flow.getData()[j].value[1]];
                        values.push(value);
                    }
                    data.push({ 'key': key, 'area' : area, 'values': values});
                    console.log('LINECHART data ' + data.toString());
                }
                scope.data = data;
                scope.colorArray = colorArray;
            };

            /*scope.legend = function() {
                var parent = element.children()[1];
                while(parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                }
                console.log('legend ' + JSON.stringify(scope.$parent.lineChart.getLegend()));
                if (scope.$parent.lineChart.getLegend() !== null) {
                    parent.setAttribute('style', 'background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + '; color: '+ scope.$parent.lineChart.getLegend().getFontColor());
                    var ul = document.createElement('ul');
                    ul.setAttribute('style', 'list-style-type: none');
                    parent.appendChild(ul);
                    for (var i=0; i<scope.$parent.lineChart.getFlowList().length; i++) {
                        var li = document.createElement('li');
                        var square = document.createElement('div');
                        square.setAttribute('style', 'height: 15px; width: 15px; float: left; background-color: ' + scope.$parent.lineChart.getFlowList()[i].flow.getTrace().strokeColor);
                        var spanText = document.createElement('div');
                        var text = document.createTextNode('\u00A0\u00A0\u00A0\u00A0' + scope.$parent.lineChart.getFlowList()[i].flow.getName());
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