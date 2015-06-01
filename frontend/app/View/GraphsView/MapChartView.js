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
			mapChart: '@',
			id: '@'
		},
		bindToController: true,
    	link: function (scope, element, attrs) {
			scope.socketConnection();
			scope.listenOnEvent();
			var render = function() {

                // Set map option
				var mapOptions = {
          			center: { lat: scope.mapChart.getLatitude() , lng: scope.mapChart.getLongitude()},
          			zoom: 8
        		};

                // Create map
        		var map = new google.maps.Map(document.getElementById('ciao'), mapOptions); // 'ciao' da cambiare
        		switch (scope.mapChart.getMapType()) {
        			case 'roadMap': 
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

                // Instantiate an info window to hold step text.
                var stepDisplay = new google.maps.InfoWindow();

                // Create markers
        		var markers = [];

        		for (var i=0; i<scope.mapChart.getFlowList().length; i++){
        			for (var j=0; i<scope.mapChart.getFlowList()[i].flow.getData().length; i++){
        				var latLng = new google.maps.LatLng(scope.mapChart.getFlowList()[i].flow.getData()[j].value[0], scope.mapChart.getFlowList()[i].flow.getData()[j].value[0]);
                        var marker;

        				switch (scope.matChart.getFlowList()[i].flow.getMarker().type) {
        					case 'shape':
                                /*var type;
        						switch (scope.matChart.getFlowList()[i].flow.getMarker().shape) { //circle, triangle, square, diamond
                                    case 'circle':
                                        type = 
                                    case 'triangle':

                                    case 'square':

                                    case 'diamond':

                                }*/
        						marker = new google.maps.Marker({
		    						position: latLng,
		    						map: map,
		    						icon: { path: scope.matChart.getFlowList()[i].flow.getMarker().shape }
								});
								break;
        					case 'icon':
        						marker = new google.maps.Marker({
		    						position: latLng,
		    						map: map,
		    						icon: { path: scope.mapChart.getFlowList()[i].flow.getMarker().icon }
								});
								break;
        					case 'text':
        						marker = new google.maps.Marker({
	    							position: latLng,
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

      		}; // shape icon text

      		render();
            
      		
			/*showMarker = function() {};
			zoom = function() {};
			drag = function() {};*/
		}
	};
});