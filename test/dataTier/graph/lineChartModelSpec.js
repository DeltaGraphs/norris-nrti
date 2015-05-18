/*jshint node: true, -W106 */
'use strict';

/*
* Name : barChartModelSpec.js
* Module : UnitTest
* Location : /test/dataTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-15   Samuele Zanella    Initial code
* =========================================================
*/

var LineChartModel = require('../../../lib/dataTier/graph/lineChartModel.js');
var LegendModel = require('../../../lib/dataTier/graph/legendModel.js');
var LineChartFlowModel = require('../../../lib/dataTier/flow/lineChartFlowModel.js');
var AxisModel = require('../../../lib/dataTier/graph/axisModel.js');
var assert = require('assert');

describe('lineChartModel', function() {

    it('returns null when there are no params', function() {
        assert.strictEqual((new LineChartModel()).hasOwnProperty('_title'), false);
    });

    it('returns null when there is no valid ID in params', function() {
        assert.strictEqual((new LineChartModel({})).hasOwnProperty('_title'), false);
    });

    it('returns null when there is a empty ID in params', function() {
        assert.strictEqual((new LineChartModel({ID:' '})).hasOwnProperty('_title'), false);
    });
    
    var defaultLegend = new LegendModel();
    var defaultAxis = new AxisModel();
    it('set default values to property not specified', function() {
        var graph1=new LineChartModel({ID:'graph1'});
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, '');
        assert.strictEqual(graph1._type, 'LineChart');
        assert.strictEqual(graph1._height, 400);
        assert.strictEqual(graph1._width, 500);
        assert.strictEqual(graph1._enableLegend, false);
        assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
        assert.deepEqual(graph1._xAxis.getProperties(), defaultAxis.getProperties());
        assert.deepEqual(graph1._yAxis.getProperties(), defaultAxis.getProperties());
        assert.strictEqual(graph1._backgroundColor, '#FFFFFF');
        assert.strictEqual(graph1._scale, 'linear');
        assert.strictEqual(graph1._viewFinder, false);
        assert.strictEqual(graph1._horizontalGrid, false);
        assert.strictEqual(graph1._verticalGrid, false);
    });

    it('set default values to wrong properties', function() {
        var graph1=new LineChartModel({
            ID: 'graph1',
            title: 1,
            height: 'a',
            width: 'b',
            enableLegend: 'abc',
            legend: 'def',
            xAxis: true,
            yAxis: true,
            backgroundColor: 222,
            scale: 2,
            viewFinder: 12,
            horizontalGrid: 'abc',
            verticalGrid: 'def'
        });
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, '');
        assert.strictEqual(graph1._type, 'LineChart');
        assert.strictEqual(graph1._height, 400);
        assert.strictEqual(graph1._width, 500);
        assert.strictEqual(graph1._enableLegend, false);
        assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
        assert.deepEqual(graph1._xAxis.getProperties(), defaultAxis.getProperties());
        assert.deepEqual(graph1._yAxis.getProperties(), defaultAxis.getProperties());
        assert.strictEqual(graph1._backgroundColor, '#FFFFFF');
        assert.strictEqual(graph1._scale, 'linear');
        assert.strictEqual(graph1._viewFinder, false);
        assert.strictEqual(graph1._horizontalGrid, false);
        assert.strictEqual(graph1._verticalGrid, false);
    });

    var legend1 = new LegendModel();
    var xAxis1 = new AxisModel();
    var yAxis1 = new AxisModel();
    it('set param values to properties', function() {
        var graph1=new LineChartModel({
            ID: 'graph1',
            title: 'graph one',
            height: 200,
            width: 350,
            enableLegend: true,
            legend: legend1.getProperties(),
            xAxis: xAxis1.getProperties(),
            yAxis: yAxis1.getProperties(),
            backgroundColor: '#EEEEEE',
            scale: 'logarithmic',
            viewFinder: true,
            horizontalGrid: true,
            verticalGrid: true
        });
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, 'graph one');
        assert.strictEqual(graph1._type, 'LineChart');
        assert.strictEqual(graph1._height, 200);
        assert.strictEqual(graph1._width, 350);
        assert.strictEqual(graph1._enableLegend, true);
        assert.deepEqual(graph1._legend.getProperties(), legend1.getProperties());
        assert.deepEqual(graph1._xAxis.getProperties(), xAxis1.getProperties());
        assert.deepEqual(graph1._yAxis.getProperties(), yAxis1.getProperties());
        assert.strictEqual(graph1._backgroundColor, '#EEEEEE');
        assert.strictEqual(graph1._scale, 'logarithmic');
        assert.strictEqual(graph1._viewFinder, true);
        assert.strictEqual(graph1._horizontalGrid, true);
        assert.strictEqual(graph1._verticalGrid, true);
    });

    describe('#getProperties', function() {
        it('returns the JSON with the properties', function() {
            var properties={
	            ID: 'graph1',
	            title: 'graph one',
	            height: 200,
	            width: 350,
	            enableLegend: true,
	            legend: legend1.getProperties(),
	            xAxis: xAxis1.getProperties(),
	            yAxis: yAxis1.getProperties(),
	            backgroundColor: '#EEEEEE',
                scale: 'logarithmic',
                viewFinder: true,
                horizontalGrid: true,
                verticalGrid: true
            };
            var graph1=new LineChartModel(properties);
            var prop=graph1.getProperties();
            assert.strictEqual(prop.ID, 'graph1');
            assert.strictEqual(prop.title, 'graph one');
            assert.strictEqual(prop.type, 'LineChart');
            assert.strictEqual(prop.height, 200);
            assert.strictEqual(prop.width, 350);
            assert.strictEqual(prop.enableLegend, true);
            assert.deepEqual(prop.legend, legend1.getProperties());
            assert.deepEqual(prop.xAxis, xAxis1.getProperties());
            assert.deepEqual(prop.yAxis, yAxis1.getProperties());
            assert.strictEqual(prop.backgroundColor, '#EEEEEE');
            assert.strictEqual(prop.scale, 'logarithmic');
            assert.strictEqual(prop.viewFinder, true);
            assert.strictEqual(prop.horizontalGrid, true);
            assert.strictEqual(prop.verticalGrid, true);
        });
    });
    describe('#updateProperties', function() {
        it('updates the properties passed as param', function() {
            var properties={
                ID: 'graph1',
                title: 'graph one',
                height: 200,
                width: 350,
                enableLegend: true,
                legend: legend1.getProperties(),
	            xAxis: xAxis1.getProperties(),
	            yAxis: yAxis1.getProperties(),
	            backgroundColor: '#EEEEEE',
                scale: 'logarithmic',
                viewFinder: true,
                horizontalGrid: true,
                verticalGrid: true
            };
            var graph1=new LineChartModel({ID: 'graph1'});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._ID, 'graph1');
            assert.strictEqual(graph1._title, 'graph one');
            assert.strictEqual(graph1._type, 'LineChart');
            assert.strictEqual(graph1._height, 200);
            assert.strictEqual(graph1._width, 350);
            assert.strictEqual(graph1._enableLegend, true);
            assert.deepEqual(graph1._legend.getProperties(), legend1.getProperties());
	        assert.deepEqual(graph1._xAxis.getProperties(), xAxis1.getProperties());
	        assert.deepEqual(graph1._yAxis.getProperties(), yAxis1.getProperties());
            assert.strictEqual(graph1._backgroundColor, '#EEEEEE');
            assert.strictEqual(graph1._scale, 'logarithmic');
            assert.strictEqual(graph1._viewFinder, true);
            assert.strictEqual(graph1._horizontalGrid, true);
            assert.strictEqual(graph1._verticalGrid, true);
        });
        it('does not update the properties with wrong param', function() {
            var properties={
                ID: 'graph1',
                title: 1,
                height: 'a',
                width: 'b',
                enableLegend: 'abc',
                legend: 'def',
	            xAxis: true,
	            yAxis: true,
	            backgroundColor: 222,
                scale: 2,
                viewFinder: 12,
                horizontalGrid: 'abc',
                verticalGrid: 'def'
            };
            var graph1=new LineChartModel({ID: 'graph1'});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._ID, 'graph1');
            assert.strictEqual(graph1._title, '');
            assert.strictEqual(graph1._type, 'LineChart');
            assert.strictEqual(graph1._height, 400);
            assert.strictEqual(graph1._width, 500);
            assert.strictEqual(graph1._enableLegend, false);
            assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
	        assert.deepEqual(graph1._xAxis.getProperties(), defaultAxis.getProperties());
	        assert.deepEqual(graph1._yAxis.getProperties(), defaultAxis.getProperties());
	        assert.strictEqual(graph1._backgroundColor, '#FFFFFF');
            assert.strictEqual(graph1._scale, 'linear');
            assert.strictEqual(graph1._viewFinder, false);
            assert.strictEqual(graph1._horizontalGrid, false);
            assert.strictEqual(graph1._verticalGrid, false);
        });
    });
    describe('#addFlow', function() {
    	var flow1 = new LineChartFlowModel();
    	it('adds flow to the flows array', function() {
    		var graph1=new LineChartModel({ID: 'graph1'});
    		graph1.addFlow(flow1);
    		assert.strictEqual(graph1._flows.length, 1);
    	});
    	it('does not add an invalid flow to the flows array', function() {
    		var graph1=new LineChartModel({ID: 'graph1'});
    		graph1.addFlow({});
    		assert.strictEqual(graph1._flows.length, 0);
    	});
    });
    function LCFMMock(ID) {
    	this._ID = ID;
    }
    LCFMMock.prototype.getProperties = function() {
    	return {ID: this._ID};
    };
    describe('#deleteFlow', function() {
    	it('deletes the flow with the given ID', function() {
    		var graph1=new LineChartModel({ID: 'graph1'});
    		graph1._flows[0] = new LCFMMock('flow1');
    		graph1.deleteFlow('flow1');
    		assert.strictEqual(graph1._flows.length, 0);
    	});
    	it('does not delete anything if the ID is not found', function() {
    		var graph1=new LineChartModel({ID: 'graph1'});
    		graph1._flows[0] = new LCFMMock('flow1');
    		graph1.deleteFlow('flow2');
    		assert.strictEqual(graph1._flows.length, 1);
    	});
    });
    describe('#deleteAllFlows', function() {
    	it('deletes all the flows', function() {
    		var graph1=new LineChartModel({ID: 'graph1'});
    		graph1._flows[0] = new LCFMMock('flow1');
    		graph1._flows[1] = new LCFMMock('flow2');
    		graph1.deleteAllFlows();
    		assert.strictEqual(graph1._flows.length, 0);
    	});
    });
});