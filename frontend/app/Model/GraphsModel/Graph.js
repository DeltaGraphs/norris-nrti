/*jshint node: true */
'use strict';

/*
* Name :  Graph.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GrapshModel
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.5			2015-05-18	Maria Giovanna Chinellato	Fix methods addFlow and deleteFlow
*
* 0.1.4			2015-05-15	Francesco Rossetto			Various fixes
*
* 0.1.3			2015-05-14	Maria Giovanna Chinellato	Add method getFlowList
*
* 0.1.3			2015-05-14	Francesco Rossetto			Fix constructor
*
* 0.1.2			2015-05-13	Francesco Rossetto			Fix constructor 
*
* 0.1.1			2015-05-12	Maria Giovanna Chinellato	Fix attributes
*
* 0.1.0         2015-05-12  Francesco Rossetto   		Add all attributes and all methods
*
* 0.0.1         2015-05-12  Francesco Rossetto			Initial code    
* =================================================================================================
*
*/

angular.module('services')
.factory('Graph', ['Flow', 'Legend', function(Flow, Legend){

	var flowList = [];
	var title = null;
	var height = null;
	var width = null;
	var legend = null;
	var enabledLegend = false;
	var horizontalGrid = true;
	var verticalGrid = true;
	var url = null;

	function Graph(info){
		if (info !== undefined) {
			if (info.title !== undefined) {
				title = info.title;
			}
			if (info.url !== undefined) {
				url = info.url;
			}
		}
	}

	Graph.prototype = {

		constructor : Graph,

		updateParameters : function(info) { //abstract
			if (info !== undefined) {
				if (info.title !== undefined) {
					title = info.title;
				}
				if (info.height !== undefined) {
					height = info.height;
				}
				if (info.width !== undefined) {
					width = info.width;
				}
				if (info.enabledLegend !== undefined) {
					enabledLegend = info.enabledLegend;
					if (enabledLegend && info.legend !== undefined) {
						legend = new Legend(info.legend);
					}
				}
				if (info.horizontalGrid !== undefined) {
					horizontalGrid = info.horizontalGrid;
				}
				if (info.verticalGrid !== undefined) {
					verticalGrid = info.verticalGrid;
				}
			}
			return this;
		},
		addFlow : function(newId, newFlow) { //abstract

			var filteredFlows = flowList.filter(function(newId) {return newId === flowList.id;});
		    if(filteredFlows.length === 0) {
		        flowList.push({ id: newId, flow: newFlow});
    		}
    		// error
    		return this;
		},
		deleteFlow : function(flowID) {
			var index;
            for (var i = 0; i<flowList.length; i++){
                if (flowList.id === flowID){
                    index = i;
                }
            }
            flowList.splice(index,1);
            return this;
		},
		
		getTitle : function() {
			return title;
		},
		getHeight : function() {
			return height;
		},
		getWidth : function() {
			return width;
		},
		getLegend : function() {
			if (enabledLegend) {
				return legend;
			} else {
				return null;
			}
		},
		getHGrid : function() {
			return horizontalGrid;
		},
		getVGrid : function() {
			return verticalGrid;
		},
		getUrl : function() {
			return url;
		},
		getFlowList : function() {
			return flowList;
		}
	};
	
	return( Graph );
}]);