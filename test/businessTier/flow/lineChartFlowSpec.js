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
var Socket = require('../../../lib/presentationTier/socket.js');
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
        var flow1=new LineChartFlow({ID: 'flow1'},new socketMock());
        assert.strictEqual(flow1._dataLineChartFlow._ID, 'flow1');
        assert.strictEqual(flow1._graphSocket._namespace, 'flow1');
    });

    describe('#addRecord', function() {
        it('returns 123 if record is invalid', function() {
            var flow1=new LineChartFlow({ID: 'flow1'},new socketMock());
            assert.strictEqual(flow1.addRecord(), 123);
        });
        it('returns valid norrisRecordID if record is valid', function() {
            var flow1=new LineChartFlow({ID: 'flow1'},new socketMock());
            assert.strictEqual(flow1.addRecord({'tempo': 1, 'temperatura': 25}).indexOf('flow1'), 0);
        });
    });

    describe('#updateRecord', function() {
        it('returns 123 if record is invalid', function() {
            var flow1=new LineChartFlow({ID: 'flow1'},new socketMock());
            flow1.addRecord({'tempo': 1, 'temperatura': 25});
            assert.strictEqual(flow1.updateRecord(), 121);
        });
        it('returns 122 if no ID in records', function() {
            var flow1=new LineChartFlow({ID: 'flow1'},new socketMock());
            var ID=flow1.addRecord({'tempo': 1, 'temperatura': 25});
            assert.strictEqual(flow1.updateRecord(ID+'32442',{'tempo': 4, 'temperatura': 33}), 122);
        });
        it('returns 122 if invalid ID', function() {
            var flow1=new LineChartFlow({ID: 'flow1'},new socketMock());
            var ID=flow1.addRecord({'tempo': 1, 'temperatura': 25});
            assert.strictEqual(flow1.updateRecord('sad'+ID,{'tempo': 4, 'temperatura': 33}), 122);
        });
        it('returns true with correct update', function() {
            var mock=new socketMock();
            var flow1=new LineChartFlow({
                    ID: 'flow1',
                    filters: 'temperature>3',
                    xKey: 'a',
                    yKey: 'b'
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
                    value: [1,2]
                }]
            });
            flow1.updateRecord(ID, {temperature: 6, a:1, b:2});
            assert.strictEqual(mock.p1, 'updateFlowData');
            assert.deepEqual(mock.p2, {
                action: 'updateRecord',
                ID: 'flow1',
                norrisRecordID: ID,
                value: [1,2]
            });
        });
    });

    describe('#getReplaceDataJSON', function() {
        it('returns correct JSON', function() {
            var flow1=new LineChartFlow({ID: 'flow1', name: 'grafico tempo-temperatura',xKey: 'tempo',yKey: 'temperatura'},new socketMock());
            var ID1=flow1.addRecord({'tempo': 4, 'temperatura': 4});
            var ID2=flow1.addRecord({'tempo': 9, 'temperatura': 23});
            var ID3=flow1.addRecord({'tempo': 6, 'temperatura': 7});
            assert.deepEqual(flow1.getReplaceDataJSON(),{'action':'replaceData','ID':'flow1','records':[{'norrisRecordID':ID1,'value':[4,4]},{'norrisRecordID':ID2,'value':[9,23]},{'norrisRecordID':ID3,'value':[6,7]}]});
        });
    });

    describe('#updateProperties', function() {
        it('update correct properties', function() {
            var io = require('socket.io-client');
            var server = require('socket.io')();
            server.listen(5000);

            var socketURL = 'http://0.0.0.0:5000/namespace';
            var options ={
                transports: ['websocket'],
                'force new connection': true
            };
            var client1 = io.connect(socketURL, options);

            var socket1 = new Socket(server, '/namespace');
            var flow1=new LineChartFlow({ID: 'flow1'},socket1);
            flow1.updateProperties({name: 'grafico tempo-temperatura',xKey: 'tempo',yKey: 'temperatura',filters: 'temperature>3',});
            flow1.addRecord({'tempo': 4, 'temperatura': 4});
            flow1.addRecord({'tempo': 9, 'temperatura': 23});
            flow1.addRecord({'tempo': 6, 'temperatura': 7});
            flow1.addRecord({'tempo': 6, 'temperatura': 0});
            flow1.addRecord({'time': 6, 'temp': 0});
            //assert.strictEqual(flow1._dataLineChartFlow._xKey,'tempo');
            //assert.strictEqual(flow1._dataLineChartFlow._yKey,'temperatura');
            //assert.strictEqual(flow1._dataLineChartFlow._name,'grafico tempo-temperatura');
            client1.on('updateFlowData', function(message) {
                console.log('STAMPAAAAA#updateFlowData '+message);
                assert.strictEqual(message, 'message');
            });
            client1.on('updateFlowProp', function(message) {
                console.log('STAMPAAAAA#updateFlowProp '+message);
                assert.strictEqual(message, 'message');
            });
        });
    });
});