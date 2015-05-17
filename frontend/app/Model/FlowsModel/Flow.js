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
* 0.1.1         2015-05-14  Maria Giovanna Chinellato	Fix updateParameters
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato	Add all attributes and all methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato	Initial code
* =================================================================================================
*
*/

angular.module('app')
.factory('Flow', function(){

	function Flow(info){
		this.dataFormat;
		this.name;

		if (info !== undefined) {
			if (info.dataFormat !== undefined) {
				this.dataFormat = info.dataFormat;
			}
			if (info.name !== undefined){
				this.name = info.name;
			}
		}
	}

	Flow.prototype = {

		updateParameters : function(info) { //abstract
			if (info !== undefined) {
		    	if (info.dataFormat !== undefined) {
					this.dataFormat = info.dataFormat;
				}
				if (info.name !== undefined){
					this.name = info.name;
				}
			}
		},
		getDataFormat : function() {
			return this.dataFormat;
		},
		getName : function() {
			return this.name;
		}
	};
	return( Flow );
});