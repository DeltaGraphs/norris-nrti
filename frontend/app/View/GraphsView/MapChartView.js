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
		scope: {
			id: '@'
		},
		bindToController: true,
        template: '<div id="map-canvas" style="height:500px;width:500px"></div>',
    	link: function (scope, element, attrs) {

            attrs.$observe('id', function(value) {
                if (value) {
                    if(scope.$parent.page.getGraphsList()[value].graph.constructor.name === 'MapChart'){
                        scope.mapChart = scope.$parent.page.getGraphsList()[value].graph;
                        console.log('mapchart ' + JSON.stringify(scope.mapChart));
                        scope.socketConnection();
                    }
                }
            });

            scope.$watch('changedP', function(newValue, oldValue){
                if (newValue !== oldValue) {
                    scope.init();
                }
            }, true);

            scope.$watch('changedD', function(newValue, oldValue){
                if(newValue !== oldValue){
                    scope.render();
                }
            }, true);

            var map;
            var markers = [];
            var polylines = [];
            
            scope.init = function(){

                var mapOptions = {
                    center: new google.maps.LatLng(scope.mapChart.getLatitude(), scope.mapChart.getLongitude()),
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
                for (var i=0; i<scope.mapChart.getFlowList().length; i++){
                    if (scope.mapChart.getFlowList()[i].flow.getTrace().type === 'poly'){
                        var polyline = [];

                        for (var y=0; y<scope.mapChart.getFlowList()[i].flow.getTrace().coordinates.length; y++){
                            polyline.push(new google.maps.LatLng(scope.mapChart.getFlowList()[i].flow.getTrace().coordinates[y][0],scope.mapChart.getFlowList()[i].flow.getTrace().coordinates[y][1]));
                        }
                        polylines.push(new google.maps.Polyline({
                            path: polyline,
                            geodesic: true,
                            strokeColor: scope.mapChart.getFlowList()[i].flow.getTrace().strokeColor,
                            strokeOpacity: 0.8,
                            strokeWeight: 3
                        }));
                        polylines[i].setMap(map);
                    }
                }
            };

            scope.render = function(){
                console.log('render');

                for (var z = 0; z < markers.length; z++) {
                    markers[z].setMap(null);
                }
                markers = [];

                // Instantiate an info window to hold step text.
                var stepDisplay = new google.maps.InfoWindow();

                var latLng = new google.maps.LatLng(scope.mapChart.getLatitude(), scope.mapChart.getLongitude());
                
                for (var i=0; i<scope.mapChart.getFlowList().length; i++){
                    for (var j=0; j<scope.mapChart.getFlowList()[i].flow.getData().length; j++){
                        var coordinates = new google.maps.LatLng(scope.mapChart.getFlowList()[i].flow.getData()[j].value[0], scope.mapChart.getFlowList()[i].flow.getData()[j].value[1]);
                        var marker;

                        switch (scope.mapChart.getFlowList()[i].flow.getMarker().type) {
                            case 'shape':
                                var type;
                                switch (scope.mapChart.getFlowList()[i].flow.getMarker().shape) { //circle, triangle, square, diamond
                                    case 'circle':
                                        type = 'http://norris-nrti-dev.herokuapp.com/norris/img/c.png';
                                        break;
                                    case 'triangle':
                                        type = 'http://norris-nrti-dev.herokuapp.com/norris/img/t.png';
                                        break;
                                    case 'square':
                                        type = 'http://norris-nrti-dev.herokuapp.com/norris/img/s.png';
                                        break;
                                    case 'diamond':
                                        type = 'http://norris-nrti-dev.herokuapp.com/norris/img/d.png';
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
                        if (scope.mapChart.getLegendOnPoint() === true){
                            addLegendOnPoint(marker, scope.mapChart.getFlowList()[i].flow.getName());
                        }
                        markers.push(marker);

                    }
                    
                }



                // add legend on point
                function addLegendOnPoint(marker,text) {

                    google.maps.event.addListener(marker, 'click', function() {
                        // Open an info window when the marker is clicked on,
                        // containing the text of the step.
                        stepDisplay.setContent(text);
                        stepDisplay.open(map, marker);
                    });
                }
                
            };

		}
	};
});