/*jshint node: true, -W106 */
'use strict';

/*
* Name : graphModelSpec.js
* Module : UnitTest
* Location : /test/dataTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-13   Matteo Furlan    Initial code
* =========================================================
*/

var GraphModel = require('../../../lib/dataTier/graph/graphModel.js');
var assert = require('assert');

GraphMock.prototype = GraphModel;
GraphMock.prototype.constructor = GraphMock;
GraphMock.prototype.parent = GraphModel;
function GraphMock(params) {
    this.parent.init.call(params);
}

describe('GraphModel', function() {
    it('returns null when there is no valid ID in params', function() {
        assert.strictEqual((new GraphMock({})).hasOwnProperty('_title'), false);
    });

    it('returns null when there is a empty ID in params', function() {
        assert.strictEqual((new GraphMock({ID:' '})).hasOwnProperty('_name'), false);
    });

    it('set default values to property not specified', function() {
        var graph1=new GraphMock({ID:'graph1'});
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, '');
        assert.strictEqual(graph1._type, '');
        assert.strictEqual(graph1._height, 0);
        assert.strictEqual(graph1._width, 0);
        assert.strictEqual(graph1._enableLegend, false);
        assert.strictEqual(graph1._legend, null);
    });

    it('set default values to wrong properties', function() {
        var graph1=new GraphMock({
            ID: 'graph1',
            title: 1,
            type: 1,
            height: 'a',
            width: 'b',
            enableLegend: 'abc',
            legend: 'def'
        });
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, '');
        assert.strictEqual(graph1._type, '');
        assert.strictEqual(graph1._height, 0);
        assert.strictEqual(graph1._width, 0);
        assert.strictEqual(graph1._enableLegend, false);
        assert.strictEqual(graph1._legend, null);
    });

    function LegendModel(prop, data){
        this.getData=function(){
            return data;
        };
        this.getProperties=function(){
            return prop;
        };
    }

    var legend1 = new LegendModel('testProp1', 'testData1');
    it('set param values to properties', function() {
        var graph1=new GraphMock({
            ID: 'graph1',
            title: 'graph one',
            type: 'BarChart',
            height: 200,
            width: 350,
            enableLegend: true,
            legend: legend1
        });
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, 'graph one');
        assert.strictEqual(graph1._type, '');
        assert.strictEqual(graph1._height, 0);
        assert.strictEqual(graph1._width, 0);
        assert.strictEqual(graph1._enableLegend, false);
        assert.strictEqual(graph1._legend, legend1);
    });

    describe('#getProperties', function() {
        it('returns the JSON with the properties', function() {
            var properties={
                ID: 'graph1',
                title: 'graph one',
                type: 'BarChart',
                height: 200,
                width: 350,
                enableLegend: true,
                legend: legend1
            };
            var graph1=new GraphMock(properties);
            var prop=graph1.getProperties();
            assert.strictEqual(prop.ID, 'graph1');
            assert.strictEqual(prop.title, 'graph one');
            assert.strictEqual(prop.type, 'BarChart');
            assert.strictEqual(prop.height, 200);
            assert.strictEqual(prop.width, 350);
            assert.strictEqual(prop.enableLegend, true);
            assert.strictEqual(prop.legend, legend1);
        });
    });
    describe('#updateProperties', function() {
        it('updates the properties passed as param', function() {
            var properties={
                ID: 'graph1',
                title: 'graph one',
                type: 'BarChart',
                height: 200,
                width: 350,
                enableLegend: true,
                legend: legend1
            };
            var graph1=new GraphMock({ID: 'graph1'});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._ID, 'graph1');
            assert.strictEqual(graph1._title, 'graph one');
            assert.strictEqual(graph1._type, 'BarChart');
            assert.strictEqual(graph1._height, 200);
            assert.strictEqual(graph1._width, 350);
            assert.strictEqual(graph1._enableLegend, true);
            assert.strictEqual(graph1._legend, legend1);
        });
        it('does not update the properties with wrong param', function() {
            var properties={
                ID: 'graph1',
                title: 1,
                type: 1,
                height: 'a',
                width: 'b',
                enableLegend: 'abc',
                legend: 'def'
            };
            var graph1=new GraphMock({ID: 'graph1'});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._ID, 'graph1');
            assert.strictEqual(graph1._title, '');
            assert.strictEqual(graph1._type, '');
            assert.strictEqual(graph1._height, 0);
            assert.strictEqual(graph1._width, 0);
            assert.strictEqual(graph1._enableLegend, false);
            assert.strictEqual(graph1._legend, null);
        });
    });

});