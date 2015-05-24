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
.factory('BarChartFactory', ['GraphFactory','AxisFactory', 'BarChartFlowFactory', function(GraphFactory, AxisFactory, BarChartFlowFactory){

    function BarChart(info) {
        this._axisX = null;
        this._axisY = null;
        this._barOrientation = 'vertical';
        this._headers = [];
        this._background = '#FFF';
        this._sortable = true;
        this._barsGrouping = 'grouped';
        this._legendOnPoint = false;
        this._graph = GraphFactory.build(info);
    }

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

    BarChart.prototype.updateParameters = function(info) {
        if (info !== undefined) {
            var json = split(info);
            var gJson = json.graphJson;
            var bJson = json.barJson;
            if (Object.keys(gJson).length !== 0) {
                this._graph.updateParameters(gJson);
            } 
            if (Object.keys(bJson).length !== 0) {
                if (bJson.axisX !== undefined) {
                    this._axisX = AxisFactory.build(bJson.axisX);
                }
                if (bJson.axisY !== undefined) {
                    this._axisY = AxisFactory.build(bJson.axisY);
                }
                if (bJson.barOrientation !== undefined) {
                    this._barOrientation = bJson.barOrientation;
                }
                if (bJson.headers !== undefined) {
                    this._headers = bJson.headers;
                }
                if (bJson.backgroundColor !== undefined) {
                    this._background = bJson.backgroundColor;
                }
                if (bJson.sortable !== undefined) {
                    this._sortable = bJson.sortable;
                }
                if (bJson.barsGrouping !== undefined) {
                    this._barsGrouping = bJson.barsGrouping;
                }
                if (bJson.legendOnPoint !== undefined) {
                    this._legendOnPoint = bJson.legendOnPoint;
                }
            }
            if (info.flows !== undefined) {
                console.log('info.flows !== undefined');
                for (var i=0; i<info.flows.length; i++) {
                    console.log('sono nel for');
                    var newflow = BarChartFlowFactory.build(info.flows[i]);
                    this.addFlow(info.flows[i].ID, newflow);
                }
            }
        }
        
    };

    BarChart.prototype.addFlow = function(newId, newFlow) {
        if (newFlow instanceof BarChartFlowFactory) {
            console.log('instanceof funziona');
            this._graph.addFlow(newId, newFlow);
        }
    };

    BarChart.prototype.initializeData = function(newData) {  //inizialization data of flows
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
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
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.inPlaceUpdate(newData);
                }
            }
        }   
    };

    // get method
    BarChart.prototype.getTitle = function() {
        return this._graph.getTitle();
    };
    BarChart.prototype.getHeight = function() {
        return this._graph.getHeight();
    };
    BarChart.prototype.getWidth = function() {
        return this._graph.getWidth();
    };
    BarChart.prototype.getLegend = function() {
        return this._graph.getLegend();
    };
    BarChart.prototype.getHGrid = function() {
        return this._graph.getHGrid();
    };
    BarChart.prototype.getVGrid = function() {
        return this._graph.getVGrid();
    };
    BarChart.prototype.getUrl = function() {
        return this._graph.getUrl();
    };
    BarChart.prototype.getFlowList = function() {
        return this._graph.getFlowList();
    };
    BarChart.prototype.getX = function() {
        return this._axisX;
    };
    BarChart.prototype.getY = function() {
        return this._axisY;
    };
    BarChart.prototype.getBarOrientation = function() {
        return this._barOrientation;
    };
    BarChart.prototype.getHeaders = function() {
        return this._headers;
    };
    BarChart.prototype.getBackground = function() {
        return this._background;
    };
    BarChart.prototype.getSortable = function() {
        return this._sortable;
    };
    BarChart.prototype.getBarsGrouping = function() {
        return this._barsGrouping;
    };
    BarChart.prototype.getLegendOnPoint = function() {
        return this._legendOnPoint;
    };

    function BarChartFactory(){}

    BarChartFactory.build = function(info) {
        return new BarChart(info);
    };

    return BarChartFactory;

}]);