/*jshint node: true */
'use strict';

/*
* Name :  LineChart.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 1.0.0         2015-05-19  Maria Giovanna Chinellato   Tested
*
* 0.3.0         2015-05-18  Francesco Rossetto          Modified general structure, some fixes
*
* 0.2.2			2015-05-15	Francesco Rossetto			Various fixes, insert inzializeData
*
* 0.2.1         2015-05-15  Maria Giovanna Chinellato	Fix all methods
*
* 0.2.0         2015-05-13  Maria Giovanna Chinellato	Add all methods
*
* 0.1.0         2015-05-13  Francesco Rossetto   		Add all attributes and some methods
*
* 0.0.1         2015-05-13  Francesco Rossetto			Initial code      
* ===============================================================================================================
*
*/

angular.module('norris-nrti')
.factory('LineChartFactory', ['GraphFactory', 'AxisFactory', 'LineChartFlowFactory', function(GraphFactory, AxisFactory, LineChartFlowFactory){

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

		var lineJson = {};
        if (json.legendOnPoint !== undefined) {
            lineJson.legendOnPoint = json.legendOnPoint;
        }
		if (json.axisX !== undefined) {
			lineJson.axisX = json.axisX;
		}
		if (json.axisY !== undefined) {
			lineJson.axisY = json.axisY;
		}
		if (json.viewFinder !== undefined) {
			lineJson.viewFinder = json.viewFinder;
		}
		if (json.backgroundColor !== undefined) {
			lineJson.backgroundColor = json.backgroundColor;
		}
        if (json.interpolation !== undefined) {
            lineJson.interpolation = json.interpolation;
        }
        if (json.horizontalGrid !== undefined) {
            lineJson.horizontalGrid = json.horizontalGrid;
        }
        if (json.verticalGrid !== undefined) {
            lineJson.verticalGrid = json.verticalGrid;
        }

		return {
			'graphJson' : graphJson,
			'lineJson' : lineJson
		};
	}

    // costruttore di default di un LineChart
    function LineChart(info) {
        this._legendOnPoint = false;
        this._axisX = null;
        this._axisY = null;
        this._viewFinder = false;
        this._backgroundColor = '#FFF';
        this._interpolation = 'linear';
        this._horizontalGrid = false;
        this._verticalGrid = false;
        this._graph = GraphFactory.build(info);
    }

    // funzione che ha lo scopo di aggiornare i campi dati del line chart
    LineChart.prototype.updateParameters = function(info) {
        if (info !== undefined) {
            var json = split(info);
            var gJson = json.graphJson;
            var lJson = json.lineJson;
            if (Object.keys(gJson).length !== 0) {
                this._graph.updateParameters(gJson);
            }
            if (Object.keys(lJson).length !== 0) {
                if (lJson.legendOnPoint !== undefined) {
                    this._legendOnPoint = lJson.legendOnPoint;
                }
                if (lJson.axisX !== undefined) {
                    this._axisX = AxisFactory.build(lJson.axisX);
                }
                if (lJson.axisY !== undefined) {
                    this._axisY = AxisFactory.build(lJson.axisY);
                }
                if (lJson.viewFinder !== undefined) {
                    this._viewFinder = lJson.viewFinder;
                }
                if (lJson.backgroundColor !== undefined) {
                    this._backgroundColor = lJson.backgroundColor;
                }
                if (lJson.interpolation !== undefined) {
                    this._interpolation = lJson.interpolation;
                }
                if (lJson.horizontalGrid !== undefined) {
                    this._horizontalGrid = lJson.horizontalGrid;
                }
                if (lJson.verticalGrid !== undefined) {
                    this._verticalGrid = lJson.verticalGrid;
                }
            }
            // aggiunge i flussi relativi all'istanza di line chart
            if (info.flows !== undefined) {
                for (var i=0; i<info.flows.length; i++) {
                    var newflow = LineChartFlowFactory.build(info.flows[i]);
                    this.addFlow(info.flows[i].ID, newflow);
                }
            }
        }
    };

    // aggiunge un nuovo flusso alla lista di flussi
    LineChart.prototype.addFlow = function(newId, newFlow) {
        if (newFlow.constructor.name === 'LineChartFlow') { // controlla che il flusso da inserire sia del tipo giusto
            this._graph.addFlow(newId, newFlow);
        }
    };
    // elimina il flusso con id === ID
    LineChart.prototype.deleteFlow = function(ID) {
        this._graph.deleteFlow(ID);
    };
    // rimpiazza i dati di un flusso con altri dati
    LineChart.prototype.replaceData = function(newData){
        this._graph.replaceData(newData);
    };

    // inizializza i dati dei flussi presenti nella lista
    LineChart.prototype.initializeData = function(newData) {  //inizialization data of flows
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
    LineChart.prototype.inPlaceUpdate = function(newData) {
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
    LineChart.prototype.streamUpdate = function(newData) {
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
    LineChart.prototype.deleteData = function(delData) {
        if (delData !== undefined){
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === delData.ID) {
                    fList[j].flow.deleteData(delData);
                }
            }
        }
    };

    LineChart.prototype.getTitle = function() {
        return this._graph.getTitle(); // ritorna il titolo del grafico
    };
    LineChart.prototype.getHeight = function() {
        return this._graph.getHeight(); // ritorna l'altezza del grafico
    };
    LineChart.prototype.getWidth = function() {
        return this._graph.getWidth(); // ritorna la larghezza del grafico
    };
    LineChart.prototype.getLegend = function() {
        return this._graph.getLegend(); // ritorna la legenda del grafico se questa è disponibile
    };
    LineChart.prototype.getUrl = function() {
        return this._graph.getUrl(); // ritorna l'url relativo al grafico
    };
    LineChart.prototype.getFlowList = function() {
        return this._graph.getFlowList(); // ritorna la lista dei flussi presenti nel grafico
    };
    LineChart.prototype.getX = function() {
        return this._axisX; // ritorna l'asse X
    };
    LineChart.prototype.getY = function() {
        return this._axisY; // ritorna l'asse Y
    };
    LineChart.prototype.getViewFinder = function() {
        return this._viewFinder; // ritorna true se il grafico deve essere creato con il view finder
    };
    LineChart.prototype.getBackground = function() {
        return this._backgroundColor; // ritorna il colore di background del grafico
    };
    LineChart.prototype.getLegendOnPoint = function() {
        return this._legendOnPoint; // ritorna true se è disponibile la legend on point
    };
    LineChart.prototype.getInterpolation = function() {
        return this._interpolation; // ritorna il tipo di iterpolazione del grafico
    };
    LineChart.prototype.getHGrid = function() {
        return this._horizontalGrid; // ritorna true se deve essere visibile la griglia orizzontale del line chart
    };
    LineChart.prototype.getVGrid = function() {
        return this._verticalGrid; // ritorna true se deve essere visibile la griglia verticale del line chart
    };

    // costruttore di default del LineChartFactory
    function LineChartFactory(){}

    LineChartFactory.build = function(info) {
        return new LineChart(info); // ritorna una nuova istanza di LineChart
    };

    return LineChartFactory;
}]);