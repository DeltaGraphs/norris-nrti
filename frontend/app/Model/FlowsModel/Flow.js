/*jshint node: true */
'use strict';

/*
* Name :  Flow.js
* Module : FrontEnd::Model::FlowsModel
* Location : /frontend/app/Model/FlowsModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.2         2015-05-18  Maria Giovanna Chinellato	Fix attributes
*
* 0.1.1         2015-05-14  Maria Giovanna Chinellato	Fix updateParameters
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add all attributes and all methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

angular.module('services')
.factory('Flow', function(){

	var dataFormat = null;
	var name = null;

	function Flow(info){

		if (info !== undefined) {
			if (info.dataFormat !== undefined) {
				dataFormat = info.dataFormat;
			}
			if (info.name !== undefined){
				name = info.name;
			}
		}
	}

	Flow.prototype = {

		constructor : Flow,

		updateParameters : function(info) { //abstract
			if (info !== undefined) {
		    	if (info.dataFormat !== undefined) {
					dataFormat = info.dataFormat;
				}
				if (info.name !== undefined){
					name = info.name;
				}
			}
			return this;
		},
		getDataFormat : function() {
			return dataFormat;
		},
		getName : function() {
			return name;
		}
	};
	return( Flow );
});