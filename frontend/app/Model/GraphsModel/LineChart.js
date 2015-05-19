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

angular.module('services')
.factory('LineChart', ['Graph', 'Axis', 'ViewFinder', 'LineChartFlow', function(Graph, Axis, ViewFinder, LineChartFlow){
    var axisX = null;
    var axisY = null;
    var viewFinder = null;
    var enabledViewFinder = false;
    var background = '#FFF';

    LineChart.prototype = Object.create(Graph.prototype);
    LineChart.prototype.constructor = LineChart;
    LineChart.prototype.parent = Graph.prototype;

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
		if (json.horizontalGrid  !== undefined) {
			graphJson.horizontalGrid = json.horizontalGrid;
		}
		if (json.verticalGrid !== undefined) {
			graphJson.verticalGrid = json.verticalGrid;
		}

		var lineJson = {};
		if (json.axisX !== undefined) {
			lineJson.axisX = json.axisX;
		}
		if (json.axisY !== undefined) {
			lineJson.axisY = json.axisY;
		}
		if (json.enabledViewFinder !== undefined) {
			lineJson.enabledViewFinder = json.enabledViewFinder;
			if (enabledViewFinder && json.viewFinder !== undefined) {
				lineJson.viewFinder = json.viewFinder;
			}
		}
		if (json.background !== undefined) {
			lineJson.background = json.background;
		}

		return {
			'graphJson' : graphJson,
			'lineJson' : lineJson
		};
	}

	//LineChart.prototype.test = function _Test(expressionStr) { return eval(expressionStr); };

    // create our new custom object that reuse the original object constructor
    function LineChart(info) {
        this.parent.constructor.call(this, info);
    }

    LineChart.prototype.updateParameters = function(info) {
        if (info !== undefined) {
            var json = split(info);
            var gJson = json.graphJson;
            var lJson = json.lineJson;
            if (Object.keys(gJson).length !== 0) {
                this.parent.updateParameters.call(this, gJson);
            }
            if (Object.keys(lJson).length !== 0) {
                if (lJson.axisX !== undefined) {
                    axisX = new Axis(lJson.axisX);
                }
                if (lJson.axisY !== undefined) {
                    axisY = new Axis(lJson.axisY);
                }
                if (lJson.enabledViewFinder !== undefined) {
                    enabledViewFinder = lJson.enabledViewFinder;
                    if (enabledViewFinder && lJson.viewFinder !== undefined) {
                        viewFinder = new ViewFinder(lJson.viewFinder);
                    }
                }
                if (lJson.background !== undefined) {
                    background = lJson.background;
                }
            }
            if (info.flows !== undefined) {
                for (var i=0; i<info.flows.length; i++) {
                    var newflow = new LineChartFlow(info.flows[i]);
                    this.prototype.addFlow(info.flows[i].ID, newflow);
                }
            }
        }
    };

    LineChart.prototype.addFlow = function(newId, newFlow) {
        if (newFlow instanceof LineChartFlow) {
            this.parent.addFlow.call(this, newId, newFlow);
        }
    };

    LineChart.prototype.initializeData = function(newData) {  //inizialization data of flows
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
    LineChart.prototype.inPlaceUpdate = function(newData) {
        if (newData !== undefined) {
            var fList = this.parent.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.inPlaceUpdate(newData);
                }
            }
        }
    };
    LineChart.prototype.streamUpdate = function(newData) {
        if (newData !== undefined) {
           var fList = this.parent.getFlowList();
            for (var j=0; j<fList.length; j++) {
                if (fList[j].id === newData.ID) {
                    fList[j].flow.streamUpdate(newData);
                }
            }
        }
    };

    // get method
    LineChart.prototype.getX = function() {
        return axisX;
    };
    LineChart.prototype.getY = function() {
        return axisY;
    };
    LineChart.prototype.getViewFinder = function() {
        if (enabledViewFinder) {
            return viewFinder;
        }
    };
    LineChart.prototype.getBackground = function() {
        return background;
    };

    return LineChart;
}]);