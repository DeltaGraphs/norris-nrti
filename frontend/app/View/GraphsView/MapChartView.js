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
* 0.0.1         2015-05-25  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/


angular.module('app')
.directive('mapChart', function(){
	return {
		restrict: 'E',
		controller : 'MapChartController',
		replace: false,
        require: '^page',
		scope: {
			id: '@'
		},
		bindToController: true,
        template: '<div id="map-canvas" style="height:500px;width:500px"></div>',
    	link: function (scope, element, attrs) {
            //console.log(scope.$parent.page.getGraphsList().length);
            attrs.$observe('id', function(value) {
                if (value) {
                    if(scope.$parent.page.getGraphsList()[value].graph.constructor.name === 'MapChart'){
                        scope.mapChart = scope.$parent.page.getGraphsList()[value].graph;
                        console.log(scope.mapChart.getUrl());
                        scope.socketConnection();
                        scope.$watch('scope.mapChart', function(){
                            if(scope.mapChart){
                                scope.render();
                            }
                        }, true);
                    }
                }
            });
            
            scope.render = function(){
                console.log('render');

                var map;
                var latLng = new google.maps.LatLng(scope.mapChart.getLatitude(), scope.mapChart.getLongitude());

                // map config
                var mapOptions = {
                    center: latLng,
                    zoom: 18,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: scope.mapChart.getZoom()
                };

                map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                switch (scope.mapChart.getMapType()) {
                    case 'roadmap':
                        map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                        break;
                    case 'satellite':
                        map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
                        break;
                    case 'hybrid':
                        map.setMapTypeId(google.maps.MapTypeId.HYBRID);
                        break;
                    case 'terrain':
                        map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
                        break;
                }
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: 'marker'
                });
                var markers = [];
                console.log('lunghezza flussi ' + scope.mapChart.getFlowList().length);
                console.log('lung record ' + scope.mapChart.getFlowList()[0].flow.getData().length);
                for (var i=0; i<scope.mapChart.getFlowList().length; i++){
                    for (var j=0; j<scope.mapChart.getFlowList()[i].flow.getData().length; j++){
                        var coordinates = new google.maps.LatLng(scope.mapChart.getFlowList()[i].flow.getData()[j].value[0], scope.mapChart.getFlowList()[i].flow.getData()[j].value[1]);
                        markers.push(new google.maps.Marker({
                            position: coordinates,
                            map: map,
                            title: 'merkerrrr'
                        }));
                        console.log('type ' + scope.mapChart.getFlowList()[i].flow.getMarker().type);
                        console.log('shape ' + scope.mapChart.getFlowList()[i].flow.getMarker().shape);
                        /*switch (scope.mapChart.getFlowList()[i].flow.getMarker().type) {
                            case 'shape':
                                console.log('shape type');
                                var type;
                                switch (scope.mapChart.getFlowList()[i].flow.getMarker().shape) { //circle, triangle, square, diamond
                                    case 'circle':
                                        console.log('shape type circle');
                                        type = { path: 'img/circle.png' };
                                        break;
                                    case 'triangle':
                                        console.log('shape type triangle');
                                        type = { path: 'img/triangle.png' };
                                        break;
                                    case 'square':
                                        console.log('shape type square');
                                        type = { path: 'img/square.png' };
                                        break;
                                    case 'diamond':
                                        console.log('shape type diamond');
                                        type = { path: 'img/diamond.png' };
                                        break;
                                }
                                marker = new google.maps.Marker({
                                    position: coordinates,
                                    map: map,
                                    icon: type
                                });
                                break;
                            case 'icon':
                                marker = new google.maps.Marker({
                                    position: coordinates,
                                    map: map,
                                    icon: { path: scope.mapChart.getFlowList()[i].flow.getMarker().icon }
                                });
                                break;
                            case 'text':
                                marker = new google.maps.Marker({
                                    position: coordinates,
                                    map: map,
                                    title: scope.mapChart.getFlowList()[i].flow.getMarker().text
                                });
                                break;
                        }
                        markers.push(marker);*/

                    }
                }
                
            };

		}
	};
});