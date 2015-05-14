/*
* Name :  LineChart.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.0.2         2015-05-14  Maria Giovanna Chinellato   Codifica di tutti gli attributi, della funzione
*                                                       split e di parte del metodo updateParameters
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Creazione file      
* ===============================================================================================================
*
*/

app.factory('BarChartFlow', function(){
    var axisX;
    var axisY;
    var barOrientation;
    var background;
    var sortable;
    var barsGrouping;

    function split(json) {
        var graphJson = {};
        if (json.title) {
            graphJson.title = json.title;
        }
        if (json.legend) {
            graphJson.legend = json.legend;
        }
        if (json.enabledLegend) {
            graphJson.enabledLegend = json.enabledLegend;
        }
        if (json.horizontalGrid) {
            graphJson.horizontalGrid = json.horizontalGrid;
        }
        if (json.verticalGrid) {
            graphJson.verticalGrid = json.verticalGrid;
        }
        if (json.url) {
            graphJson.url = json.url;
        }

        var barJson = {};
        if (json.axisX) {
            barJson.axisX = json.axisX;
        }
        if (json.axisY) {
            barJson.axisY = json.axisY;
        }
        if (json.barOrientation) {
            barJson.barOrientation = json.barOrientation;
        }
        if (json.background) {
            barJson.background = json.background;
        }
        if (json.sortable) {
            barJson.sortable = json.sortable;
        }
        if (json.barsGrouping) {
            barJson.barsGrouping = json.barsGrouping;
        }

        return {
            "graphJson" : graphJson,
            "barJson" : barJson
        }
    }

    // create our new custom object that reuse the original object constructor
    var BarChart = function(info) {
        json = split(info);
        gJson = json.graphJson;
        bJson = json.barJson;
        Graph.apply(this, gJson);

        axisX = new Axis(bJson.axisX);
        axisY = new Axis(bJson.axisY);
        barOrientation = bJson.barOrientation;
        background = bJson.background;
        sortable = bJson.sortable;
        barsGrouping = bJson.barsGrouping;
    };

    // reuse the original object prototype
    BarChart.prototype = new Graph();

    // Now let's override our original getProfile method
    BarChart.prototype.updateParameters = function(info) {
        json = json = split(info);
        gJson = json.graphJson;
        bJson = json.barJson;
        if (Object.keys(gJson).length != 0) {
            //chiamata super a graph
        } 
        //........
    };
    return LineChart;
});