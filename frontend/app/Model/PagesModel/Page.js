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
    
    function Page(info){
        this.graphsList = [];
        this.name = null;
        this.description = null;
        this.graphsPerRow = null;
        this.graphsPerCol = null;
        this.url = null;

        if (info !== undefined) {
            if (info.name !== undefined) {
                this.name = info.name;
            }
            if (info.description !== undefined) {
                this.description = info.description;
            }
            if (info.graphsPerRow !== undefined) {
                this.graphsPerRow = info.graphsPerRow;
            }
            if (info.graphsPerCol !== undefined) {
                this.graphsPerCol = info.graphsPerCol;
            }
            if (info.URLSocket !== undefined) {
                this.url = info.URLSocket;
            }
            if (info.graphs !== undefined) {
                for (var i=0; i<info.graphs.length; i++){
                    if (this.graphsList[info.graph[i].ID] === null){
                        var graph;
                        switch (info.graph[i].type) {
                            case 'LineChart': 
                                graph = new LineChart(info.graph[i]);
                                this.graphsList[info.graph[i].ID] = graph;
                                break;
                            case 'BarChart': 
                                graph = new BarChart(info.graph[i]);
                                this.graphsList[info.graph[i].ID] = graph;
                                break;
                            case 'MapChart': 
                                graph = new MapChart(info.graph[i]);
                                this.graphsList[info.graph[i].ID] = graph;
                                break;
                            case 'Table': 
                                graph = new Table(info.graph[i]);
                                this.graphsList[info.graph[i].ID] = graph;
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
                    this.name = info.name;
                }
                if (info.description !== undefined) {
                    this.description = info.description;
                }
                if (info.graphsPerRow !== undefined) {
                    this.graphsPerRow = info.graphsPerRow;
                }
                if (info.graphsPerCol !== undefined) {
                    this.graphsPerCol = info.graphsPerCol;
                }
                if (info.URLSocket !== undefined) {
                    this.url = info.URLSocket;
                }
            }
        },
        addGraph: function(graph){
            if (graph !== undefined) {
                if (this.graphsList[graph.ID] === null) {
                    var newgraph;
                    switch (graph.type) {
                        case 'LineChart': 
                            newgraph = new LineChart(graph);
                            this.graphsList[graph.ID] = newgraph;
                            break;
                        case 'BarChart': 
                            newgraph = new BarChart(graph);
                            this.graphsList[graph.ID] = newgraph;
                            break;
                        case 'MapChart': 
                            newgraph = new MapChart(graph);
                            this.graphsList[graph.ID] = newgraph;
                            break;
                        case 'Table': 
                            newgraph = new Table(graph);
                            this.graphsList[graph.ID] = newgraph;
                            break;
                    }
                }
            }
                            // error
        },

        getGraphsList: function(){
            return this.graphsList;
        },
        getName: function(){
            return this.name;
        },
        getDescription: function(){
            return this.description;
        },
        getGraphsPerRow: function(){
            return  this.graphsPerRow;
        },
        getGraphsPerCol: function(){
            return  this.graphsPerCol;
        },
        getUrl: function(){
            return this.url;
        }
    };
}]);