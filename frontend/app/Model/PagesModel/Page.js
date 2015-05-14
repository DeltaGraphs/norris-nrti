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
            url = info.URLSocket;
            for (var i=0; i<info.graphs.length; i++){
                if (graphsList[info.graph[i].ID] === null){
                    switch (info.graph[i].type) {
                        case "LineChart": 
                            var graph = new LineChart(info.graph[i]);
                            graphsList[info.graph[i].ID] = graph;
                            break;
                        case "BarChart": 
                            var graph = new BarChart(info.graph[i]);
                            graphsList[info.graph[i].ID] = graph;
                            break;
                        case "MapChart": 
                            var graph = new MapChart(info.graph[i]);
                            graphsList[info.graph[i].ID] = graph;
                            break;
                        case "Table": 
                            var graph = new Table(info.graph[i]);
                            graphsList[info.graph[i].ID] = graph;
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
            if (info.description != null) {
                description = info.description;
            }
            if (info.graphsPerRow != null) {
                graphsPerRow = info.graphsPerRow;
            }
            if (info.graphsPerCol != null) {
                graphsPerCol = info.graphsPerCol;
            }
            if (info.URLSocket != null) {
                url = info.URLSocket;
            }
        },
        addGraph: function(graph){
            if (graphsList[graph.ID] === null) {
                switch (graph.type) {
                    case "LineChart": 
                        var graph = new LineChart(graph);
                        graphsList[graph.ID] = graph;
                        break;
                    case "BarChart": 
                        var graph = new BarChart(graph);
                        graphsList[graph.ID] = graph;
                        break;
                    case "MapChart": 
                        var graph = new MapChart(graph);
                        graphsList[graph.ID] = graph;
                        break;
                    case "Table": 
                        var graph = new Table(graph);
                        graphsList[graph.ID] = graph;
                        break;
                }
            } else {
                // error
            }
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