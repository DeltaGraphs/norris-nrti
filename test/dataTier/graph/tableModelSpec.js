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

describe('TableModel', function() {

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
    var defaultAppearance = {
        horizontalGrid: {'color': '#000000','width': 1},
        verticalGrid: {'color': '#000000','width': 1},
        rowEven: {
            textColor: [],
            backgroundColor: []
        },
        rowOdd: {
            textColor: [],
            backgroundColor: []
        },
        headers: {
            textColor: [],
            backgroundColor: []         
        }
    };
    var default2colAppearance = {
        horizontalGrid: {'color': '#000000','width': 1},
        verticalGrid: {'color': '#000000','width': 1},
        rowEven: {
            textColor: ['#000000', '#000000'],
            backgroundColor: ['#FFFFFF', '#FFFFFF']
        },
        rowOdd: {
            textColor: ['#000000', '#000000'],
            backgroundColor: ['#FFFFFF', '#FFFFFF']
        },
        headers: {
            textColor: ['#000000', '#000000'],
            backgroundColor: ['#FFFFFF', '#FFFFFF']      
        }
    };

    var example2colAppearance = {
        horizontalGrid: {'color': '#111111','width': 1},
        verticalGrid: {'color': '#111111','width': 1},
        rowEven: {
            textColor: ['#222222', '#333333'],
            backgroundColor: ['#444444', '#555555']
        },
        rowOdd: {
            textColor: ['#555555', '#666666'],
            backgroundColor: ['#777777', '#888888']
        },
        headers: {
            textColor: ['#333333', '#999999'],
            backgroundColor: ['#123456', '#654321']      
        }
    };

    var  example2colAppearanceSV = {
        horizontalGrid: {'color': '#111111','width': 1},
        verticalGrid: {'color': '#111111','width': 1},
        rowEven: {
            textColor: '#222222',
            backgroundColor: '#444444'
        },
        rowOdd: {
            textColor: '#555555',
            backgroundColor: '#777777'
        },
        headers: {
            textColor: '#333333',
            backgroundColor: '#123456'      
        }        
    };

    var  example2colAppearanceSVspread = {
        horizontalGrid: {'color': '#111111','width': 1},
        verticalGrid: {'color': '#111111','width': 1},
        rowEven: {
            textColor: ['#222222', '#222222'],
            backgroundColor: ['#444444', '#444444']
        },
        rowOdd: {
            textColor: ['#555555', '#555555'],
            backgroundColor: ['#777777', '#777777']
        },
        headers: {
            textColor: ['#333333', '#333333'],
            backgroundColor: ['#123456', '#123456']      
        }     
    };

    it('set default values to property not specified', function() {
        var graph1=new TableModel({ID:'graph1'});
        assert.strictEqual(graph1._ID, 'graph1');
        assert.strictEqual(graph1._title, '');
        assert.strictEqual(graph1._type, 'Table');
        assert.strictEqual(graph1._height, 500);
        assert.strictEqual(graph1._width, 500);
        assert.strictEqual(graph1._enableLegend, false);
        assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
        assert.strictEqual(graph1._sortable, false);
        assert.strictEqual(graph1._sort, null);
        assert.strictEqual(graph1._maxItemsPage, 10);
        assert.strictEqual(graph1._headers.length, 0);
        assert.deepEqual(graph1._appearance, defaultAppearance);
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
        assert.strictEqual(graph1._height, 500);
        assert.strictEqual(graph1._width, 500);
        assert.strictEqual(graph1._enableLegend, false);
        assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
        assert.strictEqual(graph1._sortable, false);
        assert.strictEqual(graph1._sort, null);
        assert.strictEqual(graph1._maxItemsPage, 10);
        assert.strictEqual(graph1._headers.length, 0);
        assert.deepEqual(graph1._appearance, defaultAppearance);
        assert.strictEqual(graph1._addRowOn, 'bottom');
    });

    var legend1 = new LegendModel();
    it('set param values to properties with no appearance specified', function() {
        var graph1=new TableModel({
            ID: 'graph1',
            title: 'graph one',
            height: 200,
            width: 350,
            enableLegend: true,
            legend: legend1.getProperties(),
            sortable: true,
            sort: {column: ['col1'], ordering:['DESC']},
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
        assert.deepEqual(graph1._sort, {column: ['col1'], ordering:['DESC']});
        assert.strictEqual(graph1._maxItemsPage, 15);
        assert.strictEqual(graph1._headers[0], 'col1');
        assert.strictEqual(graph1._headers[1], 'col2');
        assert.deepEqual(graph1._appearance, default2colAppearance);
        assert.strictEqual(graph1._addRowOn, 'top');
    });

    it('set param values to properties with the appearance specified', function() {
        var graph1=new TableModel({
            ID: 'graph1',
            title: 'graph one',
            height: 200,
            width: 350,
            enableLegend: true,
            legend: legend1.getProperties(),
            sortable: true,
            sort: {column: ['col1'], ordering:['DESC']},
            maxItemsPage: 15,
            headers: ['col1', 'col2'],
            appearance: example2colAppearance,
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
        assert.deepEqual(graph1._sort, {column: ['col1'], ordering:['DESC']});
        assert.strictEqual(graph1._maxItemsPage, 15);
        assert.strictEqual(graph1._headers[0], 'col1');
        assert.strictEqual(graph1._headers[1], 'col2');
        assert.deepEqual(graph1._appearance, example2colAppearance);
        assert.strictEqual(graph1._addRowOn, 'top');
    });

    it('set param values to properties with the appearance specified in a compact way', function() {
        var graph1=new TableModel({
            ID: 'graph1',
            title: 'graph one',
            height: 200,
            width: 350,
            enableLegend: true,
            legend: legend1.getProperties(),
            sortable: true,
            sort: {column: ['col1'], ordering:['DESC']},
            maxItemsPage: 15,
            headers: ['col1', 'col2'],
            appearance: example2colAppearanceSV,
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
        assert.deepEqual(graph1._sort, {column: ['col1'], ordering:['DESC']});
        assert.strictEqual(graph1._maxItemsPage, 15);
        assert.strictEqual(graph1._headers[0], 'col1');
        assert.strictEqual(graph1._headers[1], 'col2');
        assert.deepEqual(graph1._appearance, example2colAppearanceSVspread);
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
                sort: {column: ['col1'], ordering:['DESC']},
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
            assert.deepEqual(prop.sort, {column: ['col1'], ordering:['DESC']});
            assert.strictEqual(prop.maxItemsPage, 15);
            assert.strictEqual(prop.headers[0], 'col1');
            assert.strictEqual(prop.headers[1], 'col2');
            assert.deepEqual(graph1._appearance, default2colAppearance);
            assert.strictEqual(prop.addRowOn, 'top');
        });
    });
    describe('#updateProperties', function() {
        it('updates the properties passed as param without specifying any appearance', function() {
            var properties={
                ID: 'graph1',
                title: 'graph one',
                height: 200,
                width: 350,
                enableLegend: true,
                legend: legend1.getProperties(),
                sortable: true,
                sort: {column: ['col1'], ordering:['DESC']},
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
            assert.deepEqual(graph1._sort, {column: ['col1'], ordering:['DESC']});
            assert.strictEqual(graph1._maxItemsPage, 15);
            assert.strictEqual(graph1._headers[0], 'col1');
            assert.strictEqual(graph1._headers[1], 'col2');
            assert.deepEqual(graph1._appearance, default2colAppearance);
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
                appearance: 456,
                addRowOn: 'def'
            };
            var graph1=new TableModel({ID: 'graph1'});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._ID, 'graph1');
            assert.strictEqual(graph1._title, '');
            assert.strictEqual(graph1._type, 'Table');
            assert.strictEqual(graph1._height, 500);
            assert.strictEqual(graph1._width, 500);
            assert.strictEqual(graph1._enableLegend, false);
            assert.deepEqual(graph1._legend.getProperties(), defaultLegend.getProperties());
            assert.strictEqual(graph1._sortable, false);
            assert.strictEqual(graph1._sort, null);
            assert.strictEqual(graph1._maxItemsPage, 10);
            assert.strictEqual(graph1._headers.length, 0);
            assert.deepEqual(graph1._appearance, defaultAppearance);
            assert.strictEqual(graph1._addRowOn, 'bottom');
        });
        it('increases the number of appearance columns if the number of headers is increased', function() {
            var properties={
                headers: ['col1', 'col2']
            };
            var graph1=new TableModel({ID: 'graph1', headers:['col1']});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._headers[0], 'col1');
            assert.strictEqual(graph1._headers[1], 'col2');
            assert.deepEqual(graph1._appearance, default2colAppearance);
        });
        it('decreases the number of appearance columns if the number of headers is decreased', function() {
            var properties={
                headers: ['col1', 'col2']
            };
            var graph1=new TableModel({ID: 'graph1', headers:['col1', 'col2', 'col3']});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._headers[0], 'col1');
            assert.strictEqual(graph1._headers[1], 'col2');
            assert.deepEqual(graph1._appearance, default2colAppearance);
        });
        it('leaves the number of appearance columns untouched if the number of headers doesn\' change', function() {
            var properties={
                headers: ['col1', 'col2']
            };
            var graph1=new TableModel({ID: 'graph1', headers:['cola', 'colb']});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._headers[0], 'col1');
            assert.strictEqual(graph1._headers[1], 'col2');
            assert.deepEqual(graph1._appearance, default2colAppearance);
        });
        it('does not updates sort options if not valid', function() {
            var properties={
                sort: {column: ['col1'], ordering:['AAA']},
            };
            var graph1=new TableModel({ID: 'graph1'});
            graph1.updateProperties(properties);
            assert.strictEqual(graph1._sort, null);
        });
    });

    describe('#getData', function() {
        var flow1 = new TableFlowModel({ID: 'flow1'});
        var flow2 = new TableFlowModel({ID: 'flow2'});
        it('returns empty json if it has no flows', function() {
            var graph1=new TableModel({ID: 'graph1'});
            assert.strictEqual(graph1.getData().length, 0);
        });
       
        it('returns json with one graph', function() {
            var graph1=new TableModel({ID: 'graph1'});
            graph1.addFlow(flow1);
            var data=graph1.getData();
            assert.strictEqual(data.length, 1);
            assert.strictEqual(data[0].properties.ID, 'flow1');
        });
        it('returns json with two graphs', function() {
            var graph1=new TableModel({ID: 'graph1'});
            graph1.addFlow(flow1);
            graph1.addFlow(flow2);
            var data=graph1.getData();
            assert.strictEqual(data.length, 2);
            assert.strictEqual(data[0].properties.ID, 'flow1');
            assert.strictEqual(data[1].properties.ID, 'flow2');
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
            assert.strictEqual(graph1.addRecord('flow1', {temperature: 2}).indexOf('flow1'), 0);
        });
    });
});