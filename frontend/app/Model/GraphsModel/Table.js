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
.factory('TableFactory', ['GraphFactory', 'TableFlowFactory', function(GraphFactory, TableFlowFactory){

    // funzione di utilità che ha lo scopo di separare le proprietà legate al grafico generale da quelle legate al bar chart
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

    // costruttore di default di una Table
    function Table(info) {
        this._headers = [];
        this._maxItemsPage = 20;
        this._addRowOn = 'top';
        this._sortable = true;
        this._sort = null;
        this._appearance = null;
        this._graph = GraphFactory.build(info);
    }

    // funzione che ha lo scopo di aggiornare i campi dati dela table
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

    // aggiunge un nuovo flusso alla lista di flussi
    Table.prototype.addFlow = function(ID, newFlow) {
        if (newFlow.constructor.name === 'TableFlow') { // controlla che il flusso da inserire sia del tipo giusto
            this._graph.addFlow(ID, newFlow);
        }
    };
    // elimina il flusso con id === ID
    Table.prototype.deleteFlow = function(ID) {
        this._graph.deleteFlow(ID);
    };
    // rimpiazza i dati di un flusso con altri dati
    Table.prototype.replaceData = function(newData){
        for (var i = 0;i<this._graph.getFlowList().length; i++) {
            if (this._graph.getFlowList()[i].id === newData.ID){
                this._graph.getFlowList()[i].flow.emptyData();
                this._graph.getFlowList()[i].flow.initializeData(newData, this._addRowOn);
            }
        }
    };

    // inizializza i dati dei flussi presenti nella lista
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

    // funzione che permette l'aggiornamento di tipo in place dei dati
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
    // funzione che permette l'aggiornamento di tipo stream dei dati
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
    // funzione che permette di eliminare i dati di un flusso
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
        return this._graph.getTitle(); // ritorna il titolo del grafico
    };
    Table.prototype.getHeight = function() {
        return this._graph.getHeight(); // ritorna l'altezza del grafico
    };
    Table.prototype.getWidth = function() {
        return this._graph.getWidth(); // ritorna la larghezza del grafico
    };
    Table.prototype.getUrl = function() {
        return this._graph.getUrl(); // ritorna l'url relativo al grafico
    };
    Table.prototype.getFlowList = function() {
        return this._graph.getFlowList(); // ritorna la lista dei flussi presenti nel grafico
    };
    };
    Table.prototype.getHeaders = function() {
    return this._headers; // ritorna gli header della tabella
    };
    Table.prototype.getMaxItemsPage = function() {
        return this._maxItemsPage; // ritorna il massimo numero di elementi visualizzabili per pagina di tabella
    };
    Table.prototype.getAddRowOn = function() {
        return this._addRowOn; // ritorna la posizione di aggiunta record (top o bottom)
    };
    Table.prototype.getSortable = function() {
        return this._sortable; // ritorna true se è disponibile la funzionalità di ordinamento della tabella per colonne
    };
    Table.prototype.getSort = function() {
        return this._sort; // ritorna le colonne su cui è possibile ordinare la tabella
    };
    Table.prototype.getAppearance = function() {
        return this._appearance; // ritorna un array che definisce l'aspetto delle celle
    };

    // costruttore di default di TableFactory
    function TableFactory() {}

    TableFactory.build = function(info) {
        return new Table(info); // ritorna una nuova istanza di Table
    };

    return TableFactory;
}]);