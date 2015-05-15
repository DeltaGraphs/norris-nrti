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

var FlowModel = require('../../../lib/dataTier/flow/flowModel.js');
var assert = require('assert');

describe('FlowModel', function() {
    
    it('returns null when there are no params', function() {
        assert.strictEqual((new FlowModel()).hasOwnProperty('_name'), false);
    });

    it('returns null when there is no valid ID in params', function() {
        assert.strictEqual((new FlowModel({})).hasOwnProperty('_name'), false);
    });

    it('returns null when there is a empty ID in params', function() {
        assert.strictEqual((new FlowModel({ID:' '})).hasOwnProperty('_name'), false);
    });

    it('set default values to property not specified', function() {
        var flow1=new FlowModel({ID:'flow1'});
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._name, '');
        assert.strictEqual(flow1._type, '');
        assert.strictEqual(flow1._filters, null);
        assert.strictEqual(flow1._records.length, 0);

    });

	it('set default values to wrong properties', function() {
        var flow1=new FlowModel({
            ID: 'flow1',
            name: 1,
            type: 1,
            filters: 1
        });
		assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._name, '');
        assert.strictEqual(flow1._type, '');
        assert.strictEqual(flow1._filters, null);
        assert.strictEqual(flow1._records.length, 0);
    });

	it('set param values to properties', function() {
        var flow1=new FlowModel({
            ID: 'flow1',
            name: 'flow one',
            type: 'BarChartFlow',
            filters: 'temperature > 2'
        });
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._name, 'flow one');
        assert.strictEqual(flow1._type, 'BarChartFlow');
        assert.strictEqual(flow1._filters, 'temperature > 2');
        assert.strictEqual(flow1._records.length, 0);
    });

    /*describe('#generateNorrisRecordID', function() {
        //to do
    });*/
});