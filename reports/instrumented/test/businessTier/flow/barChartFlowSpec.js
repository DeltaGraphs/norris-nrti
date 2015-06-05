/*jshint node: true, -W106 */
'use strict';

/*
* Name : barChartFlowSpec.js
* Module : UnitTest
* Location : /test/businessTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-06-03   Samuele Zanella    Initial code
* =========================================================
*/

var BarChartFlow = require('../../../lib/businessTier/flow/barChartFlow.js');
var assert = require('assert');

var socketMock=function(){
    this.p1=null;
    this.p2=null;
    this._namespace='flow1';
    this.sendMessage=function(p1, p2){
        this.p1=p1;
        this.p2=p2;
    };
};

var socketMockHistory=function(){
    this.p1=[];
    this.p2=[];
    this._namespace='flow1';
    this.sendMessage=function(p1, p2){
        this.p1.push(p1);
        this.p2.push(p2);
    };
};

describe('BarChartFlow', function() {
    it('returns null when there are no params', function() {
        assert.strictEqual((new BarChartFlow()).hasOwnProperty('_dataBarChartFlow'), false);
    });

    it('returns null when there is no valid graphsocket in params', function() {
        assert.strictEqual((new BarChartFlow({ID: 'flow1'}, 3, [{index: 1, value: 2}])).hasOwnProperty('_dataBarChartFlow'), false);
    });

    it('returns null when params are not valid', function() {
        assert.strictEqual((new BarChartFlow(2, new socketMock(), [{index: 1, value: 2}])).hasOwnProperty('_dataBarChartFlow'), false);
    });

    it('calls the parent constructor with the specified params', function() {
        var flow1=new BarChartFlow({ID: 'flow1'}, new socketMock(), []);
        assert.strictEqual(flow1._dataBarChartFlow._ID, 'flow1');
        assert.strictEqual(flow1._graphSocket._namespace, 'flow1');
    });

    describe('#getReplaceDataJSON', function() {
        it('returns the correct JSON', function() {            
            var flow1=new BarChartFlow({ID: 'flow1', indexKey: 'index', valueKey: 'value'}, new socketMock(), [{index: 1, value: 3}, {index: 2, value: 5}]);
            var expJSON = {
                action: 'replaceData',
                ID: 'flow1',
                records: [
                    {
                        norrisRecordID: flow1._dataBarChartFlow._records[0].norrisRecordID,
                        value: [1, 3]
                    },
                    {
                        norrisRecordID: flow1._dataBarChartFlow._records[1].norrisRecordID,
                        value: [2, 5]
                    }
                ]
            };
            assert.deepEqual(flow1.getReplaceDataJSON(), expJSON);
        });
    });

    describe('#updateRecord', function() {
        it('returns 111 if record is invalid', function() {
            var flow1=new BarChartFlow({ID: 'flow1'},new socketMock(), [{'index': 1, 'value': 25}]);
            assert.strictEqual(flow1.updateRecord(0, null), 111);
        });
        it('returns 112 if the index is invalid', function() {
            var flow1=new BarChartFlow({ID: 'flow1'},new socketMock(), [{'index': 1, 'value': 25}]);
            assert.strictEqual(flow1.updateRecord('abc',{'tempo': 4, 'temperatura': 33}), 112);
            assert.strictEqual(flow1.updateRecord(3,{'tempo': 4, 'temperatura': 33}), 112);
        });
        it('returns true with correct update', function() {
            var mock=new socketMock();
            var flow1=new BarChartFlow(
                {
                    ID: 'flow1',
                    filters: 'temperature>3',
                    indexKey: 'i',
                    valueKey: 'v'
                }, mock,
                [
                    {i: 1, v:5, temperature: 4},
                    {i: 3, v:2, temperature: 2}
                ]
            );
            assert(flow1.updateRecord(0, {i: 1, v:3, temperature: 0}), true);
            assert.strictEqual(mock.p1, 'updateFlowData');
            assert.deepEqual(mock.p2, {
                action: 'deleteRecord',
                ID: 'flow1',
                norrisRecordID: flow1._dataBarChartFlow.getRecordByIndex(0).norrisRecordID
            });
            assert(flow1.updateRecord(0, {i: 1, v:3, temperature: 4}), true);
            assert.strictEqual(mock.p1, 'updateFlowData');
            assert.deepEqual(mock.p2, {
                action: 'insertRecords',
                ID: 'flow1',
                records: [{
                    norrisRecordID: flow1._dataBarChartFlow.getRecordByIndex(0).norrisRecordID,
                    value: [1,3]
                }]
            });
            assert(flow1.updateRecord(0, {i: 1, v:5, temperature: 6}), true);
            assert.strictEqual(mock.p1, 'updateFlowData');
            assert.deepEqual(mock.p2, {
                action: 'updateRecord',
                ID: 'flow1',
                norrisRecordID: flow1._dataBarChartFlow.getRecordByIndex(0).norrisRecordID,
                value: [1,5]
            });
        });
    });

    describe('#updateProperties', function() {
        it('update correct properties', function() {
            var mock=new socketMockHistory();
            var flow1=new BarChartFlow(
                {
                    ID: 'flow1',
                    filters: 'temperature>5'
                },mock,
                [
                    {'tempo': 4, 'temperatura': 4},
                    {'tempo': 9, 'temperatura': 23},
                    {'tempo': 6, 'temperatura': 7},
                    {'tempo': 6, 'temperatura': 0},
                    {'time': 6, 'temp': 0}
                ]
            );
            flow1.updateProperties({name: 'grafico tempo-temperatura',indexKey: 'tempo',valueKey: 'temperatura',filters: 'temperatura>3'});
            assert.strictEqual(flow1._dataBarChartFlow._indexKey,'tempo');
            assert.strictEqual(flow1._dataBarChartFlow._valueKey,'temperatura');
            assert.strictEqual(flow1._dataBarChartFlow._name,'grafico tempo-temperatura');
            assert.strictEqual(mock.p1[mock.p1.length-2],'updateFlowData');
            //console.dir(flow1._dataLineChartFlow._records);
            assert.deepEqual(mock.p2[mock.p1.length-2],{
                action: 'replaceData',
                ID: 'flow1',
                records: [
                    {norrisRecordID: flow1._dataBarChartFlow.getRecordByIndex(0).norrisRecordID,
                    value: [4,4]},
                    {norrisRecordID: flow1._dataBarChartFlow.getRecordByIndex(1).norrisRecordID,
                    value: [9,23]},
                    {norrisRecordID: flow1._dataBarChartFlow.getRecordByIndex(2).norrisRecordID,
                    value: [6,7]},
                ]
            });
            assert.strictEqual(mock.p1[mock.p1.length-1],'updateFlowProp');
            assert.deepEqual(mock.p2[mock.p1.length-1],{'ID': 'flow1', 'name':'grafico tempo-temperatura','filters':'temperatura>3','indexKey':'tempo','valueKey':'temperatura'});
        });
    });
});