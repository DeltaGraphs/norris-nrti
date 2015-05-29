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

				var mapOptions = {
          			center: { lat: scope.mapChart.getLatitude() , lng: scope.mapChart.getLongitude()},
          			zoom: 8
        		};
        		var map = new google.maps.Map(document.getElementById(scope.id), mapOptions);
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

        		var markers = [];

        		for (var i=0; i<scope.mapChart.getFlowList().length; i++){
        			for (var j=0; i<scope.mapChart.getFlowList()[i].flow.getData().length; i++){
        				var latLng = new google.maps.LatLng(scope.mapChart.getFlowList()[i].flow.getData()[j].value[0], scope.mapChart.getFlowList()[i].flow.getData()[j].value[0]);

        				switch (scope.matChart.getFlowList()[i].flow.getMarker().type) {
        					case 'shape':
        						var type = { type: scope.mapChart.getFlowList()[i].flow.getMarker().shape };
        						markers.push(new google.maps.Marker({
		    						position: latLng,
		    						map: map,
		    						shape: type
								}));
								break;
        					case 'icon':
        						markers.push(new google.maps.Marker({
		    						position: latLng,
		    						map: map,
		    						icon: scope.mapChart.getFlowList()[i].flow.getMarker().icon
								}));
								break;
        					case 'text':
        						markers.push(new google.maps.Marker({
	    							position: latLng,
	    							map: map,
		    						title: 'flusso' + scope.mapChart.getFlowList()[i].flow.getMarker().text
								}));
								break;
        				}
        			}
        		}

      		}; // shape icon text

      		render();
      		
			/*showMarker = function() {};
			zoom = function() {};
			drag = function() {};*/
		}
	};
});