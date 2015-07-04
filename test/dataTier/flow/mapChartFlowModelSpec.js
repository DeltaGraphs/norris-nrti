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
            type: 'area',
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
                type: 'area',
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
        it('replaces an old record', function() {
            var flow1=new MapChartFlowModel({ID: 'flow1', maxItemsSaved: 3});
            flow1.addRecord({temperature: 1});
            flow1.addRecord({temperature: 2});
            flow1.addRecord({temperature: 3});
            var ID4=flow1.addRecord({temperature: 4});
            assert.strictEqual(flow1._records.length, 3);
            assert.strictEqual(flow1._records[2].norrisRecordID, ID4);
        });
    });

    describe('#updateRecord', function() {
        it('return 131 if record is not valid', function() {
            var flow1=new MapChartFlowModel({ID: 'flow1'});
            assert.strictEqual(flow1.updateRecord(1), 131);
            assert.strictEqual(flow1.updateRecord(1, [{asd:'asd'}]), 131);
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
    describe('#updateMovie', function() {
        it('return 131 if record is not valid', function() {
            var flow1=new MapChartFlowModel({ID: 'flow1'});
            assert.strictEqual(flow1.updateMovie(1), 131);
            assert.strictEqual(flow1.updateMovie(null), 131);
        });
        it('insert only correct records', function() {
            var flow1=new MapChartFlowModel({ID: 'flow1', latitudeKey: 'WGS84La', longitudeKey: 'WGS84Fi', objectKey: 'IdMezzo'});
            var recIDs=flow1.updateMovie([ { '0': 875, '1': 45.42533493042, '2': 11.902134895325, '3': 14, '4': 0, IdMezzo: 875, WGS84Fi: 45.42533493042, WGS84La: 11.902134895325, Girometro: 14, StatoPorte: 0, capolinea: 'Capolinea Torre' }, { '0': 805, '1': 45.385223388672, '2': 11.862413406372, '3': 14, '4': 0, IdMezzo: 805, WGS84Fi: 45.385223388672, WGS84La: 11.862413406372, Girometro: 14, StatoPorte: 0, capolinea: 'Codalunga 8b' }, { '0': 867, '1': 45.390911102295, '2': 11.870438575745, '3': 266, '4': 0, IdMezzo: 867, WGS84Fi: 45.390911102295, WGS84La: 11.870438575745, Girometro: 266, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 835, '1': 45.424865722656, '2': 11.885174751282, '3': 188, '4': 0, IdMezzo: 835, WGS84Fi: 45.424865722656, WGS84La: 11.885174751282, Girometro: 188, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 814, '1': 45.429698944092, '2': 11.940545082092, '3': 132, '4': 0, IdMezzo: 814, WGS84Fi: 45.429698944092, WGS84La: 11.940545082092, Girometro: 132, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 845, '1': 45.381771087646, '2': 11.854724884033, '3': 51, '4': 0, IdMezzo: 845, WGS84Fi: 45.381771087646, WGS84La: 11.854724884033, Girometro: 51, StatoPorte: 0, capolinea: 'Capolinea Torre' }, { '0': 880, '1': 45.40881729126, '2': 11.878475189209, '3': 45, '4': 1, IdMezzo: 880, WGS84Fi: 45.40881729126, WGS84La: 11.878475189209, Girometro: 45, StatoPorte: 1, capolinea: 'Capolinea Torre' }, { '0': 837, '1': 45.392189025879, '2': 11.87103843689, '3': 80, '4': 0, IdMezzooo: 83327, WGS84Fsi: 45.392189025879, WGS84Laa: 11.87103843689, Girometro: 80, StatoPorte: 0, capolinea: 'Capolinea Torre' } ]);
            assert.deepEqual(recIDs.length,7);
            assert.deepEqual(flow1._records,[ { '0': 875, '1': 45.42533493042, '2': 11.902134895325, '3': 14, '4': 0, IdMezzo: 875, WGS84Fi: 45.42533493042, WGS84La: 11.902134895325, Girometro: 14, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[0], norrisRecordIsValid: true }, { '0': 805, '1': 45.385223388672, '2': 11.862413406372, '3': 14, '4': 0, IdMezzo: 805, WGS84Fi: 45.385223388672, WGS84La: 11.862413406372, Girometro: 14, StatoPorte: 0, capolinea: 'Codalunga 8b', norrisRecordID: recIDs[1], norrisRecordIsValid: true }, { '0': 867, '1': 45.390911102295, '2': 11.870438575745, '3': 266, '4': 0, IdMezzo: 867, WGS84Fi: 45.390911102295, WGS84La: 11.870438575745, Girometro: 266, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice', norrisRecordID: recIDs[2], norrisRecordIsValid: true }, { '0': 835, '1': 45.424865722656, '2': 11.885174751282, '3': 188, '4': 0, IdMezzo: 835, WGS84Fi: 45.424865722656, WGS84La: 11.885174751282, Girometro: 188, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice', norrisRecordID: recIDs[3], norrisRecordIsValid: true }, { '0': 814, '1': 45.429698944092, '2': 11.940545082092, '3': 132, '4': 0, IdMezzo: 814, WGS84Fi: 45.429698944092, WGS84La: 11.940545082092, Girometro: 132, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice', norrisRecordID: recIDs[4], norrisRecordIsValid: true }, { '0': 845, '1': 45.381771087646, '2': 11.854724884033, '3': 51, '4': 0, IdMezzo: 845, WGS84Fi: 45.381771087646, WGS84La: 11.854724884033, Girometro: 51, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[5], norrisRecordIsValid: true }, { '0': 880, '1': 45.40881729126, '2': 11.878475189209, '3': 45, '4': 1, IdMezzo: 880, WGS84Fi: 45.40881729126, WGS84La: 11.878475189209, Girometro: 45, StatoPorte: 1, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[6], norrisRecordIsValid: true }, { '0': 837, '1': 45.392189025879, '2': 11.87103843689, '3': 80, '4': 0, IdMezzooo: 83327, WGS84Fsi: 45.392189025879, WGS84Laa: 11.87103843689, Girometro: 80, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordIsValid: true } ]);
        });
        it('first insert is correct', function() {
            var flow1=new MapChartFlowModel({ID: 'flow1', latitudeKey: 'WGS84La', longitudeKey: 'WGS84Fi', objectKey: 'IdMezzo'});
            var recIDs=flow1.updateMovie([ { '0': 875, '1': 45.42533493042, '2': 11.902134895325, '3': 14, '4': 0, IdMezzo: 875, WGS84Fi: 45.42533493042, WGS84La: 11.902134895325, Girometro: 14, StatoPorte: 0, capolinea: 'Capolinea Torre' }, { '0': 805, '1': 45.385223388672, '2': 11.862413406372, '3': 14, '4': 0, IdMezzo: 805, WGS84Fi: 45.385223388672, WGS84La: 11.862413406372, Girometro: 14, StatoPorte: 0, capolinea: 'Codalunga 8b' }, { '0': 867, '1': 45.390911102295, '2': 11.870438575745, '3': 266, '4': 0, IdMezzo: 867, WGS84Fi: 45.390911102295, WGS84La: 11.870438575745, Girometro: 266, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 835, '1': 45.424865722656, '2': 11.885174751282, '3': 188, '4': 0, IdMezzo: 835, WGS84Fi: 45.424865722656, WGS84La: 11.885174751282, Girometro: 188, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 814, '1': 45.429698944092, '2': 11.940545082092, '3': 132, '4': 0, IdMezzo: 814, WGS84Fi: 45.429698944092, WGS84La: 11.940545082092, Girometro: 132, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 845, '1': 45.381771087646, '2': 11.854724884033, '3': 51, '4': 0, IdMezzo: 845, WGS84Fi: 45.381771087646, WGS84La: 11.854724884033, Girometro: 51, StatoPorte: 0, capolinea: 'Capolinea Torre' }, { '0': 880, '1': 45.40881729126, '2': 11.878475189209, '3': 45, '4': 1, IdMezzo: 880, WGS84Fi: 45.40881729126, WGS84La: 11.878475189209, Girometro: 45, StatoPorte: 1, capolinea: 'Capolinea Torre' }, { '0': 837, '1': 45.392189025879, '2': 11.87103843689, '3': 80, '4': 0, IdMezzo: 837, WGS84Fi: 45.392189025879, WGS84La: 11.87103843689, Girometro: 80, StatoPorte: 0, capolinea: 'Capolinea Torre' } ]);
            assert.deepEqual(recIDs.length,8);
            assert.deepEqual(flow1._records,[ { '0': 875, '1': 45.42533493042, '2': 11.902134895325, '3': 14, '4': 0, IdMezzo: 875, WGS84Fi: 45.42533493042, WGS84La: 11.902134895325, Girometro: 14, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[0], norrisRecordIsValid: true }, { '0': 805, '1': 45.385223388672, '2': 11.862413406372, '3': 14, '4': 0, IdMezzo: 805, WGS84Fi: 45.385223388672, WGS84La: 11.862413406372, Girometro: 14, StatoPorte: 0, capolinea: 'Codalunga 8b', norrisRecordID: recIDs[1], norrisRecordIsValid: true }, { '0': 867, '1': 45.390911102295, '2': 11.870438575745, '3': 266, '4': 0, IdMezzo: 867, WGS84Fi: 45.390911102295, WGS84La: 11.870438575745, Girometro: 266, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice', norrisRecordID: recIDs[2], norrisRecordIsValid: true }, { '0': 835, '1': 45.424865722656, '2': 11.885174751282, '3': 188, '4': 0, IdMezzo: 835, WGS84Fi: 45.424865722656, WGS84La: 11.885174751282, Girometro: 188, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice', norrisRecordID: recIDs[3], norrisRecordIsValid: true }, { '0': 814, '1': 45.429698944092, '2': 11.940545082092, '3': 132, '4': 0, IdMezzo: 814, WGS84Fi: 45.429698944092, WGS84La: 11.940545082092, Girometro: 132, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice', norrisRecordID: recIDs[4], norrisRecordIsValid: true }, { '0': 845, '1': 45.381771087646, '2': 11.854724884033, '3': 51, '4': 0, IdMezzo: 845, WGS84Fi: 45.381771087646, WGS84La: 11.854724884033, Girometro: 51, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[5], norrisRecordIsValid: true }, { '0': 880, '1': 45.40881729126, '2': 11.878475189209, '3': 45, '4': 1, IdMezzo: 880, WGS84Fi: 45.40881729126, WGS84La: 11.878475189209, Girometro: 45, StatoPorte: 1, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[6], norrisRecordIsValid: true }, { '0': 837, '1': 45.392189025879, '2': 11.87103843689, '3': 80, '4': 0, IdMezzo: 837, WGS84Fi: 45.392189025879, WGS84La: 11.87103843689, Girometro: 80, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[7], norrisRecordIsValid: true } ]);
        });
        it('second insert is correct with old object', function() {
            var flow1=new MapChartFlowModel({ID: 'flow1', latitudeKey: 'WGS84La', longitudeKey: 'WGS84Fi', objectKey: 'IdMezzo'});
            var recIDs=flow1.updateMovie([ { '0': 875, '1': 45.42533493042, '2': 11.902134895325, '3': 14, '4': 0, IdMezzo: 875, WGS84Fi: 45.42533493042, WGS84La: 11.902134895325, Girometro: 14, StatoPorte: 0, capolinea: 'Capolinea Torre' }, { '0': 805, '1': 45.385223388672, '2': 11.862413406372, '3': 14, '4': 0, IdMezzo: 805, WGS84Fi: 45.385223388672, WGS84La: 11.862413406372, Girometro: 14, StatoPorte: 0, capolinea: 'Codalunga 8b' }, { '0': 867, '1': 45.390911102295, '2': 11.870438575745, '3': 266, '4': 0, IdMezzo: 867, WGS84Fi: 45.390911102295, WGS84La: 11.870438575745, Girometro: 266, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 835, '1': 45.424865722656, '2': 11.885174751282, '3': 188, '4': 0, IdMezzo: 835, WGS84Fi: 45.424865722656, WGS84La: 11.885174751282, Girometro: 188, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 814, '1': 45.429698944092, '2': 11.940545082092, '3': 132, '4': 0, IdMezzo: 814, WGS84Fi: 45.429698944092, WGS84La: 11.940545082092, Girometro: 132, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 845, '1': 45.381771087646, '2': 11.854724884033, '3': 51, '4': 0, IdMezzo: 845, WGS84Fi: 45.381771087646, WGS84La: 11.854724884033, Girometro: 51, StatoPorte: 0, capolinea: 'Capolinea Torre' }, { '0': 880, '1': 45.40881729126, '2': 11.878475189209, '3': 45, '4': 1, IdMezzo: 880, WGS84Fi: 45.40881729126, WGS84La: 11.878475189209, Girometro: 45, StatoPorte: 1, capolinea: 'Capolinea Torre' }, { '0': 837, '1': 45.392189025879, '2': 11.87103843689, '3': 80, '4': 0, IdMezzo: 837, WGS84Fi: 45.392189025879, WGS84La: 11.87103843689, Girometro: 80, StatoPorte: 0, capolinea: 'Capolinea Torre' } ]);
            assert.deepEqual(recIDs.length,8);
            assert.deepEqual(flow1._records,[ { '0': 875, '1': 45.42533493042, '2': 11.902134895325, '3': 14, '4': 0, IdMezzo: 875, WGS84Fi: 45.42533493042, WGS84La: 11.902134895325, Girometro: 14, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[0], norrisRecordIsValid: true }, { '0': 805, '1': 45.385223388672, '2': 11.862413406372, '3': 14, '4': 0, IdMezzo: 805, WGS84Fi: 45.385223388672, WGS84La: 11.862413406372, Girometro: 14, StatoPorte: 0, capolinea: 'Codalunga 8b', norrisRecordID: recIDs[1], norrisRecordIsValid: true }, { '0': 867, '1': 45.390911102295, '2': 11.870438575745, '3': 266, '4': 0, IdMezzo: 867, WGS84Fi: 45.390911102295, WGS84La: 11.870438575745, Girometro: 266, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice', norrisRecordID: recIDs[2], norrisRecordIsValid: true }, { '0': 835, '1': 45.424865722656, '2': 11.885174751282, '3': 188, '4': 0, IdMezzo: 835, WGS84Fi: 45.424865722656, WGS84La: 11.885174751282, Girometro: 188, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice', norrisRecordID: recIDs[3], norrisRecordIsValid: true }, { '0': 814, '1': 45.429698944092, '2': 11.940545082092, '3': 132, '4': 0, IdMezzo: 814, WGS84Fi: 45.429698944092, WGS84La: 11.940545082092, Girometro: 132, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice', norrisRecordID: recIDs[4], norrisRecordIsValid: true }, { '0': 845, '1': 45.381771087646, '2': 11.854724884033, '3': 51, '4': 0, IdMezzo: 845, WGS84Fi: 45.381771087646, WGS84La: 11.854724884033, Girometro: 51, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[5], norrisRecordIsValid: true }, { '0': 880, '1': 45.40881729126, '2': 11.878475189209, '3': 45, '4': 1, IdMezzo: 880, WGS84Fi: 45.40881729126, WGS84La: 11.878475189209, Girometro: 45, StatoPorte: 1, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[6], norrisRecordIsValid: true }, { '0': 837, '1': 45.392189025879, '2': 11.87103843689, '3': 80, '4': 0, IdMezzo: 837, WGS84Fi: 45.392189025879, WGS84La: 11.87103843689, Girometro: 80, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[7], norrisRecordIsValid: true } ]);

            var recIDs_new=flow1.updateMovie([ { '0': 837, '1': 45.39281463623, '2': 11.871248245239, '3': 65, '4': 0, IdMezzo: 837, WGS84Fi: 45.39281463623, WGS84La: 11.871248245239, Girometro: 65, StatoPorte: 0, capolinea: 'Capolinea Torre' }, { '0': 805, '1': 45.385437011719, '2': 11.862988471985, '3': 27, '4': 0, IdMezzo: 805, WGS84Fi: 45.385437011719, WGS84La: 11.862988471985, Girometro: 27, StatoPorte: 0, capolinea: 'Codalunga 8b' }, { '0': 835, '1': 45.423889160156, '2': 11.88440322876, '3': 240, '4': 0, IdMezzo: 835, WGS84Fi: 45.423889160156, WGS84La: 11.88440322876, Girometro: 240, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 867, '1': 45.390277862549, '2': 11.870240211487, '3': 263, '4': 0, IdMezzo: 867, WGS84Fi: 45.390277862549, WGS84La: 11.870240211487, Girometro: 263, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 875, '1': 45.426048278809, '2': 11.906834602356, '3': 334, '4': 0, IdMezzo: 875, WGS84Fi: 45.426048278809, WGS84La: 11.906834602356, Girometro: 334, StatoPorte: 0, capolinea: 'Capolinea Torre' }, { '0': 814, '1': 45.431480407715, '2': 11.937152862549, '3': 158, '4': 0, IdMezzo: 814, WGS84Fi: 45.431480407715, WGS84La: 11.937152862549, Girometro: 158, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 845, '1': 45.381893157959, '2': 11.854881286621, '3': 47, '4': 0, IdMezzo: 845, WGS84Fi: 45.381893157959, WGS84La: 11.854881286621, Girometro: 47, StatoPorte: 0, capolinea: 'Capolinea Torre' }, { '0': 880, '1': 45.40881729126, '2': 11.878475189209, '3': 45, '4': 0, IdMezzo: 880, WGS84Fi: 45.40881729126, WGS84La: 11.878475189209, Girometro: 45, StatoPorte: 0, capolinea: 'Capolinea Torre' } ]);
            assert.deepEqual(recIDs_new.length,8);
            assert.deepEqual(flow1._records,[ { '0': 837, '1': 45.39281463623, '2': 11.871248245239, '3': 65, '4': 0, IdMezzo: 837, WGS84Fi: 45.39281463623, WGS84La: 11.871248245239, Girometro: 65, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[7], norrisRecordIsValid: true }, { '0': 805, '1': 45.385437011719, '2': 11.862988471985, '3': 27, '4': 0, IdMezzo: 805, WGS84Fi: 45.385437011719, WGS84La: 11.862988471985, Girometro: 27, StatoPorte: 0, capolinea: 'Codalunga 8b', norrisRecordID: recIDs[1], norrisRecordIsValid: true }, { '0': 835, '1': 45.423889160156, '2': 11.88440322876, '3': 240, '4': 0, IdMezzo: 835, WGS84Fi: 45.423889160156, WGS84La: 11.88440322876, Girometro: 240, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice', norrisRecordID: recIDs[3], norrisRecordIsValid: true }, { '0': 867, '1': 45.390277862549, '2': 11.870240211487, '3': 263, '4': 0, IdMezzo: 867, WGS84Fi: 45.390277862549, WGS84La: 11.870240211487, Girometro: 263, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice', norrisRecordID: recIDs[2], norrisRecordIsValid: true }, { '0': 875, '1': 45.426048278809, '2': 11.906834602356, '3': 334, '4': 0, IdMezzo: 875, WGS84Fi: 45.426048278809, WGS84La: 11.906834602356, Girometro: 334, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[0], norrisRecordIsValid: true }, { '0': 814, '1': 45.431480407715, '2': 11.937152862549, '3': 158, '4': 0, IdMezzo: 814, WGS84Fi: 45.431480407715, WGS84La: 11.937152862549, Girometro: 158, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice', norrisRecordID: recIDs[4], norrisRecordIsValid: true }, { '0': 845, '1': 45.381893157959, '2': 11.854881286621, '3': 47, '4': 0, IdMezzo: 845, WGS84Fi: 45.381893157959, WGS84La: 11.854881286621, Girometro: 47, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[5], norrisRecordIsValid: true }, { '0': 880, '1': 45.40881729126, '2': 11.878475189209, '3': 45, '4': 0, IdMezzo: 880, WGS84Fi: 45.40881729126, WGS84La: 11.878475189209, Girometro: 45, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[6], norrisRecordIsValid: true } ]);

        });
        it('third insert is correct with old object and one new', function() {
            var flow1=new MapChartFlowModel({ID: 'flow1', latitudeKey: 'WGS84La', longitudeKey: 'WGS84Fi', objectKey: 'IdMezzo'});
            var recIDs=flow1.updateMovie([ { '0': 875, '1': 45.42533493042, '2': 11.902134895325, '3': 14, '4': 0, IdMezzo: 875, WGS84Fi: 45.42533493042, WGS84La: 11.902134895325, Girometro: 14, StatoPorte: 0, capolinea: 'Capolinea Torre' }, { '0': 805, '1': 45.385223388672, '2': 11.862413406372, '3': 14, '4': 0, IdMezzo: 805, WGS84Fi: 45.385223388672, WGS84La: 11.862413406372, Girometro: 14, StatoPorte: 0, capolinea: 'Codalunga 8b' }, { '0': 867, '1': 45.390911102295, '2': 11.870438575745, '3': 266, '4': 0, IdMezzo: 867, WGS84Fi: 45.390911102295, WGS84La: 11.870438575745, Girometro: 266, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 835, '1': 45.424865722656, '2': 11.885174751282, '3': 188, '4': 0, IdMezzo: 835, WGS84Fi: 45.424865722656, WGS84La: 11.885174751282, Girometro: 188, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 814, '1': 45.429698944092, '2': 11.940545082092, '3': 132, '4': 0, IdMezzo: 814, WGS84Fi: 45.429698944092, WGS84La: 11.940545082092, Girometro: 132, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 845, '1': 45.381771087646, '2': 11.854724884033, '3': 51, '4': 0, IdMezzo: 845, WGS84Fi: 45.381771087646, WGS84La: 11.854724884033, Girometro: 51, StatoPorte: 0, capolinea: 'Capolinea Torre' }, { '0': 880, '1': 45.40881729126, '2': 11.878475189209, '3': 45, '4': 1, IdMezzo: 880, WGS84Fi: 45.40881729126, WGS84La: 11.878475189209, Girometro: 45, StatoPorte: 1, capolinea: 'Capolinea Torre' }, { '0': 837, '1': 45.392189025879, '2': 11.87103843689, '3': 80, '4': 0, IdMezzo: 837, WGS84Fi: 45.392189025879, WGS84La: 11.87103843689, Girometro: 80, StatoPorte: 0, capolinea: 'Capolinea Torre' } ]);
            console.log('recIDs:');
            console.dir(recIDs);
            assert.strictEqual(recIDs.length,8);
            assert.deepEqual(flow1._records,[ { '0': 875, '1': 45.42533493042, '2': 11.902134895325, '3': 14, '4': 0, IdMezzo: 875, WGS84Fi: 45.42533493042, WGS84La: 11.902134895325, Girometro: 14, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[0], norrisRecordIsValid: true }, { '0': 805, '1': 45.385223388672, '2': 11.862413406372, '3': 14, '4': 0, IdMezzo: 805, WGS84Fi: 45.385223388672, WGS84La: 11.862413406372, Girometro: 14, StatoPorte: 0, capolinea: 'Codalunga 8b', norrisRecordID: recIDs[1], norrisRecordIsValid: true }, { '0': 867, '1': 45.390911102295, '2': 11.870438575745, '3': 266, '4': 0, IdMezzo: 867, WGS84Fi: 45.390911102295, WGS84La: 11.870438575745, Girometro: 266, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice', norrisRecordID: recIDs[2], norrisRecordIsValid: true }, { '0': 835, '1': 45.424865722656, '2': 11.885174751282, '3': 188, '4': 0, IdMezzo: 835, WGS84Fi: 45.424865722656, WGS84La: 11.885174751282, Girometro: 188, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice', norrisRecordID: recIDs[3], norrisRecordIsValid: true }, { '0': 814, '1': 45.429698944092, '2': 11.940545082092, '3': 132, '4': 0, IdMezzo: 814, WGS84Fi: 45.429698944092, WGS84La: 11.940545082092, Girometro: 132, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice', norrisRecordID: recIDs[4], norrisRecordIsValid: true }, { '0': 845, '1': 45.381771087646, '2': 11.854724884033, '3': 51, '4': 0, IdMezzo: 845, WGS84Fi: 45.381771087646, WGS84La: 11.854724884033, Girometro: 51, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[5], norrisRecordIsValid: true }, { '0': 880, '1': 45.40881729126, '2': 11.878475189209, '3': 45, '4': 1, IdMezzo: 880, WGS84Fi: 45.40881729126, WGS84La: 11.878475189209, Girometro: 45, StatoPorte: 1, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[6], norrisRecordIsValid: true }, { '0': 837, '1': 45.392189025879, '2': 11.87103843689, '3': 80, '4': 0, IdMezzo: 837, WGS84Fi: 45.392189025879, WGS84La: 11.87103843689, Girometro: 80, StatoPorte: 0, capolinea: 'Capolinea Torre', norrisRecordID: recIDs[7], norrisRecordIsValid: true } ]);
            var recIDs_new=flow1.updateMovie([ { '0': 875, '1': 45.42533493042, '2': 11.902134895325, '3': 14, '4': 0, IdMezzo: 875, WGS84Fi: 45.42533493042, WGS84La: 11.902134895325, Girometro: 14, StatoPorte: 0, capolinea: 'Capolinea Torre' }, { '0': 805, '1': 45.385223388672, '2': 11.862413406372, '3': 14, '4': 0, IdMezzo: 805, WGS84Fi: 45.385223388672, WGS84La: 11.862413406372, Girometro: 14, StatoPorte: 0, capolinea: 'Codalunga 8b' }, { '0': 867, '1': 45.390911102295, '2': 11.870438575745, '3': 266, '4': 0, IdMezzo: 867, WGS84Fi: 45.390911102295, WGS84La: 11.870438575745, Girometro: 266, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 835, '1': 45.424865722656, '2': 11.885174751282, '3': 188, '4': 0, IdMezzo: 835, WGS84Fi: 45.424865722656, WGS84La: 11.885174751282, Girometro: 188, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 814, '1': 45.429698944092, '2': 11.940545082092, '3': 132, '4': 0, IdMezzo: 814, WGS84Fi: 45.429698944092, WGS84La: 11.940545082092, Girometro: 132, StatoPorte: 0, capolinea: 'Capolinea Mandria via Monselice' }, { '0': 845, '1': 45.381771087646, '2': 11.854724884033, '3': 51, '4': 0, IdMezzo: 845, WGS84Fi: 45.381771087646, WGS84La: 11.854724884033, Girometro: 51, StatoPorte: 0, capolinea: 'Capolinea Torre' }, { '0': 880, '1': 45.40881729126, '2': 11.878475189209, '3': 45, '4': 1, IdMezzo: 880, WGS84Fi: 45.40881729126, WGS84La: 11.878475189209, Girometro: 45, StatoPorte: 1, capolinea: 'Capolinea Torre' }, { '0': 81371, '1': 45.392189025879, '2': 11.87103843689, '3': 80, '4': 0, IdMezzo: 81371, WGS84Fi: 45.392189025879, WGS84La: 11.87103843689, Girometro: 80, StatoPorte: 0, capolinea: 'Capolinea Torre' } ]);
            console.log('recIDs_new: ');
            console.dir(recIDs_new);
            assert.strictEqual(recIDs_new[0],recIDs[0]);
            assert.strictEqual(recIDs_new[1],recIDs[1]);
            assert.strictEqual(recIDs_new[2],recIDs[2]);
            assert.strictEqual(recIDs_new[3],recIDs[3]);
            assert.strictEqual(recIDs_new[4],recIDs[4]);
            assert.strictEqual(recIDs_new[5],recIDs[5]);
            assert.strictEqual(recIDs_new[6],recIDs[6]);
            assert.notStrictEqual(recIDs_new[7],recIDs[7]);
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
                type: 'area',
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
});