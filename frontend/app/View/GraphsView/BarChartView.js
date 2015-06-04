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
.directive('barChart', function(){
	return {
		restrict: 'E',
		//controller : 'BarChartController',
		replace: false,
		scope: {
            url: '@'
		},
		bindToController: true,
        template: '<svg></svg>',
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
            	console.log('BARCHART init');
            	var parent = element.children()[0];
            	console.log('BARCHART init url ' + scope.url);
            	var str = scope.url.split('/');
            	var id = str[str.length-1];
            	parent.setAttribute('id', id);
            	if (scope.$parent.barChart.getBarOrientation() === 'V'){
            		chart = nv.models.multiBarChart()
      					.reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
      					.rotateLabels(0)      //Angle to rotate x-axis labels.
      					.showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
      					.groupSpacing(0.1)    //Distance between each group of bars.
            	}
            	else{
            		chart = nv.models.multiBarHorizontalChart()
				        .x(function(d) { return d.label })
				        .y(function(d) { return d.value })
				        .margin({top: 30, right: 20, bottom: 50, left: 175})
				        .showValues(true)           //Show bar value next to each bar.
				        .tooltips(true)             //Show tooltips on hover.
				        .transitionDuration(350)
				        .showControls(true);        //Allow user to switch between "Grouped" and "Stacked" mode.
            	}
            	
            	

			    chart.yAxis
			        .tickFormat(d3.format(',.2f'));

			    d3.select('#' + id + ' svg')
			        .datum(test_data)
			        .call(chart);

			    nv.utils.windowResize(chart.update);

			    var test_data = [
			        { 
			          "label" : "A Label" ,
			          "value" : -29.765957771107
			        } , 
			        { 
			          "label" : "B Label" , 
			          "value" : 0
			        } , 
			        { 
			          "label" : "C Label" , 
			          "value" : 32.807804682612
			        } , 
			        { 
			          "label" : "D Label" , 
			          "value" : 196.45946739256
			        } , 
			        { 
			          "label" : "E Label" ,
			          "value" : 0.19434030906893
			        } , 
			        { 
			          "label" : "F Label" , 
			          "value" : -98.079782601442
			        } , 
			        { 
			          "label" : "G Label" , 
			          "value" : -13.925743130903
			        } , 
			        { 
			          "label" : "H Label" , 
			          "value" : -5.1387322875705
			        }
		     	]

				nv.addGraph(chart);

            };

            scope.legend = function() {
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

            };

        }
    };
});