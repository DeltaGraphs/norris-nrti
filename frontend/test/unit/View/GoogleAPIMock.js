/*jshint node: true */
'use strict';

/*
* Name :  GoogleAPIMock.js
* Module : UnitTest
* Location : /frontend/test/unit/View
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.0         2015-06-28  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-06-28  Maria Giovanna Chinellato   Initial code      
* =================================================================================================
*
*/

var googleAPI = angular.module('googleAPI', []);

angular.module('googleAPI')
.factory('google', function(){

	this.google = {
		'maps' : {
			'Map' : function(element,option){
				return 'Map';
			},
			'LatLng' : function(lat,lng){
				return 'LatLng';
			},
			'geometry': {
				'spherical' : {}
			},
			'LatLngBounds' : function(){
				return 'LatLngBounds';
			},
			'MapTypeId' : {
				'ROADMAP' : 'ROADMAP',
				'SATELLITE' : 'SATELLITE',
				'HYBRID' : 'HYBRID',
				'TERRAIN' : 'TERRAIN'
			},
			'Polyline' : function(obj){
				return 'Polyline';
			},
			'InfoWindow' : function(){
				return 'InfoWindow';
			},
			'Marker' : function(obj){
				return 'Marker';
			},
			'event' : {
				'addListener' : function(marker,event,callback){
					return 'event';
				}
			}
		}
	};

	return this.google;
});