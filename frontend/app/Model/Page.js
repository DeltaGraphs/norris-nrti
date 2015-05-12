/**
    * Name: Page.js
    * Package: FrontEnd::Model::PagesModel
    * Author: Maria Giovanna Chinellato
    * Date: 2015/05/12
    *
    * Changes:
    * Version   Date        Changes 		Author
    * {0}.{1}   2015-05-12  Creazione file  Maria Giovanna Chinellato
    *
    * {0}.{2}   2015-05-12  Codifica modulo Maria Giovanna Chinellato
    *
    * ------------------------------------------------------------
    * Copyright (C) 2015 DeltaGraphs
    * 
    * This file is part of Norris.js.
    *
*/

app.factory('Page', ['Graph', function(Graph){
    var graphsList = new Array();
    var name;
    var description;
    var graphsPerRow;
    var graphsPerCol;
    var url;
    return {
        Page: function(info){
            name = info.name;
            description = info.description;
            graphsPerRow = info.graphsPerRow;
            graphsPerCol = info.graphsPerCol;
            url = info.url;
            for (var i=0; i<info.graphs.length; i++){
                if (graphsList[info.graph[i].id] === null){
                    var graph = new Graph(info.graph[i]);
                    graphsList[info.graph[i].id] = graph;
                }
                else{
                    // error
                }
            }
        },
        updatePage: function(info){ // da cambiare DP
            name = info.name;
            description = info.description;
            graphsPerRow = info.graphsPerRow;
            graphsPerCol = info.graphsPerCol;
            url = info.url;
        },
        addGraph: function(){
            var newGraph = new Graph(graph);
            if (pagesList[graph.id] != null)
                pagesList[graph.id] = newGraph;
            else
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
});