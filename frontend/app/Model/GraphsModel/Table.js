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

angular.module('services')
.factory('Table', ['Graph', 'Cell', 'TableFlow', function(Graph, Cell, TableFlow){
	
    var rows = 0;
	var colunms = 0;
	var headers = [];
	var cells = [];
	var itemDisplayedPerPage = 20;
	var addDataPosition = 'up';
	var sortable = true;

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
		if (json.cells !== undefined) {
			tableJson.cells = json.cells;
		}
		if (json.itemDisplayedPerPage !== undefined) {
			tableJson.itemDisplayedPerPage = json.itemDisplayedPerPage;
		}
		if (json.addDataPosition !== undefined) {
			tableJson.addDataPosition = json.addDataPosition;
		}
		if (json.sortable !== undefined) {
			tableJson.sortable = json.sortable;
		}

		return {
			'graphJson' : graphJson,
			'tableJson' : tableJson
		};
	}

    //Table.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    // create our new custom object that reuse the original object constructor
    function Table(info) {
    	Graph.apply(this, info); // info has only title and url
        if (info !== undefined) {
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
                    if (tJson.colunms !== undefined) {
                        colunms = tJson.colunms;
                    }
                    if (tJson.headers !== undefined) {
                        for (i=0; i<tJson.headers.length; i++) { 
                            headers.push(tJson.headers[i]);
                        }
                    }
                    if (tJson.cells !== undefined) {
                        for (i=0; i<tJson.cells.length; i++) {
                            for (var j=0; j<tJson.cells[i].length; j++) {
                                cells[i][j] = new Cell(tJson.cells[i][j]);
                            }
                        }
                    }
                    if (tJson.itemDisplayedPerPage !== undefined) {
                        itemDisplayedPerPage = tJson.itemDisplayedPerPage;
                    }
                    if (tJson.addDataPosition !== undefined) {
                        addDataPosition = tJson.addDataPosition;
                    }
                    if (tJson.sortable !== undefined) {
                        sortable = tJson.sortable;
                    }
                }
                if (info.flows !== undefined) {
                    for (i=0; i<info.flows.length; i++) {
                        var newflow = new TableFlow(info.flows[i]);
                        this.prototype.addFlow(info.flows[i].ID, newflow);
                    }
                }
            }
    }

    // reuse the original object prototype
    Table.prototype = Object.create(Graph.prototype);
    Table.prototype.constructor = Table;
    Table.prototype.parent = Graph.prototype;

    // Now let's override our original updateParameters method
    Table.prototype = {
        updateParameters : function(info) {
            if (info !== undefined) {
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
        			if (tJson.colunms !== undefined) {
        	       		colunms = tJson.colunms;
        	       	}
        	       	if (tJson.headers !== undefined) {
        	       		for (i=0; i<tJson.headers.length; i++) { 
        	        		headers.push(tJson.headers[i]);
        	        	}
                	}
                	if (tJson.cells !== undefined) {
                		for (i=0; i<tJson.cells.length; i++) {
        	        		for (var j=0; j<tJson.cells[i].length; j++) {
        	        			cells[i][j] = new Cell(tJson.cells[i][j]);
        	        		}
        	        	}
                	}
                	if (tJson.itemDisplayedPerPage !== undefined) {
                		itemDisplayedPerPage = tJson.itemDisplayedPerPage;
                	}
        	        if (tJson.addDataPosition !== undefined) {
                		addDataPosition = tJson.addDataPosition;
                	}
                	if (tJson.sortable !== undefined) {
                		sortable = tJson.sortable;
                	}
            	}
                if (info.flows !== undefined) {
                    for (i=0; i<info.flows.length; i++) {
                        var newflow = new TableFlow(info.flows[i]);
                        this.prototype.addFlow(info.flows[i].ID, newflow);
                    }
                }
            }
        },

        addFlow : function(ID, newFlow) {
            if (newFlow instanceof TableFlow) {
                this.parent.addFlow.call(this, ID, newFlow);
            }
        },

        initializeData : function(data) {  //inizialization data of flows
            for (var i=0; i<data.length; i++) {
                this.parent.getFlowList()[data[i].ID].inizializeData(data[i].records);
            }
        },

        inPlaceUpdate : function(data) {
            this.parent.getFlowList()[data.ID].inPlaceUpdate(data.records);
        },
        streamUpdate : function(data) {
            this.parent.getFlowList()[data.ID].streamUpdate(data.records);
        },

        getRows : function() {
            return rows;
        },
        getColunms : function() {
            return colunms;
        }, 
        getHeaders : function() {
        return headers;
        },
        getCells : function() {
            return cells;
        },
        getItemDisplayedPerPage : function() {
            return itemDisplayedPerPage;
        },
        getAddDataPosition : function() {
            return addDataPosition;
        },
        getSortable : function() {
            return sortable;
        }

    };

    return( Table );
}]);