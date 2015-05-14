/*
* Name :  Table.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.0.2         2015-05-14  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code          
* ===============================================================================================================
*
*/

app.factory('Table', ['Graph', 'Cell', 'TableFlow', function(Graph, Cell, TableFlow){
	var rows;
	var colunms;
	var headers = new Array();
	var cells = new Array();
	var itemDisplayedPerPage;
	var addDataPosition;
	var sortable;

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
		if (json.legend) {
			graphJson.legend = json.legend;
		}
		if (json.enabledLegend) {
			graphJson.enabledLegend = json.enabledLegend;
		}
		if (json.horizontalGrid) {
			graphJson.horizontalGrid = json.horizontalGrid;
		}
		if (json.verticalGrid) {
			graphJson.verticalGrid = json.verticalGrid;
		}
		if (json.url) {
			graphJson.url = json.url;
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
			"tableJson" : lineJson
		}
	}

    // create our new custom object that reuse the original object constructor
    var Table = function(info) {
    	Graph.apply(this, info); // info has only title and url
    };

    // reuse the original object prototype
	Table.prototype = new Graph();

    // Now let's override our original getProfile method
    Table.prototype.updateParameters = function(info) {
    	json = json = split(info);
    	gJson = json.graphJson;
    	tJson = json.tableJson;
    	if (Object.keys(gJson).length != 0) {
    		Graph.apply(this, gJson);
    	} 
    	if (Object.keys(tJson).length != 0) {
    		if (tJson.rows) {
    			rows = tJson.rows;
			}
			if (tJson.colunms) {
	       		colunms = tJson.colunms;
	       	}
	       	if (tJson.headers) {
	       		for (var i=0; i<tJson.headers.length; i++) { // ???
	        		headers.push(tJson.headers[i]);
	        	}
        	}
        	if (tJson.cells) {
        		for (var i=0; i<tJson.cells.length; i++) { // ???
	        		cells.push(new Cell(tJson.cells[i]));
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
    };

    Table.prototype.addFlow = function(flow) {
    	if (typeof flow === 'TableFlow'){
    		var newflow = new TableFlow(flow);
    		Graph.prototype.addFlow.call(this, flow.ID, newflow);
    	}
    };

    // update data
    Table.prototype.inPlaceUpdate = function(data) {
    	flowList[data.ID].inPlaceUpdate(data.records);
    };
    Table.prototype.streamUpdate = function(data) {
    	flowList[data.ID].streamUpdate(data.records);
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