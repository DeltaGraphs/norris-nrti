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
* 0.3.0         2015-05-18  Francesco Rossetto          Modified general structure, some fixes
*
* 0.2.1         2015-05-15  Francesco Rossetto          Various fixes, insert inzializeData
*
* 0.2.0         2015-05-14  Maria Giovanna Chinellato   Add all methods and fix class
*
* 0.1.0         2015-05-14  Maria Giovanna Chinellato   Add all attributes, add methods split and updateParameter
*
* 0.0.1         2015-05-14  Maria Giovanna Chinellato   Initial code      
* ===============================================================================================================
*
*/

angular.module('app')
.factory('BarChart', ['Graph', 'Axis', 'BarChartFlow', function(Graph, Axis, BarChartFlow){

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
            if (graphJson.enabledLegend && json.legend !== undefined) {
                graphJson.legend = json.legend;
            }
        }
        if (json.horizontalGrid !== undefined) {
            graphJson.horizontalGrid = json.horizontalGrid;
        }
        if (json.verticalGrid !== undefined) {
            graphJson.verticalGrid = json.verticalGrid;
        }

        var barJson = {};
        if (json.axisX !== undefined) {
            barJson.axisX = json.axisX;
        }
        if (json.axisY !== undefined) {
            barJson.axisY = json.axisY;
        }
        if (json.barOrientation !== undefined) {
            barJson.barOrientation = json.barOrientation;
        }
        if (json.headers !== undefined) {
            barJson.headers = json.headers;
        }
        if (json.backgroundColor !== undefined) {
            barJson.backgroundColor = json.backgroundColor;
        }
        if (json.sortable !== undefined) {
            barJson.sortable = json.sortable;
        }
        if (json.barsGrouping !== undefined) {
            barJson.barsGrouping = json.barsGrouping;
        }
        if (json.legendOnPoint !== undefined) {
            barJson.legendOnPoint = json.legendOnPoint;
        }

        return {
            'graphJson' : graphJson,
            'barJson' : barJson
        };
    }
    //BarChart.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };


    function BarChart(info) {
        var axisX = null;
        var axisY = null;
        var barOrientation = 'vertical';
        var headers = [];
        var background = '#FFF';
        var sortable = true;
        var barsGrouping = 'grouped';
        var legendOnPoint = false;
    
    }

    this.prototype = Graph.instance(info);
    this.prototype.GUpdate = this.prototype.updateParameters;

    BarChart.prototype.updateParameters = function(info) {
        if (info !== undefined) {
            var json = split(info);
            var gJson = json.graphJson;
            var bJson = json.barJson;
            if (Object.keys(gJson).length !== 0) {
                this.GUpdate.call(this, gJson);
            } 
            if (Object.keys(bJson).length !== 0) {
                if (bJson.axisX !== undefined) {
                    axisX = new Axis(bJson.axisX);
                }
                if (bJson.axisY !== undefined) {
                    axisY = new Axis(bJson.axisY);
                }
                if (bJson.barOrientation !== undefined) {
                    barOrientation = bJson.barOrientation;
                }
                if (bJson.headers !== undefined) {
                    headers = bJson.headers;
                }
                if (bJson.backgroundColor !== undefined) {
                    background = bJson.backgroundColor;
                }
                if (bJson.sortable !== undefined) {
                    sortable = bJson.sortable;
                }
                if (bJson.barsGrouping !== undefined) {
                    barsGrouping = bJson.barsGrouping;
                }
                if (bJson.legendOnPoint !== undefined) {
                    legendOnPoint = bJson.legendOnPoint;
                }
            }
            if (info.flows !== undefined) {
                for (var i=0; i<info.flows.length; i++) {
                    var newflow = new BarChartFlow(info.flows[i]);
                    this.addFlow(info.flows[i].ID, newflow);
                }
            }
        }
        
    };

    BarChart.prototype.addFlow = function(newId, newFlow) {
        if (newFlow instanceof BarChartFlow) {
            this.parent.addFlow.call(this, newId, newFlow);
        }
    };

    BarChart.prototype.initializeData = function(newData) {  //inizialization data of flows
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
    BarChart.prototype.inPlaceUpdate = function(newData) {
        if (newData !== undefined) {
            var fList = this.parent.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.inPlaceUpdate(newData);
                }
            }
        }   
    };

    // get method
    BarChart.prototype.getX = function() {
        return axisX;
    };
    BarChart.prototype.getY = function() {
        return axisY;
    };
    BarChart.prototype.getBarOrientation = function() {
        return barOrientation;
    };
    BarChart.prototype.getHeaders = function() {
        return headers;
    };
    BarChart.prototype.getBackground = function() {
        return background;
    };
    BarChart.prototype.getSortable = function() {
        return sortable;
    };
    BarChart.prototype.getBarsGrouping = function() {
        return barsGrouping;
    };
    BarChart.prototype.getLegendOnPoint = function() {
        return legendOnPoint;
    };

    BarChart.instance = function(info) {
        return new BarChart(info);
    };

    return BarChart;

}]);