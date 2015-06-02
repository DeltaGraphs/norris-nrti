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
    var socketMock={
        _namespace: 2,
        sendMessage: function(){}
    };
    it('returns null when there are no params', function() {
        assert.strictEqual((new MapChartFlow()).hasOwnProperty('_dataMapChartFlow'), false);
    });

    it('returns null when there is no valid graphsocket in params', function() {
        assert.strictEqual((new MapChartFlow(2, 3)).hasOwnProperty('_dataMapChartFlow'), false);
    });

    it('returns null when params are not valid', function() {
        assert.strictEqual((new MapChartFlow(2, socketMock)).hasOwnProperty('_dataMapChartFlow'), false);
    });

    it('calls the parent constructor with the params specified', function() {
        var flow1=new MapChartFlow({ID: 'flow1'},socketMock);
        assert.strictEqual(flow1._dataMapChartFlow._ID, 'flow1');
        assert.strictEqual(flow1._graphSocket._namespace, 'flow1');
    });

    describe('#addRecord', function() {
        it('returns 133 if record is invalid', function() {
            var flow1=new MapChartFlow({ID: 'flow1'},socketMock);
            assert.strictEqual(flow1.addRecord(), 133);
        });
        it('returns valid norrisRecordID if record is valid', function() {
            var flow2=new MapChartFlow({ID: 'flow2'},socketMock);
            console.dir(flow2);
            console.log(flow2.addRecord({temperature: 2}));
            console.log(flow2.addRecord({temperature: 2}).indexOf('flow2'));
            assert.strictEqual(flow2.addRecord({temperature: 2}).indexOf('flow2'), 0);
        });
    });

    describe('#deleteRecord', function() {
        it('returns 135 if ID is invalid', function() {
            var flow1=new MapChartFlow({ID: 'flow1'},socketMock);
            flow1.addRecord({temperature: 2});
            assert.strictEqual(flow1.deleteRecord(), 135);
            assert.strictEqual(flow1.deleteRecord('flow1asd'), 135);
        });
        it('returns true if ID is valid', function() {
            var flow1=new MapChartFlow({ID: 'flow1'},socketMock);
            var ID=flow1.addRecord({temperature: 2});
            assert.strictEqual(flow1.deleteRecord(ID), true);
        });
    });
});