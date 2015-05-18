/*jshint node: true, -W106 */
'use strict';

/*
* Name : tableModelSpec.js
* Module : UnitTest
* Location : /test/dataTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-16   Samuele Zanella    Initial code
* =========================================================
*/

var TableModel = require('../../../lib/dataTier/graph/tableModel.js');
var LegendModel = require('../../../lib/dataTier/graph/legendModel.js');
var TableFlowModel = require('../../../lib/dataTier/flow/tableFlowModel.js');
var assert = require('assert');

describe('tableModel', function() {

    it('returns null when there are no params', function() {
        assert.strictEqual((new TableModel()).hasOwnProperty('_title'), false);
    });

    it('returns null when there is no valid ID in params', function() {
        assert.strictEqual((new TableModel({})).hasOwnProperty('_title'), false);
    });

    it('returns null when there is a empty ID in params', function() {
        assert.strictEqual((new TableModel({ID:' '})).hasOwnProperty('_title'), false);
    });
    
    var defaultLegend = new LegendModel();

    it('set default values to property not specified', function() {
        var graph1=new TableModel({ID:'graph1'});
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, '');
        assert.strictEqual(graph1._type, 'Table');
        assert.strictEqual(graph1._height, 400);
        assert.strictEqual(graph1._width, 500);
        assert.strictEqual(graph1._enableLegend, false);
        assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
        assert.strictEqual(graph1._sortable, false);
        assert.strictEqual(graph1._sort, null);
        assert.strictEqual(graph1._maxItemsPage, 10);
        assert.strictEqual(graph1._headers.length, 0);
        assert.strictEqual(graph1._addRowOn, 'bottom');
    });

    it('set default values to wrong properties', function() {
        var graph1=new TableModel({
            ID: 'graph1',
            title: 1,
            height: 'a',
            width: 'b',
            enableLegend: 'abc',
            legend: 'def',
            sortable: 123,
            sort: 456,
            maxItemsPage: -5,
            headers: 123,
            addRowOn: 'def'
        });
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, '');
        assert.strictEqual(graph1._type, 'Table');
        assert.strictEqual(graph1._height, 400);
        assert.strictEqual(graph1._width, 500);
        assert.strictEqual(graph1._enableLegend, false);
        assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
        assert.strictEqual(graph1._sortable, false);
        assert.strictEqual(graph1._sort, null);
        assert.strictEqual(graph1._maxItemsPage, 10);
        assert.strictEqual(graph1._headers.length, 0);
        assert.strictEqual(graph1._addRowOn, 'bottom');
    });

    var legend1 = new LegendModel();
    it('set param values to properties', function() {
        var graph1=new TableModel({
            ID: 'graph1',
            title: 'graph one',
            height: 200,
            width: 350,
            enableLegend: true,
            legend: legend1.getProperties(),
            sortable: true,
            sort: {column: 'col1', ordering:'DESC'},
            maxItemsPage: 15,
            headers: ['col1', 'col2'],
            addRowOn: 'top'
        });
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, 'graph one');
        assert.strictEqual(graph1._type, 'Table');
        assert.strictEqual(graph1._height, 200);
        assert.strictEqual(graph1._width, 350);
        assert.strictEqual(graph1._enableLegend, true);
        assert.deepEqual(graph1._legend.getProperties(), legend1.getProperties());
        assert.strictEqual(graph1._sortable, true);
        assert.deepEqual(graph1._sort, {column: 'col1', ordering:'DESC'});
        assert.strictEqual(graph1._maxItemsPage, 15);
        assert.strictEqual(graph1._headers[0], 'col1');
        assert.strictEqual(graph1._headers[1], 'col2');
        assert.strictEqual(graph1._addRowOn, 'top');
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
                sortable: true,
                sort: {column: 'col1', ordering:'DESC'},
                maxItemsPage: 15,
                headers: ['col1', 'col2'],
                addRowOn: 'top'
            };

            var graph1=new TableModel(properties);
            var prop=graph1.getProperties();
            assert.strictEqual(prop.ID, 'graph1');
            assert.strictEqual(prop.title, 'graph one');
            assert.strictEqual(prop.type, 'Table');
            assert.strictEqual(prop.height, 200);
            assert.strictEqual(prop.width, 350);
            assert.strictEqual(prop.enableLegend, true);
            assert.deepEqual(prop.legend, legend1.getProperties());
            assert.strictEqual(prop.sortable, true);
            assert.deepEqual(prop.sort, {column: 'col1', ordering:'DESC'});
            assert.strictEqual(prop.maxItemsPage, 15);
            assert.strictEqual(prop.headers[0], 'col1');
            assert.strictEqual(prop.headers[1], 'col2');
            assert.strictEqual(prop.addRowOn, 'top');
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
                sortable: true,
                sort: {column: 'col1', ordering:'DESC'},
                maxItemsPage: 15,
                headers: ['col1', 'col2'],
                addRowOn: 'top'
            };
            var graph1=new TableModel({ID: 'graph1'});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._ID, 'graph1');
            assert.strictEqual(graph1._title, 'graph one');
            assert.strictEqual(graph1._type, 'Table');
            assert.strictEqual(graph1._height, 200);
            assert.strictEqual(graph1._width, 350);
            assert.strictEqual(graph1._enableLegend, true);
            assert.deepEqual(graph1._legend.getProperties(), legend1.getProperties());
            assert.strictEqual(graph1._sortable, true);
            assert.deepEqual(graph1._sort, {column: 'col1', ordering:'DESC'});
            assert.strictEqual(graph1._maxItemsPage, 15);
            assert.strictEqual(graph1._headers[0], 'col1');
            assert.strictEqual(graph1._headers[1], 'col2');
            assert.strictEqual(graph1._addRowOn, 'top');
        });
        it('does not update the properties with wrong param', function() {
            var properties={
                ID: 'graph1',
                title: 1,
                height: 'a',
                width: 'b',
                enableLegend: 'abc',
                legend: 'def',
                sortable: 123,
                sort: 456,
                maxItemsPage: -5,
                headers: 123,
                addRowOn: 'def'
            };
            var graph1=new TableModel({ID: 'graph1'});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._ID, 'graph1');
            assert.strictEqual(graph1._title, '');
            assert.strictEqual(graph1._type, 'Table');
            assert.strictEqual(graph1._height, 400);
            assert.strictEqual(graph1._width, 500);
            assert.strictEqual(graph1._enableLegend, false);
            assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
        assert.strictEqual(graph1._sortable, false);
        assert.strictEqual(graph1._sort, null);
        assert.strictEqual(graph1._maxItemsPage, 10);
        assert.strictEqual(graph1._headers.length, 0);
        assert.strictEqual(graph1._addRowOn, 'bottom');
        });
    });
    describe('#addFlow', function() {
        var flow1 = new TableFlowModel();
        it('adds flow to the flows array', function() {
            var graph1=new TableModel({ID: 'graph1'});
            graph1.addFlow(flow1);
            assert.strictEqual(graph1._flows.length, 1);
        });
        it('does not add an invalid flow to the flows array', function() {
            var graph1=new TableModel({ID: 'graph1'});
            graph1.addFlow({});
            assert.strictEqual(graph1._flows.length, 0);
        });
    });
    function TFMMock(ID) {
        this._ID = ID;
    }
    TFMMock.prototype.getProperties = function() {
        return {ID: this._ID};
    };
    describe('#deleteFlow', function() {
        it('deletes the flow with the given ID', function() {
            var graph1=new TableModel({ID: 'graph1'});
            graph1._flows[0] = new TFMMock('flow1');
            graph1.deleteFlow('flow1');
            assert.strictEqual(graph1._flows.length, 0);
        });
        it('does not delete anything if the ID is not found', function() {
            var graph1=new TableModel({ID: 'graph1'});
            graph1._flows[0] = new TFMMock('flow1');
            graph1.deleteFlow('flow2');
            assert.strictEqual(graph1._flows.length, 1);
        });
    });
    describe('#deleteAllFlows', function() {
        it('deletes all the flows', function() {
            var graph1=new TableModel({ID: 'graph1'});
            graph1._flows[0] = new TFMMock('flow1');
            graph1._flows[1] = new TFMMock('flow2');
            graph1.deleteAllFlows();
            assert.strictEqual(graph1._flows.length, 0);
        });
    });
    describe('#updateRecord', function() {
        it('returns 241 if it doesn\'t find the wanted flow', function() {
            var graph1=new TableModel({ID: 'graph1'});
            graph1._flows[0] = new TableFlowModel({ID: 'flow1'});
            assert.strictEqual(graph1.updateRecord('flow4', 0, {temperature: 2}), 241);
        });
        it('returns 142 if it doesn\'t find the wanted record', function() {
            var graph1=new TableModel({ID: 'graph1'});
            graph1._flows[0] = new TableFlowModel({ID: 'flow1'});
            graph1._flows[0]._records[0]={temperature: 3};
            assert.strictEqual(graph1.updateRecord('flow1', 'asd', {temperature: 2}), 142);
        });
        it('returns 141 if no valid record is passed', function() {
            var graph1=new TableModel({ID: 'graph1'});
            graph1._flows[0] = new TableFlowModel({ID: 'flow1'});
            var ID=graph1._flows[0].addRecord({temperature: 3});
            assert.strictEqual(graph1.updateRecord('flow1', ID, null), 141);
        });
        it('returns true if passed valid parameters', function() {
            var graph1=new TableModel({ID: 'graph1'});
            graph1._flows[0] = new TableFlowModel({ID: 'flow1'});
            var ID=graph1._flows[0].addRecord({temperature: 3});
            assert.strictEqual(graph1.updateRecord('flow1', ID, {temperature: 2}), true);
        });
    });
    describe('#addRecord', function() {
        it('returns 241 if it doesn\'t find the wanted flow', function() {
            var graph1=new TableModel({ID: 'graph1'});
            graph1._flows[0] = new TableFlowModel({ID: 'flow1'});
            assert.strictEqual(graph1.addRecord('flow4', {temperature: 2}), 241);
        });
        it('returns 143 if no valid record is passed', function() {
            var graph1=new TableModel({ID: 'graph1'});
            graph1._flows[0] = new TableFlowModel({ID: 'flow1'});
            assert.strictEqual(graph1.addRecord('flow1', null), 143);
        });
        it('returns true if passed valid parameters', function() {
            var graph1=new TableModel({ID: 'graph1'});
            graph1._flows[0] = new TableFlowModel({ID: 'flow1'});
            assert.strictEqual(graph1.updateRecord('flow1', {temperature: 2}), true);
        });
    });
});