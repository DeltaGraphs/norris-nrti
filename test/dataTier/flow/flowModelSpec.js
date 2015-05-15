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
var FilterModel = require('../../../lib/dataTier/flow/filterModel.js');
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
        var instanceOfFilterModel=(flow1._filters instanceof FilterModel);
        assert.strictEqual(flow1._ID, 'flow1');
        assert.strictEqual(flow1._name, 'flow one');
        assert.strictEqual(flow1._type, 'BarChartFlow');
        assert.strictEqual(instanceOfFilterModel, true);
        assert.strictEqual(flow1._records.length, 0);
    });

    describe('#generateNorrisRecordID', function() {
		it('generate the right ID with no number specified', function() {
			var flow1=new FlowModel({ID: 'flow1'});
			var date = new Date();
			var expected='flow1'.concat(date.getTime()).concat(0);
			assert.strictEqual(flow1.generateNorrisRecordID(), expected);
        });
        it('generate the right ID with number specified', function() {
			var flow1=new FlowModel({ID: 'flow1'});
			var date = new Date();
			var expected='flow1'.concat(date.getTime()).concat(2);
			assert.strictEqual(flow1.generateNorrisRecordID(2), expected);
        });
    });

	/*describe('#getProperties', function() {
		//TODO
    });*/

	describe('#getData', function() {
		it('returns empty array if there is no data', function() {
			var flow1=new FlowModel({ID: 'flow1'});
			assert.strictEqual(flow1.getData().length, 0);
		});
		it('returns the right data', function() {
			var flow1=new FlowModel({ID: 'flow1'});
			flow1._records=[1,2];
			assert.deepEqual(flow1.getData(), [1,2]);
		});
    });

    /*describe('#updateRecord', function() {
		//TODO
    });*/

    /*describe('#validateData', function() {
		//TODO
    });*/

	/*describe('#validateRecord', function() {
		//TODO
    });*/

	describe('#updateProperties', function() {
		it('updates the properties passed as param', function() {
            var properties={
                name: 'flow one',
                filters: 'temperature > 2',
            };
            var flow1=new FlowModel({ID: 'flow1'});
            flow1.updateProperties(properties);
            var instanceOfFilterModel=flow1._filters instanceof FilterModel;
			assert.strictEqual(flow1._name, 'flow one');
			assert.strictEqual(instanceOfFilterModel, true);
        });
        it('does not update the properties with wrong param', function() {
            var properties={
                name: 2,
                filters: 2,
            };
            var flow1=new FlowModel({ID: 'flow1'});
            flow1.updateProperties(properties);
			assert.strictEqual(flow1._name, '');
			assert.strictEqual(flow1._filters, null);
        });
    });
});