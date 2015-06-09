/*jshint node: true */
'use strict';

/*
* Name :  Flow.js
* Module : FrontEnd::Model::FlowsModel
* Location : /frontend/app/Model/FlFactory.buildowsModel
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

angular.module('norris-nrti')
.factory('FlowFactory', function(){

	function Flow(info){
		
		this._name = null;

		if (info !== undefined) {
			if (info.name !== undefined){
				this._name = info.name;
			}
		}
	}

	Flow.prototype = {

		constructor : Flow,

		updateParameters : function(info) { //abstract
			if (info !== undefined) {
				if (info.name !== undefined){
					this._name = info.name;
				}
			}
		},
		getName : function() {
			return this._name;
		}
	};

	function FlowFactory(){}

    FlowFactory.build = function(info) {
        return new Flow(info);
    };
	return( FlowFactory );
});