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

                var markers = [];
                console.log('flowlist length '+scope.mapChart.getFlowList().length);
                console.log('recordlist length '+scope.mapChart.getFlowList()[0].flow.getData().length);
                for (var i=0; i<scope.mapChart.getFlowList().length; i++){
                    for (var j=0; j<scope.mapChart.getFlowList()[i].flow.getData().length; j++){
                        markers.push(new google.maps.Marker({
                            position: new google.maps.LatLng(scope.mapChart.getLatitude()+j*0.1, scope.mapChart.getLongitude()+j*0.1),
                            map: map,
                            title: 'markerrrr'
                        }));

                    }
                }
                
            };

		}
	};
});