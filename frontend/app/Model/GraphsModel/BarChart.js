/*
* Name :  BarChart.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add all methods and fix class
*
* 0.0.2         2015-05-14  Maria Giovanna Chinellato   Add all attributes, add methods 
*                                                       split and updateParameter
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

app.factory('BarChart', ['Graph', 'Axis', 'BarChartFlow', function(Graph, Axis, BarChartFlow){
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
        Graph.apply(this, info); // info has only title and url
    };

    // reuse the original object prototype
    BarChart.prototype = new Graph();

    // Now let's override our original updateParameters method
    BarChart.prototype.updateParameters = function(info) {
        json = json = split(info);
        gJson = json.graphJson;
        bJson = json.barJson;
        if (Object.keys(gJson).length != 0) {
            Graph.apply(this, gJson);
        } 
        if (Object.keys(bJson).length != 0) {
            if (bJson.axisX) {
                axisX = new Axis(bJson.axisX);
            }
            if (bJson.axisY) {
                axisY = new Axis(bJson.axisY);
            }
            if (bjson.barOrientation) {
                barOrientation = bJson.barOrientation;
            }
            if (bJson.background) {
                background = bJson.background;
            }
            if (bjson.sortable) {
                sortable = bJson.sortable;
            }
            if (lJson.barsGrouping) {
                barsGrouping = lJson.barsGrouping;
            }
        }
    };

    BarChart.prototype.addFlow = function(flow) {
        if (typeof flow === 'BarChartFlow'){
            var newflow = new BarChartFlow(flow);
            Graph.prototype.addFlow.call(this, flow.ID, newflow);
        }
    };

    // update data
    BarChart.prototype.inPlaceUpdate = function(data) {
        flowList[data.ID].inPlaceUpdate(data.records);
    };

    // get method
    BarChart.prototype.getX =function() {
        return axisX;
    };
    BarChart.prototype.getY = function() {
        return axisY;
    };
    BarChart.prototype.getBarOrientation = function() {
        return barOrientation;
    };
    BarChart.prototype.getBackground = function() {
        return background;
    };
    BarChart.prototype.getSortable = function() {
        return sortable;
    };
    BarChart.prototype.getBarGrouping = function() {
        return barsGrouping;
    };

    return BarChart;
}]);