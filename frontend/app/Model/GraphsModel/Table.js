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

angular.module('app')
.factory('Table', ['Graph', 'Cell', 'TableFlow', function(Graph, Cell, TableFlow){
	
    var rows = 0;
	var colunms = 0;
	var headers = [];
	var itemDisplayedPerPage = 20;
	var addDataPosition = 'up';
	var sortable = true;
    var sort = null;
    var appearance = null;

    // reuse the original object prototype
    Table.prototype = Object.create(Graph.prototype);
    Table.prototype.constructor = Table;
    Table.prototype.parent = Graph.prototype;

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
		if (json.enabledLegend !== undefined) {
			graphJson.enabledLegend = json.enabledLegend;
			if (json.legend !== undefined  && graphJson.enabledLegend !== false) {
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
		if (json.rows !== undefined) {
			tableJson.rows = json.rows;
		}
		if (json.colunms !== undefined) {
			tableJson.colunms = json.colunms;
		}
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
        this.parent.constructor.call(this, info);
    }

    Table.prototype.updateParameters = function(info) {
        if (info !== undefined) {
            var json = split(info);
            var gJson = json.graphJson;
            var tJson = json.tableJson;
            
            if (Object.keys(gJson).length !== 0) {
                this.parent.updateParameters.call(this, gJson);
            } 
            if (Object.keys(tJson).length !== 0) {
                if (tJson.rows) {
                    rows = tJson.rows;
                }
                if (tJson.colunms !== undefined) {
                    colunms = tJson.colunms;
                }
                if (tJson.headers !== undefined) {
                    for (var z=0; z<tJson.headers.length; z++) { 
                        headers.push(tJson.headers[z]);
                    }
                }
                if (tJson.maxItemsPage !== undefined) {
                    itemDisplayedPerPage = tJson.maxItemsPage;
                }
                if (tJson.addRowOn !== undefined) {
                    addDataPosition = tJson.addRowOn;
                }
                if (tJson.sortable !== undefined) {
                    sortable = tJson.sortable;
                }
                if (tJson.sort !== undefined) {
                    sort = tJson.sort;
                }
                if (tJson.appearance !== undefined) {
                    appearance = tJson.appearance;
                }
            }
            if (info.flows !== undefined) {
                for (var y=0; y<info.flows.length; y++) {
                    var newflow = new TableFlow(info.flows[y]);
                    this.addFlow(info.flows[y].ID, newflow);
                }
            }
        }
    };

    Table.prototype.addFlow = function(ID, newFlow) {
        if (newFlow instanceof TableFlow) {
            this.parent.addFlow.call(this, ID, newFlow);
        }
    };

    Table.prototype.initializeData = function(newData) {  //inizialization data of flows
        if (newData !== undefined) {
            var fList = this.parent.getFlowList();
            for (var i=0; i<newData.length; i++) {
                for (var j=0; j<fList.length; j++) {
                    if (fList[j].id === newData[i].ID) {
                        fList[j].flow.initializeData(newData[i]);
                    }
                }
            }
        }
    };

    Table.prototype.inPlaceUpdate = function(newData) {
        if (newData !== undefined) {
            var fList = this.parent.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.inPlaceUpdate(newData);
                }
            }
        }
    };
    Table.prototype.streamUpdate = function(newData) {
        if (newData !== undefined) {
            var fList = this.parent.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.streamUpdate(newData);
                }
            }
        }
    };

    Table.prototype.getRows = function() {
        return rows;
    };
    Table.prototype.getColunms = function() {
        return colunms;
    }; 
    Table.prototype.getHeaders = function() {
    return headers;
    };
    Table.prototype.getItemDisplayedPerPage = function() {
        return itemDisplayedPerPage;
    };
    Table.prototype.getAddDataPosition = function() {
        return addDataPosition;
    };
    Table.prototype.getSortable = function() {
        return sortable;
    };
    Table.prototype.getSort = function() {
        return sort;
    };
    Table.prototype.getAppearance = function() {
        return appearance;
    };

    return( Table );
}]);