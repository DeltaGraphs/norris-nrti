/*jshint node: true */
'use strict';

/*
* Name :  LineChart.js
* Module : FrontEnd::Model::GraphsModel
* Location : /frontend/app/Model/GraphsModel
*
* History :
* Version       Date        Programmer                  Description
* ===============================================================================================================
* 0.3.0         2015-05-18  Francesco Rossetto          Modified general structure, some fixes
*
* 0.2.2			2015-05-15	Francesco Rossetto			Various fixes, insert inzializeData
*
* 0.2.1         2015-05-15  Maria Giovanna Chinellato	Fix all methods
*
* 0.2.0         2015-05-13  Maria Giovanna Chinellato	Add all methods
*
* 0.1.0         2015-05-13  Francesco Rossetto   		Add all attributes and some methods
*
* 0.0.1         2015-05-13  Francesco Rossetto			Initial code      
* ===============================================================================================================
*
*/

angular.module('norris-nrti')
.factory('LineChartFactory', ['GraphFactory', 'AxisFactory', 'LineChartFlowFactory', function(GraphFactory, AxisFactory, LineChartFlowFactory){

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
		}
        if (json.legend !== undefined) {
            graphJson.legend = json.legend;
        }
		if (json.horizontalGrid  !== undefined) {
			graphJson.horizontalGrid = json.horizontalGrid;
		}
		if (json.verticalGrid !== undefined) {
			graphJson.verticalGrid = json.verticalGrid;
		}

		var lineJson = {};
        if (json.legendOnPoint !== undefined) {
            lineJson.legendOnPoint = json.legendOnPoint;
        }
		if (json.axisX !== undefined) {
			lineJson.axisX = json.axisX;
		}
		if (json.axisY !== undefined) {
			lineJson.axisY = json.axisY;
		}
		if (json.viewFinder !== undefined) {
			lineJson.viewFinder = json.viewFinder;
		}
		if (json.backgroundColor !== undefined) {
			lineJson.backgroundColor = json.backgroundColor;
		}
        if (json.interpolation !== undefined) {
            lineJson.interpolation = json.interpolation;
        }

		return {
			'graphJson' : graphJson,
			'lineJson' : lineJson
		};
	}

	//LineChart.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    // create our new custom object that reuse the original object constructor
    function LineChart(info) {
        this._legendOnPoint = false;
        this._axisX = null;
        this._axisY = null;
        this._viewFinder = false;
        this._backgroundColor = '#FFF';
        this._interpolation = 'linear';
        this._graph = GraphFactory.build(info);
    }

    LineChart.prototype.updateParameters = function(info) {
        if (info !== undefined) {
            var json = split(info);
            var gJson = json.graphJson;
            var lJson = json.lineJson;
            if (Object.keys(gJson).length !== 0) {
                this._graph.updateParameters(gJson);
            }
            if (Object.keys(lJson).length !== 0) {
                if (lJson.legendOnPoint !== undefined) {
                    this._legendOnPoint = lJson.legendOnPoint;
                }
                if (lJson.axisX !== undefined) {
                    this._axisX = AxisFactory.build(lJson.axisX);
                }
                if (lJson.axisY !== undefined) {
                    this._axisY = AxisFactory.build(lJson.axisY);
                }
                if (lJson.viewFinder !== undefined) {
                    this._viewFinder = lJson.viewFinder;
                }
                if (lJson.backgroundColor !== undefined) {
                    this._backgroundColor = lJson.backgroundColor;
                }
                if (lJson.interpolation !== undefined) {
                    this._interpolation = lJson.interpolation;
                }
            }
            if (info.flows !== undefined) {
                for (var i=0; i<info.flows.length; i++) {
                    var newflow = LineChartFlowFactory.build(info.flows[i]);
                    this.addFlow(info.flows[i].ID, newflow);
                }
            }
        }
    };

    LineChart.prototype.addFlow = function(newId, newFlow) {
        if (newFlow.constructor.name === 'LineChartFlow') {
            this._graph.addFlow(newId, newFlow);
        }
    };
    LineChart.prototype.deleteFlow = function(ID) {
        this._graph.deleteFlow(ID);
    };
    LineChart.prototype.replaceData = function(newData){
        this._graph.replaceData(newData);
    };

    LineChart.prototype.initializeData = function(newData) {  //inizialization data of flows
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
    LineChart.prototype.inPlaceUpdate = function(newData) {
        if (newData !== undefined) {
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.inPlaceUpdate(newData);
                }
            }
        }
    };
    LineChart.prototype.streamUpdate = function(newData) {
        if (newData !== undefined) {
           var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.streamUpdate(newData);
                }
            }
        }
    };
    LineChart.prototype.deleteData = function(delData) {
        if (delData !== undefined){
            var fList = this._graph.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === delData.ID) {
                    fList[j].flow.deleteData(delData);
                }
            }
        }
    };

    LineChart.prototype.getTitle = function() {
        return this._graph.getTitle();
    };
    LineChart.prototype.getHeight = function() {
        return this._graph.getHeight();
    };
    LineChart.prototype.getWidth = function() {
        return this._graph.getWidth();
    };
    LineChart.prototype.getLegend = function() {
        return this._graph.getLegend();
    };
    LineChart.prototype.getHGrid = function() {
        return this._graph.getHGrid();
    };
    LineChart.prototype.getVGrid = function() {
        return this._graph.getVGrid();
    };
    LineChart.prototype.getUrl = function() {
        return this._graph.getUrl();
    };
    LineChart.prototype.getFlowList = function() {
        return this._graph.getFlowList();
    };
    LineChart.prototype.getX = function() {
        return this._axisX;
    };
    LineChart.prototype.getY = function() {
        return this._axisY;
    };
    LineChart.prototype.getViewFinder = function() {
        return this._viewFinder;
    };
    LineChart.prototype.getBackground = function() {
        return this._backgroundColor;
    };
    LineChart.prototype.getLegendOnPoint = function() {
        return this._legendOnPoint;
    };
    LineChart.prototype.getInterpolation = function() {
        return this._interpolation;
    };

    function LineChartFactory(){}

    LineChartFactory.build = function(info) {
        return new LineChart(info);
    };

    return LineChartFactory;
}]);