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
        template: '<div></div>',
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

            scope.chart;

            scope.init = function(){
            	var parent = element.children()[0];
            	var str = scope.url.split('/');
            	var id = str[str.length-1];
            	parent.setAttribute('id', id);
            	if (scope.$parent.barChart.getBarOrientation() === 'V'){
            		console.log('\n sto iniziando la costruzione \n');
            		var svgContainer = d3.select('#' + id)
            			.append('svg')
            			.style('width', '500px')
            			.style('length', '500px');
            		var axisScale = d3.scale.linear()
            			.domain([0,10])
            			.range([0,500]);
					var xAxis = d3.svg.axis()
						.scale(axisScale);

					var xAxisGroup = svgContainer.append('g')
										.call(xAxis);



            	} else {
            		console.log('H');
            	}
				
				var el = $compile(parent)(scope);
				element.parent().append( el );

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
                } else {
                	console.log('H');
                }

            };

        }
    };
});