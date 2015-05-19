/*jshint node: true, -W106 */
'use strict';

/*
* Name : tableFlowModelSpec.js
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

var TableFlowModel = require('../../../lib/dataTier/flow/tableFlowModel.js');
var assert = require('assert');

describe('TableFlowModel', function() {
    
    it('returns null when there are no params', function() {
        assert.strictEqual((new TableFlowModel()).hasOwnProperty('_name'), false);
    });

    it('returns null when there is no valid ID in params', function() {
        assert.strictEqual((new TableFlowModel({})).hasOwnProperty('_name'), false);
    });

    it('returns null when there is a empty ID in params', function() {
        assert.strictEqual((new TableFlowModel({ID:' '})).hasOwnProperty('_name'), false);
    });

    it('calls the parent constructor with the params specified', function() {
        var flow1=new TableFlowModel({
            ID:'flow1',
            name: 'table flow'
        });
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._name, 'table flow');
        assert.strictEqual(flow1._type, 'TableFlow');
    });

    it('set default values to property not specified', function() {
        var flow1=new TableFlowModel({ID:'flow1'});
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._columnKeys.length, 0);
        assert.strictEqual(flow1._columnFormats, null);
        assert.strictEqual(flow1._maxItems, 50);
        assert.strictEqual(flow1._maxItemsSaved, 500);
    });

	it('set default values to wrong properties', function() {
        var flow1=new TableFlowModel({
            ID: 'flow1',
            columnKeys: [2, {id: 2}],
            maxItems: -2,
            maxItemsSaved: 'a'
        });
        var flow2=new TableFlowModel({
            ID: 'flow1',
            columnKeys: ['temp'],
            columnFormats: {'temp':'ttt'}
        });
		assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._columnKeys.length, 0);
        assert.strictEqual(flow1._maxItems, 50);
        assert.strictEqual(flow1._maxItemsSaved, 500);
        assert.strictEqual(flow2._columnFormats, null);
    });

	it('set param values to properties', function() {
        var flow1=new TableFlowModel({
            ID: 'flow1',
            columnKeys: ['213'],
            columnFormats: {'213':'toInt'},
            maxItems: 2,
            maxItemsSaved: 1000
        });
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._columnKeys.length, 1);
        assert.deepEqual(flow1._columnFormats, {'213':'toInt'});
        assert.strictEqual(flow1._maxItems, 2);
        assert.strictEqual(flow1._maxItemsSaved, 1000);
    });

    describe('#addRecord', function() {
        it('does not add a invalid record', function() {
            var flow1=new TableFlowModel({ID: 'flow1'});
            assert.strictEqual(flow1.addRecord(), 143);
            assert.strictEqual(flow1.addRecord(2), 143);
        });
        it('adds a valid record', function() {
            var flow1=new TableFlowModel({ID: 'flow1'});
            var ID=flow1.addRecord({temperature: 2});
            assert.strictEqual(ID.indexOf('flow1'), 0);
            assert.strictEqual(flow1._records.length, 1);
            assert.strictEqual(flow1._records[0].norrisRecordID.indexOf('flow1'), 0);
        });
    });

    describe('#updateRecord', function() {
        it('return 141 if record is not valid', function() {
            var flow1=new TableFlowModel({ID: 'flow1'});
            assert.strictEqual(flow1.updateRecord(1), 141);
            assert.strictEqual(flow1.updateRecord(1, [{asd:'asd'}]), 141);
            assert.strictEqual(flow1.updateRecord(1, 2), 141);
        });
        it('return 142 if index is not valid', function() {
            var flow1=new TableFlowModel({ID: 'flow1'});
            flow1._records=[{temperature: 2, norrisRecordID: 'flow1whatever0'}];
            assert.strictEqual(flow1.updateRecord('flow2whaterver0', {temperature: 2}), 142);
            assert.strictEqual(flow1.updateRecord('flow1whaterver1', {temperature: 2}), 142);
            assert.strictEqual(flow1.updateRecord('asd', {temperature: 2}), 142);
        });
        it('updates and validate the record if ID and record are valid', function() {
            var flow1=new TableFlowModel({
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
    describe('#getProperties', function() {
        var prop={
            ID: 'flow1',
            name: 'flow one',
            filters: null,
            columnKeys: ['213'],
            columnFormats: {'213':'toInt'},
            maxItems: 2,
            maxItemsSaved: 1000
        };
        var flow1=new TableFlowModel(prop);
        assert.deepEqual(flow1.getProperties(), prop);
    });

});