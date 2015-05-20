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
* 0.2.0         2015-05-18  Maria Giovanna Chinellato   Modified general structure, some fixes
*
* 0.1.1         2015-05-15  Francesco Rossetto          Various fix, insert inzializeData
*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add all attributes and methods
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module('services')
.factory('MapChart',['Graph', 'MapChartFlow', function(Graph, MapChartFlow){

    var legendOnPoint = false;
    var latitude = 45.4113311;
    var longitude = 11.8876318;
    var mapType = 'terrain';
    var zoom = true;
    var mapWidth = 0;
    var mapHeight = 0;

    // reuse the original object prototype
    MapChart.prototype = Object.create(Graph.prototype);
    MapChart.prototype.constructor = MapChart;
    MapChart.prototype.parent = Graph.prototype;

    function split(json) {
        var graphJson = {};
        if (json.title !== undefined) {
            graphJson.title = json.title;
        }
        if (json.height !== undefined) {
            graphJson.height = json.height;
        }
        if (json.width !== undefined) {
            graphJson.width = json.width;
        }
        if (json.enableLegend !== undefined) {
            graphJson.enableLegend = json.enableLegend;
            if (json.legend !== undefined && graphJson.enableLegend !== false) {
                graphJson.legend = json.legend;
            }
        }
        if (json.horizontalGrid !== undefined) {
            graphJson.horizontalGrid = json.horizontalGrid;
        }
        if (json.verticalGrid !== undefined) {
            graphJson.verticalGrid = json.verticalGrid;
        }


        var mapJson = {};
        if (json.legendOnPoint !== undefined) {
            mapJson.legendOnPoint = json.legendOnPoint;
        }
        if (json.latitude !== undefined) {
            mapJson.latitude = json.latitude;
        }
        if (json.longitude !== undefined) {
            mapJson.longitude = json.longitude;
        }
        if (json.mapType !== undefined) {
            mapJson.mapType = json.mapType;
        }
        if (json.zoom !== undefined) {
            mapJson.zoom = json.zoom;
        }
        if (json.mapWidth !== undefined) {
            mapJson.mapWidth = json.mapWidth;
        }
        if (json.mapHeight !== undefined) {
            mapJson.mapHeight = json.mapHeight;
        }


        return {
            'graphJson' : graphJson,
            'mapJson' : mapJson
        };
    }

    //MapChart.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    // create our new custom object that reuse the original object constructor
    function MapChart(info) {
        this.parent.constructor.call(this, info);
    }

    MapChart.prototype.updateParameters = function(info) {
        var json = split(info);
        var gJson = json.graphJson;
        var mJson = json.mapJson;
        if (Object.keys(gJson).length !== 0) {
            this.parent.updateParameters.call(this, gJson);
        } 
        if (Object.keys(mJson).length !== 0) {
            if (mJson.legendOnPoint !== undefined) {
                legendOnPoint = mJson.legendOnPoint;
            }
            if (mJson.latitude !== undefined) {
                latitude = mJson.latitude;
            }
            if (mJson.longitude !== undefined) {
                longitude = mJson.longitude;
            }
            if (mJson.mapType !== undefined) {
                mapType = mJson.mapType;
            }
            if (mJson.zoom !== undefined) {
                zoom = mJson.zoom;
            }
            if (mJson.mapWidth !== undefined) {
                mapWidth = mJson.mapWidth;
            }
            if (mJson.mapHeight !== undefined) {
                mapHeight = mJson.mapHeight;
            }
        }
        if (info.flows !== undefined) {
            for (var i=0; i<info.flows.length; i++) {
                var newflow = new MapChartFlow(info.flows[i]);
                this.addFlow(info.flows[i].ID, newflow);
            }
        }
    };

    MapChart.prototype.addFlow = function(ID, newFlow) {
        if (newFlow instanceof MapChartFlow) {
            this.parent.addFlow.call(this, ID, newFlow);
        }
    };

    MapChart.prototype.initializeData = function(newData) {  //inizialization data of flows
        if (newData !== undefined) {
            var fList = this.parent.getFlowList();
            for (var i=0; i<newData.length; i++) {
                for (var j=0; j<fList.length; j++) {
                    if (fList[j].id === newData[i].ID) {
                        fList[j].flow.initializeData(newData[i]);
                    }
                }
            }
        }
    };

    // update data
    MapChart.prototype.inPlaceUpdate = function(newData) {
        if (newData !== undefined) {
            var fList = this.parent.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.inPlaceUpdate(newData);
                }
            }
        }
    };
    MapChart.prototype.streamUpdate = function(newData) {
        if (newData !== undefined) {
            var fList = this.parent.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.streamUpdate(newData);
                }
            }
        }
    };
    MapChart.prototype.deleteData = function(delData) {
        if (delData !== undefined){
            var fList = this.parent.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === delData.ID) {
                    fList[j].flow.deleteData(delData);
                }
            }
        }
    };

    // get method
    MapChart.prototype.getLegendOnPoint = function() {
        return legendOnPoint;
    };
    MapChart.prototype.getLatitude = function() {
        return latitude;
    };
    MapChart.prototype.getLongitude = function() {
        return longitude;
    };
    MapChart.prototype.getMapType = function() {
        return mapType;
    };
    MapChart.prototype.getZoom = function() {
        return zoom;
    };
    MapChart.prototype.getMapWidth = function() {
        return mapWidth;
    };
    MapChart.prototype.getMapHeight = function() {
        return mapHeight;
    };

    return MapChart;
}]);