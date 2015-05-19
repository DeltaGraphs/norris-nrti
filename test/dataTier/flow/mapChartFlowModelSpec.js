/*jshint node: true, -W106 */
'use strict';

/*
* Name : mapChartFlowModel.js
* Module : UnitTest
* Location : /test/dataTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-14   Filippo Rampado    Initial code
* =========================================================
*/

var MapChartFlowModel = require('../../../lib/dataTier/flow/mapChartFlowModel.js');
var assert = require('assert');

describe('MapChartFlowModel', function() {
    
    it('returns null when there are no params', function() {
        assert.strictEqual((new MapChartFlowModel()).hasOwnProperty('_name'), false);
    });

    it('returns null when there is no valid ID in params', function() {
        assert.strictEqual((new MapChartFlowModel({})).hasOwnProperty('_name'), false);
    });

    it('returns null when there is a empty ID in params', function() {
        assert.strictEqual((new MapChartFlowModel({ID:' '})).hasOwnProperty('_name'), false);
    });

    it('calls the parent constructor with the params specified', function() {
        var flow1=new MapChartFlowModel({
            ID:'flow1',
            name: 'map chart flow'
        });
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._name, 'map chart flow');
        assert.strictEqual(flow1._type, 'MapChartFlow');
    });

    it('set default values to property not specified', function() {
        var flow1=new MapChartFlowModel({ID:'flow1'});
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._longitudeKey, null);
        assert.strictEqual(flow1._latitudeKey, null);
        assert.strictEqual(flow1._longitudeFormat, 'coordinates');
        assert.strictEqual(flow1._latitudeFormat, 'coordinates');
        assert.strictEqual(flow1._flowColor, null);
        assert.strictEqual(flow1._marker.type, 'shape');
        assert.strictEqual(flow1._marker.shape, 'circle');
        assert.strictEqual(flow1._marker.icon, null);
        assert.strictEqual(flow1._marker.text, null);
        assert.strictEqual(flow1._trace.type, 'none');
        assert.strictEqual(flow1._trace.coordinates.length, 0);
        assert.strictEqual(flow1._maxItems, 50);
        assert.strictEqual(flow1._maxItemsSaved, 500);
    });

	it('set default values to wrong properties', function() {
        var flow1=new MapChartFlowModel({
            ID: 'flow1',
            longitudeKey: 1,
            latitudeKey: {},
            longitudeFormat: 'ttt',
            latitudeFormat: 2,
            flowColor: 2,
            marker: 2,
            trace: 3,
            maxItems: -2,
            maxItemsSaved: '123'
        });
		assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._longitudeKey, null);
        assert.strictEqual(flow1._latitudeKey, null);
        assert.strictEqual(flow1._longitudeFormat, 'coordinates');
        assert.strictEqual(flow1._latitudeFormat, 'coordinates');
        assert.strictEqual(flow1._flowColor, null);
        assert.strictEqual(flow1._marker.type, 'shape');
        assert.strictEqual(flow1._marker.shape, 'circle');
        assert.strictEqual(flow1._marker.icon, null);
        assert.strictEqual(flow1._marker.text, null);
        assert.strictEqual(flow1._trace.type, 'none');
        assert.strictEqual(flow1._trace.coordinates.length, 0);
        assert.strictEqual(flow1._maxItems, 50);
        assert.strictEqual(flow1._maxItemsSaved, 500);
    });

	it('set param values to properties', function() {
        var marker={
            type: 'shape',
            shape: 'triangle'
        };
        var trace={
            type: 'line',
            coordinates:[
                [1,2],
                [3,4],
            ]
        };
        var flow1=new MapChartFlowModel({
            ID: 'flow1',
            longitudeKey: 'x',
            latitudeKey: 'y',
            longitudeFormat: 'coordinates',
            latitudeFormat: 'geographic',
            flowColor: '#123456',
            marker: marker,
            trace: trace,
            maxItems: 2,
            maxItemsSaved: 1000
        });
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._longitudeKey, 'x');
        assert.strictEqual(flow1._latitudeKey, 'y');
        assert.strictEqual(flow1._longitudeFormat, 'coordinates');
        assert.strictEqual(flow1._latitudeFormat, 'geographic');
        assert.strictEqual(flow1._flowColor, '#123456');
        assert.deepEqual(flow1._marker, marker);
        assert.deepEqual(flow1._trace, trace);
        assert.strictEqual(flow1._maxItems, 2);
        assert.strictEqual(flow1._maxItemsSaved, 1000);
    });

    describe('#addRecord', function() {
        it('does not add a invalid record', function() {
            var flow1=new MapChartFlowModel({ID: 'flow1'});
            assert.strictEqual(flow1.addRecord(), 133);
            assert.strictEqual(flow1.addRecord(2), 133);
        });
        it('adds a valid record', function() {
            var flow1=new MapChartFlowModel({ID: 'flow1'});
            var ID=flow1.addRecord({temperature: 2});
            assert.strictEqual(ID.indexOf('flow1'), 0);
            assert.strictEqual(flow1._records.length, 1);
            assert.strictEqual(flow1._records[0].norrisRecordID.indexOf('flow1'), 0);
        });
    });

    describe('#updateRecord', function() {
        it('return 131 if record is not valid', function() {
            var flow1=new MapChartFlowModel({ID: 'flow1'});
            assert.strictEqual(flow1.updateRecord(1), 131);
            assert.strictEqual(flow1.updateRecord(1, [{asd:'asd'}]), 131);
            assert.strictEqual(flow1.updateRecord(1, 2), 131);
        });
        it('return 132 if index is not valid', function() {
            var flow1=new MapChartFlowModel({ID: 'flow1'});
            flow1._records=[{temperature: 2, norrisRecordID: 'flow1whatever0'}];
            assert.strictEqual(flow1.updateRecord('flow2whaterver0', {temperature: 2}), 132);
            assert.strictEqual(flow1.updateRecord('flow1whaterver1', {temperature: 2}), 132);
            assert.strictEqual(flow1.updateRecord('asd', {temperature: 2}), 132);
        });
        it('updates and validate the record if ID and record are valid', function() {
            var flow1=new MapChartFlowModel({
                    ID: 'flow1',
                    filters: 'temperature>3'
                });
            flow1._records=[{temperature: 2, norrisRecordID: 'flow1whatever0'}];
            flow1.validateRecord(0);
            assert.strictEqual(flow1._records[0].norrisRecordIsValid, false);
            var update=flow1.updateRecord('flow1whatever0', {temperature: 4});
            assert.strictEqual(update, true);
            assert.strictEqual(flow1._records[0].temperature, 4);
            assert.strictEqual(flow1._records[0].norrisRecordIsValid, true);
        });
    });
    describe('#deleteRecord', function() {
        it('return 134 if ID is not valid', function() {
            var flow1=new MapChartFlowModel({ID: 'flow1'});
            flow1.addRecord({temperature: 1});
            assert.strictEqual(flow1.deleteRecord(), 134);
            assert.strictEqual(flow1.deleteRecord('ads'), 134);
        });
        it('removes the record and return true if index is valid', function() {
            var flow1=new MapChartFlowModel({ID: 'flow1'});
            var ID1=flow1.addRecord({temperature: 1});
            flow1.addRecord({temperature: 2});
            assert.strictEqual(flow1.deleteRecord(ID1), true);
            assert.strictEqual(flow1._records.length, 1);
            assert.strictEqual(flow1._records[0].temperature, 2);
        });
    });
    describe('#getProperties', function() {
        var marker={
            type: 'shape',
            shape: 'triangle'
        };
        var trace={
            type: 'line',
            coordinates:[
                [1,2],
                [3,4],
            ]
        };
        var prop={
            ID: 'flow1',
            longitudeKey: 'x',
            latitudeKey: 'y',
            longitudeFormat: 'coordinates',
            latitudeFormat: 'geographic',
            flowColor: '#123456',
            marker: marker,
            trace: trace,
            maxItems: 2,
            maxItemsSaved: 1000
        };
        var flow1=new MapChartFlowModel(prop);
        assert.deepEqual(flow1.getProperties(), prop);
    });
});