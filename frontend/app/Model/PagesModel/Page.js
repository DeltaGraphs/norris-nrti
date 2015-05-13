/*
* Name :  Page.js
* Module : FrontEnd::Model::PagesModel
* Location : /frontend/app/Model
*
* History :
* Version       Date        Programmer                  Description
* =================================================================================================
* 0.1.2         2015-05-13  Francesco Rossetto          Correzioni al costruttore
*
* 0.1.1         2015-05-12  Francesco Rossetto          Correzioni ai metodi
*
* 0.1.0         2015-05-12  Maria Giovanna Chinellato   Codifica di tutti gli attributi e i metodi
*
* 0.0.1         2015-05-12  Maria Giovanna Chinellato   Creazione file      
* =================================================================================================
*
*/

app.factory('Page', ['LineChart', 'BarChart', 'MapChart', 'Table', function(LineChart, BarChart, MapChart, Table){
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
                    switch (info.graph[i].type) {
                        case "LineChart": 
                            var graph = new LineChart(info.graph[i]);
                            graphsList[info.graph[i].id] = graph;
                            break;
                        case "BarChart": 
                            var graph = new BarChart(info.graph[i]);
                            graphsList[info.graph[i].id] = graph;
                            break;
                        case "MapChart": 
                            var graph = new MapChart(info.graph[i]);
                            graphsList[info.graph[i].id] = graph;
                            break;
                        case "Table": 
                            var graph = new Table(info.graph[i]);
                            graphsList[info.graph[i].id] = graph;
                            break;
                    }
                }
                else{
                    // error
                }
            }
        },
        updatePage: function(info){
            if (info.name != null) {
                name = info.name;
            }
            if (info.name != null) {
                description = info.description;
            }
            if (info.name != null) {
                graphsPerRow = info.graphsPerRow;
            }
            if (info.name != null) {
                graphsPerCol = info.graphsPerCol;
            }
            if (info.name != null) {
                url = info.url;
            }
        },
        addGraph: function(graph){
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