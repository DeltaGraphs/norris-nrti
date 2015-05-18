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

var MapChartModel = require('../../../lib/dataTier/graph/mapChartModel.js');
var LegendModel = require('../../../lib/dataTier/graph/legendModel.js');
var MapChartFlowModel = require('../../../lib/dataTier/flow/mapChartFlowModel.js');
var assert = require('assert');

describe('mapChartModel', function() {

    it('returns null when there are no params', function() {
        assert.strictEqual((new MapChartModel()).hasOwnProperty('_title'), false);
    });

    it('returns null when there is no valid ID in params', function() {
        assert.strictEqual((new MapChartModel({})).hasOwnProperty('_title'), false);
    });

    it('returns null when there is a empty ID in params', function() {
        assert.strictEqual((new MapChartModel({ID:' '})).hasOwnProperty('_title'), false);
    });
    
    var defaultLegend = new LegendModel();

    it('set default values to property not specified', function() {
        var graph1=new MapChartModel({ID:'graph1'});
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, '');
        assert.strictEqual(graph1._type, 'MapChart');
        assert.strictEqual(graph1._height, 400);
        assert.strictEqual(graph1._width, 500);
        assert.strictEqual(graph1._enableLegend, false);
        assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
        assert.strictEqual(graph1._latitude, '');
        assert.strictEqual(graph1._longitude, '');
        assert.strictEqual(graph1._mapType, 'roadmap');
        assert.strictEqual(graph1._legendOnPoint, false);
        assert.strictEqual(graph1._mapWidth, 3000);
        assert.strictEqual(graph1._mapHeight, 2000);
    });

    it('set default values to wrong properties', function() {
        var graph1=new MapChartModel({
            ID: 'graph1',
            title: 1,
            height: 'a',
            width: 'b',
            enableLegend: 'abc',
            legend: 'def',
            latitude: 123,
            longitude: 456,
            mapType: 123,
            legendOnPoint: 'abc',
            mapWidth: 'abc',
            mapHeight: 'def'
        });
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, '');
        assert.strictEqual(graph1._type, 'MapChart');
        assert.strictEqual(graph1._height, 400);
        assert.strictEqual(graph1._width, 500);
        assert.strictEqual(graph1._enableLegend, false);
        assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
        assert.strictEqual(graph1._latitude, '');
        assert.strictEqual(graph1._longitude, '');
        assert.strictEqual(graph1._mapType, 'roadmap');
        assert.strictEqual(graph1._legendOnPoint, false);
        assert.strictEqual(graph1._mapWidth, 3000);
        assert.strictEqual(graph1._mapHeight, 2000);
    });

    var legend1 = new LegendModel();
    it('set param values to properties', function() {
        var graph1=new MapChartModel({
            ID: 'graph1',
            title: 'graph one',
            height: 200,
            width: 350,
            enableLegend: true,
            legend: legend1.getProperties(),
            latitude: '33',
            longitude: '44',
            mapType: 'satellite',
            legendOnPoint: true,
            mapWidth: 1500,
            mapHeight: 1000
        });
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, 'graph one');
        assert.strictEqual(graph1._type, 'MapChart');
        assert.strictEqual(graph1._height, 200);
        assert.strictEqual(graph1._width, 350);
        assert.strictEqual(graph1._enableLegend, true);
        assert.deepEqual(graph1._legend.getProperties(), legend1.getProperties());
        assert.strictEqual(graph1._latitude, '33');
        assert.strictEqual(graph1._longitude, '44');
        assert.strictEqual(graph1._mapType, 'satellite');
        assert.strictEqual(graph1._legendOnPoint, true);
        assert.strictEqual(graph1._mapWidth, 1500);
        assert.strictEqual(graph1._mapHeight, 1000);
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
                latitude: '33',
                longitude: '44',
                mapType: 'satellite',
                legendOnPoint: true,
                mapWidth: 1500,
                mapHeight: 1000
            };
            var graph1=new MapChartModel(properties);
            var prop=graph1.getProperties();
            assert.strictEqual(prop.ID, 'graph1');
            assert.strictEqual(prop.title, 'graph one');
            assert.strictEqual(prop.type, 'MapChart');
            assert.strictEqual(prop.height, 200);
            assert.strictEqual(prop.width, 350);
            assert.strictEqual(prop.enableLegend, true);
            assert.deepEqual(prop.legend, legend1.getProperties());
            assert.strictEqual(prop.latitude, '33');
            assert.strictEqual(prop.longitude, '44');
            assert.strictEqual(prop.mapType, 'satellite');
            assert.strictEqual(prop.legendOnPoint, true);
            assert.strictEqual(prop.mapWidth, 1500);
            assert.strictEqual(prop.mapHeight, 1000);
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
                latitude: '33',
                longitude: '44',
                mapType: 'satellite',
                legendOnPoint: true,
                mapWidth: 1500,
                mapHeight: 1000
            };
            var graph1=new MapChartModel({ID: 'graph1'});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._ID, 'graph1');
            assert.strictEqual(graph1._title, 'graph one');
            assert.strictEqual(graph1._type, 'MapChart');
            assert.strictEqual(graph1._height, 200);
            assert.strictEqual(graph1._width, 350);
            assert.strictEqual(graph1._enableLegend, true);
            assert.deepEqual(graph1._legend.getProperties(), legend1.getProperties());
            assert.strictEqual(graph1._latitude, '33');
            assert.strictEqual(graph1._longitude, '44');
            assert.strictEqual(graph1._mapType, 'satellite');
            assert.strictEqual(graph1._legendOnPoint, true);
            assert.strictEqual(graph1._mapWidth, 1500);
            assert.strictEqual(graph1._mapHeight, 1000);
        });
        it('does not update the properties with wrong param', function() {
            var properties={
                ID: 'graph1',
                title: 1,
                height: 'a',
                width: 'b',
                enableLegend: 'abc',
                legend: 'def',
                latitude: 123,
                longitude: 456,
                mapType: 123,
                legendOnPoint: 'abc',
                mapWidth: 'abc',
                mapHeight: 'def'
            };
            var graph1=new MapChartModel({ID: 'graph1'});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._ID, 'graph1');
            assert.strictEqual(graph1._title, '');
            assert.strictEqual(graph1._type, 'MapChart');
            assert.strictEqual(graph1._height, 400);
            assert.strictEqual(graph1._width, 500);
            assert.strictEqual(graph1._enableLegend, false);
            assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
            assert.strictEqual(graph1._latitude, '');
            assert.strictEqual(graph1._longitude, '');
            assert.strictEqual(graph1._mapType, 'roadmap');
            assert.strictEqual(graph1._legendOnPoint, false);
            assert.strictEqual(graph1._mapWidth, 3000);
            assert.strictEqual(graph1._mapHeight, 2000);
        });
    });
    describe('#addFlow', function() {
    	var flow1 = new MapChartFlowModel();
    	it('adds flow to the flows array', function() {
    		var graph1=new MapChartModel({ID: 'graph1'});
    		graph1.addFlow(flow1);
    		assert.strictEqual(graph1._flows.length, 1);
    	});
    	it('does not add an invalid flow to the flows array', function() {
    		var graph1=new MapChartModel({ID: 'graph1'});
    		graph1.addFlow({});
    		assert.strictEqual(graph1._flows.length, 0);
    	});
    });
    function MCFMMock(ID) {
    	this._ID = ID;
    }
    MCFMMock.prototype.getProperties = function() {
    	return {ID: this._ID};
    };
    describe('#deleteFlow', function() {
    	it('deletes the flow with the given ID', function() {
    		var graph1=new MapChartModel({ID: 'graph1'});
    		graph1._flows[0] = new MCFMMock('flow1');
    		graph1.deleteFlow('flow1');
    		assert.strictEqual(graph1._flows.length, 0);
    	});
    	it('does not delete anything if the ID is not found', function() {
    		var graph1=new MapChartModel({ID: 'graph1'});
    		graph1._flows[0] = new MCFMMock('flow1');
    		graph1.deleteFlow('flow2');
    		assert.strictEqual(graph1._flows.length, 1);
    	});
    });
    describe('#deleteAllFlows', function() {
    	it('deletes all the flows', function() {
    		var graph1=new MapChartModel({ID: 'graph1'});
    		graph1._flows[0] = new MCFMMock('flow1');
    		graph1._flows[1] = new MCFMMock('flow2');
    		graph1.deleteAllFlows();
    		assert.strictEqual(graph1._flows.length, 0);
    	});
    });
    describe('#updateRecord', function() {
        it('returns 231 if it doesn\'t find the wanted flow', function() {
            var graph1=new MapChartModel({ID: 'graph1'});
            graph1._flows[0] = new MapChartFlowModel({ID: 'flow1'});
            assert.strictEqual(graph1.updateRecord('flow4', 0, {temperature: 2}), 231);
        });
        it('returns 132 if it doesn\'t find the wanted record', function() {
            var graph1=new MapChartModel({ID: 'graph1'});
            graph1._flows[0] = new MapChartFlowModel({ID: 'flow1'});
            graph1._flows[0]._records[0]={temperature: 3};
            assert.strictEqual(graph1.updateRecord('flow1', 'asd', {temperature: 2}), 132);
        });
        it('returns 131 if no valid record is passed', function() {
            var graph1=new MapChartModel({ID: 'graph1'});
            graph1._flows[0] = new MapChartFlowModel({ID: 'flow1'});
            var ID=graph1._flows[0].addRecord({temperature: 3});
            assert.strictEqual(graph1.updateRecord('flow1', ID, null), 131);
        });
        it('returns true if passed valid parameters', function() {
            var graph1=new MapChartModel({ID: 'graph1'});
            graph1._flows[0] = new MapChartFlowModel({ID: 'flow1'});
            var ID=graph1._flows[0].addRecord({temperature: 3});
            assert.strictEqual(graph1.updateRecord('flow1', ID, {temperature: 2}), true);
        });
    });
    describe('#addRecord', function() {
        it('returns 231 if it doesn\'t find the wanted flow', function() {
            var graph1=new MapChartModel({ID: 'graph1'});
            graph1._flows[0] = new MapChartFlowModel({ID: 'flow1'});
            assert.strictEqual(graph1.addRecord('flow4', {temperature: 2}), 231);
        });
        it('returns 133 if no valid record is passed', function() {
            var graph1=new MapChartModel({ID: 'graph1'});
            graph1._flows[0] = new MapChartFlowModel({ID: 'flow1'});
            assert.strictEqual(graph1.addRecord('flow1', null), 133);
        });
        it('returns true if passed valid parameters', function() {
            var graph1=new MapChartModel({ID: 'graph1'});
            graph1._flows[0] = new MapChartFlowModel({ID: 'flow1'});
            assert.strictEqual(graph1.addRecord('flow1', {temperature: 2}).indexOf('flow1'), 0);
        });
    });
    describe('#deleteRecord', function() {
        it('returns 231 if it doesn\'t find the wanted flow', function() {
            var graph1=new MapChartModel({ID: 'graph1'});
            graph1._flows[0] = new MapChartFlowModel({ID: 'flow1'});
            var ID=graph1._flows[0].addRecord({temperature: 3});
            assert.strictEqual(graph1.deleteRecord('flow4', ID), 231);
        });
        it('returns 134 if no valid ID is passed', function() {
            var graph1=new MapChartModel({ID: 'graph1'});
            graph1._flows[0] = new MapChartFlowModel({ID: 'flow1'});
            assert.strictEqual(graph1.deleteRecord('flow1', null), 134);
        });
        it('returns true if passed valid parameters', function() {
            var graph1=new MapChartModel({ID: 'graph1'});
            graph1._flows[0] = new MapChartFlowModel({ID: 'flow1'});
            graph1._flows[0].addRecord({temperature: 3});
            var ID=graph1._flows[0].addRecord({temperature: 4});
            assert.strictEqual(graph1.deleteRecord('flow1', ID), true);
        });
    });
});