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

    var latitude = 45.4113311;
    var longitude = 11.8876318;
    var scale = 1000;
    var mapType = 'terrain';
    var zoom = true;

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
        if (json.enabledLegend !== undefined) {
            graphJson.enabledLegend = json.enabledLegend;
            if (json.legend !== undefined && graphJson.enabledLegend !== false) {
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
        if (json.latitude !== undefined) {
            mapJson.latitude = json.latitude;
        }
        if (json.longitude !== undefined) {
            mapJson.longitude = json.longitude;
        }
        if (json.scale !== undefined) {
            mapJson.scale = json.scale;
        }
        if (json.mapType !== undefined) {
            mapJson.mapType = json.mapType;
        }
        if (json.zoom !== undefined) {
            mapJson.zoom = json.zoom;
        }

        return {
            'graphJson' : graphJson,
            'mapJson' : mapJson
        };
    }

    //MapChart.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    // create our new custom object that reuse the original object constructor
    function MapChart(info) {
        if (info !== undefined) {
            var json = split(info);
            var fJson = json.graphJson;
            var mJson = json.mapJson;

            if (Object.keys(fJson).length !== 0) {
                this.parent.constructor.call(this, fJson);
            }

            if (Object.keys(mJson).length !== 0) {
                if (mJson.latitude !== undefined) {
                    latitude = mJson.latitude;
                }
                if (mJson.longitude !== undefined) {
                    longitude = mJson.longitude;
                }
                if (mJson.scale !== undefined) {
                    scale = mJson.scale;
                }
                if (mJson.mapType !== undefined) {
                    mapType = mJson.mapType;
                }
                if (mJson.zoom !== undefined) {
                    zoom = mJson.zoom;
                }
            }
        }
    }

    // reuse the original object prototype
    MapChart.prototype = Object.create(Graph.prototype);
    MapChart.prototype.constructor = MapChart;
    MapChart.prototype.parent = Graph.prototype;

    // Now let's override our original updateParameters method
    MapChart.prototype = {
        updateParameters : function(info) {
            var json = split(info);
            var gJson = json.graphJson;
            var mJson = json.mapJson;
            if (Object.keys(gJson).length !== 0) {
                Graph.apply(this, gJson);
            } 
            if (Object.keys(mJson).length !== 0) {
                if (mJson.latitude !== undefined) {
                    latitude = mJson.latitude;
                }
                if (mJson.longitude !== undefined) {
                    longitude = mJson.longitude;
                }
                if (mJson.scale !== undefined) {
                    scale = mJson.scale;
                }
                if (mJson.mapType !== undefined) {
                    mapType = mJson.mapType;
                }
                if (mJson.zoom !== undefined) {
                    zoom = mJson.zoom;
                }
            }
            if (info.flows) {
                for (var i=0; i<info.flows.length; i++) {
                    var newflow = new MapChartFlow(info.flows[i]);
                    this.prototype.addFlow(info.flows[i].ID, newflow);
                }
            }
        },

        addFlow : function(ID, newFlow) {
            if (newFlow instanceof MapChartFlow) {
                this.parent.addFlow.call(this, ID, newFlow);
            }
        },

        initializeData : function(data) {  //inizialization data of flows
            for (var i=0; i<data.length; i++) {
                this.parent.getFlowList()[data[i].ID].inizializeData(data[i].records);
            }
        },

        // update data
        inPlaceUpdate : function(data) {
            this.parent.getFlowList()[data.ID].inPlaceUpdate(data.records);
        },
        streamUpdate : function(data) {
            this.parent.getFlowList()[data.ID].streamUpdate(data.records);
        },
        movieUpdate : function(data) {
            this.parent.getFlowList()[data.ID].movieUpdate(data.records);
        },

        // get method
        getLatitude : function() {
            return latitude;
        },
        getLongitude : function() {
            return longitude;
        },
        getBarOrientation : function() {
            return scale;
        },
        getBackground : function() {
            return mapType;
        },
        getSortable : function() {
            return zoom;
        }
    };

    return MapChart;
}]);