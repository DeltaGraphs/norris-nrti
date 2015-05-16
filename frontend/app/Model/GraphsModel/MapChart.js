/*jshint node: true */
'use strict';

/*
* Name :  MapChart.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.1.1         2015-05-15  Francesco Rossetto          Various fix, insert inzializeData
*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add all attributes and methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module("services")
.factory('MapChart',['Graph', 'MapChartFlow', function(Graph, MapChartFlow){
    var latitude = 45.4113311;
    var longitude = 11.8876318;
    var scale = 1000;
    var mapType = "terrain";
    var zoom = true;

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


        var mapJson = {};
        if (json.latitude) {
            mapJson.latitude = json.latitude;
        }
        if (json.longitude) {
            mapJson.longitude = json.longitude;
        }
        if (json.scale) {
            mapJson.scale = json.scale;
        }
        if (json.mapType) {
            mapJson.mapType = json.mapType;
        }
        if (json.zoom !== null) {
            mapJson.zoom = json.zoom;
        }

        return {
            "graphJson" : graphJson,
            "mapJson" : mapJson
        };
    }

    //MapChart.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    // create our new custom object that reuse the original object constructor
    var MapChart = function(info) {
        Graph.apply(this, info); // info has only title and url
    };

    // reuse the original object prototype
    MapChart.prototype = new Graph();

    // Now let's override our original updateParameters method
    MapChart.prototype.updateParameters = function(info) {
        var json = split(info);
        var gJson = json.graphJson;
        var mJson = json.mapJson;
        if (Object.keys(gJson).length !== 0) {
            Graph.apply(this, gJson);
        } 
        if (Object.keys(mJson).length !== 0) {
            if (mJson.latitude) {
                latitude = mJson.latitude;
            }
            if (mJson.longitude) {
                longitude = mJson.longitude;
            }
            if (mJson.scale) {
                scale = mJson.scale;
            }
            if (mJson.mapType) {
                mapType = mJson.mapType;
            }
            if (mJson.zoom !== null) {
                zoom = mJson.zoom;
            }
        }
        if (info.flows) {
            for (var i=0; i<info.flows.length; i++) {
                var newflow = new MapChartFlow(info.flows[i]);
                MapChart.prototype.addFlow(newflow);
            }
        }
    };

    MapChart.prototype.addFlow = function(flow) {
        if (flow instanceof MapChartFlow) {
            Graph.prototype.addFlow.call(this, flow.ID, flow);
        }
    };

    MapChart.prototype.initializeData = function(data) {  //inizialization data of flows
        for (var i=0; i<data.length; i++) {
            Graph.prototype.getFlowList()[data[i].ID].inizializeData(data[i].records);
        }
    };

    // update data
    MapChart.prototype.inPlaceUpdate = function(data) {
        Graph.prototype.getFlowList()[data.ID].inPlaceUpdate(data.records);
    };
    MapChart.prototype.streamUpdate = function(data) {
        Graph.prototype.getFlowList()[data.ID].streamUpdate(data.records);
    };
    MapChart.prototype.movieUpdate = function(data) {
        Graph.prototype.getFlowList()[data.ID].movieUpdate(data.records);
    };

    // get method
    MapChart.prototype.getLatitude =function() {
        return latitude;
    };
    MapChart.prototype.getLongitude = function() {
        return longitude;
    };
    MapChart.prototype.getBarOrientation = function() {
        return scale;
    };
    MapChart.prototype.getBackground = function() {
        return mapType;
    };
    MapChart.prototype.getSortable = function() {
        return zoom;
    };

    return MapChart;
}]);