/*jshint node: true */
'use strict';

/*
* Name :  BarChart.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 1.0.0         2015-05-21  Francesco Rossetto          Tested
*
* 0.3.0         2015-05-20  Francesco Rossetto          Modified general structure, some fixes
*
* 0.2.1         2015-05-19  Francesco Rossetto          Various fixes, insert inzializeData
*
* 0.2.0         2015-05-18  Maria Giovanna Chinellato   Add all methods and fix class
*
* 0.1.0         2015-05-18  Maria Giovanna Chinellato   Add all attributes, add methods split and updateParameter
*
* 0.0.1         2015-05-18  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module('norris-nrti')
.factory('BarChartFactory', ['GraphFactory','AxisFactory', 'BarChartFlowFactory', function(GraphFactory, AxisFactory, BarChartFlowFactory){

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
        if (json.enableLegend !== undefined) {
            graphJson.enableLegend = json.enableLegend;
        }
        if (json.legend !== undefined) {
            graphJson.legend = json.legend;
        }
        if (json.socketURL !== undefined) {
            graphJson.socketURL = json.socketURL;
        }

        var barJson = {};
        if (json.xAxis !== undefined) {
            barJson.xAxis = json.xAxis;
        }
        if (json.yAxis !== undefined) {
            barJson.yAxis = json.yAxis;
        }
        if (json.barOrientation !== undefined) {
            barJson.barOrientation = json.barOrientation;
        }
        if (json.headers !== undefined) {
            barJson.headers = json.headers;
        }
        if (json.backgroundColor !== undefined) {
            barJson.backgroundColor = json.backgroundColor;
        }
        if (json.sortable !== undefined) {
            barJson.sortable = json.sortable;
        }
        if (json.groupingControl !== undefined) {
            barJson.groupingControl = json.groupingControl;
        }
        if (json.legendOnPoint !== undefined) {
            barJson.legendOnPoint = json.legendOnPoint;
        }
        if (json.grid !== undefined) {
            barJson.grid = json.grid;
        }

        return {
            'graphJson' : graphJson,
            'barJson' : barJson
        };
    }

    // costruttore di default di un BarChart
    function BarChart(info) {
        // campi dati di un bar chart e valori di default
        this._axisX = null;
        this._axisY = null;
        this._barOrientation = 'V';
        this._headers = [];
        this._background = '#FFF';
        this._sortable = true;
        this._groupingControl = true;
        this._legendOnPoint = false;
        this._horizontalGrid = false;
        this._graph = GraphFactory.build(info);
    }

    // funzione che ha lo scopo di aggiornare i campi dati del bar chart
    BarChart.prototype.updateParameters = function(info) {
        if (info !== undefined) {
            var json = split(info);
            var gJson = json.graphJson;
            var bJson = json.barJson;
            if (Object.keys(gJson).length !== 0) {
                this._graph.updateParameters(gJson);
            } 
            if (Object.keys(bJson).length !== 0) {
                if (bJson.xAxis !== undefined) {
                    this._axisX = AxisFactory.build(bJson.xAxis);
                }
                if (bJson.yAxis !== undefined) {
                    this._axisY = AxisFactory.build(bJson.yAxis);
                }
                if (bJson.barOrientation !== undefined) {
                    this._barOrientation = bJson.barOrientation;
                }
                if (bJson.headers !== undefined) {
                    this._headers = bJson.headers;
                }
                if (bJson.backgroundColor !== undefined) {
                    this._background = bJson.backgroundColor;
                }
                if (bJson.sortable !== undefined) {
                    this._sortable = bJson.sortable;
                }
                if (bJson.groupingControl !== undefined) {
                    this._groupingControl = bJson.groupingControl;
                }
                if (bJson.legendOnPoint !== undefined) {
                    this._legendOnPoint = bJson.legendOnPoint;
                }
                if (bJson.grid !== undefined) {
                    this._horizontalGrid = bJson.grid;
                }
            }
            // aggiunge i flussi relativi all'istanza di bar chart
            if (info.flows !== undefined) {
                for (var i=0; i<info.flows.length; i++) {
                    var newflow = BarChartFlowFactory.build(info.flows[i]);
                    this.addFlow(info.flows[i].ID, newflow);
                }
            }
        }
        
    };

    // aggiunge un nuovo flusso alla lista di flussi
    BarChart.prototype.addFlow = function(newId, newFlow) {
        if (newFlow.constructor.name === 'BarChartFlow') { // controlla che il flusso da inserire sia del tipo giusto
            this._graph.addFlow(newId, newFlow);
        }
    };
    // elimina il flusso con id === ID
    BarChart.prototype.deleteFlow = function(ID) {
        this._graph.deleteFlow(ID);
    };
    // rimpiazza i dati di un flusso con altri dati
    BarChart.prototype.replaceData = function(newData){
        this._graph.replaceData(newData);
    };

    // inizializza i dati dei flussi presenti nella lista
    BarChart.prototype.initializeData = function(newData) {  //inizialization data of flows
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
            for (var i=0; i<newData.length; i++) {
                for (var j=0; j<fList.length; j++) {
                    if (fList[j].id === newData[i].ID) {
                        fList[j].flow.initializeData(newData[i]);
                    }
                }
            }
        }   
    };

    // funzione che permette l'aggiornamento di tipo in place dei dati
    BarChart.prototype.inPlaceUpdate = function(newData) {
        if (newData !== undefined) {
            for (var j=0; j<this._graph.getFlowList().length; j++) {
                if (this._graph.getFlowList()[j].id === newData.ID) {
                    this._graph.getFlowList()[j].flow.inPlaceUpdate(newData);
                }
            }
        }   
    };
    // funzione che permette di aggiongere un record ad un flusso esistente
    BarChart.prototype.addRecords = function(newData) {
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.addRecords(newData);
                }
            }
        }
    };
    // funzione che permette di eliminare i dati di un flusso
    BarChart.prototype.deleteData = function(delData) {
        if (delData !== undefined){
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === delData.ID) {
                    fList[j].flow.deleteData(delData);
                }
            }
        }
    };

    BarChart.prototype.getTitle = function() {
        return this._graph.getTitle(); // ritorna il titolo del grafico
    };
    BarChart.prototype.getHeight = function() {
        return this._graph.getHeight(); // ritorna l'altezza del grafico
    };
    BarChart.prototype.getWidth = function() {
        return this._graph.getWidth(); // ritorna la larghezza del grafico
    };
    BarChart.prototype.getLegend = function() {
        return this._graph.getLegend(); // ritorna la legenda del grafico se questa è disponibile
    };
    BarChart.prototype.getUrl = function() {
        return this._graph.getUrl(); // ritorna l'url relativo al grafico
    };
    BarChart.prototype.getFlowList = function() {
        return this._graph.getFlowList(); // ritorna la lista dei flussi presenti nel grafico
    };
    BarChart.prototype.getX = function() {
        return this._axisX; // ritorna l'asse X
    };
    BarChart.prototype.getY = function() {
        return this._axisY; // ritorna l'asse Y
    };
    BarChart.prototype.getBarOrientation = function() {
        return this._barOrientation; // ritorna l'orientamento delle barre del bar chart (verticale: V, orizzontale: H)
    };
    BarChart.prototype.getHeaders = function() {
        return this._headers; // ritorna gli header relativi alle barre
    };
    BarChart.prototype.getBackground = function() {
        return this._background; // ritorna il colore di background del grafico
    };
    BarChart.prototype.getSortable = function() {
        return this._sortable; // ritorna true se è possibile ordinare il grafico dalla view
    };
    BarChart.prototype.getGroupingControl = function() {
        return this._groupingControl; // ritorna true se è data la possibilità di cambiare la posizine delle barre da grouped a stacked e viceversa
    };
    BarChart.prototype.getLegendOnPoint = function() {
        return this._legendOnPoint; // ritorna true se è disponibile la funzionalità legend on point
    };
    BarChart.prototype.getHGrid = function() {
        return this._horizontalGrid; // ritorna se deve essere visualizzata la griglia orizzontale
    };

    // costruttore di default di BarChartFactory
    function BarChartFactory(){}

    BarChartFactory.build = function(info) {
        return new BarChart(info); // ritorna un'istanza di BarChart
    };

    return BarChartFactory;

}]);