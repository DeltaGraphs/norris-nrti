/*jshint node: true */
'use strict';

/*
* Name :  Page.js
* Module : FrontEnd::Model::PagesModel
* Location : /frontend/app/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.4         2015-05-18  Maria Giovanna Chinellato   Fix attributes
*
* 0.1.3         2015-05-14  Francesco Rossetto          Fix addGraph
*
* 0.1.2         2015-05-13  Francesco Rossetto          Fix constructor
*
* 0.1.1         2015-05-12  Francesco Rossetto          Fix methods
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato   Add all attributes and all methods
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato   Initial code     
* =================================================================================================
*
*/

angular.module('app')
.factory('Page', ['LineChart', 'BarChart', 'MapChart', 'Table', function(LineChart, BarChart, MapChart, Table){
    
    var graphsList = [];
    var name = null;
    var description = null;
    var graphsPerRow = null;
    var graphsPerCol = null;
    var url = null;

    function Page(info){

        if (info !== undefined) {
            if (info.name !== undefined) {
                name = info.name;
            }
            if (info.description !== undefined) {
                description = info.description;
            }
            if (info.graphsPerRow !== undefined) {
                graphsPerRow = info.graphsPerRow;
            }
            if (info.graphsPerCol !== undefined) {
                graphsPerCol = info.graphsPerCol;
            }
            if (info.URLSocket !== undefined) {
                url = info.URLSocket;
            }
            if (info.graphs !== undefined) {
                for (var i=0; i<info.graphs.length; i++){
                    var count = 0;
                    for (var j=0; j<graphsList.length; j++) {
                        if (graphsList[j].id === info.graphs[i].ID){
                            count++;
                        }
                    }
                    if (count === 0){
                        var graph;
                        switch (info.graphs[i].type) {
                            case 'LineChart': 
                                graph = new LineChart(info.graphs[i]);
                                graphsList.push( {'id' : info.graphs[i].ID, 'graph' : graph} );
                                break;
                            case 'BarChart': 
                                graph = new BarChart(info.graphs[i]);
                                graphsList.push( {'id' : info.graphs[i].ID, 'graph' : graph} );
                                break;
                            case 'MapChart': 
                                graph = new MapChart(info.graphs[i]);
                                graphsList.push( {'id' : info.graphs[i].ID, 'graph' : graph} );
                                break;
                            case 'Table': 
                                graph = new Table(info.graphs[i]);
                                graphsList.push( {'id' : info.graphs[i].ID, 'graph' : graph} );
                                break;
                        }
                    }
                // error
                }
            }
        }
    }

    Page.prototype = {

        updateParameters: function(info){
            if (info !== undefined) {
                if (info.name !== undefined) {
                    name = info.name;
                }
                if (info.description !== undefined) {
                    description = info.description;
                }
                if (info.graphsPerRow !== undefined) {
                    graphsPerRow = info.graphsPerRow;
                }
                if (info.graphsPerCol !== undefined) {
                    graphsPerCol = info.graphsPerCol;
                }
                if (info.URLSocket !== undefined) {
                    url = info.URLSocket;
                }
            }
        },
        addGraph: function(graph){
            if (graph !== undefined) {
                var count = 0;
                for (var j=0; j<graphsList.length; j++) {
                    if (graphsList[j].id === graph.ID){
                        count++;
                    }
                }
                if (count === 0){
                    var newGraph;
                    switch (graph.type) {
                        case 'LineChart': 
                            newGraph = new LineChart(graphs);
                            graphsList.push( {'id' : graph.ID, 'graph' : newGraph} );
                            break;
                        case 'BarChart': 
                            newGraph = new BarChart(graphs);
                            graphsList.push( {'id' : graph.ID, 'graph' : newGraph} );
                            break;
                        case 'MapChart': 
                            newGraph = new MapChart(graphs);
                            graphsList.push( {'id' : graph.ID, 'graph' : newGraph} );
                            break;
                        case 'Table': 
                            newGraph = new Table(graph);
                            graphsList.push( {'id' : graph.ID, 'graph' : newGraph} );
                            break;
                    }
                }
            // error
            }
            // error
        },

        getGraphsList: function(){
            return graphsList;
        },
        getName: function(){
            return name;
        },
        getDescription: function(){
            return description;
        },
        getGraphsPerRow: function(){
            return  graphsPerRow;
        },
        getGraphsPerCol: function(){
            return  graphsPerCol;
        },
        getUrl: function(){
            return url;
        }
    };
}]);