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
		//controller : 'MapChartController',
        replace: false,
        scope: {
            url: '@'
		},
		bindToController: true,
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
            
            scope.init = function(){

                var mapOptions = {
                    center: new google.maps.LatLng(scope.$parent.mapChart.getLatitude(), scope.$parent.mapChart.getLongitude()),
                    zoom: 12,
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

                var latLng = new google.maps.LatLng(scope.$parent.mapChart.getLatitude(), scope.$parent.mapChart.getLongitude());
                
                for (var i=0; i<scope.$parent.mapChart.getFlowList().length; i++){
                    for (var j=0; j<scope.$parent.mapChart.getFlowList()[i].flow.getData().length; j++){
                        var coordinates = new google.maps.LatLng(scope.$parent.mapChart.getFlowList()[i].flow.getData()[j].value[0], scope.$parent.mapChart.getFlowList()[i].flow.getData()[j].value[1]);
                        var marker;

                        switch (scope.$parent.mapChart.getFlowList()[i].flow.getMarker().type) {
                            case 'shape':
                                var type;
                                switch (scope.$parent.mapChart.getFlowList()[i].flow.getMarker().shape) { //circle, triangle, square, diamond
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
                                    icon: { path: scope.$parent.mapChart.getFlowList()[i].flow.getMarker().icon }
                                });
                                break;
                            case 'text':
                                marker = new google.maps.Marker({
                                    position: coordinates,
                                    map: map,
                                    title: scope.$parent.mapChart.getFlowList()[i].flow.getMarker().text
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
                    parent.removeChild(parent.firstChild);
                }
                console.log('legend ' + JSON.stringify(scope.$parent.mapChart.getLegend()));
                if (scope.$parent.mapChart.getLegend() !== null) {
                    parent.setAttribute('style', 'background-color: ' + scope.$parent.mapChart.getLegend().getBackgroundColor() + '; color: '+ scope.$parent.mapChart.getLegend().getFontColor());
                    var ul = document.createElement('ul');
                    ul.setAttribute('style', 'list-style-type: none');
                    parent.appendChild(ul);
                    for (var i=0; i<scope.$parent.mapChart.getFlowList().length; i++) {
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

            };

		}
	};
});