/*jshint node: true */
'use strict';

/*
* Name :  BarChart.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.2.1         2015-05-15  Francesco Rossetto          Various fix, insert inzializeData
*
* 0.2.0         2015-05-14  Maria Giovanna Chinellato   Add all methods and fix class
*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add all attributes, add methods split and updateParameter
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module("services")
.factory('BarChart', ['Graph', 'Axis', 'BarChartFlow', function(Graph, Axis, BarChartFlow){

    var axisX = null;
    var axisY = null;
    var barOrientation = "vertical";
    var background = "#FFF";
    var sortable = true;
    var barsGrouping = "grouped";

    function split(json) {
        var graphJson = {};
        if (json.title) {
            graphJson.title = json.title;
        }
        if (json.height) {
            graphJson.height = json.height;
        }
        if (json.width) {
            graphJson.width = json.width;
        }
        if (json.enabledLegend !== null) {
            graphJson.enabledLegend = json.enabledLegend;
            if (graphJson.enabledLegend && json.legend) {
                graphJson.legend = json.legend;
            }
        }
        if (json.horizontalGrid !== null) {
            graphJson.horizontalGrid = json.horizontalGrid;
        }
        if (json.verticalGrid !== null) {
            graphJson.verticalGrid = json.verticalGrid;
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
        };
    }

    //BarChart.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    // create our new custom object that reuse the original object constructor
    var BarChart = function(info) {
        Graph.apply(this, info); // info has only title and url
    };

    // reuse the original object prototype
    BarChart.prototype = new Graph();

    // Now let's override our original updateParameters method
    BarChart.prototype.updateParameters = function(info) {
        var json = split(info);
        var gJson = json.graphJson;
        var bJson = json.barJson;
        if (Object.keys(gJson).length !== 0) {
            Graph.apply(this, gJson);
        } 
        if (Object.keys(bJson).length !== 0) {
            if (bJson.axisX) {
                axisX = new Axis(bJson.axisX);
            }
            if (bJson.axisY) {
                axisY = new Axis(bJson.axisY);
            }
            if (bJson.barOrientation) {
                barOrientation = bJson.barOrientation;
            }
            if (bJson.background) {
                background = bJson.background;
            }
            if (bJson.sortable) {
                sortable = bJson.sortable;
            }
            if (bJson.barsGrouping) {
                barsGrouping = bJson.barsGrouping;
            }
        }
        if (info.flows) {
            for (var i=0; i<info.flows.length; i++) {
                var newflow = new BarChartFlow(info.flows[i]);
                BarChart.prototype.addFlow(newflow);
            }
        }
    };

    BarChart.prototype.addFlow = function(flow) {
        if (flow instanceof BarChartFlow) {
            Graph.prototype.addFlow.call(this, flow.ID, flow);
        }
    };

    BarChart.prototype.initializeData = function(data) {  //inizialization data of flows
        for (var i=0; i<data.length; i++) {
            Graph.prototype.getFlowList()[data[i].ID].inizializeData(data[i].records);
        }
    };

    // update data
    BarChart.prototype.inPlaceUpdate = function(data) {
        Graph.prototype.getFlowList()[data.ID].inPlaceUpdate(data.records);
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