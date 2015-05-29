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
			render = function() {

				var mapOptions = {
          			center: { lat: , lng: },
          			zoom: zoom,
        		};
        		var map = new google.maps.Map(document.getElementById(scope.id), mapOptions);
        		switch (scope.mapType) {
        			case roadMap: 
        				map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        				break;
        			case satellite:
        				map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        				break;
        			case hybrid:
        				map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        				break;
        			case terrain:
        				map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
        				break;
        		};


      		};

			showMarker = function() {};
			zoom = function() {};
			drag = function() {};
		}
	};
});