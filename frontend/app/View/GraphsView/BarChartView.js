/*jshint node: true */
'use strict';

/*
* Name :  BarChartView.js
* Module : FrontEnd::View::GraphsView
* Location : /frontend/app/View/GraphsView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.3         2015-06-22  Maria Giovanna Chinellato   Fix flow color     
*
* 1.0.2         2015-06-21  Maria Giovanna Chinellato   Fix legend update     
*
* 1.0.1         2015-06-19  Maria Giovanna Chinellato   Fix svg tag     
*
* 1.0.0         2015-06-13  Maria Giovanna Chinellato   Tested     
*
* 0.2.0         2015-06-10  Francesco Rossetto          Add init, setData and legend function    
*
* 0.1.1         2015-06-10  Maria Giovanna Chinellato   Add link function, observe and watch      
*
* 0.1.0         2015-06-09  Francesco Rossetto          Add all attributes and add initial code for methods 
*
* 0.0.1         2015-06-02  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/


angular.module('norris-nrti')
.directive('barChart', function($compile){
    return {
        restrict: 'E', // direttiva di tipo elemento (tag)
        replace: false,
        scope: { // attributo della direttiva
            url: '@'
        },
        //bindToController: true,
        link: function(scope, element, attrs){
            element.empty();
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
                    if (element.children()[2]){
                      element.children()[2].remove();
                    }
                    if (scope.$parent.barChart.getLegend() !== null){
                        scope.legend();  // richiama la funzione che crea la legenda relativa al grafico
                    }
                }
            }, true);

            scope.$on('$destroy', function() {
                for (var j=0; j<element.children().length; j++){
                    var nvd3 = element.children()[j];
                    nvd3.select('*').remove();
                    nvd3.select('svg').remove();
                }
            }); 
            // inserisce il codice HTML che crea il grafico desiderato
            scope.init = function(){
                element.empty(); // elimina i tag HTML relativi al bar chart
                var barchart = null;
                var legend, onPoint, control;
                var str = scope.url.split('/');
                var id = str[str.length-1];
                var width;
                var height;
                //var width = scope.$parent.barChart.getWidth();
                //var height = scope.$parent.barChart.getHeight();
                var xLabel = 'X axis';
                var yLabel = 'Y axis';
                if (scope.$parent.barChart.getX() !== null && scope.$parent.barChart.getX().getName() !== null){
                    xLabel = scope.$parent.barChart.getX().getName();
                }
                if (scope.$parent.barChart.getY() !== null && scope.$parent.barChart.getY().getName() !== null){
                    xLabel = scope.$parent.barChart.getY().getName();
                }
                if (scope.$parent.barChart.getWidth() !== 0){
                    width = scope.$parent.barChart.getWidth() + 'px';
                }
                else{
                    width = '100%';
                }
                if (scope.$parent.barChart.getHeight() !== 0){
                    height = scope.$parent.barChart.getHeight() + 'px';
                }
                else{
                    height = '430px';
                }
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
                    barchart = '<div class="graphtitle">'+ scope.$parent.barChart.getTitle() +'</div>' +
                                '<nvd3-multi-bar-chart data="data" nodata=" " '+
                                'xaxisticksformat="xAxisTickFormatFunction()" yaxistickformat="yAxisTickFormatFunction()" showxaxis="true" showyaxis="true" ' +
                                'rotatelabels="-90" interactive="true" tooltips="'+ onPoint +'" showlegend="' + legend + '" ' +
                                'xaxislabel="'+ xLabel +'" yaxislabel="'+ yLabel +'" ' +
                                'color="colorFunction()" showcontrols="'+ control +'">' +
                                '<svg id="'+ id +'" ' + ' style="width: '+ width +'; height: '+ height +';"></svg></nvd3-multi-bar-chart>';
                }else if(scope.$parent.barChart.getBarOrientation() === 'H'){
                    barchart = '<div class="graphtitle">'+ scope.$parent.barChart.getTitle() +'</div>' +
                                '<nvd3-multi-bar-horizontal-chart data="data" nodata=" " '+
                                'xaxisticksformat="xAxisTickFormatFunction()" yaxistickformat="yAxisTickFormatFunction()" showxaxis="true" showyaxis="true" ' +
                                'rotatelabels="-90" interactive="true" tooltips="'+ onPoint +'" showlegend="' + legend + '" ' +
                                'xaxislabel="'+ xLabel + '" yaxislabel="'+ yLabel +'" ' +
                                'color="colorFunction()" showcontrols="'+ control +'">' +
                                '<svg id="'+ id +'" ' + ' style="width: '+ width +'; height: '+ height +';"></svg></nvd3-multi-bar-horizontal-chart>';
                }
                



                var compiled = $compile(barchart)(scope);
                element.append(compiled);

            };
            
            // imposta il colore dei flussi
            scope.colorArray = [];
            scope.colorFunction = function() {
                return function(d, i) {
                    return scope.colorArray[i];
                };
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

            // imposta i dati da visualizzare
            scope.data = [];
            scope.setData = function(){
                var data = [];
                var colorArray = [];
                for (var i=0; i<scope.$parent.barChart.getFlowList().length; i++) {
                    var key;
                    var values = [];
                    key = scope.$parent.barChart.getFlowList()[i].flow.getName();
                    if (scope.$parent.barChart.getFlowList()[i].flow.getFlowColor() !== undefined && scope.$parent.barChart.getFlowList()[i].flow.getFlowColor() !== null){
                       colorArray.push(scope.$parent.barChart.getFlowList()[i].flow.getFlowColor());
                    }
                    else{
                       colorArray.push(scope.$parent.defaultColorFlow[i]);
                    }
                    for (var j=0; j<scope.$parent.barChart.getFlowList()[i].flow.getData().length; j++) {
                        var value = [scope.$parent.barChart.getFlowList()[i].flow.getData()[j].value[0], scope.$parent.barChart.getFlowList()[i].flow.getData()[j].value[1]];
                        values.push(value);
                    }
                    values.sort(function(a, b) {
                      if (isNaN(a[0]) && isNaN(b[0])){
                        if (a[0] === b[0]) {
                            return 0;
                        }
                        else {
                            return (a[0] < b[0]) ? -1 : 1;
                        }
                      }
                      else{
                        if (parseFloat(a[0]) === parseFloat(b[0])) {
                            return 0;
                        }
                        else {
                            return (parseFloat(a[0]) < parseFloat(b[0])) ? -1 : 1;
                        }
                      }
                    });


                    for (var y=0; y<values.length; y++){
                        values[y][0] = scope.$parent.barChart.getHeaders()[values[y][0]];
                    }
                    data.push({ 'key': key, 'values': values});
                }
                scope.colorArray = colorArray;
                scope.data = data;
            };

            // posiziona la legenda a nord, est, sud, ovest, nord-est, nord-ovest, sud-est o sud-ovest del grafico
            function changePosition(chart,parent){

                switch (scope.$parent.barChart.getLegend().getPosition()) {
                    case 'N':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.barChart.getHeight() + 
                          'px; right: -' + (scope.$parent.barChart.getWidth()/2) + 'px; background-color: ' +
                          scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'E':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + ((scope.$parent.barChart.getHeight()/2)+25) + 
                          'px; right: -' + scope.$parent.barChart.getWidth() + 'px;  background-color: ' + 
                          scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'S':
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + (scope.$parent.barChart.getWidth()/2) +
                          'px; background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'W':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + (scope.$parent.barChart.getHeight()/2) + 
                          'px; background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NE':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.barChart.getHeight() + 
                          'px; right: -' + (scope.$parent.barChart.getWidth()+25) + 'px; background-color: ' + 
                          scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NW':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.barChart.getHeight() + 
                          'px; background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SE':
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + (scope.$parent.barChart.getWidth()+25) + 
                          'px; background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SW':
                        parent.setAttribute('style', 'float: left; position: relative; background-color: ' + 
                          scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                }
            }

            // crea la legenda del grafico
            scope.legend = function() {

                var chart = element.children()[1];
                var parent = document.createElement('div');

                changePosition(chart,parent);
                parent.setAttribute('class','barChartLegend');

                if (scope.$parent.barChart.getLegend() !== null) {
                    var div = document.createElement('div');
                    div.setAttribute('class','legend-chart');
                    for (var i=0; i<scope.$parent.barChart.getFlowList().length; i++) {
                        if (scope.$parent.barChart.getFlowList()[i].flow.getData().length){
                            var square = document.createElement('div');
                            square.setAttribute('style', 'float: left; height: 15px; width: 15px; background-color: ' + scope.colorArray[i] + ';');
                            square.setAttribute('class', 'square-flow-legend-chart');
                            var spanText = document.createElement('div');
                            var text = document.createTextNode(scope.$parent.barChart.getFlowList()[i].flow.getName());
                            spanText.setAttribute('style', 'color: '+ scope.$parent.barChart.getLegend().getFontColor() + ';');
                            spanText.setAttribute('class', 'text-flow-legend-chart');
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