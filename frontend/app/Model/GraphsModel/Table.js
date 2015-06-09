/*jshint node: true */
'use strict';

/*
* Name :  Table.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.3.0         2015-05-18  Maria Giovanna Chinellato   Modified general structure, some fixes
*
* 0.2.1         2015-05-15  Maria Giovanna Chinellato   Fix methods test
*
* 0.1.1         2015-05-15  Francesco Rossetto          Various fix, insert inzializeData
*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code          
* ===============================================================================================================
*
*/

angular.module('norris-nrti')
.factory('TableFactory', ['GraphFactory', 'CellFactory', 'TableFlowFactory', function(GraphFactory, CellFactory, TableFlowFactory){

	function split(json) {
		var graphJson = {};
		if (json.title !== undefined) {
			graphJson.title = json.title;
		}
		if (json.height !== undefined) {
			graphJson.height = json.height;
		}
		if (json.width !== undefined) {
			graphJson.width = json.width;
		}
		if (json.enableLegend !== undefined) {
			graphJson.enableLegend = json.enableLegend;
			if (json.legend !== undefined  && graphJson.enableLegend !== false) {
				graphJson.legend = json.legend;
			}
		}
		if (json.horizontalGrid !== undefined) {
			graphJson.horizontalGrid = json.horizontalGrid;
		}
		if (json.verticalGrid !== undefined) {
			graphJson.verticalGrid = json.verticalGrid;
		}


		var tableJson = {};
		if (json.headers !== undefined) {
			tableJson.headers = json.headers;
		}
		if (json.maxItemsPage !== undefined) {
			tableJson.maxItemsPage = json.maxItemsPage;
		}
		if (json.addRowOn !== undefined) {
			tableJson.addRowOn = json.addRowOn;
		}
		if (json.sortable !== undefined) {
			tableJson.sortable = json.sortable;
		}
        if (json.sort !== undefined) {
            tableJson.sort = json.sort;
        }
        if (json.appearance !== undefined) {
            tableJson.appearance = json.appearance;
        }

		return {
			'graphJson' : graphJson,
			'tableJson' : tableJson
		};
	}

    //Table.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    // create our new custom object that reuse the original object constructor
    function Table(info) {
        this._headers = [];
        this._maxItemsPage = 20;
        this._addRowOn = 'top';
        this._sortable = true;
        this._sort = null;
        this._appearance = null;
        this._graph = GraphFactory.build(info);
    }

    Table.prototype.updateParameters = function(info) {
        if (info !== undefined) {
            var json = split(info);
            var gJson = json.graphJson;
            var tJson = json.tableJson;
            
            if (Object.keys(gJson).length !== 0) {
                this._graph.updateParameters(gJson);
            } 
            if (Object.keys(tJson).length !== 0) {
                if (tJson.headers !== undefined) {
                    for (var z=0; z<tJson.headers.length; z++) { 
                        this._headers.push(tJson.headers[z]);
                    }
                }
                if (tJson.maxItemsPage !== undefined) {
                    this._maxItemsPage = tJson.maxItemsPage;
                }
                if (tJson.addRowOn !== undefined) {
                    this._addRowOn = tJson.addRowOn;
                }
                if (tJson.sortable !== undefined) {
                    this._sortable = tJson.sortable;
                }
                if (tJson.sort !== undefined) {
                    this._sort = tJson.sort;
                }
                if (tJson.appearance !== undefined) {
                    this._appearance = tJson.appearance;
                }
            }
            if (info.flows !== undefined) {
                for (var y=0; y<info.flows.length; y++) {
                    var newflow = TableFlowFactory.build(info.flows[y]);
                    this.addFlow(info.flows[y].ID, newflow);
                }
            }
        }
    };

    Table.prototype.addFlow = function(ID, newFlow) {
        if (newFlow.constructor.name === 'TableFlow') {
            this._graph.addFlow(ID, newFlow);
        }
    };
    Table.prototype.deleteFlow = function(ID) {
        this._graph.deleteFlow(ID);
    };
    Table.prototype.replaceData = function(newData){
        this._graph.replaceData(newData);
    };

    Table.prototype.initializeData = function(newData) {  //inizialization data of flows
        if (newData !== undefined) {
            for (var i=0; i<newData.length; i++) {
                for (var j=0; j<this._graph.getFlowList().length; j++) {
                    if (this._graph.getFlowList()[j].id === newData[i].ID) {
                        this._graph.getFlowList()[j].flow.initializeData(newData[i], this._addRowOn);
                    }
                }
            }
        }
    };

    Table.prototype.inPlaceUpdate = function(newData) {
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.inPlaceUpdate(newData);
                }
            }
        }
    };
    Table.prototype.streamUpdate = function(newData) {
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.streamUpdate(newData, this._addRowOn);
                }
            }
        }
    };

    Table.prototype.deleteData = function(delData) {
        if (delData !== undefined){
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === delData.ID) {
                    fList[j].flow.deleteData(delData);
                }
            }
        }
    };

    Table.prototype.getTitle = function() {
        return this._graph.getTitle();
    };
    Table.prototype.getHeight = function() {
        return this._graph.getHeight();
    };
    Table.prototype.getWidth = function() {
        return this._graph.getWidth();
    };
    Table.prototype.getLegend = function() {
        return this._graph.getLegend();
    };
    Table.prototype.getHGrid = function() {
        return this._graph.getHGrid();
    };
    Table.prototype.getVGrid = function() {
        return this._graph.getVGrid();
    };
    Table.prototype.getUrl = function() {
        return this._graph.getUrl();
    };
    Table.prototype.getFlowList = function() {
        return this._graph.getFlowList();
    };
    Table.prototype.getHeaders = function() {
    return this._headers;
    };
    Table.prototype.getMaxItemsPage = function() {
        return this._maxItemsPage;
    };
    Table.prototype.getAddRowOn = function() {
        return this._addRowOn;
    };
    Table.prototype.getSortable = function() {
        return this._sortable;
    };
    Table.prototype.getSort = function() {
        return this._sort;
    };
    Table.prototype.getAppearance = function() {
        return this._appearance;
    };

    function TableFactory() {}

    TableFactory.build = function(info) {
        return new Table(info);
    };

    return TableFactory;
}]);