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


angular.module('norris-nrti')
.directive('mapChart', function($compile){
	return {
		restrict: 'E',
		//controller : 'MapChartController',
        replace: false,
        scope: {
            url: '@'
		},
		//bindToController: true,
        template: '<div></div><div></div><div></div>',
    	link: function (scope, element, attrs) {

            attrs.$observe('url', function(value) {
                console.log('MAPCHART observ url ' + value);
                if (value) {
                    scope.$parent.socketConnection(value);
                }
            });

            scope.$parent.$watch('changedP', function(newValue, oldValue){
                if (newValue !== oldValue) {
                    console.log('MAPCHART watch changedP');
                    var parentTitle = element.children()[0];
                    var text = document.createTextNode(scope.$parent.mapChart.getTitle());
                    parentTitle.appendChild(text);
                    var parentMap = element.children()[1];
                    parentMap.setAttribute('style', 'height:'+ scope.$parent.mapChart.getHeight() +'px;width:'+ scope.$parent.mapChart.getWidth() +'px');
                    scope.init();
                }
            }, true);

            scope.$parent.$watch('changedD', function(newValue, oldValue){
                if(newValue !== oldValue){
                    console.log('MAPCHART watch changedD');                    
                    scope.render();
                }
            }, true);

            scope.$parent.$watch('changedF', function(newValue, oldValue){
                if(newValue !== oldValue){
                    console.log('MAPCHART watch changedF');                    
                    scope.legend();
                }
            }, true);

            var map;
            var markers = [];
            var polylines = [];

            function getBoundsZoomLevel(bounds, mapDim) {
                var WORLD_DIM = { height: 256, width: 256 };
                var ZOOM_MAX = 21;

                function latRad(lat) {
                    var sin = Math.sin(lat * Math.PI / 180);
                    var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
                    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
                }

                function zoom(mapPx, worldPx, fraction) {
                    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
                }

                var ne = bounds.getNorthEast();
                var sw = bounds.getSouthWest();

                var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

                var lngDiff = ne.lng() - sw.lng();
                var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

                var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
                var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

                return Math.min(latZoom, lngZoom, ZOOM_MAX);
            }

            function setZoom(){
                var latLng = new google.maps.LatLng(scope.$parent.mapChart.getLatitude(), scope.$parent.mapChart.getLongitude());
                var mapDim = { height: scope.$parent.mapChart.getHeight(), width: scope.$parent.mapChart.getWidth() };
                
                var spherical = google.maps.geometry.spherical; 
                var west  = spherical.computeOffset(latLng, scope.$parent.mapChart.getMapWidth()/2, -90);
                var east  = spherical.computeOffset(latLng, scope.$parent.mapChart.getMapWidth()/2, 90);

                var bounds = new google.maps.LatLngBounds();
                bounds.extend(west);
                bounds.extend(east);

                return getBoundsZoomLevel(bounds,mapDim);
            }

            scope.init = function(){

                var zoom = setZoom();

                var mapOptions = {
                    center: new google.maps.LatLng(scope.$parent.mapChart.getLatitude(), scope.$parent.mapChart.getLongitude()),
                    zoom: zoom,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: scope.$parent.mapChart.getZoomable(),
                    draggable: scope.$parent.mapChart.getDraggable(),
                    panControl: scope.$parent.mapChart.getDraggable(),
                    zoomControl: scope.$parent.mapChart.getZoomable(),
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    overviewMapControl: false
                };

                map = new google.maps.Map(element.children()[1], mapOptions);

                switch (scope.$parent.mapChart.getMapType()) {
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
                for (var i=0; i<scope.$parent.mapChart.getFlowList().length; i++){
                    if (scope.$parent.mapChart.getFlowList()[i].flow.getTrace().type === 'poly'){
                        var polyline = [];

                        for (var y=0; y<scope.$parent.mapChart.getFlowList()[i].flow.getTrace().coordinates.length; y++){
                            polyline.push(new google.maps.LatLng(scope.$parent.mapChart.getFlowList()[i].flow.getTrace().coordinates[y][0],scope.$parent.mapChart.getFlowList()[i].flow.getTrace().coordinates[y][1]));
                        }
                        polylines.push(new google.maps.Polyline({
                            path: polyline,
                            geodesic: true,
                            strokeColor: scope.$parent.mapChart.getFlowList()[i].flow.getTrace().strokeColor,
                            strokeOpacity: 0.8,
                            strokeWeight: 3
                        }));
                        polylines[i].setMap(map);
                    }
                }

                /*switch (scope.$parent.mapChart.getLegend().getPosition()) {
                    case 'N':

                        break;
                    case 'E':

                        break;
                    case 'S':

                        break;
                    case 'W':
                        
                        break;
                    case 'NE':
                        var parent = element.children()[1];
                        parent.setAttribute('style', 'position: relative; left: 0px;');
                        console.log('parent ' + parent.toString());
                        scope.legend();
                        break;
                    case 'NW':
                        var parent0 = element.children()[0];
                        var parent1 = element.children()[1];
                        parent1.setAttribute('style', 'position: relative; bottom: 0px');
                        parent1.setAttribute('style', 'position: relative; left: 0px; top: 0px');
                        $compile(element.contents());
                        scope.legend();
                        break;
                    case 'SE':
                        
                        break;
                    case 'SW':
                        break;
                }*/
                scope.legend();
                
            };

            scope.render = function(){
                console.log('render');

                for (var z = 0; z < markers.length; z++) {
                    markers[z].setMap(null);
                }
                markers = [];

                // Instantiate an info window to hold step text.
                var stepDisplay = new google.maps.InfoWindow();
                
                for (var i=0; i<scope.$parent.mapChart.getFlowList().length; i++){
                    for (var j=0; j<scope.$parent.mapChart.getFlowList()[i].flow.getData().length; j++){
                        var coordinates = new google.maps.LatLng(scope.$parent.mapChart.getFlowList()[i].flow.getData()[j].value[0], scope.$parent.mapChart.getFlowList()[i].flow.getData()[j].value[1]);
                        var marker;
                        switch (scope.$parent.mapChart.getFlowList()[i].flow.getMarker().type) {
                            case 'shape':
                                var type;
                                switch (scope.$parent.mapChart.getFlowList()[i].flow.getMarker().shape) { //circle, triangle, square, diamond
                                    case 'circle':
                                        type = attrs.url + '/img/c.png';
                                        break;
                                    case 'triangle':
                                        type = attrs.url + '/img/t.png';
                                        break;
                                    case 'square':
                                        type = attrs.url + '/img/s.png';
                                        break;
                                    case 'diamond':
                                        type = attrs.url + '/img/d.png';
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
                                    icon: scope.$parent.mapChart.getFlowList()[i].flow.getMarker().icon
                                });
                                break;
                            case 'text':
                                marker = new MapLabel({
                                    text: scope.$parent.mapChart.getFlowList()[i].flow.getMarker().text,
                                    position: coordinates,
                                    map: map,
                                    fontColor: scope.$parent.mapChart.getFlowList()[i].flow.getMarker().color,
                                    fontSize: 20,
                                    align: 'right'
                                });
                                break;
                        }
                        if (scope.$parent.mapChart.getLegendOnPoint() === true){
                            addLegendOnPoint(marker, scope.$parent.mapChart.getFlowList()[i].flow.getName());
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

                console.log('fine render');
                
            };

            scope.legend = function() {
                var parent = element.children()[2];
                while(parent.firstChild) {
                    console.log('removeChild of legend');
                    parent.removeChild(parent.firstChild);
                }
                if (scope.$parent.mapChart.getLegend() !== null) {
                    parent.setAttribute('style', 'background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + '; color: '+ scope.$parent.mapChart.getLegend().getFontColor());
                    var ul = document.createElement('ul');
                    ul.setAttribute('style', 'list-style-type: none');
                    parent.appendChild(ul);
                    for (var i=0; i<scope.$parent.mapChart.getFlowList().length; i++) {
                        if (scope.$parent.mapChart.getFlowList()[i].flow.getData().length){
                            var li = document.createElement('li');
                            var square = document.createElement('div');
                            square.setAttribute('style', 'height: 15px; width: 15px; float: left; background-color: ' + scope.$parent.mapChart.getFlowList()[i].flow.getTrace().strokeColor);
                            var spanText = document.createElement('div');
                            var text = document.createTextNode('\u00A0\u00A0\u00A0\u00A0' + scope.$parent.mapChart.getFlowList()[i].flow.getName());
                            spanText.appendChild(text);
                            spanText.setAttribute('style', 'float:left;');
                            li.appendChild(square);
                            li.appendChild(spanText);
                            ul.appendChild(li);
                        }
                    }
                }

            };

		}
	};
});