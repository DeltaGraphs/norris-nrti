/*jshint node: true, -W106 */
'use strict';

/*
* Name : lineChartFlowModelSpec.js
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

var LineChartFlowModel = require('../../../lib/dataTier/flow/lineChartFlowModel.js');
var assert = require('assert');

describe('LineChartFlowModel', function() {
    
    it('returns null when there are no params', function() {
        assert.strictEqual((new LineChartFlowModel()).hasOwnProperty('_name'), false);
    });

    it('returns null when there is no valid ID in params', function() {
        assert.strictEqual((new LineChartFlowModel({})).hasOwnProperty('_name'), false);
    });

    it('returns null when there is a empty ID in params', function() {
        assert.strictEqual((new LineChartFlowModel({ID:' '})).hasOwnProperty('_name'), false);
    });

    it('calls the parent constructor with the params specified', function() {
        var flow1=new LineChartFlowModel({
            ID:'flow1',
            name: 'line chart flow'
        });
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._name, 'line chart flow');
        assert.strictEqual(flow1._type, 'LineChartFlow');
    });

    it('set default values to property not specified', function() {
        var flow1=new LineChartFlowModel({ID:'flow1'});
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._xKey, null);
        assert.strictEqual(flow1._yKey, null);
        assert.strictEqual(flow1._xFormat, null);
        assert.strictEqual(flow1._yFormat, null);
        assert.strictEqual(flow1._flowColor, null);
        assert.strictEqual(flow1._marker, 'none');
        assert.strictEqual(flow1._interpolation, 'linear');
        assert.strictEqual(flow1._area, 'none');
        assert.strictEqual(flow1._maxItems, 50);
        assert.strictEqual(flow1._maxItemsSaved, 500);
    });

	it('set default values to wrong properties', function() {
        var flow1=new LineChartFlowModel({
            ID: 'flow1',
            xKey: 1,
            yKey: {},
            xFormat: 'ttt',
            yFormat: 2,
            flowColor: 2,
            marker: 2,
            interpolation: 3,
            area: 3,
            maxItems: -2,
            maxItemsSaved: '123'
        });
		assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._xKey, null);
        assert.strictEqual(flow1._yKey, null);
        assert.strictEqual(flow1._xFormat, null);
        assert.strictEqual(flow1._yFormat, null);
        assert.strictEqual(flow1._flowColor, null);
        assert.strictEqual(flow1._marker, 'none');
        assert.strictEqual(flow1._interpolation, 'linear');
        assert.strictEqual(flow1._area, 'none');
        assert.strictEqual(flow1._maxItems, 50);
        assert.strictEqual(flow1._maxItemsSaved, 500);
    });

	it('set param values to properties', function() {
        var flow1=new LineChartFlowModel({
            ID: 'flow1',
            xKey: 'temperature',
            yKey: 'pressure',
            xFormat: 'toInt',
            yFormat: 'toFloat',
            flowColor: '#FFFFFF',
            marker: 'diamond',
            interpolation: 'basis',
            area: '#012345',
            maxItems: 2,
            maxItemsSaved: 1000
        });
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._xKey, 'temperature');
        assert.strictEqual(flow1._yKey, 'pressure');
        assert.strictEqual(flow1._xFormat, 'toInt');
        assert.strictEqual(flow1._yFormat, 'toFloat');
        assert.strictEqual(flow1._flowColor, '#FFFFFF');
        assert.strictEqual(flow1._marker, 'diamond');
        assert.strictEqual(flow1._interpolation, 'basis');
        assert.strictEqual(flow1._area, '#012345');
        assert.strictEqual(flow1._maxItems, 2);
        assert.strictEqual(flow1._maxItemsSaved, 1000);
    });

    describe('#addRecord', function() {
        it('does not add a invalid record', function() {
            var flow1=new LineChartFlowModel({ID: 'flow1'});
            assert.strictEqual(flow1.addRecord(), 123);
            assert.strictEqual(flow1.addRecord(2), 123);
        });
        it('adds a valid record', function() {
            var flow1=new LineChartFlowModel({ID: 'flow1'});
            var ID=flow1.addRecord({temperature: 2});
            assert.strictEqual(ID.indexOf('flow1'), 0);
            assert.strictEqual(flow1._records.length, 1);
            assert.strictEqual(flow1._records[0].norrisRecordID.indexOf('flow1'), 0);
        });
    });

    describe('#updateRecord', function() {
        it('return 121 if record is not valid', function() {
            var flow1=new LineChartFlowModel({ID: 'flow1'});
            assert.strictEqual(flow1.updateRecord(1), 121);
            assert.strictEqual(flow1.updateRecord(1, [{asd:'asd'}]), 121);
        });
        it('return 122 if index is not valid', function() {
            var flow1=new LineChartFlowModel({ID: 'flow1'});
            flow1._records=[{temperature: 2, norrisRecordID: 'flow1whatever0'}];
            assert.strictEqual(flow1.updateRecord('flow2whaterver0', {temperature: 2}), 122);
            assert.strictEqual(flow1.updateRecord('flow1whaterver1', {temperature: 2}), 122);
            assert.strictEqual(flow1.updateRecord('asd', {temperature: 2}), 122);
        });
        it('updates and validate the record if ID and record are valid', function() {
            var flow1=new LineChartFlowModel({
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
        it('returns the param properties', function() {
            var prop={
                ID: 'flow1',
                xKey: 'temperature',
                yKey: 'pressure',
                xFormat: 'toInt',
                yFormat: 'toFloat',
                flowColor: '#FFFFFF',
                marker: 'diamond',
                interpolation: 'basis',
                area: '#012345',
                maxItems: 2,
                maxItemsSaved: 1000
            };
            var flow1=new LineChartFlowModel(prop);
            var result=flow1.getProperties();
            assert.strictEqual(result.ID, prop.ID);
            assert.strictEqual(result.xKey, prop.xKey);
            assert.strictEqual(result.yKey, prop.yKey);
            assert.strictEqual(result.xFormat, prop.xFormat);
            assert.strictEqual(result.yFormat, prop.yFormat);
            assert.strictEqual(result.flowColor, prop.flowColor);
            assert.strictEqual(result.marker, prop.marker);
            assert.strictEqual(result.interpolation, prop.interpolation);
            assert.strictEqual(result.area, prop.area);
            assert.strictEqual(result.maxItems, prop.maxItems);
            assert.strictEqual(result.maxItemsSaved, prop.maxItemsSaved);
        });
    });

});