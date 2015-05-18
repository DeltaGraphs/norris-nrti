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
* 0.0.1     2015-05-14   Samuele Zanella    Initial code
* =========================================================
*/

var BarChartModel = require('../../../lib/dataTier/graph/barChartModel.js');
var LegendModel = require('../../../lib/dataTier/graph/legendModel.js');
var BarChartFlowModel = require('../../../lib/dataTier/flow/barChartFlowModel.js');
var AxisModel = require('../../../lib/dataTier/graph/axisModel.js');
var assert = require('assert');

describe('barChartModel', function() {

    it('returns null when there are no params', function() {
        assert.strictEqual((new BarChartModel()).hasOwnProperty('_title'), false);
    });

    it('returns null when there is no valid ID in params', function() {
        assert.strictEqual((new BarChartModel({})).hasOwnProperty('_title'), false);
    });

    it('returns null when there is a empty ID in params', function() {
        assert.strictEqual((new BarChartModel({ID:' '})).hasOwnProperty('_title'), false);
    });
    
    var defaultLegend = new LegendModel();
    var defaultAxis = new AxisModel();
    it('set default values to property not specified', function() {
        var graph1=new BarChartModel({ID:'graph1'});
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, '');
        assert.strictEqual(graph1._type, 'BarChart');
        assert.strictEqual(graph1._height, 400);
        assert.strictEqual(graph1._width, 500);
        assert.strictEqual(graph1._enableLegend, false);
        assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
        assert.deepEqual(graph1._xAxis.getProperties(), defaultAxis.getProperties());
        assert.deepEqual(graph1._yAxis.getProperties(), defaultAxis.getProperties());
        assert.strictEqual(graph1._backgroundColor, '#FFFFFF');
        assert.strictEqual(graph1._legendOnPoint, false);
        assert.strictEqual(graph1._headers.length, 0);
        assert.strictEqual(graph1._barOrientation, 'V');
        assert.strictEqual(graph1._sortable, false);
    });

    it('set default values to wrong properties', function() {
        var graph1=new BarChartModel({
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
            headers: 'zzz',
            barOrientation: 2,
            sortable: 'abc'
        });
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, '');
        assert.strictEqual(graph1._type, 'BarChart');
        assert.strictEqual(graph1._height, 400);
        assert.strictEqual(graph1._width, 500);
        assert.strictEqual(graph1._enableLegend, false);
        assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
        assert.deepEqual(graph1._xAxis.getProperties(), defaultAxis.getProperties());
        assert.deepEqual(graph1._yAxis.getProperties(), defaultAxis.getProperties());
        assert.strictEqual(graph1._backgroundColor, '#FFFFFF');
        assert.strictEqual(graph1._legendOnPoint, false);
        assert.strictEqual(graph1._headers.length, 0);
        assert.strictEqual(graph1._barOrientation, 'V');
        assert.strictEqual(graph1._sortable, false);
    });

    var legend1 = new LegendModel();
    var xAxis1 = new AxisModel();
    var yAxis1 = new AxisModel();
    it('set param values to properties', function() {
        var graph1=new BarChartModel({
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
            headers: ['h1', 'h2'],
            barOrientation: 'V',
            sortable: true
        });
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, 'graph one');
        assert.strictEqual(graph1._type, 'BarChart');
        assert.strictEqual(graph1._height, 200);
        assert.strictEqual(graph1._width, 350);
        assert.strictEqual(graph1._enableLegend, true);
        assert.deepEqual(graph1._legend.getProperties(), legend1.getProperties());
        assert.deepEqual(graph1._xAxis.getProperties(), xAxis1.getProperties());
        assert.deepEqual(graph1._yAxis.getProperties(), yAxis1.getProperties());
        assert.strictEqual(graph1._backgroundColor, '#EEEEEE');
        assert.strictEqual(graph1._legendOnPoint, true);
        assert.strictEqual(graph1._headers[0], 'h1');
        assert.strictEqual(graph1._headers[1], 'h2');
        assert.strictEqual(graph1._barOrientation, 'V');
        assert.strictEqual(graph1._sortable, true);
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
                headers: ['h1', 'h2'],
                barOrientation: 'V',
                sortable: true
            };
            var graph1=new BarChartModel(properties);
            var prop=graph1.getProperties();
            assert.strictEqual(prop.ID, 'graph1');
            assert.strictEqual(prop.title, 'graph one');
            assert.strictEqual(prop.type, 'BarChart');
            assert.strictEqual(prop.height, 200);
            assert.strictEqual(prop.width, 350);
            assert.strictEqual(prop.enableLegend, true);
            assert.deepEqual(prop.legend, legend1.getProperties());
            assert.deepEqual(prop.xAxis, xAxis1.getProperties());
            assert.deepEqual(prop.yAxis, yAxis1.getProperties());
            assert.strictEqual(prop.backgroundColor, '#EEEEEE');
            assert.strictEqual(prop.legendOnPoint, true);
            assert.strictEqual(prop.headers[0], 'h1');
            assert.strictEqual(prop.headers[1], 'h2');
            assert.strictEqual(prop.barOrientation, 'V');
            assert.strictEqual(prop.sortable, true);
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
                headers: ['h1', 'h2'],
                barOrientation: 'V',
                sortable: true
            };
            var graph1=new BarChartModel({ID: 'graph1'});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._ID, 'graph1');
            assert.strictEqual(graph1._title, 'graph one');
            assert.strictEqual(graph1._type, 'BarChart');
            assert.strictEqual(graph1._height, 200);
            assert.strictEqual(graph1._width, 350);
            assert.strictEqual(graph1._enableLegend, true);
            assert.deepEqual(graph1._legend.getProperties(), legend1.getProperties());
            assert.deepEqual(graph1._xAxis.getProperties(), xAxis1.getProperties());
            assert.deepEqual(graph1._yAxis.getProperties(), yAxis1.getProperties());
            assert.strictEqual(graph1._backgroundColor, '#EEEEEE');
            assert.strictEqual(graph1._legendOnPoint, true);
            assert.strictEqual(graph1._headers[0], 'h1');
            assert.strictEqual(graph1._headers[1], 'h2');
            assert.strictEqual(graph1._barOrientation, 'V');
            assert.strictEqual(graph1._sortable, true);
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
                headers: 'zzz',
                barOrientation: 2,
                sortable: 'abc'
            };
            var graph1=new BarChartModel({ID: 'graph1'});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._ID, 'graph1');
            assert.strictEqual(graph1._title, '');
            assert.strictEqual(graph1._type, 'BarChart');
            assert.strictEqual(graph1._height, 400);
            assert.strictEqual(graph1._width, 500);
            assert.strictEqual(graph1._enableLegend, false);
            assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
            assert.deepEqual(graph1._xAxis.getProperties(), defaultAxis.getProperties());
            assert.deepEqual(graph1._yAxis.getProperties(), defaultAxis.getProperties());
            assert.strictEqual(graph1._backgroundColor, '#FFFFFF');
            assert.strictEqual(graph1._legendOnPoint, false);
            assert.strictEqual(graph1._headers.length, 0);
            assert.strictEqual(graph1._barOrientation, 'V');
            assert.strictEqual(graph1._sortable, false);
        });
    });
    describe('#addFlow', function() {
        var flow1 = new BarChartFlowModel({ID: 'flow1'});
        it('adds flow to the flows array', function() {
            var graph1=new BarChartModel({ID: 'graph1'});
            graph1.addFlow(flow1);
            assert.strictEqual(graph1._flows.length, 1);
        });
        it('does not add an invalid flow to the flows array', function() {
            var graph1=new BarChartModel({ID: 'graph1'});
            graph1.addFlow({});
            assert.strictEqual(graph1._flows.length, 0);
        });
    });
    function BCFMMock(ID) {
        this._ID = ID;
    }
    BCFMMock.prototype.getProperties = function() {
        return {ID: this._ID};
    };
    describe('#deleteFlow', function() {
        it('deletes the flow with the given ID', function() {
            var graph1=new BarChartModel({ID: 'graph1'});
            graph1._flows[0] = new BCFMMock('flow1');
            graph1.deleteFlow('flow1');
            assert.strictEqual(graph1._flows.length, 0);
        });
        it('does not delete anything if the ID is not found', function() {
            var graph1=new BarChartModel({ID: 'graph1'});
            graph1._flows[0] = new BCFMMock('flow1');
            graph1.deleteFlow('flow2');
            assert.strictEqual(graph1._flows.length, 1);
        });
    });
    describe('#deleteAllFlows', function() {
        it('deletes all the flows', function() {
            var graph1=new BarChartModel({ID: 'graph1'});
            graph1._flows[0] = new BCFMMock('flow1');
            graph1._flows[1] = new BCFMMock('flow2');
            graph1.deleteAllFlows();
            assert.strictEqual(graph1._flows.length, 0);
        });
    });
    describe('#updateRecord', function() {
        it('returns 211 if it doesn\'t find the wanted flow', function() {
            var graph1=new BarChartModel({ID: 'graph1'});
            graph1._flows[0] = new BarChartFlowModel('flow1');
            assert.strictEqual(graph1.updateRecord('flow4', 0, {temperature: 2}), 211);
        });
        it('returns 112 if it doesn\'t find the wanted record', function() {
            var graph1=new BarChartModel({ID: 'graph1'});
            graph1._flows[0] = new BarChartFlowModel('flow1');
            graph1._flows[0]._records[0] = {temperature: 3};
            assert.strictEqual(graph1.updateRecord('flow4', 1, {temperature: 2}), 112);
        });
        it('returns 111 if no valid record is passed', function() {
            var graph1=new BarChartModel({ID: 'graph1'});
            graph1._flows[0] = new BarChartFlowModel('flow1');
            graph1._flows[0]._records[0] = {temperature: 3};
            assert.strictEqual(graph1.updateRecord('flow4', 0, null), 111);
        });
        it('returns true if passed valid parameters', function() {
            var graph1=new BarChartModel({ID: 'graph1'});
            graph1._flows[0] = new BarChartFlowModel('flow1');
            graph1._flows[0]._records[0] = {temperature: 3};
            assert.strictEqual(graph1.updateRecord('flow4', 0, {temperature: 2}), true);
        });
    });
});