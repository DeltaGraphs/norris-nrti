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

app.factory('Table', ['Graph', 'Cell', 'TableFlow', function(Graph, Cell, TableFlow){
	var rows;
	var colunms;
	var headers = [];
	var cells = [];
	var itemDisplayedPerPage = 20;
	var addDataPosition = "up";
	var sortable = true;

	function split(json) {
		var graphJson = {};
		if (json.title) {
			graphJson.title = json.title;
		}
		if (json.height) {
			graphJson.height = json.height;
		}
		if (json.width) {
			graphJson.width = json.width;
		}
		if (json.enabledLegend !== null) {
			graphJson.enabledLegend = json.enabledLegend;
			if (graphJson.enabledLegend && json.legend) {
				graphJson.legend = json.legend;
			}
		}
		if (json.horizontalGrid !== null) {
			graphJson.horizontalGrid = json.horizontalGrid;
		}
		if (json.verticalGrid !== null) {
			graphJson.verticalGrid = json.verticalGrid;
		}


		var tableJson = {};
		if (json.rows) {
			tableJson.rows = json.rows;
		}
		if (json.colunms) {
			tableJson.colunms = json.colunms;
		}
		if (json.headers) {
			tableJson.headers = json.headers;
		}
		if (json.cells) {
			tableJson.cells = json.cells;
		}
		if (json.itemDisplayedPerPage) {
			tableJson.itemDisplayedPerPage = json.itemDisplayedPerPage;
		}
		if (json.addDataPosition) {
			tableJson.addDataPosition = json.addDataPosition;
		}
		if (json.sortable) {
			tableJson.sortable = json.sortable;
		}

		return {
			"graphJson" : graphJson,
			"tableJson" : tableJson
		};
	}

    // create our new custom object that reuse the original object constructor
    var Table = function(info) {
    	Graph.apply(this, info); // info has only title and url
    };

    // reuse the original object prototype
	Table.prototype = new Graph();

    // Now let's override our original updateParameters method
    Table.prototype.updateParameters = function(info) {
    	var json = split(info);
    	var gJson = json.graphJson;
    	var tJson = json.tableJson;
        var i;
    	if (Object.keys(gJson).length !== 0) {
    		Graph.apply(this, gJson);
    	} 
    	if (Object.keys(tJson).length !== 0) {
    		if (tJson.rows) {
    			rows = tJson.rows;
			}
			if (tJson.colunms) {
	       		colunms = tJson.colunms;
	       	}
	       	if (tJson.headers) {
	       		for (i=0; i<tJson.headers.length; i++) { 
	        		headers.push(tJson.headers[i]);
	        	}
        	}
        	if (tJson.cells) {
        		for (i=0; i<tJson.cells.length; i++) {
	        		for (var j=0; j<tJson.cells[i].length; j++) {
	        			cells[i][j] = new Cell(tJson.cells[i][j]);
	        		}
	        	}
        	}
        	if (tJson.itemDisplayedPerPage) {
        		itemDisplayedPerPage = tJson.itemDisplayedPerPage;
        	}
	        if (tJson.addDataPosition) {
        		addDataPosition = tJson.addDataPosition;
        	}
        	if (tJson.sortable) {
        		sortable = tJson.sortable;
        	}
    	}
        if (info.flows) {
            for (var i=0; i<info.flows.length; i++) {
                var newflow = new TableFlow(info.flows[i]);
                Table.prototype.addFlow(newflow);
            }
        } 
    };

    Table.prototype.addFlow = function(flow) {
    	if (typeof flow === 'TableFlow') {
    		Graph.prototype.addFlow.call(this, flow.ID, flow);
    	}
    };

    Table.prototype.initializeData = function(data) {  //inizialization data of flows
        for (var i=0; i<data.length; i++) {
            Graph.prototype.getFlowList()[data[i].ID].inizializeData(data[i].records);
        }
    };

    // update data
    Table.prototype.inPlaceUpdate = function(data) {
    	Graph.prototype.getFlowList()[data.ID].inPlaceUpdate(data.records);
    };
    Table.prototype.streamUpdate = function(data) {
    	Graph.prototype.getFlowList()[data.ID].streamUpdate(data.records);
    };

    // get method
    Table.prototype.getRows = function() {
    	return rows;
    };
    Table.prototype.getColunms = function() {
    	return colunms;
    };
    Table.prototype.getHeaders = function() {
    	return headers;
    };
    Table.prototype.getCells = function() {
    	return cells;
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

    return Table;
}]);