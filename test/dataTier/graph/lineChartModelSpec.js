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

describe('LineChartModel', function() {

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
        assert.strictEqual(graph1._height, 500);
        assert.strictEqual(graph1._width, 500);
        assert.strictEqual(graph1._enableLegend, false);
        assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
        assert.deepEqual(graph1._xAxis.getProperties(), defaultAxis.getProperties());
        assert.deepEqual(graph1._yAxis.getProperties(), defaultAxis.getProperties());
        assert.strictEqual(graph1._backgroundColor, '#FFFFFF');
        assert.strictEqual(graph1._legendOnPoint, false);
        assert.strictEqual(graph1._viewFinder, false);
        assert.strictEqual(graph1._interpolation, 'linear');
        assert.strictEqual(graph1._horizontalGrid, true);
        assert.strictEqual(graph1._verticalGrid, true);
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
            legendOnPoint: 'abc',
            viewFinder: 12,
            interpolation: 123,
            horizontalGrid: 'abc',
            verticalGrid: 'def'
        });
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, '');
        assert.strictEqual(graph1._type, 'LineChart');
        assert.strictEqual(graph1._height, 500);
        assert.strictEqual(graph1._width, 500);
        assert.strictEqual(graph1._enableLegend, false);
        assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
        assert.deepEqual(graph1._xAxis.getProperties(), defaultAxis.getProperties());
        assert.deepEqual(graph1._yAxis.getProperties(), defaultAxis.getProperties());
        assert.strictEqual(graph1._backgroundColor, '#FFFFFF');
        assert.strictEqual(graph1._legendOnPoint, false);
        assert.strictEqual(graph1._viewFinder, false);
        assert.strictEqual(graph1._interpolation, 'linear');
        assert.strictEqual(graph1._horizontalGrid, true);
        assert.strictEqual(graph1._verticalGrid, true);
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
            legendOnPoint: true,
            viewFinder: true,
            interpolation: 'step',
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
        assert.strictEqual(graph1._legendOnPoint, true);
        assert.strictEqual(graph1._viewFinder, true);
        assert.strictEqual(graph1._interpolation, 'step');
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
                legendOnPoint: true,
                viewFinder: true,
                interpolation: 'step',
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
            assert.strictEqual(prop.legendOnPoint, true);
            assert.strictEqual(prop.viewFinder, true);
            assert.strictEqual(prop.interpolation, 'step');
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
                legendOnPoint: true,
                viewFinder: true,
                interpolation: 'step',
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
            assert.strictEqual(graph1._legendOnPoint, true);
            assert.strictEqual(graph1._viewFinder, true);
            assert.strictEqual(graph1._interpolation, 'step');
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
                legendOnPoint: 'abc',
                viewFinder: 12,
                interpolation: 123,
                horizontalGrid: 'abc',
                verticalGrid: 'def'
            };
            var graph1=new LineChartModel({ID: 'graph1'});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._ID, 'graph1');
            assert.strictEqual(graph1._title, '');
            assert.strictEqual(graph1._type, 'LineChart');
            assert.strictEqual(graph1._height, 500);
            assert.strictEqual(graph1._width, 500);
            assert.strictEqual(graph1._enableLegend, false);
            assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
	        assert.deepEqual(graph1._xAxis.getProperties(), defaultAxis.getProperties());
	        assert.deepEqual(graph1._yAxis.getProperties(), defaultAxis.getProperties());
	        assert.strictEqual(graph1._backgroundColor, '#FFFFFF');
            assert.strictEqual(graph1._legendOnPoint, false);
            assert.strictEqual(graph1._viewFinder, false);
            assert.strictEqual(graph1._interpolation, 'linear');
            assert.strictEqual(graph1._horizontalGrid, true);
            assert.strictEqual(graph1._verticalGrid, true);
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

    describe('#getData', function() {
        var flow1 = new LineChartFlowModel({ID: 'flow1'});
        var flow2 = new LineChartFlowModel({ID: 'flow2'});
        it('returns empty json if it has no flows', function() {
            var graph1=new LineChartModel({ID: 'graph1'});
            assert.strictEqual(graph1.getData().length, 0);
        });
       
        it('returns json with one graph', function() {
            var graph1=new LineChartModel({ID: 'graph1'});
            graph1.addFlow(flow1);
            var data=graph1.getData();
            assert.strictEqual(data.length, 1);
            assert.strictEqual(data[0].properties.ID, 'flow1');
        });
        it('returns json with two graphs', function() {
            var graph1=new LineChartModel({ID: 'graph1'});
            graph1.addFlow(flow1);
            graph1.addFlow(flow2);
            var data=graph1.getData();
            assert.strictEqual(data.length, 2);
            assert.strictEqual(data[0].properties.ID, 'flow1');
            assert.strictEqual(data[1].properties.ID, 'flow2');
        });
    });    

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
    describe('#updateRecord', function() {
        it('returns 221 if it doesn\'t find the wanted flow', function() {
            var graph1=new LineChartModel({ID: 'graph1'});
            graph1._flows[0] = new LineChartFlowModel({ID: 'flow1'});
            assert.strictEqual(graph1.updateRecord('flow4', 0, {temperature: 2}), 221);
        });
        it('returns 122 if it doesn\'t find the wanted record', function() {
            var graph1=new LineChartModel({ID: 'graph1'});
            graph1._flows[0] = new LineChartFlowModel({ID: 'flow1'});
            graph1._flows[0]._records[0]={temperature: 3};
            assert.strictEqual(graph1.updateRecord('flow1', 'asd', {temperature: 2}), 122);
        });
        it('returns 121 if no valid record is passed', function() {
            var graph1=new LineChartModel({ID: 'graph1'});
            graph1._flows[0] = new LineChartFlowModel({ID: 'flow1'});
            var ID=graph1._flows[0].addRecord({temperature: 3});
            assert.strictEqual(graph1.updateRecord('flow1', ID, null), 121);
        });
        it('returns true if passed valid parameters', function() {
            var graph1=new LineChartModel({ID: 'graph1'});
            graph1._flows[0] = new LineChartFlowModel({ID: 'flow1'});
            var ID=graph1._flows[0].addRecord({temperature: 3});
            assert.strictEqual(graph1.updateRecord('flow1', ID, {temperature: 2}), true);
        });
    });
    describe('#addRecord', function() {
        it('returns 221 if it doesn\'t find the wanted flow', function() {
            var graph1=new LineChartModel({ID: 'graph1'});
            graph1._flows[0] = new LineChartFlowModel({ID: 'flow1'});
            assert.strictEqual(graph1.addRecord('flow4', {temperature: 2}), 221);
        });
        it('returns 123 if no valid record is passed', function() {
            var graph1=new LineChartModel({ID: 'graph1'});
            graph1._flows[0] = new LineChartFlowModel({ID: 'flow1'});
            assert.strictEqual(graph1.addRecord('flow1', null), 123);
        });
        it('returns true if passed valid parameters', function() {
            var graph1=new LineChartModel({ID: 'graph1'});
            graph1._flows[0] = new LineChartFlowModel({ID: 'flow1'});
            assert.strictEqual(graph1.addRecord('flow1', {temperature: 2}).indexOf('flow1'), 0);
        });
    });
});