/*jshint node: true, -W106 */
'use strict';

/*
* Name : tableFlowSpec.js
* Module : UnitTest
* Location : /test/businessTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-06-05   Filippo Rampado    Initial code
* =========================================================
*/

var TableFlow = require('../../../lib/businessTier/flow/tableFlow.js');
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

describe('TableFlow', function() {
    
    it('returns null when there are no params', function() {
        assert.strictEqual((new TableFlow()).hasOwnProperty('_dataTableFlow'), false);
    });

    it('returns null when there is no valid graphsocket in params', function() {
        assert.strictEqual((new TableFlow(2, 3)).hasOwnProperty('_dataTableFlow'), false);
    });

    it('returns null when params are not valid', function() {
        assert.strictEqual((new TableFlow(2, {_namespace: 2})).hasOwnProperty('_dataTableFlow'), false);
    });

    it('calls the parent constructor with the params specified', function() {
        var flow1=new TableFlow({ID: 'flow1'},new socketMock());
        assert.strictEqual(flow1._dataTableFlow._ID, 'flow1');
        assert.strictEqual(flow1._graphSocket._namespace, 'flow1');
    });

    describe('#addRecord', function() {
        it('returns 143 if record is invalid', function() {
            var flow1=new TableFlow({ID: 'flow1'},new socketMock());
            assert.strictEqual(flow1.addRecord(), 143);
            
        });
        it('returns valid norrisRecordID if record is valid', function() {
            var mock=new socketMock();
            var flow1=new TableFlow({
                ID: 'flow1',
                columnKeys: ['col1','col2']
            },mock);
            var ID=flow1.addRecord({temperature: 6, col1:1, col2:'2', appearance:[{bg:'#000', text:'#FFF'},{bg:'#000', text:'#FFA'}]});
            assert.strictEqual(ID.indexOf('flow1'), 0);
            assert.strictEqual(mock.p1, 'updateFlowData');
            assert.deepEqual(mock.p2,{
                action: 'insertRecords',
                ID: 'flow1',
                records: [{
                    norrisRecordID: ID,
                    value: [1,'2'],
                    appearance:[
                        {bg:'#000', text:'#FFF'},
                        {bg:'#000', text:'#FFA'}
                    ]
                }]
            });
            ID=flow1.addRecord({temperature: 6, col1:1, col2:'3', appearance:[{bg:'#000', text:'#FFF'},{bg:'#000', text:'#FF'}]});
            assert.strictEqual(mock.p1, 'updateFlowData');
            assert.deepEqual(mock.p2,{
                action: 'insertRecords',
                ID: 'flow1',
                records: [{
                    norrisRecordID: ID,
                    value: [1,'3'],
                    appearance: undefined
                }]
            });
        });
    });

    describe('#updateRecord', function() {
        it('returns 143 if record is invalid', function() {
            var flow1=new TableFlow({ID: 'flow1'},new socketMock());
            flow1.addRecord({'tempo': 1, 'temperatura': 25});
            assert.strictEqual(flow1.updateRecord(), 141);
        });
        it('returns 142 if no ID in records', function() {
            var flow1=new TableFlow({ID: 'flow1'},new socketMock());
            var ID=flow1.addRecord({'tempo': 1, 'temperatura': 25});
            assert.strictEqual(flow1.updateRecord(ID+'32442',{'tempo': 4, 'temperatura': 33, appearance:[{bg:'#000', text:'#FFF'},{bg:'#000', text:'#FFF'}]}), 142);
        });
        it('returns 142 if invalid ID', function() {
            var flow1=new TableFlow({ID: 'flow1'},new socketMock());
            var ID=flow1.addRecord({'tempo': 1, 'temperatura': 25});
            assert.strictEqual(flow1.updateRecord('sad'+ID,{'tempo': 4, 'temperatura': 33, appearance:[{bg:'#000', text:'#FFF'},{bg:'#000', text:'#FFF'}]}), 142);
        });
        it('returns true with correct update', function() {
            var mock=new socketMock();
            var flow1=new TableFlow({
                    ID: 'flow1',
                    filters: 'temperature>3',
                    columnKeys: ['col1','col2']
                }, mock);
            var ID=flow1.addRecord({temperature: 5, col1:1, col2:'2', appearance:[{bg:'#000', text:'#FFF'},{bg:'#000', text:'#FFF'}]});
            flow1.addRecord({temperature: 6, col1:1, col2:'2'});
            flow1.updateRecord(ID, {temperature: 0, col1:1, col2:'2', appearance:[{bg:'#000', text:'#FFF'},{bg:'#000', text:'#FFF'}]});
            assert.strictEqual(mock.p1, 'updateFlowData');
            assert.deepEqual(mock.p2, {
                action: 'deleteRecord',
                ID: 'flow1',
                norrisRecordID: ID
            });
            flow1.updateRecord(ID, {temperature: 5, col1:1, col2:'2', appearance:[{bg:'#000', text:'#FFF'},{bg:'#000', text:'#FFA'}]});
            assert.strictEqual(mock.p1, 'updateFlowData');
            assert.deepEqual(mock.p2, {
                action: 'insertRecords',
                ID: 'flow1',
                records: [{
                    norrisRecordID: ID,
                    value: [1,'2'],
                    appearance:[
                        {bg:'#000', text:'#FFF'},
                        {bg:'#000', text:'#FFA'}
                    ]
                }]
            });
            flow1.updateRecord(ID, {temperature: 6, col1:1, col2:'2', appearance:[{bg:'#000', text:'#FFF'},{bg:'#000', text:'#FF'}]});
            assert.strictEqual(mock.p1, 'updateFlowData');
            assert.deepEqual(mock.p2, {
                action: 'updateRecord',
                ID: 'flow1',
                norrisRecordID: ID,
                value: [1,'2'],
                appearance: undefined
            });
        });
    });

    describe('#getReplaceDataJSON', function() {
        it('returns correct JSON', function() {
            var flow1=new TableFlow({ID: 'flow1', name: 'tabella', columnKeys: ['col1','col2']},new socketMock());
            var ID1=flow1.addRecord({col1: 1, col2:'2', col3:'notThis'});
            var ID2=flow1.addRecord({col1: 0, col2:0, col3:'notThis', appearance:[{bg:'#000', text:'#FFF'},{bg:'#000', text:'#FFF'}]});
            var ID3=flow1.addRecord({col1: 2, col2:1.2});
            assert.deepEqual(flow1.getReplaceDataJSON(),{
                'action':'replaceData',
                'ID':'flow1',
                'records':[
                    {'norrisRecordID':ID1,'value':[1,'2'], appearance: undefined},
                    {'norrisRecordID':ID2,'value':[0,0], appearance: [{bg:'#000', text:'#FFF'},{bg:'#000', text:'#FFF'}]},
                    {'norrisRecordID':ID3,'value':[2,1.2], appearance: undefined}
                ]
            });
        });
    });

    describe('#updateProperties', function() {
        it('update correct properties', function() {
            var mock=new socketMockHistory();
            var flow1=new TableFlow({ID: 'flow1', name: 'tabella', columnKeys: ['col1','col2']}, mock);
            var ID1=flow1.addRecord({temperatura: '6', col1: 1, col2:'2', col3:'notThis'});
            var ID2=flow1.addRecord({temperatura: '5', col1: 0, col2:0, col3:'notThis'});
            var ID3=flow1.addRecord({temperatura: '6', col1: 2, col2:1.2});
            flow1.addRecord({temperatura: '0', col1: 6, col2: 0});
            flow1.addRecord({col1: 10, col2: 0});
            flow1.updateProperties({name: 'tabella',filters: 'temperatura>3'});
            assert.strictEqual(flow1._dataTableFlow._name,'tabella');
            assert.strictEqual(mock.p1[mock.p1.length-2],'updateFlowData');
            assert.deepEqual(mock.p2[mock.p1.length-2],{
                action: 'replaceData',
                ID: 'flow1',
                records: [
                    {norrisRecordID: ID1,
                    value: [1,'2'],
                    appearance: undefined},
                    {norrisRecordID: ID2,
                    value: [0,0],
                    appearance: undefined},
                    {norrisRecordID: ID3,
                    value: [2,1.2],
                    appearance: undefined},
                ]
            });
            assert.strictEqual(mock.p1[mock.p1.length-1],'updateFlowProp');
            assert.deepEqual(mock.p2[mock.p1.length-1],{'ID': 'flow1', 'name':'tabella','filters':'temperatura>3'});
        });
    });

    describe('#getProperties', function() {
        it('returns the param properties', function() {
            var prop={
                ID: 'flow1',
                columnKeys: ['213'],
                columnFormats: {'213':'toInt'},
                maxItems: 2,
                maxItemsSaved: 1000
            };
            var flow1=new TableFlow(prop, new socketMock());
            var result=flow1.getProperties();
            assert.strictEqual(result.ID, prop.ID);
            assert.strictEqual(result.columnKeys, prop.columnKeys);
            assert.strictEqual(result.columnFormats, prop.columnFormats);
            assert.strictEqual(result.maxItems, prop.maxItems);
            assert.strictEqual(result.maxItemsSaved, prop.maxItemsSaved);
        });
    });

	describe('#getData', function() {
		it('returns empty array if there is no data', function() {
			var flow1=new TableFlow({ID: 'flow1'}, new socketMock());
			assert.strictEqual(flow1.getData().length, 0);
		});
		it('returns the right data', function() {
			var flow1=new TableFlow({ID: 'flow1'}, new socketMock());
			flow1.addRecord({temperature: 2, pressure: 4});
            flow1.addRecord({temperature: 2, pressure: 4});
            var recs=flow1.getData();
			assert.strictEqual(recs[0].temperature, 4);
            assert.strictEqual(recs[1].temperature, 1);
		});
    });
});