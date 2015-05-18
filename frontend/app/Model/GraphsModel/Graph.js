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
* 0.1.4			2015-05-15	Francesco Rossetto			Various fix
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

angular.module('app')
.factory('Graph', ['Flow', 'Legend', function(Flow, Legend){

	function Graph(info){
		this.flowList = [];
		this.title = null;
		this.height = null;
		this.width = null;
		this.legend = null;
		this.enabledLegend = false;
		this.horizontalGrid = true;
		this.verticalGrid = true;
		this.url = null;

		if (info !== undefined) {
			if (info.title !== undefined) {
				this.title = info.title;
			}
			if (info.url !== undefined) {
				this.url = info.url;
			}
		}
	}

	Graph.prototype = {

		updateParameters : function(info) { //abstract
			if (info !== undefined) {
				if (info.title !== undefined) {
					this.title = info.title;
				}
				if (info.height !== undefined) {
					this.height = info.height;
				}
				if (info.width !== undefined) {
					this.width = info.width;
				}
				if (info.enabledLegend !== undefined && info.enabledLegend !== null) {
					this.enabledLegend = info.enabledLegend;
					if (this.enabledLegend && info.legend) {
						this.legend = new Legend(info.legend);
					}
				}
				if (info.horizontalGrid !== null) {
					this.horizontalGrid = info.horizontalGrid;
				}
				if (info.verticalGrid !== null) {
					this.verticalGrid = info.verticalGrid;
				}
			}
			return this;
		},
		addFlow : function(id, flow) { //abstract
			if (this.flowList[id] === undefined) {
				this.flowList[id] = flow;
				console.log(this.flowList.length);
			}
			// error
			return this;
		},
		deleteFlow : function(flowID) {
			delete this.flowList[flowID];
			return this;
		},
		
		getTitle : function() {
			return this.title;
		},
		getHeight : function() {
			return this.height;
		},
		getWidth : function() {
			return this.width;
		},
		getLegend : function() {
			if (this.enabledLegend) {
				return this.legend;
			} else {
				return null;
			}
		},
		getHGrid : function() {
			return this.horizontalGrid;
		},
		getVGrid : function() {
			return this.verticalGrid;
		},
		getUrl : function() {
			return this.url;
		},
		getFlowList : function() {
			return this.flowList;
		}
	};
	
	return( Graph );
}]);