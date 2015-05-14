/*
* Name :  MapChart.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add all attributes and methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

app.factory('MapChart',['Graph', 'MapChartFlow', function(Graph, MapChartFlow){
    var latitude;
    var longitude;
    var scale;
    var mapType;
    var zoom;

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
        if (json.zoom) {
            mapJson.zoom = json.zoom;
        }

        return {
            "graphJson" : graphJson,
            "mapJson" : mapJson
        }
    }

    // create our new custom object that reuse the original object constructor
    var MapChart = function(info) {
        Graph.apply(this, info); // info has only title and url
    };

    // reuse the original object prototype
    MapChart.prototype = new Graph();

    // Now let's override our original updateParameters method
    MapChart.prototype.updateParameters = function(info) {
        json = json = split(info);
        gJson = json.graphJson;
        mJson = json.mapJson;
        if (Object.keys(gJson).length != 0) {
            Graph.apply(this, gJson);
        } 
        if (Object.keys(mJson).length != 0) {
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
            if (mJson.zoom) {
                zoom = mJson.zoom;
            }
        }
    };

    MapChart.prototype.addFlow = function(flow) {
        if (typeof flow === 'MapChartFlow'){
            var newflow = new MapChartFlow(flow);
            Graph.prototype.addFlow.call(this, flow.ID, newflow);
        }
    };

    // update data
    MapChart.prototype.inPlaceUpdate = function(data) {
        flowList[data.ID].inPlaceUpdate(data.records);
    };
    MapChart.prototype.streamUpdate = function(data) {
        flowList[data.ID].streamUpdate(data.records);
    };
    MapChart.prototype.movieUpdate = function(data) {
        flowList[data.ID].movieUpdate(data.records);
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