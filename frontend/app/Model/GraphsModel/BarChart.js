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

angular.module('services')
.factory('BarChart', ['Graph', 'Axis', 'BarChartFlow', function(Graph, Axis, BarChartFlow){

    var axisX = null;
    var axisY = null;
    var barOrientation = 'vertical';
    var background = '#FFF';
    var sortable = true;
    var barsGrouping = 'grouped';

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
        if (json.background !== undefined) {
            barJson.background = json.background;
        }
        if (json.sortable !== undefined) {
            barJson.sortable = json.sortable;
        }
        if (json.barsGrouping !== undefined) {
            barJson.barsGrouping = json.barsGrouping;
        }

        return {
            'graphJson' : graphJson,
            'barJson' : barJson
        };
    }

    //BarChart.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    // create our new custom object that reuse the original object constructor
    function BarChart(info) {
        if (info !== undefined) {
            var json = split(info);
            var gJson = json.graphJson;
            var bJson = json.barJson;
            if (Object.keys(gJson).length !== 0) {
                this.parent.updateParameters.call(this, gJson);
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
                if (bJson.background !== undefined) {
                    background = bJson.background;
                }
                if (bJson.sortable !== undefined) {
                    sortable = bJson.sortable;
                }
                if (bJson.barsGrouping !== undefined) {
                    barsGrouping = bJson.barsGrouping;
                }
            }
            if (info.flows !== undefined) {
                for (var i=0; i<info.flows.length; i++) {
                    var newflow = new BarChartFlow(info.flows[i]);
                    this.addFlow(info.flows[i].ID, newflow);
                }
            }
        }
    }

    BarChart.prototype = Object.create(Graph.prototype);
    BarChart.prototype.constructor = BarChart;
    BarChart.prototype.parent = Graph.prototype;

    // Now let's override our original updateParameters method
    BarChart.prototype = {

        updateParameters : function(info) {
            if (info !== undefined) {
                var json = split(info);
                var gJson = json.graphJson;
                var bJson = json.barJson;
                if (Object.keys(gJson).length !== 0) {
                    this.parent.updateParameters.call(this, gJson);
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
                    if (bJson.background !== undefined) {
                        background = bJson.background;
                    }
                    if (bJson.sortable !== undefined) {
                        sortable = bJson.sortable;
                    }
                    if (bJson.barsGrouping !== undefined) {
                        barsGrouping = bJson.barsGrouping;
                    }
                }
                if (info.flows !== undefined) {
                    for (var i=0; i<info.flows.length; i++) {
                        var newflow = new BarChartFlow(info.flows[i]);
                        this.prototype.addFlow(info.flows[i].ID, newflow);
                    }
                }
            }
            return this;
        },

        addFlow : function(newId, newFlow) {
            if (newFlow instanceof BarChartFlow) {
                this.parent.addFlow.call(this, newId, newFlow);
            }
            return this;
        },

        initializeData : function(newData) {  //inizialization data of flows
            if (newData !== undefined) {
                for (var i=0; i<newData.length; i++) {
                    this.parent.getFlowList()[newData[i].ID].inizializeData(newData[i]);
                }
            }   
            return this;
        },

        // update data
        inPlaceUpdate : function(newData) {
            if (newData !== undefined) {
                this.parent.getFlowList()[newData.ID].inPlaceUpdate(newData);
            }   
            return this;
        },

        // get method
        getX : function() {
            return axisX;
        },
        getY : function() {
            return axisY;
        },
        getBarOrientation : function() {
            return barOrientation;
        },
        getBackground : function() {
            return background;
        },
        getSortable : function() {
            return sortable;
        },
        getBarGrouping : function() {
            return barsGrouping;
        },

    };

    return BarChart;

}]);