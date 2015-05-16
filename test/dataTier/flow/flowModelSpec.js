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
            filters: 'temperature>2, pressure!=3'
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
			assert.strictEqual(flow1.generateNorrisRecordID().indexOf('flow1'), 0);
        });
        it('generate the right ID with number specified', function() {
			var flow1=new FlowModel({ID: 'flow1'});
			assert.strictEqual(flow1.generateNorrisRecordID(2).indexOf('flow1'), 0);
        });
    });

	describe('#getProperties', function() {
		it('returns the right properties', function() {
            var prop={
                ID: 'flow1',
                name: 'flow one',
                filters: 'temperature>2'
            };
            var flow1=new FlowModel(prop);
            assert.deepEqual(flow1.getProperties(), prop);
        });
    });

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

    describe('#updateRecord', function() {
		it('return 251 if record is not valid', function() {
            var flow1=new FlowModel({ID: 'flow1'});
            assert.strictEqual(flow1.updateRecord(1), 251);
            assert.strictEqual(flow1.updateRecord(1, [{asd:'asd'}]), 251);
        });
        it('return 252 if ID_index is not valid', function() {
            var flow1=new FlowModel({ID: 'flow1'});
            flow1._records=[{temperature: 2, norrisRecordID: 'flow1whatever0'}];
            assert.strictEqual(flow1.updateRecord('flow2whaterver0', {temperature: 2}), 252);
            assert.strictEqual(flow1.updateRecord('flow1whaterver1', {temperature: 2}), 252);
            assert.strictEqual(flow1.updateRecord('asd', {temperature: 2}), 252);
            assert.strictEqual(flow1.updateRecord(2, {temperature: 2}), 252);
        });
        it('updates and validate the record if ID and record are valid', function() {
            var flow1=new FlowModel({
                    ID: 'flow1',
                    filters: 'temperature>3'
                });
            flow1._records=[{temperature: 2, norrisRecordID: 'flow1whatever0'}];
            flow1.validateRecord(0);
            assert.strictEqual(flow1._records[0].norrisIsValid, false);
            var update=flow1.updateRecord('flow1whatever0', {temperature: 4});
            assert.strictEqual(update, true);
            assert.strictEqual(flow1._records[0].temperature, 4);
            assert.strictEqual(flow1._records[0].norrisRecordID.indexOf('flow1'), 0);
            assert.strictEqual(flow1._records[0].norrisIsValid, true);
        });
        it('updates and validate the record if index and record are valid', function() {
            var flow1=new FlowModel({
                    ID: 'flow1',
                    filters: 'temperature>3'
                });
            flow1._records=[
                {temperature: 6, norrisRecordID: 'flow1whatever0'},
                {temperature: 2, norrisRecordID: 'flow1whatever1'}
            ];
            flow1.validateData();
            assert.strictEqual(flow1._records[1].norrisIsValid, false);
            var update=flow1.updateRecord(1, {temperature: 4});
            assert.strictEqual(update, true);
            assert.strictEqual(flow1._records[1].temperature, 4);
            assert.strictEqual(flow1._records[1].norrisRecordID.indexOf('flow1'), 0);
            assert.strictEqual(flow1._records[1].norrisIsValid, true);
        });
    });

    describe('#validateData', function() {
		it('sets valid only valid records', function() {
            var flow1=new FlowModel({
                ID: 'flow1',
                filters: 'temperature>2, pressure!=3',
            });
            flow1._records=[
                {temperature: 4},
                {temperature: 1},
                {pressure: 3},
                {pressure: 2}
            ];
            flow1.validateData();
            assert.strictEqual(flow1._records[0].norrisIsValid, true);
            assert.strictEqual(flow1._records[1].norrisIsValid, false);
            assert.strictEqual(flow1._records[2].norrisIsValid, false);
            assert.strictEqual(flow1._records[3].norrisIsValid, true);
        });
    });

	describe('#validateRecord', function() {
		it('sets valid a valid record', function() {
            var flow1=new FlowModel({
                ID: 'flow1',
                filters: 'temperature>2, pressure!=3',
            });
            flow1._records=[{temperature: 4}];
            flow1.validateRecord(0);
            assert.strictEqual(flow1._records[0].norrisIsValid, true);
        });
        it('sets unvalid a valid record', function() {
            var flow1=new FlowModel({
                ID: 'flow1',
                filters: 'temperature>2, pressure!=3',
            });
            flow1._records=[{pressure: 3}];
            flow1.validateRecord(0);
            assert.strictEqual(flow1._records[0].norrisIsValid, false);
        });
    });

	describe('#updateProperties', function() {
		it('updates the properties passed as param', function() {
            var properties={
                name: 'flow one',
                filters: 'temperature>2',
            };
            var flow1=new FlowModel({ID: 'flow1'});
            flow1.updateProperties(properties);
            var instanceOfFilterModel=(flow1._filters instanceof FilterModel);
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

    describe('#converter', function() {
        it('return int from \'-12.76\'', function() {
            var flow1=new FlowModel({ID: 'flow1'});
            assert.deepEqual(flow1.converter({numb:'"-12.76"'},'numb','toInt'), {numb: -12});
        });
        it('returns null from -A4.26', function() {
            var flow1=new FlowModel({ID: 'flow1'});
            assert.deepEqual(flow1.converter({numb:'\'-A4.26\''},'numb','toFloat'), null);
        });
    });
});