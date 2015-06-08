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
.directive('lineChart', function($compile){
	return {
		restrict: 'E',
		//controller : 'LineChartController',
		replace: false,
        scope: {
            url: '@'
		},
		bindToController: true,
        //template: '<div>ciao, sono il line chart</div>',
        link: function(scope, element, attrs){
            scope.exampleData = [
                {
                    'key' : 'Quantity',
                    'area' : true,
                    'values' : [
                        [ 1136005200000 , 127.0] , [ 1138683600000 , 127.0] , [ 1141102800000 , 127.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 389.94860] , [ 1162270800000 , 389.94860] , [ 1164862800000 , 389.94860] , [ 1167541200000 , 356.47000] , [ 1170219600000 , 356.47000] , [ 1172638800000 , 356.47000] , [ 1175313600000 , 264.84930] , [ 1177905600000 , 264.84930] , [ 1180584000000 , 264.84930] , [ 1183176000000 , 252.29930] , [ 1185854400000 , 252.29930] , [ 1188532800000 , 252.29930] , [ 1191124800000 , 290.65010] , [ 1193803200000 , 290.65010] , [ 1196398800000 , 290.65010] , [ 1199077200000 , 220.67610] , [ 1201755600000 , 220.67610] , [ 1204261200000 , 220.67610] , [ 1206936000000 , 228.77260] , [ 1209528000000 , 228.77260] , [ 1212206400000 , 228.77260] , [ 1214798400000 , 273.26460] , [ 1217476800000 , 273.26460] , [ 1220155200000 , 273.26460] , [ 1222747200000 , 259.91960] , [ 1225425600000 , 259.91960] , [ 1228021200000 , 259.91960] , [ 1230699600000 , 192.43870] , [ 1233378000000 , 192.43870] , [ 1235797200000 , 192.43870] , [ 1238472000000 , 175.63110] , [ 1241064000000 , 175.63110] , [ 1243742400000 , 175.63110] , [ 1246334400000 , 174.34700] , [ 1249012800000 , 174.34700] , [ 1251691200000 , 174.34700] , [ 1254283200000 , 151.90100] , [ 1256961600000 , 151.90100] , [ 1259557200000 , 151.90100] , [ 1262235600000 , 159.14440] , [ 1264914000000 , 159.14440] , [ 1267333200000 , 159.14440] , [ 1270008000000 , 154.37840] , [ 1272600000000 , 154.37840] , [ 1275278400000 , 154.37840] , [ 1277870400000 , 130.99150] , [ 1280548800000 , 130.99150] , [ 1283227200000 , 130.99150] , [ 1285819200000 , 133.18750] , [ 1288497600000 , 133.18750] , [ 1291093200000 , 133.18750] , [ 1293771600000 , 133.18750] , [ 1296450000000 , 115.46950] , [ 1298869200000 , 115.46950] , [ 1301544000000 , 119.40250] , [ 1304136000000 , 119.40250] , [ 1306814400000 , 119.40250] , [ 1309406400000 , 119.40250] , [ 1312084800000 , 119.40250] , [ 1314763200000 , 124.45250] , [ 1317355200000 , 47.50000] , [ 1320033600000 , 47.50000] , [ 1322629200000 , 47.50000] , [ 1325307600000 , 69.00330] , [ 1327986000000 , 69.00330] , [ 1330491600000 , 69.00330] , [ 1333166400000 , 51.47330] , [ 1335758400000 , 51.47330]]
                },
                {
                    'key' : 'Price',
                    'values' : [ [ 1136005200000 , 71.89] , [ 1138683600000 , 75.51] , [ 1141102800000 , 68.49] , [ 1143781200000 , 62.72] , [ 1146369600000 , 70.39] , [ 1149048000000 , 59.77] , [ 1151640000000 , 57.27] , [ 1154318400000 , 67.96] , [ 1156996800000 , 67.85] , [ 1159588800000 , 76.98] , [ 1162270800000 , 81.08] , [ 1164862800000 , 91.66] , [ 1167541200000 , 84.84] , [ 1170219600000 , 85.73] , [ 1172638800000 , 84.61] , [ 1175313600000 , 92.91] , [ 1177905600000 , 99.8] , [ 1180584000000 , 121.191] , [ 1183176000000 , 122.04] , [ 1185854400000 , 131.76] , [ 1188532800000 , 138.48] , [ 1191124800000 , 153.47] , [ 1193803200000 , 189.95] , [ 1196398800000 , 182.22] , [ 1199077200000 , 198.08] , [ 1201755600000 , 135.36] , [ 1204261200000 , 125.02] , [ 1206936000000 , 143.5] , [ 1209528000000 , 173.95] , [ 1212206400000 , 188.75] , [ 1214798400000 , 167.44] , [ 1217476800000 , 158.95] , [ 1220155200000 , 169.53] , [ 1222747200000 , 113.66] , [ 1225425600000 , 107.59] , [ 1228021200000 , 92.67] , [ 1230699600000 , 85.35] , [ 1233378000000 , 90.13] , [ 1235797200000 , 89.31] , [ 1238472000000 , 105.12] , [ 1241064000000 , 125.83] , [ 1243742400000 , 135.81] , [ 1246334400000 , 142.43] , [ 1249012800000 , 163.39] , [ 1251691200000 , 168.21] , [ 1254283200000 , 185.35] , [ 1256961600000 , 188.5] , [ 1259557200000 , 199.91] , [ 1262235600000 , 210.732] , [ 1264914000000 , 192.063] , [ 1267333200000 , 204.62] , [ 1270008000000 , 235.0] , [ 1272600000000 , 261.09] , [ 1275278400000 , 256.88] , [ 1277870400000 , 251.53] , [ 1280548800000 , 257.25] , [ 1283227200000 , 243.1] , [ 1285819200000 , 283.75] , [ 1288497600000 , 300.98] , [ 1291093200000 , 311.15] , [ 1293771600000 , 322.56] , [ 1296450000000 , 339.32] , [ 1298869200000 , 353.21] , [ 1301544000000 , 348.5075] , [ 1304136000000 , 350.13] , [ 1306814400000 , 347.83] , [ 1309406400000 , 335.67] , [ 1312084800000 , 390.48] , [ 1314763200000 , 384.83] , [ 1317355200000 , 381.32] , [ 1320033600000 , 404.78] , [ 1322629200000 , 382.2] , [ 1325307600000 , 405.0] , [ 1327986000000 , 456.48] , [ 1330491600000 , 542.44] , [ 1333166400000 , 599.55] , [ 1335758400000 , 583.98] ]
                }
            ];

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
                element.empty();
                console.log('LINECHART init');

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
                                'yaxistickformat="yAxisTickFormatFunction()" xaxistickformat="xAxisTickFormatFunction()" x2axistickformat="x2AxisTickFormatFunction()" ' +
                                'margin="{left:80,top:50,bottom:30,right:50}" margin2="{left:80,top:50,bottom:30,right:50}" interactive="true" showlegend="'+ legend +'" tooltips="'+ onPoint +'" ' +
                                'xaxisrotatelabels="-90" x2axisrotatelables="-90" interpolate="' + scope.$parent.lineChart.getInterpolation() +'" ' + // perchè colorFunction ritorna null per adesso
                                'color="colorFunction()">' + 
                                '<svg style="width: '+ scope.$parent.lineChart.getWidth() +'px; height: '+ scope.$parent.lineChart.getHeight() +'px;"></svg></nvd3-line-with-focus-chart>';
                } else {
                    linechart = '<div class="graphtitle">'+ scope.$parent.lineChart.getTitle() +'</div>' +
                                '<nvd3-line-chart data="data" id="'+ id +'" ' +
                                'yaxistickformat="yAxisTickFormatFunction()" xaxistickformat="xAxisTickFormatFunction()" ' +
                                'margin="{left:80,top:50,bottom:30,right:50}" interactive="true" showlegend="'+ legend +'" tooltips="'+ onPoint +'" ' +
                                'xaxisrotatelabels="-90" interpolate="' + scope.$parent.lineChart.getInterpolation() +'" ' +
                                'color="colorFunction()" ' +
                                'showxaxis="true" showyaxis="true">' +
                                'svg style="width: '+ scope.$parent.lineChart.getWidth() +'px; height: '+ scope.$parent.lineChart.getHeight() +'px;"></svg></nvd3-line-chart>';
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

            scope.x2AxisTickFormatFunction = function(){
                return function(d){
                    return d;
                };
            };

            scope.colorArray = [];
            scope.colorFunction = function() {
                return function(d, i) {
                    return scope.colorArray;
                };
            };

            scope.data;
            

            scope.setData = function(){
                var data = [];
                var colorArray = [];

                for (var i=0; i<scope.$parent.lineChart.getFlowList().length; i++) {
                    var key = scope.$parent.lineChart.getFlowList()[i].flow.getName();
                    var area = scope.$parent.lineChart.getFlowList()[i].flow.getArea();
                    colorArray.push(scope.$parent.lineChart.getFlowList()[i].flow.getFlowColor());
                    var values = [];
                    console.log('LINECHART setdata length ' + scope.$parent.lineChart.getFlowList().length);
                    for (var j=0; j<scope.$parent.lineChart.getFlowList()[i].flow.getData().length; j++) {
                        var value = [scope.$parent.lineChart.getFlowList()[i].flow.getData()[j].value[0], scope.$parent.lineChart.getFlowList()[i].flow.getData()[j].value[1]];
                        values.push(value);
                        //values.splice(scope.$parent.barChart.getFlowList()[i].flow.getData()[j].value[0], 0, value);
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