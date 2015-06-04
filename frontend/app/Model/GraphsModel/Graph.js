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
.factory('GraphFactory', ['LegendFactory', function(LegendFactory){


	function Graph(info){
		this._flowList = [];
		this._title = null;
		this._height = null;
		this._width = null;
		this._legend = null;
		this._enableLegend = false;
		this._horizontalGrid = true;
		this._verticalGrid = true;
		this._url = null;
		if (info !== undefined) {
			if (info.title !== undefined) {
				this._title = info.title;
			}
			if (info.socketURL !== undefined) {
				this._url = info.socketURL;
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
				if (info.enableLegend !== undefined) {
					this._enableLegend = info.enableLegend;
					if (this._enableLegend && info.legend !== undefined) {
						this._legend = LegendFactory.build(info.legend);
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
				if (this._flowList[i].id === newId) {
					count++;
				}
			}

		    if(count === 0) {
		        this._flowList.push({ id: newId, flow: newFlow});
			}
			// error
		},
		deleteFlow : function(flowID) {
	        for (var i = 0; i<this._flowList.length; i++){
	            if (this._flowList[i].id === flowID){
	                this._flowList.splice(i,1);
	            }
	        }
		},
		replaceData : function(newData) {
			for (var i = 0;i<this._flowList.length; i++) {
				if (this._flowList[i].id === newData.ID){
	                this._flowList[i].flow.emptyData();
	                this._flowList[i].flow.initializeData(newData);
	            }
			}
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
			if (this._enableLegend) {
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