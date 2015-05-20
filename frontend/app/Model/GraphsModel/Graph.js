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
.value('Graph', ['Flow', 'Legend', function(Flow, Legend){

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

	Graph.newInstance = function(info) {
		return new Graph(info);
	};

	Graph.prototype = {

		constructor : newInstance,

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
				if (info.enabledLegend !== undefined) {
					this.enabledLegend = info.enabledLegend;
					if (enabledLegend && info.legend !== undefined) {
						this.legend = new Legend(info.legend);
					}
				}
				if (info.horizontalGrid !== undefined) {
					this.horizontalGrid = info.horizontalGrid;
				}
				if (info.verticalGrid !== undefined) {
					this.verticalGrid = info.verticalGrid;
				}
			}
		},
		addFlow : function(newId, newFlow) { //abstract

			var filteredFlows = this.flowList.filter(function(newId) {return newId === flowList.id;});
		    if(filteredFlows.length === 0) {
		        this.flowList.push({ id: newId, flow: newFlow});
    		}
    		// error
		},
		deleteFlow : function(flowID) {
			var index;
            for (var i = 0; i<this.flowList.length; i++){
                if (this.flowList.id === flowID){
                    index = i;
                }
            }
            this.flowList.splice(index,1);
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