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

            /*scope.$parent.$watch('changedF', function(newValue, oldValue){
                if(newValue !== oldValue){
                    console.log('LINECHART watch changedF');                    
                    //scope.legend();
                }
            }, true);*/

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
                                'margin="{left:30,top:30,bottom:30,right:30}" margin2="{left:30,top:30,bottom:30,right:30}" interactive="true" tooltips="'+ onPoint +'" ' +
                                'color="colorFunction()" ' + 
                                'xaxisrotatelabels="-90" x2axisrotatelables="-90" interpolate="' + scope.$parent.lineChart.getInterpolation() +'">' + // perchè colorFunction ritorna null per adesso
                                '<svg style="width:'+ scope.$parent.lineChart.getWidth() +'px; height:'+ scope.$parent.lineChart.getHeight() +'px;"></svg></nvd3-line-with-focus-chart>';
                } else {
                    linechart = '<div class="graphtitle">'+ scope.$parent.lineChart.getTitle() +'</div>' +
                                '<nvd3-line-chart data="data" id="'+ id +'" ' +
                                'yaxistickformat="yAxisTickFormatFunction()" xaxistickformat="xAxisTickFormatFunction()" ' +
                                'margin="{left:30,top:30,bottom:30,right:30}" interactive="true" tooltips="'+ onPoint +'" ' +
                                'xaxisrotatelabels="-90" interpolate="' + scope.$parent.lineChart.getInterpolation() +'" ' +
                                'color="colorFunction()" ' +
                                'showxaxis="true" showyaxis="true">' +
                                '<svg style="width:'+ scope.$parent.lineChart.getWidth() +'px; height:'+ scope.$parent.lineChart.getHeight() +'px;"></svg></nvd3-line-chart>';
                }

                var compiled = $compile(linechart)(scope);
                element.append(compiled);

                scope.legend();
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

            function changePosition(chart,parent){
                switch (scope.$parent.lineChart.getLegend().getPosition()) {
                    case 'N':
                        //chart.setAttribute('style', 'position: relative; bottom: -30px;');
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.lineChart.getHeight() + 'px; right: -' + (scope.$parent.lineChart.getWidth()/2) + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'E':
                        //chart.setAttribute('style', 'position: relative; right: 0;');
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + (scope.$parent.lineChart.getHeight()/2) + 'px; right: -' + scope.$parent.lineChart.getWidth() + 'px;  background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'S':
                        //chart.setAttribute('style', 'position: relative;');
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + (scope.$parent.lineChart.getWidth()/2) + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'W':
                        //chart.setAttribute('style', 'position: relative; right: -100px;');
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + (scope.$parent.lineChart.getHeight()/2) + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NE':
                        //chart.setAttribute('style', 'position: relative; bottom: 0;');
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.lineChart.getHeight() + 'px; right: -' + scope.$parent.lineChart.getWidth() + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NW':
                        //chart.setAttribute('style', 'position: relative; bottom: -30px;');
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.lineChart.getHeight() + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SE':
                        //chart.setAttribute('style', 'position: relative;');
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + scope.$parent.lineChart.getWidth() + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SW':
                        //chart.setAttribute('style', 'height:'+ scope.$parent.lineChart.getHeight() +'px; width:'+ scope.$parent.lineChart.getWidth() +'px; position: relative; bottom: 0;');
                        parent.setAttribute('style', 'float: left; position: relative; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                }
            }

            scope.legend = function() {
                var chart = element.children()[1];
                var parent = document.createElement('div');

                changePosition(chart,parent);

                while(parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                }
                if (scope.$parent.lineChart.getLegend() !== null) {
                    //parent.setAttribute('style', 'background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + '; color: '+ scope.$parent.lineChart.getLegend().getFontColor());
                    var div = document.createElement('div');
                    for (var i=0; i<scope.$parent.lineChart.getFlowList().length; i++) {
                        if (scope.$parent.lineChart.getFlowList()[i].flow.getData().length){
                            var square = document.createElement('div');
                            square.setAttribute('style', 'float: left; height: 15px; width: 15px; background-color: ' + scope.$parent.lineChart.getFlowList()[i].flow.getFlowColor() + ';');
                            var spanText = document.createElement('div');
                            var text = document.createTextNode('\u00A0\u00A0\u00A0\u00A0' + scope.$parent.lineChart.getFlowList()[i].flow.getName());
                            spanText.setAttribute('style', 'color: '+ scope.$parent.lineChart.getLegend().getFontColor() + ';');
                            spanText.appendChild(text);
                            div.appendChild(square);
                            div.appendChild(spanText);
                            parent.appendChild(div);
                        }
                    }
                }
                element.append(parent);
            };


        }
    };
});