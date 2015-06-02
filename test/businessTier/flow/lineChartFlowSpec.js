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
* 0.0.1     2015-06-02   Matteo Furlan    Initial code
* =========================================================
*/

var LineChartFlow = require('../../../lib/businessTier/flow/lineChartFlow.js');
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

describe('LineChartFlow', function() {
    
    it('returns null when there are no params', function() {
        assert.strictEqual((new LineChartFlow()).hasOwnProperty('_dataLineChartFlow'), false);
    });

    it('returns null when there is no valid graphsocket in params', function() {
        assert.strictEqual((new LineChartFlow(2, 3)).hasOwnProperty('_dataLineChartFlow'), false);
    });

    it('returns null when params are not valid', function() {
        assert.strictEqual((new LineChartFlow(2, {_namespace: 2})).hasOwnProperty('_dataLineChartFlow'), false);
    });

    it('calls the parent constructor with the params specified', function() {
        var flow1=new LineChartFlow({ID: 'flow1'},new socketMock);
        assert.strictEqual(flow1._dataLineChartFlow._ID, 'flow1');
        assert.strictEqual(flow1._graphSocket._namespace, 'flow1');
    });

    describe('#addRecord', function() {
        it('returns 123 if record is invalid', function() {
            var flow1=new LineChartFlow({ID: 'flow1'},new socketMock);
            assert.strictEqual(flow1.addRecord(), 123);
        });
        it('returns valid norrisRecordID if record is valid', function() {
            var flow1=new LineChartFlow({ID: 'flow1'},new socketMock);
            assert.strictEqual(flow1.addRecord({'tempo': 1, 'temperatura': 25}).indexOf('flow1'), 0);
        });
    });

    describe('#updateRecord', function() {
        it('returns 123 if record is invalid', function() {
            var flow1=new LineChartFlow({ID: 'flow1'},new socketMock);
            flow1.addRecord({'tempo': 1, 'temperatura': 25});
            assert.strictEqual(flow1.updateRecord(), 121);
        });
        it('returns 122 if no ID in records', function() {
            var flow1=new LineChartFlow({ID: 'flow1'},new socketMock);
            var ID=flow1.addRecord({'tempo': 1, 'temperatura': 25});
            assert.strictEqual(flow1.updateRecord(ID+'32442',{'tempo': 4, 'temperatura': 33}), 122);
        });
        it('returns 122 if invalid ID', function() {
            var flow1=new LineChartFlow({ID: 'flow1'},new socketMock);
            var ID=flow1.addRecord({'tempo': 1, 'temperatura': 25});
            assert.strictEqual(flow1.updateRecord('sad'+ID,{'tempo': 4, 'temperatura': 33}), 122);
        });
        it('returns true with correct update', function() {
            var flow1=new LineChartFlow({ID: 'flow1'},new socketMock);
            var ID=flow1.addRecord({'tempo': 1, 'temperatura': 25});
            assert.strictEqual(flow1.updateRecord(ID,{'tempo': 4, 'temperatura': 33}), true);
        });
    });

    describe('#getReplaceDataJSON', function() {
        var flow1=new LineChartFlow({ID: 'flow1', name: 'grafico tempo-temperatura',xKey: 'tempo',yKey: 'temperatura'},new socketMock);
        flow1.addRecord({'tempo': 4, 'temperatura': 4});
        flow1.addRecord({'tempo': 9, 'temperatura': 23});
        flow1.addRecord({'tempo': 6, 'temperatura': 7});
        console.log('getReplaceDataJSONgetReplaceDataJSONgetReplaceDataJSON');
        console.log(JSON.stringify(flow1.getReplaceDataJSON()));
    });

    describe('#updateProperties', function() {
        var flow1=new LineChartFlow({ID: 'flow1'},new socketMock);
        flow1.updateProperties({name: 'grafico tempo-temperatura',xKey: 'tempo',yKey: 'temperatura'});
        assert.strictEqual(flow1._dataLineChartFlow._xKey,'tempo');
        assert.strictEqual(flow1._dataLineChartFlow._yKey,'temperatura');
        assert.strictEqual(flow1._dataLineChartFlow._name,'grafico tempo-temperatura');
    });
});