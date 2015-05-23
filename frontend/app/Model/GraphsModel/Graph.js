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

angular.module('app')
.factory('GraphFactory', ['Flow', 'Legend', function(Flow, Legend){


	function Graph(info){
		this._flowList = [];
		this._title = null;
		this._height = null;
		this._width = null;
		this._legend = null;
		this._enabledLegend = false;
		this._horizontalGrid = true;
		this._verticalGrid = true;
		this._url = null;
		if (info !== undefined) {
			if (info.title !== undefined) {
				this._title = info.title;
			}
			if (info.url !== undefined) {
				this._url = info.url;
			}
		}		
	}

	Graph.prototype = {

		constructor : Graph,

		updateParameters : function(info) { //abstract
			if (info !== undefined) {
				if (info.title !== undefined) {
					this._title = info.title;
				}
				if (info.height !== undefined) {
					this._height = info.height;
				}
				if (info.width !== undefined) {
					this._width = info.width;
				}
				if (info.enabledLegend !== undefined) {
					this._enabledLegend = info.enabledLegend;
					if (this.enabledLegend && info.legend !== undefined) {
						this._legend = new Legend(info.legend);
					}
				}
				if (info.horizontalGrid !== undefined) {
					this._horizontalGrid = info.horizontalGrid;
				}
				if (info.verticalGrid !== undefined) {
					this._verticalGrid = info.verticalGrid;
				}
			}
		},
		addFlow : function(newId, newFlow) { //abstract
			var count = 0;
			for (var i = 0; i<this._flowList.length; i++) {
				if (this._flowList.id === newId) {
					count++;
				}
			}

		    if(count === 0) {
		        this._flowList.push({ id: newId, flow: newFlow});
			}
			// error
		},
		deleteFlow : function(flowID) {
			var index;
	        for (var i = 0; i<this._flowList.length; i++){
	            if (this._flowList.id === flowID){
	                index = i;
	            }
	        }
	        this._flowList.splice(index,1);
		},
		
		getTitle : function() {
			return this._title;
		},
		getHeight : function() {
			return this._height;
		},
		getWidth : function() {
			return this._width;
		},
		getLegend : function() {
			if (this._enabledLegend) {
				return this._legend;
			} else {
				return null;
			}
		},
		getHGrid : function() {
			return this._horizontalGrid;
		},
		getVGrid : function() {
			return this._verticalGrid;
		},
		getUrl : function() {
			return this._url;
		},
		getFlowList : function() {
			return this._flowList;
		}
	};

	function GraphFactory() {}

	GraphFactory.build = function(info) {
		return new Graph(info);
	};
	
	return( GraphFactory );
}]);