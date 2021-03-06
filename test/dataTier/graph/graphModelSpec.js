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
var LegendModel = require('../../../lib/dataTier/graph/legendModel.js');
var assert = require('assert');

describe('GraphModel', function() {

    it('returns null when there are no params', function() {
        assert.strictEqual((new GraphModel()).hasOwnProperty('_title'), false);
    });

    it('returns null when there is no valid ID in params', function() {
        assert.strictEqual((new GraphModel({})).hasOwnProperty('_title'), false);
    });

    it('returns null when there is a empty ID in params', function() {
        assert.strictEqual((new GraphModel({ID:' '})).hasOwnProperty('_title'), false);
    });
    
    var defaultLegend = new LegendModel();
    it('set default values to property not specified', function() {
        var graph1=new GraphModel({ID:'graph1'});
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, '');
        assert.strictEqual(graph1._type, '');
        assert.strictEqual(graph1._height, 500);
        assert.strictEqual(graph1._width, 500);
        assert.strictEqual(graph1._enableLegend, false);
        assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
    });

    it('set default values to wrong properties', function() {
        var graph1=new GraphModel({
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
        assert.strictEqual(graph1._height, 500);
        assert.strictEqual(graph1._width, 500);
        assert.strictEqual(graph1._enableLegend, false);
        assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
    });

    var legend1 = new LegendModel();
    it('set param values to properties', function() {
        var graph1=new GraphModel({
            ID: 'graph1',
            title: 'graph one',
            type: 'BarChart',
            height: 200,
            width: 350,
            enableLegend: true,
            legend: legend1.getProperties()
        });
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, 'graph one');
        assert.strictEqual(graph1._type, 'BarChart');
        assert.strictEqual(graph1._height, 200);
        assert.strictEqual(graph1._width, 350);
        assert.strictEqual(graph1._enableLegend, true);
        assert.deepEqual(graph1._legend.getProperties(), legend1.getProperties());
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
                legend: legend1.getProperties()
            };
            var graph1=new GraphModel(properties);
            var prop=graph1.getProperties();
            assert.strictEqual(prop.ID, 'graph1');
            assert.strictEqual(prop.title, 'graph one');
            assert.strictEqual(prop.type, 'BarChart');
            assert.strictEqual(prop.height, 200);
            assert.strictEqual(prop.width, 350);
            assert.strictEqual(prop.enableLegend, true);
            assert.deepEqual(prop.legend, legend1.getProperties());
        });
    });
    describe('#updateBaseProperties', function() {
        it('returns 252 if there are no params specified', function() {
            var graph1=new GraphModel({ID: 'graph1'});
            var updates=graph1.updateBaseProperties();
            assert.strictEqual(updates, 351);
        });
        it('updates and returns the properties passed as param', function() {
            var properties={
                ID: 'graph1',
                title: 'graph one',
                type: 'BarChart',
                height: 200,
                width: 350,
                enableLegend: true,
                legend: legend1.getProperties()
            };
            var graph1=new GraphModel({ID: 'graph1'});
            var updates=graph1.updateBaseProperties(properties);
            assert.strictEqual(graph1._ID, 'graph1');
            assert.strictEqual(graph1._title, 'graph one');
            assert.strictEqual(graph1._type, 'BarChart');
            assert.strictEqual(graph1._height, 200);
            assert.strictEqual(graph1._width, 350);
            assert.strictEqual(graph1._enableLegend, true);
            assert.deepEqual(graph1._legend.getProperties(), legend1.getProperties());

            assert.strictEqual(updates.title, 'graph one');
            assert.strictEqual(updates.type, 'BarChart');
            assert.strictEqual(updates.height, 200);
            assert.strictEqual(updates.width, 350);
            assert.strictEqual(updates.enableLegend, true);
            assert.deepEqual(updates.legend, legend1.getProperties());
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
            var graph1=new GraphModel({ID: 'graph1'});
            graph1.updateBaseProperties(properties);
            assert.strictEqual(graph1._ID, 'graph1');
            assert.strictEqual(graph1._title, '');
            assert.strictEqual(graph1._type, '');
            assert.strictEqual(graph1._height, 500);
            assert.strictEqual(graph1._width, 500);
            assert.strictEqual(graph1._enableLegend, false);
            assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
        });
    });

});