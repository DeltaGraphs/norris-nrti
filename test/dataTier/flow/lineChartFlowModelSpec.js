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
            assert.strictEqual(flow1.addRecord(), 121);
            assert.strictEqual(flow1.addRecord(2), 121);
        });
        it('adds a valid record', function() {
            var flow1=new LineChartFlowModel({ID: 'flow1'});
            var ID=flow1.addRecord({temperature: 2});
            assert.strictEqual(ID.indexOf('flow1'), 0);
            assert.strictEqual(flow1._records.length, 1);
            assert.strictEqual(flow1._records[0].norrisRecordID.indexOf('flow1'), 0);
        });
    });
});