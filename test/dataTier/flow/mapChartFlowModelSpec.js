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
        assert.strictEqual(flow1._objectKey, null);
        assert.strictEqual(flow1._longitudeFormat, 'coordinates');
        assert.strictEqual(flow1._latitudeFormat, 'coordinates');
        assert.strictEqual(flow1._marker.type, 'shape');
        assert.strictEqual(flow1._marker.shape, 'circle');
        assert.strictEqual(flow1._trace.type, 'none');
        assert.strictEqual(flow1._trace.coordinates.length, 0);
        assert.strictEqual(flow1._trailLength, 3);
        assert.strictEqual(flow1._maxItemsSaved, 500);
    });

	it('set default values to wrong properties', function() {
        var flow1=new MapChartFlowModel({
            ID: 'flow1',
            longitudeKey: 1,
            latitudeKey: {},
            objectKey: {},
            longitudeFormat: 'ttt',
            latitudeFormat: 2,
            marker: 2,
            trace: 3,
            trailLength: -2,
            maxItemsSaved: '123'
        });
		assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._longitudeKey, null);
        assert.strictEqual(flow1._latitudeKey, null);        
        assert.strictEqual(flow1._objectKey, null);
        assert.strictEqual(flow1._longitudeFormat, 'coordinates');
        assert.strictEqual(flow1._latitudeFormat, 'coordinates');
        assert.strictEqual(flow1._marker.type, 'shape');
        assert.strictEqual(flow1._marker.shape, 'circle');
        assert.strictEqual(flow1._trace.type, 'none');
        assert.strictEqual(flow1._trace.coordinates.length, 0);
        assert.strictEqual(flow1._trailLength, 3);
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
            ],
            strokeColor: '#FFF',
            fillColor: '#FFF'
        };
        var flow1=new MapChartFlowModel({
            ID: 'flow1',
            longitudeKey: 'x',
            latitudeKey: 'y',
            objectKey: 'ID',
            longitudeFormat: 'coordinates',
            latitudeFormat: 'geographic',
            marker: marker,
            trace: trace,
            trailLength: 2,
            maxItemsSaved: 1000
        });
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._longitudeKey, 'x');
        assert.strictEqual(flow1._latitudeKey, 'y');
        assert.strictEqual(flow1._objectKey, 'ID');
        assert.strictEqual(flow1._longitudeFormat, 'coordinates');
        assert.strictEqual(flow1._latitudeFormat, 'geographic');
        assert.deepEqual(flow1._marker, marker);
        assert.deepEqual(flow1._trace, trace);
        assert.strictEqual(flow1._trailLength, 2);
        assert.strictEqual(flow1._maxItemsSaved, 1000);
    });

    describe('#updateProperties', function() {
        it('returns 233 if there are no params specified', function() {
            var flow1=new MapChartFlowModel({ID: 'graph1'});
            var updates=flow1.updateProperties();
            assert.strictEqual(updates, 233);
        });
        it('updates and returns the properties passed as param', function() {
            var marker={
            type: 'shape',
            shape: 'triangle'
            };
            var trace={
                type: 'line',
                coordinates:[
                    [1,2],
                    [3,4],
                ],
                strokeColor: '#FFF',
                fillColor: '#FFF'
            };
            var properties={
                longitudeKey: 'x',
                latitudeKey: 'y',
                objectKey: 'ID',
                longitudeFormat: 'coordinates',
                latitudeFormat: 'geographic',
                marker: marker,
                trace: trace,
                trailLength: 2,
                maxItemsSaved: 1000
            };
            var flow1=new MapChartFlowModel({ID: 'flow1'});
            var updates=flow1.updateProperties(properties);
            assert.strictEqual(flow1._ID, 'flow1');
            assert.strictEqual(flow1._longitudeKey, 'x');
            assert.strictEqual(flow1._latitudeKey, 'y');
            assert.strictEqual(flow1._objectKey, 'ID');
            assert.strictEqual(flow1._longitudeFormat, 'coordinates');
            assert.strictEqual(flow1._latitudeFormat, 'geographic');
            assert.deepEqual(flow1._marker, marker);
            assert.deepEqual(flow1._trace, trace);
            assert.strictEqual(flow1._trailLength, 2);
            assert.strictEqual(flow1._maxItemsSaved, 1000);

            assert.strictEqual(updates.longitudeKey, 'x');
            assert.strictEqual(updates.latitudeKey, 'y');
            assert.strictEqual(updates.objectKey, 'ID');
            assert.strictEqual(updates.longitudeFormat, 'coordinates');
            assert.strictEqual(updates.latitudeFormat, 'geographic');
            assert.deepEqual(updates.marker, marker);
            assert.deepEqual(updates.trace, trace);
            assert.strictEqual(updates.trailLength, 2);
            assert.strictEqual(updates.maxItemsSaved, 1000);
        });
        it('does not update the properties with wrong param', function() {
            var properties={
                ID: 'flow1',
                longitudeKey: 1,
                latitudeKey: {},
                objectKey: {},
                longitudeFormat: 'ttt',
                latitudeFormat: 2,
                marker: 2,
                trace: 3,
                trailLength: -2,
                maxItemsSaved: '123'
            };
            var flow1=new MapChartFlowModel({ID: 'flow1'});
            flow1.updateProperties(properties);
            assert.strictEqual(flow1._ID, 'flow1');
            assert.strictEqual(flow1._longitudeKey, null);
            assert.strictEqual(flow1._latitudeKey, null);
            assert.strictEqual(flow1._objectKey, null);
            assert.strictEqual(flow1._longitudeFormat, 'coordinates');
            assert.strictEqual(flow1._latitudeFormat, 'coordinates');
            assert.strictEqual(flow1._marker.type, 'shape');
            assert.strictEqual(flow1._marker.shape, 'circle');
            assert.strictEqual(flow1._trace.type, 'none');
            assert.strictEqual(flow1._trace.coordinates.length, 0);
            assert.strictEqual(flow1._trailLength, 3);
            assert.strictEqual(flow1._maxItemsSaved, 500);
        });
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
        it('returns the param properties', function() {
            var marker={
                type: 'shape',
                shape: 'triangle'
            };
            var trace={
                type: 'line',
                coordinates:[
                    [1,2],
                    [3,4],
                ],
                strokeColor: '#FFF',
                fillColor: '#FFF'
            };
            var prop={
                ID: 'flow1',
                longitudeKey: 'x',
                latitudeKey: 'y',
                objectKey: 'ID',
                longitudeFormat: 'coordinates',
                latitudeFormat: 'geographic',
                marker: marker,
                trace: trace,
                trailLength: 2,
                maxItemsSaved: 1000
            };
            var flow1=new MapChartFlowModel(prop);
            var result=flow1.getProperties();
            assert.strictEqual(result.ID, prop.ID);
            assert.strictEqual(result.longitudeKey, prop.longitudeKey);
            assert.strictEqual(result.latitudeKey, prop.latitudeKey);
            assert.strictEqual(result.objectKey, prop.objectKey);
            assert.strictEqual(result.longitudeFormat, prop.longitudeFormat);
            assert.strictEqual(result.latitudeFormat, prop.latitudeFormat);
            assert.deepEqual(result.marker, prop.marker);
            assert.deepEqual(result.trace, prop.trace);
            assert.strictEqual(result.trailLength, prop.trailLength);
            assert.strictEqual(result.maxItemsSaved, prop.maxItemsSaved);
        });
    });
    describe('#getRecordByID', function() {
        it('returns 135 if ID is not valid', function() {
            var flow1=new MapChartFlowModel({ID: 'flow1'});
            flow1.addRecord({temperature: 2});
            assert.strictEqual(flow1.getRecordByID(2), 135);
            assert.strictEqual(flow1.getRecordByID('flow2asd'), 135);
            assert.strictEqual(flow1.getRecordByID('flow1asd'), 135);
        });
        it('returns the record if ID is valid', function() {
            var flow1=new MapChartFlowModel({ID: 'flow1'});
            var record={temperature: 2};
            var record2={temperature: 4};
            var ID=flow1.addRecord(record);
            var ID2=flow1.addRecord(record2);
            assert.deepEqual(flow1.getRecordByID(ID), record);
            assert.deepEqual(flow1.getRecordByID(ID2), record2);
        });
    });
});