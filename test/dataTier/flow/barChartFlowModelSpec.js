/*jshint node: true, -W106 */
'use strict';

/*
* Name : filterModelSpec.js
* Module : UnitTest
* Location : /test/dataTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-14   Matteo Furlan    Initial code
* =========================================================
*/

var BarChartFlowModel = require('../../../lib/dataTier/flow/barChartFlowModel.js');
var assert = require('assert');

describe('BarChartFlowModel', function() {
    
    it('returns null when there are no params', function() {
        assert.strictEqual((new BarChartFlowModel()).hasOwnProperty('_name'), false);
    });

    it('returns null when there is no valid ID in params', function() {
        assert.strictEqual((new BarChartFlowModel({})).hasOwnProperty('_name'), false);
    });

    it('returns null when there is a empty ID in params', function() {
        assert.strictEqual((new BarChartFlowModel({ID:' '})).hasOwnProperty('_name'), false);
    });

    it('calls the parent constructor with the params specified', function() {
        var flow1=new BarChartFlowModel({
            ID:'flow1',
            name: 'bar chart flow'
        });
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._name, 'bar chart flow');
        assert.strictEqual(flow1._type, 'BarChartFlow');
    });

    it('set default values to property not specified', function() {
        var flow1=new BarChartFlowModel({ID:'flow1'});
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._indexKey, null);
        assert.strictEqual(flow1._valueKey, null);
        assert.strictEqual(flow1._indexFormat, null);
        assert.strictEqual(flow1._valueFormat, null);
        assert.strictEqual(flow1._flowColor, null);
    });

	it('set default values to wrong properties', function() {
        var flow1=new BarChartFlowModel({
            ID: 'flow1',
            indexKey: 1,
            valuekey: 2,
            indexFormat: 'tooooInt',
            valueFormat: 2,
            flowColor: 'asd',
            records: 2
        });
		assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._indexKey, null);
        assert.strictEqual(flow1._valueKey, null);
        assert.strictEqual(flow1._indexFormat, null);
        assert.strictEqual(flow1._valueFormat, null);
        assert.strictEqual(flow1._flowColor, null);
        assert.strictEqual(flow1._records.length, 0);
    });

	it('set param values to properties', function() {
        var flow1=new BarChartFlowModel({
            ID: 'flow1',
            indexKey: 'temperature',
            valueKey: 'pressure',
            indexFormat: 'toInt',
            valueFormat: 'toFloat',
            flowColor: '#FFFFFF'
        },[
            {temperature: 2, pressure: 4},
            {temperature: 2, pressure: 4}
        ]);
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._indexKey, 'temperature');
        assert.strictEqual(flow1._valueKey, 'pressure');
        assert.strictEqual(flow1._indexFormat, 'toInt');
        assert.strictEqual(flow1._valueFormat, 'toFloat');
        assert.strictEqual(flow1._flowColor, '#FFFFFF');
        assert.strictEqual(flow1._records.length, 2);
    });

    describe('#updateRecord', function() {
        it('return 251 if record is not valid', function() {
            var flow1=new BarChartFlowModel({ID: 'flow1'});
            assert.strictEqual(flow1.updateRecord(1), 111);
            assert.strictEqual(flow1.updateRecord(1, [{asd:'asd'}]), 111);
            assert.strictEqual(flow1.updateRecord(1, 2), 111);
        });
        it('return 252 if ID_index is not valid', function() {
            var flow1=new BarChartFlowModel({ID: 'flow1'}, [{temperature: 1}]);
            assert.strictEqual(flow1.updateRecord('asd', {temperature: 2}), 112);
            assert.strictEqual(flow1.updateRecord(2, {temperature: 2}), 112);
        });
        it('updates and validate the record if index and record are valid', function() {
            var flow1=new BarChartFlowModel({
                    ID: 'flow1',
                    filters: 'temperature>3'
                },[{temperature: 1}]);
            flow1.validateRecord(0);
            assert.strictEqual(flow1._records[0].norrisRecordIsValid, false);
            var update=flow1.updateRecord(0, {temperature: 4});
            assert.strictEqual(update, true);
            assert.strictEqual(flow1._records[0].temperature, 4);
            assert.strictEqual(flow1._records[0].norrisRecordIsValid, true);
        });
    });

});