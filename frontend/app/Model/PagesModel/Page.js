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

angular.module('services')
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
                    if (graphsList[info.graph[i].ID] === null){
                        var graph;
                        switch (info.graph[i].type) {
                            case 'LineChart': 
                                graph = new LineChart(info.graph[i]);
                                graphsList[info.graph[i].ID] = graph;
                                break;
                            case 'BarChart': 
                                graph = new BarChart(info.graph[i]);
                                graphsList[info.graph[i].ID] = graph;
                                break;
                            case 'MapChart': 
                                graph = new MapChart(info.graph[i]);
                                graphsList[info.graph[i].ID] = graph;
                                break;
                            case 'Table': 
                                graph = new Table(info.graph[i]);
                                graphsList[info.graph[i].ID] = graph;
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
            return this;
        },
        addGraph: function(graph){
            if (graph !== undefined) {
                if (graphsList[graph.ID] === null) {
                    var newgraph;
                    switch (graph.type) {
                        case 'LineChart': 
                            newgraph = new LineChart(graph);
                            graphsList[graph.ID] = newgraph;
                            break;
                        case 'BarChart': 
                            newgraph = new BarChart(graph);
                            graphsList[graph.ID] = newgraph;
                            break;
                        case 'MapChart': 
                            newgraph = new MapChart(graph);
                            graphsList[graph.ID] = newgraph;
                            break;
                        case 'Table': 
                            newgraph = new Table(graph);
                            graphsList[graph.ID] = newgraph;
                            break;
                    }
                }
            }
            // error
            return this;
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