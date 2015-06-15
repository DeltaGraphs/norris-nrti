/*jshint node: true */
'use strict';

/*
* Name :  CarChartView.js
* Module : FrontEnd::View::GraphsView
* Location : /frontend/app/View/GraphsView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-06-09  Maria Giovanna Chinellato   Add all attributes and some methods 
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
        
        link: function(scope, element, attrs){
            
        	attrs.$observe('url', function(value) {
                if (value) {
                    scope.$parent.socketConnection(value); // richiama la funzione del controller che permette di connettersi al server
                }
            });

            scope.$parent.$watch('changedP', function(newValue, oldValue){
                if (newValue !== oldValue) {
                    scope.init(); // crea  il grafico chiamando la funzione apposita
                }
            }, true);

            scope.$parent.$watch('changedD', function(newValue, oldValue){
                if(newValue !== oldValue){                   
                    scope.setData(); // richiama la funzione che imposta i dati ad ogni cambiamento dei dati dei flussi del grafico
                }
            }, true);

            // inserisce il codice HTML che crea il grafico desiderato
            scope.init = function(){
                element.empty();
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
                    barchart = '<div style="position: relative;"><div class="graphtitle">'+ scope.$parent.barChart.getTitle() +'</div>' +
                                '<nvd3-multi-bar-chart data="data" nodata=" " id="'+ id +'" ' +
                                'xaxisticksformat="xAxisTickFormatFunction()" showxaxis="true" showyaxis="true" ' +
                                'rotatelabels="-90" interactive="true" tooltips="'+ onPoint +'" showlegend="' + legend + '" ' +
                                'xaxislabel="'+ scope.$parent.barChart.getX().getName() +'" ' +
                                'showcontrols="'+ control +'" color="colorFunction()" ' +
                                'width="'+ scope.$parent.barChart.getWidth() +'" height="'+ scope.$parent.barChart.getHeight() +'">' +
                                '<svg></svg></nvd3-multi-bar-chart></div>';
                }else if(scope.$parent.barChart.getBarOrientation() === 'H'){
                    barchart = '<div style="position: relative;"><div class="graphtitle">'+ scope.$parent.barChart.getTitle() +'</div>' +
                                '<nvd3-multi-bar-horizontal-chart data="data" nodata=" " id="'+ id +'" ' +
                                'xaxisticksformat="xAxisTickFormatFunction()" yaxistickformat="yAxisTickFormatFunction()" showxaxis="true" showyaxis="true" ' +
                                'rotatelabels="-90" interactive="true" tooltips="'+ onPoint +'" showlegend="' + legend + '" ' +
                                'xaxislabel="'+ scope.$parent.barChart.getX().getName() +'" ' +
                                'showcontrols="'+ control +'" color="colorFunction()" ' +
                                'width="'+ scope.$parent.barChart.getWidth() +'" height="'+ scope.$parent.barChart.getHeight() +'">' +
                                '<svg></svg></nvd3-multi-bar-horizontal-chart></div>';
                }
                
                var compiled = $compile(barchart)(scope);
                element.append(compiled);
                scope.legend();
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
            scope.data;
            scope.setData = function(){
                var data = [];
                var colorArray = [];

                for (var i=0; i<scope.$parent.barChart.getFlowList().length; i++) {
                    var key;
                    var values = [];
                    key = scope.$parent.barChart.getFlowList()[i].flow.getName();
                    colorArray.push(scope.$parent.barChart.getFlowList()[i].flow.getFlowColor());
                    for (var j=0; j<scope.$parent.barChart.getFlowList()[i].flow.getData().length; j++) {
                        var value = [scope.$parent.barChart.getFlowList()[i].flow.getData()[j].value[0], scope.$parent.barChart.getFlowList()[i].flow.getData()[j].value[1]];
                        values.push(value);
                    }
                    values.sort(function(a, b) {
                        if (a[0] === b[0]) {
                            return 0;
                        }
                        else {
                            return (a[0] < b[0]) ? -1 : 1;
                        }
                    });
                    for (var y=0; y<values.length; y++){
                        values[y][0] = scope.$parent.barChart.getHeaders()[values[y][0]-1];
                    }
                    data.push({ 'key': key, 'values': values});
                }
                scope.data = data;
                scope.colorArray = colorArray;

            };

            // posiziona la legenda a nord, est, sud, ovest, nord-est, nosrd-ovest, sud-est o sud-ovest del grafico
            function changePosition(chart,parent){
                switch (scope.$parent.barChart.getLegend().getPosition()) {
                    case 'N':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.barChart.getHeight() + 'px; right: -' + (scope.$parent.barChart.getWidth()/2) + 'px; background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'E':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + (scope.$parent.barChart.getHeight()/2) + 'px; right: -' + scope.$parent.barChart.getWidth() + 'px;  background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'S':
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + (scope.$parent.barChart.getWidth()/2) + 'px; background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'W':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + (scope.$parent.barChart.getHeight()/2) + 'px; background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NE':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.barChart.getHeight() + 'px; right: -' + scope.$parent.barChart.getWidth() + 'px; background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NW':
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.barChart.getHeight() + 'px; background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SE':
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + scope.$parent.barChart.getWidth() + 'px; background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SW':
                        parent.setAttribute('style', 'float: left; position: relative; background-color: ' + scope.$parent.barChart.getLegend().getBackgroundColor() + ';');
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
                if (scope.$parent.barChart.getLegend() !== null) {
                    var div = document.createElement('div');
                    for (var i=0; i<scope.$parent.barChart.getFlowList().length; i++) {
                        if (scope.$parent.barChart.getFlowList()[i].flow.getData().length){
                            var square = document.createElement('div');
                            square.setAttribute('style', 'float: left; height: 15px; width: 15px; background-color: ' + scope.$parent.barChart.getFlowList()[i].flow.getFlowColor() + ';');
                            var spanText = document.createElement('div');
                            var text = document.createTextNode('\u00A0\u00A0\u00A0\u00A0' + scope.$parent.barChart.getFlowList()[i].flow.getName());
                            spanText.setAttribute('style', 'color: '+ scope.$parent.barChart.getLegend().getFontColor() + ';');
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