/*jshint node: true */
'use strict';

/*
* Name :  LineChartView.js
* Module : FrontEnd::View::GraphsView
* Location : /frontend/app/View/GraphsView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.0         2015-06-13  Maria Giovanna Chinellato   Tested     
*
* 0.1.0         2015-06-05  Maria Giovanna Chinellato   Add init, setData and legend function     
*
* 0.0.2         2015-06-03  Francesco Rossetto          Add link function, observe and watch      
*
* 0.0.1         2015-06-02  Francesco Rossetto          Initial code      
* =================================================================================================
*/


angular.module('norris-nrti')
.directive('lineChart', function($compile){
	return {
		restrict: 'E', // direttiva di tipo elemento (tag)
		replace: false,
        scope: { // attributo della direttiva
            url: '@'
		},
        bindToController: true,
        link: function(scope, element, attrs){

        	attrs.$observe('url', function(value) {
                if (value) {
                    scope.$parent.socketConnection(value); // richiama la funzione del controller che permette di connettersi al server
                }
            });

            scope.$parent.$watch('changedP', function(newValue, oldValue){
                if (newValue !== oldValue) {
                    element.empty();
                    scope.init(); // crea  il grafico chiamando la funzione apposita
                }
            }, true);

            scope.$parent.$watch('changedD', function(newValue, oldValue){
                if(newValue !== oldValue){
                    scope.setData(); // richiama la funzione che imposta i dati ad ogni cambiamento dei dati dei flussi del grafico
                }
            }, true);

            scope.$on('$destroy', function() {
                for (var j=0; j<element.children().length; j++){
                    var nvd3 = element.children()[j];
                    nvd3.select( '*' ).remove();
                }
            }); 

            // inserisce il codice HTML che crea il grafico desiderato
            scope.init = function(){

                var linechart, legend, onPoint;
                var str = scope.url.split('/');
                var id = str[str.length-1];

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
                if (scope.$parent.lineChart.getViewFinder() === true) {
                    linechart = '<div class="graphtitle">'+ scope.$parent.lineChart.getTitle() +'</div>' +
                                '<nvd3-line-with-focus-chart data="data" nodata=" " id="'+ id +'" ' +
                                'yaxistickformat="yAxisTickFormatFunction()" xaxistickformat="xAxisTickFormatFunction()" x2axistickformat="xAxisTickFormatFunction()" ' +
                                'margin="{left:30,top:30,bottom:30,right:30}" margin2="{left:30,top:30,bottom:30,right:30}" interactive="true" tooltips="'+ onPoint +'" ' +
                                'showlegend="' + legend + '" color="colorFunction()" ' + 
                                'xaxisrotatelabels="-90" x2axisrotatelables="-90" interpolate="' + scope.$parent.lineChart.getInterpolation() +'">' + // perchè colorFunction ritorna null per adesso
                                '<svg style="width:'+ scope.$parent.lineChart.getWidth() +'px; height:'+ scope.$parent.lineChart.getHeight() +'px;"></svg></nvd3-line-with-focus-chart>';
                } else {
                    linechart = '<div class="graphtitle">'+ scope.$parent.lineChart.getTitle() +'</div>' +
                                '<nvd3-line-chart data="data" id="'+ id +'" ' +
                                'yaxistickformat="yAxisTickFormatFunction()" xaxistickformat="xAxisTickFormatFunction()" ' +
                                'margin="{left:30,top:30,bottom:30,right:30}" interactive="true" tooltips="'+ onPoint +'" showlegend="' + legend + '" ' +
                                'xaxisrotatelabels="-90" interpolate="' + scope.$parent.lineChart.getInterpolation() +'" ' +
                                'color="colorFunction()" ' +
                                'showxaxis="true" showyaxis="true">' +
                                '<svg style="width:'+ scope.$parent.lineChart.getWidth() +'px; height:'+ scope.$parent.lineChart.getHeight() +'px;"></svg></nvd3-line-chart>';
                }

                var compiled = $compile(linechart)(scope);
                element.append(compiled);

                scope.legend();
            };

            // funzione che imposta il tick dell'asse X
            scope.xAxisTickFormatFunction = function(){
                return function(d){
                    return d;
                };
            };

            // funzione che imposta il tick dell'asse Y
            scope.yAxisTickFormatFunction = function(){
                return function(d){
                    return d;
                };
            };

            // imposta il colore dei flussi
            scope.colorArray = [];
            scope.colorFunction = function() {
                return function(d, i) {
                    return scope.colorArray[i];
                };
            };

            // imposta i dati da visualizzare
            scope.data;
            scope.setData = function(){
                var data = [];
                var colorArray = [];

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
                }
                scope.data = data;
                scope.colorArray = colorArray;
            };

            // posiziona la legenda a nord, est, sud, ovest, nord-est, nosrd-ovest, sud-est o sud-ovest del grafico
            function changePosition(chart,parent){
                switch (scope.$parent.lineChart.getLegend().getPosition()) {
                    case 'N':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.lineChart.getHeight() + 'px; right: -' + (scope.$parent.lineChart.getWidth()/2) + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'E':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + (scope.$parent.lineChart.getHeight()/2) + 'px; right: -' + scope.$parent.lineChart.getWidth() + 'px;  background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'S':
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + (scope.$parent.lineChart.getWidth()/2) + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'W':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + (scope.$parent.lineChart.getHeight()/2) + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NE':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.lineChart.getHeight() + 'px; right: -' + scope.$parent.lineChart.getWidth() + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NW':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.lineChart.getHeight() + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SE':
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + scope.$parent.lineChart.getWidth() + 'px; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SW':
                        parent.setAttribute('style', 'float: left; position: relative; background-color: ' + scope.$parent.lineChart.getLegend().getBackgroundColor() + ';');
                        break;
                }
            }

            // crea la legenda del grafico
            scope.legend = function() {
                var chart = element.children()[1];
                var parent = document.createElement('div');

                changePosition(chart,parent);

                while(parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                }
                if (scope.$parent.lineChart.getLegend() !== null) {
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