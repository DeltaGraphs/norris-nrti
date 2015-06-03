/*jshint node: true, -W106 */
'use strict';

/*
* Name : mapChartFlowSpec.js
* Module : UnitTest
* Location : /test/businessTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-29   Filippo Rampado    Initial code
* =========================================================
*/

var MapChartFlow = require('../../../lib/businessTier/flow/mapChartFlow.js');
var assert = require('assert');

describe('MapChartFlow', function() {
    var socketMock=function(){
        this.p1=null;
        this.p2=null;
        this._namespace='flow1';
        this.sendMessage=function(p1, p2){
            this.p1=p1;
            this.p2=p2;
        };
    };
    it('returns null when there are no params', function() {
        assert.strictEqual((new MapChartFlow()).hasOwnProperty('_dataMapChartFlow'), false);
    });

    it('returns null when there is no valid graphsocket in params', function() {
        assert.strictEqual((new MapChartFlow(2, 3)).hasOwnProperty('_dataMapChartFlow'), false);
    });

    it('returns null when params are not valid', function() {
        assert.strictEqual((new MapChartFlow(2, new socketMock())).hasOwnProperty('_dataMapChartFlow'), false);
    });

    it('calls the parent constructor with the params specified', function() {
        var flow1=new MapChartFlow({ID: 'flow1'}, new socketMock());
        assert.strictEqual(flow1._dataMapChartFlow._ID, 'flow1');
        assert.strictEqual(flow1._graphSocket._namespace, 'flow1');
    });

    describe('#addRecord', function() {
        it('returns 133 if record is invalid', function() {
            var flow1=new MapChartFlow({ID: 'flow1'}, new socketMock());
            assert.strictEqual(flow1.addRecord(), 133);
        });
        it('returns valid norrisRecordID if record is valid', function() {
            var flow2=new MapChartFlow({ID: 'flow2'}, new socketMock());
            assert.strictEqual(flow2.addRecord({temperature: 2}).indexOf('flow2'), 0);
        });
    });

    describe('#deleteRecord', function() {
        it('returns 155 if ID is invalid', function() {
            var flow1=new MapChartFlow({ID: 'flow1'}, new socketMock());
            flow1.addRecord({temperature: 2});
            assert.strictEqual(flow1.deleteRecord(), 155);
            assert.strictEqual(flow1.deleteRecord('flow1asd'), 155);
        });
        it('returns true if ID is valid', function() {
            var flow1=new MapChartFlow({ID: 'flow1'}, new socketMock());
            var ID=flow1.addRecord({temperature: 2});
            assert.strictEqual(flow1.deleteRecord(ID), true);
        });
    });

    describe('#updateRecord', function() {
        it('return 131 if record is not valid', function() {
            var flow1=new MapChartFlow({ID: 'flow1'}, new socketMock());
            flow1.addRecord({temperature: 2});
            assert.strictEqual(flow1.updateRecord(1), 131);
            assert.strictEqual(flow1.updateRecord(1, [{asd:'asd'}]), 131);
        });
        it('return 132 if index is not valid', function() {
            var flow1=new MapChartFlow({ID: 'flow1'}, new socketMock());
            flow1.addRecord({temperature: 2});
            assert.strictEqual(flow1.updateRecord('flow2whaterver0', {temperature: 2}), 132);
            assert.strictEqual(flow1.updateRecord('flow1whaterver1', {temperature: 2}), 132);
            assert.strictEqual(flow1.updateRecord('asd', {temperature: 2}), 132);
        });
        it('updates and validate the record if ID and record are valid', function() {
            var mock=new socketMock();
            var flow1=new MapChartFlow({
                    ID: 'flow1',
                    filters: 'temperature>3',
                    objectKey: 'temperature',
                    latitudeKey: 'a',
                    longitudeKey: 'b'
                }, mock);
            var ID=flow1.addRecord({temperature: 5, a:1, b:2});
            flow1.addRecord({temperature: 6, a:1, b:2});
            flow1.updateRecord(ID, {temperature: 0, a:1, b:2});
            assert.strictEqual(mock.p1, 'updateFlowData');
            assert.deepEqual(mock.p2, {
                action: 'deleteRecord',
                ID: 'flow1',
                norrisRecordID: ID
            });
            flow1.updateRecord(ID, {temperature: 5, a:1, b:2});
            assert.strictEqual(mock.p1, 'updateFlowData');
            assert.deepEqual(mock.p2, {
                action: 'insertRecords',
                ID: 'flow1',
                records: [{
                    norrisRecordID: ID,
                    markerID: 5,
                    value: [1,2]
                }]
            });
            flow1.updateRecord(ID, {temperature: 6, a:1, b:2});
            assert.strictEqual(mock.p1, 'updateFlowData');
            assert.deepEqual(mock.p2, {
                action: 'updateRecord',
                ID: 'flow1',
                norrisRecordID: ID,
                markerID: 6,
                value: [1,2]
            });
        });
    });

    describe('#getReplaceDataJSON', function() {
        it('returns correct JSON', function() {
            var flow1=new MapChartFlow({
                    ID: 'flow1',
                    filters: 'temperature>3',
                    objectKey: 'temperature',
                    latitudeKey: 'a',
                    longitudeKey: 'b'
                }, new socketMock());
            var ID=flow1.addRecord({temperature: 5, a:1, b:2});
            var ID2=flow1.addRecord({temperature: 6, a:3, b:4});
            assert.deepEqual(flow1.getReplaceDataJSON(), {
                action: 'replaceData',
                ID: 'flow1',
                records: [
                    {
                        norrisRecordID : ID,
                        markerID: 5,
                        value: [1,2]
                    },
                    {
                        norrisRecordID : ID2,
                        markerID: 6,
                        value: [3,4]
                    },
                ]
            });
        });
    });

    describe('#updateMovie', function() {
        it('returns correct IDs and emit right event', function() {
            var mock=new socketMock();
            var flow1=new MapChartFlow({
                    ID: 'flow1',
                    filters: 'temperature>3',
                    objectKey: 'temperature',
                    latitudeKey: 'a',
                    longitudeKey: 'b'
                }, mock);
            var ID=flow1.addRecord({temperature: 5, a:1, b:2});
            var ID2=flow1.addRecord({temperature: 6, a:3, b:4});
            var IDs=flow1.updateMovie([{temperature: 5, a:2, b:3}, {temperature: 6, a:4, b:5}]);
            assert.deepEqual(IDs, [ID, ID2]);
            assert.strictEqual(mock.p1, 'updateFlowData');
            assert.deepEqual(mock.p2, {
                action: 'replaceData',
                ID: 'flow1',
                records: [
                    {
                        norrisRecordID : ID,
                        markerID: 5,
                        value: [2,3]
                    },
                    {
                        norrisRecordID : ID2,
                        markerID: 6,
                        value: [4,5]
                    },
                ]
            });
        });
    });

    describe('#updateProperties', function() {
        it('sends right updateFlowProp event', function() {
            var mock=new socketMock();
            var flow1=new MapChartFlow({
                    ID: 'flow1',
                    filters: 'temperature>3',
                    objectKey: 'temperature',
                    latitudeKey: 'a',
                    longitudeKey: 'b'
                }, mock);
            flow1.addRecord({temperature: 2, a:1, b:2});
            flow1.addRecord({temperature: 6, a:3, b:4});

            flow1.updateProperties({
                name: 'f1'
            });
            assert.strictEqual(mock.p1, 'updateFlowProp');
            assert.deepEqual(mock.p2, {ID: 'flow1', name: 'f1'});
        });
        it('sends right updateFlowData event', function() {
            var withHistoryMock=function(){
                this.p1=[];
                this.p2=[];
                this._namespace='flow1';
                this.sendMessage=function(p1, p2){
                    this.p1.push(p1);
                    this.p2.push(p2);
                };
            };
            var hMock=new withHistoryMock();
            var flow1=new MapChartFlow({
                    ID: 'flow1',
                    filters: 'temperature>3',
                    objectKey: 'temperature',
                    latitudeKey: 'a',
                    longitudeKey: 'b'
                }, hMock);
            var ID=flow1.addRecord({temperature: 2, a:1, b:2});
            var ID2=flow1.addRecord({temperature: 6, a:3, b:4});
            flow1.updateProperties({
                filters: 'temperature>0'
            });
            assert.strictEqual(hMock.p1[1], 'updateFlowData');
            assert.strictEqual(hMock.p1[2], 'updateFlowProp');
            assert.deepEqual(hMock.p2[1], {
                action: 'replaceData',
                ID: 'flow1',
                records: [
                    {
                        norrisRecordID : ID,
                        markerID: 2,
                        value: [1,2]
                    },
                    {
                        norrisRecordID : ID2,
                        markerID: 6,
                        value: [3,4]
                    },
                ]
            });
            assert.strictEqual(hMock.p2[2].filters, 'temperature>0');
        });
    });
});