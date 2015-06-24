/*jshint node: true */
'use strict';

/*
* Name :  MapChartView.js
* Module : FrontEnd::View::GraphsView
* Location : /frontend/app/View/GraphsView
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 1.0.2         2015-06-22  Maria Giovanna Chinellato   Fix legendOnPoint
*
* 1.0.1         2015-06-21  Maria Giovanna Chinellato   Fix legend function
*
* 1.0.0         2015-06-14  Maria Giovanna Chinellato   Tested
*
* 0.1.0         2015-06-06  Francesco Rossetto          Add utility function    
*
* 0.0.3         2015-06-04  Maria Giovanna Chinellato   Add init, render and legend function
*
* 0.0.2         2015-06-04  Maria Giovanna Chinellato   Add link function, observe and watch      
*
* 0.0.1         2015-05-25  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*/


angular.module('norris-nrti')
.directive('mapChart', function(){
	return {
		restrict: 'E', // direttiva di tipo elemento (tag)
        replace: false,
        scope: { // attributo della direttiva
            url: '@'
		},
        template: '<div>{{title}}</div><div></div><div></div>', // template HTML inserito dalla direttiva
        bindToController: true,
    	link: function (scope, element, attrs) {

            attrs.$observe('url', function(value) {
                if (value) {
                    scope.$parent.socketConnection(value); // richiama la funzione del controller che permette di connettersi al server
                }
            });

            scope.$parent.$watch('changedP', function(newValue, oldValue){
                if (newValue !== oldValue) {
                    scope.title = scope.$parent.mapChart.getTitle(); // inserisce il titolo
                    scope.init(); // crea la mappa
                }
            }, true);

            scope.$parent.$watch('changedD', function(newValue, oldValue){
                if(newValue !== oldValue){                
                    if (scope.$parent.mapChart.getLegend() !== null){
                        scope.legend();  // richiama la funzione che crea la legenda relativa al grafico
                    }
                    scope.render(); // inserisce i dati sulla mappa
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

            // imposta lo zoom dinamicamente (in base all'altezza e larghezza che si desidera visualizzare)
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

            // crea la mappa da visualizzare
            scope.init = function(){

                var zoom = setZoom();

                // opzioni iniziali della mappa
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

                // impostazione del tipo di mappa da visualizzare
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
                // inserimento del tracciato (se presente)
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
            };

            // inizializza i dati sulla mappa
            scope.render = function(){

                for (var z = 0; z < markers.length; z++) {
                    markers[z].setMap(null);
                }
                markers = [];

                var stepDisplay = new google.maps.InfoWindow();
                
                // inserisce i marker per ogni flusso di dati presente nel grafico
                for (var i=0; i<scope.$parent.mapChart.getFlowList().length; i++){
                    for (var j=0; j<scope.$parent.mapChart.getFlowList()[i].flow.getData().length; j++){
                        var coordinates = new google.maps.LatLng(scope.$parent.mapChart.getFlowList()[i].flow.getData()[j].value[0], scope.$parent.mapChart.getFlowList()[i].flow.getData()[j].value[1]);
                        var marker;
                        switch (scope.$parent.mapChart.getFlowList()[i].flow.getMarker().type) {
                            case 'shape':
                                var type;
                                switch (scope.$parent.mapChart.getFlowList()[i].flow.getMarker().shape) { //circle, triangle, square, diamond, bus
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
                                    case 'bus':
                                        type = attrs.url + '/img/b.png';
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
                            addLegendOnPoint(marker, scope.$parent.mapChart.getFlowList()[i].flow.getName() + ' ' + scope.$parent.mapChart.getFlowList()[i].flow.getData()[j].markerID);
                        }
                        markers.push(marker);

                    }

                    
                }



                // aggiunge la legenda sui marker
                function addLegendOnPoint(marker,text) {

                    google.maps.event.addListener(marker, 'click', function() {
                        // Open an info window when the marker is clicked on,
                        // containing the text of the step.
                        stepDisplay.setContent(text);
                        stepDisplay.open(map, marker);
                    });
                }            
            };

            // posiziona la legenda a nord, est, sud, ovest, nord-est, nosrd-ovest, sud-est o sud-ovest del grafico
            function changePosition(map,parent){
                switch (scope.$parent.mapChart.getLegend().getPosition()) {
                    case 'N':
                        map.setAttribute('style', 'height:'+ scope.$parent.mapChart.getHeight() +'px; width:'+ scope.$parent.mapChart.getWidth() +'px; position: relative; bottom: -30px;');
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.mapChart.getHeight() + 'px; right: -' + (scope.$parent.mapChart.getWidth()/2) + 'px; background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'E':
                        map.setAttribute('style', 'height:'+ scope.$parent.mapChart.getHeight() +'px; width:'+ scope.$parent.mapChart.getWidth() +'px; position: relative; right: 0;');
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + (scope.$parent.mapChart.getHeight()/2) + 'px; right: -' + scope.$parent.mapChart.getWidth() + 'px;  background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'S':
                        map.setAttribute('style', 'height:'+ scope.$parent.mapChart.getHeight() +'px; width:'+ scope.$parent.mapChart.getWidth() +'px; position: relative;');
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + (scope.$parent.mapChart.getWidth()/2) + 'px; background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'W':
                        map.setAttribute('style', 'height:'+ scope.$parent.mapChart.getHeight() +'px; width:'+ scope.$parent.mapChart.getWidth() +'px; position: relative; right: -100px;');
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + (scope.$parent.mapChart.getHeight()/2) + 'px; background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NE':
                        map.setAttribute('style', 'height:'+ scope.$parent.mapChart.getHeight() +'px; width:'+ scope.$parent.mapChart.getWidth() +'px; position: relative; bottom: 0;');
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.mapChart.getHeight() + 'px; right: -' + scope.$parent.mapChart.getWidth() + 'px; background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'NW':
                        map.setAttribute('style', 'height:'+ scope.$parent.mapChart.getHeight() +'px; width:'+ scope.$parent.mapChart.getWidth() +'px; position: relative; bottom: -30px;');
                        parent.setAttribute('style', 'float: left; position: relative; top: -' + scope.$parent.mapChart.getHeight() + 'px; background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SE':
                        map.setAttribute('style', 'height:'+ scope.$parent.mapChart.getHeight() +'px; width:'+ scope.$parent.mapChart.getWidth() +'px; position: relative;');
                        parent.setAttribute('style', 'float: left; position: relative; right: -' + scope.$parent.mapChart.getWidth() + 'px; background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                    case 'SW':
                        map.setAttribute('style', 'height:'+ scope.$parent.mapChart.getHeight() +'px; width:'+ scope.$parent.mapChart.getWidth() +'px; position: relative; bottom: 0;');
                        parent.setAttribute('style', 'float: left; position: relative; background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + ';');
                        break;
                }
            }

            // crea la legenda del grafico
            scope.legend = function() {
                var map = element.children()[1];
                var parent = element.children()[2];
                
                changePosition(map,parent);

                while(parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                }
                if (scope.$parent.mapChart.getLegend() !== null) {
                    var div = document.createElement('div');
                    for (var i=0; i<scope.$parent.mapChart.getFlowList().length; i++) {
                        if (scope.$parent.mapChart.getFlowList()[i].flow.getData().length){
                            var square = document.createElement('div');
                            square.setAttribute('style', 'float: left; height: 15px; width: 15px; background-color: ' + scope.$parent.mapChart.getFlowList()[i].flow.getTrace().strokeColor);
                            var spanText = document.createElement('div');
                            var text = document.createTextNode('\u00A0\u00A0\u00A0\u00A0' + scope.$parent.mapChart.getFlowList()[i].flow.getName());
                            spanText.setAttribute('style', 'width: 100px; color: '+ scope.$parent.mapChart.getLegend().getFontColor() + ';');
                            spanText.appendChild(text);
                            div.appendChild(square);
                            div.appendChild(spanText);
                            parent.appendChild(div);
                        }
                    }
                }
            };
		}
	};
});