/*jshint node: true */
'use strict';

/*
* Name :  MapChart.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.2.0         2015-05-18  Maria Giovanna Chinellato   Modified general structure, some fixes
*
* 0.1.1         2015-05-15  Francesco Rossetto          Various fix, insert inzializeData
*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add all attributes and methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module('norris-nrti')
.factory('MapChartFactory',['GraphFactory', 'MapChartFlowFactory', function(GraphFactory, MapChartFlowFactory){

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


        var mapJson = {};
        if (json.legendOnPoint !== undefined) {
            mapJson.legendOnPoint = json.legendOnPoint;
        }
        if (json.latitude !== undefined) {
            mapJson.latitude = json.latitude;
        }
        if (json.longitude !== undefined) {
            mapJson.longitude = json.longitude;
        }
        if (json.mapType !== undefined) {
            mapJson.mapType = json.mapType;
        }
        if (json.zoom !== undefined) {
            mapJson.zoom = json.zoom;
        }
        if (json.drag !== undefined) {
            mapJson.drag = json.drag;
        }
        if (json.mapWidth !== undefined) {
            mapJson.mapWidth = json.mapWidth;
        }
        if (json.mapHeight !== undefined) {
            mapJson.mapHeight = json.mapHeight;
        }


        return {
            'graphJson' : graphJson,
            'mapJson' : mapJson
        };
    }

    // costruttore di default di un MapChart
    function MapChart(info) {
        this._legendOnPoint = false;
        this._latitude = 45.4113311;
        this._longitude = 11.8876318;
        this._mapType = 'roadmap';
        this._zoom = true;
        this._drag = true;
        this._mapWidth = 0;
        this._mapHeight = 0;

        this._graph = GraphFactory.build(info);
    }

    // funzione che ha lo scopo di aggiornare i campi dati del map chart
    MapChart.prototype.updateParameters = function(info) {
        var json = split(info);
        var gJson = json.graphJson;
        var mJson = json.mapJson;
        if (Object.keys(gJson).length !== 0) {
            this._graph.updateParameters(gJson);
        } 
        if (Object.keys(mJson).length !== 0) {
            if (mJson.legendOnPoint !== undefined) {
                this._legendOnPoint = mJson.legendOnPoint;
            }
            if (mJson.latitude !== undefined) {
                this._latitude = mJson.latitude;
            }
            if (mJson.longitude !== undefined) {
                this._longitude = mJson.longitude;
            }
            if (mJson.mapType !== undefined) {
                this._mapType = mJson.mapType;
            }
            if (mJson.zoom !== undefined) {
                this._zoom = mJson.zoom;
            }
            if (mJson.drag !== undefined) {
                this._drag = mJson.drag;
            }
            if (mJson.mapWidth !== undefined) {
                this._mapWidth = mJson.mapWidth;
            }
            if (mJson.mapHeight !== undefined) {
                this._mapHeight = mJson.mapHeight;
            }
        }
        // aggiunge i flussi relativi all'istanza di map chart
        if (info.flows !== undefined) {
            for (var i=0; i<info.flows.length; i++) {
                var newflow = MapChartFlowFactory.build(info.flows[i]);
                this.addFlow(info.flows[i].ID, newflow);
            }
        }
    };

    // aggiunge un nuovo flusso alla lista di flussi
    MapChart.prototype.addFlow = function(ID, newFlow) {
        if (newFlow.constructor.name === 'MapChartFlow') { // controlla che il flusso da inserire sia del tipo giusto
            this._graph.addFlow(ID, newFlow);
        }
    };
    // elimina il flusso con id === ID
    MapChart.prototype.deleteFlow = function(ID) {
        this._graph.deleteFlow(ID);
    };
    // rimpiazza i dati di un flusso con altri dati
    MapChart.prototype.replaceData = function(newData){
        this._graph.replaceData(newData);
    };

    // inizializza i dati dei flussi presenti nella lista
    MapChart.prototype.initializeData = function(newData) {  //inizialization data of flows
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
    MapChart.prototype.inPlaceUpdate = function(newData) {
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
    MapChart.prototype.streamUpdate = function(newData) {
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.streamUpdate(newData);
                }
            }
        }
    };
    // funzione che permette di eliminare i dati di un flusso
    MapChart.prototype.deleteData = function(delData) {
        if (delData !== undefined){
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === delData.ID) {
                    fList[j].flow.deleteData(delData);
                }
            }
        }
    };

    MapChart.prototype.getTitle = function() {
        return this._graph.getTitle(); // ritorna il titolo del grafico
    };
    MapChart.prototype.getHeight = function() {
        return this._graph.getHeight(); // ritorna l'altezza del grafico
    };
    MapChart.prototype.getWidth = function() {
        return this._graph.getWidth(); // ritorna la larghezza del grafico
    };
    MapChart.prototype.getLegend = function() {
        return this._graph.getLegend(); // ritorna la legenda del grafico se questa è disponibile
    };
    MapChart.prototype.getUrl = function() {
        return this._graph.getUrl(); // ritorna l'url relativo al grafico
    };
    MapChart.prototype.getFlowList = function() {
        return this._graph.getFlowList(); // ritorna la lista dei flussi presenti nel grafico
    };
    MapChart.prototype.getLegendOnPoint = function() {
        return this._legendOnPoint; // ritorna true se è disponibile la legend on point
    };
    MapChart.prototype.getLatitude = function() {
        return this._latitude; // ritorna la latitudine del centro della mappa
    };
    MapChart.prototype.getLongitude = function() {
        return this._longitude; // ritorna la longitudine del centro della mappa
    };
    MapChart.prototype.getMapType = function() {
        return this._mapType; // ritorna il tipo della mappa (roadmap, terrain, satellite, hybrid)
    };
    MapChart.prototype.getZoomable = function() {
        return this._zoom; // ritorna true se è disponibile la funzionalità 'zoom' sulla mappa
    };
    MapChart.prototype.getDraggable = function() {
        return this._drag; // ritorna true se è disponibile la funzionalità 'drag' sulla mappa
    };    
    MapChart.prototype.getMapWidth = function() {
        return this._mapWidth; // ritorna la larghezza (in metri) della mappa (quanti metri devono essere visilìbili)
    };
    MapChart.prototype.getMapHeight = function() {
        return this._mapHeight; // ritorna l'altezza (in metri) della mappa (quanti metri devono essere visilìbili)
    };

    // costruttore di default di MapChartFactory
    function MapChartFactory() {}

    MapChartFactory.build = function(info) {
        return new MapChart(info); // ritorna una nuova istanza di MapChart
    };

    return MapChartFactory;
}]);