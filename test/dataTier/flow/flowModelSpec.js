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
        assert.strictEqual(flow1._progressiveIndex, 0);
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
        assert.strictEqual(flow1._progressiveIndex, 0);
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
        assert.strictEqual(flow1._progressiveIndex, 0);
    });

    describe('#generateNorrisRecordID', function() {
		it('generate the right ID', function() {
			var flow1=new FlowModel({ID: 'flow1'});
            flow1._progressiveIndex=100;
			assert.strictEqual(flow1.generateNorrisRecordID().indexOf('flow1'), 0);
            assert.notStrictEqual(flow1.generateNorrisRecordID().indexOf('_2'), -1);
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
			flow1._records=[
                {temperature: 4},
                {temperature: 1},
            ];
            flow1.validateData();
            var recs=flow1.getData();
			assert.strictEqual(recs[0].temperature, 4);
            assert.strictEqual(recs[1].temperature, 1);
		});
    });

    describe('#validateData', function() {
		it('sets valid only valid records', function() {
            var flow1=new FlowModel({
                ID: 'flow1',
                filters: 'temperature>2',
            });
            flow1._records=[
                {temperature: 4},
                {temperature: 1},
            ];
            flow1.validateData();
            assert.strictEqual(flow1._records[0].norrisRecordIsValid, true);
            assert.strictEqual(flow1._records[1].norrisRecordIsValid, false);
        });
    });

	describe('#validateRecord', function() {
		it('sets valid a valid record', function() {
            var flow1=new FlowModel({
                ID: 'flow1',
                filters: 'temperature>2, pressure!=3',
            });
            flow1._records=[{temperature: 4, pressure: 2}];
            flow1.validateRecord(0);
            assert.strictEqual(flow1._records[0].norrisRecordIsValid, true);
        });
        it('sets unvalid a valid record', function() {
            var flow1=new FlowModel({
                ID: 'flow1',
                filters: 'temperature>2, pressure!=3',
            });
            flow1._records=[{temperature: 4, pressure: 3}];
            flow1.validateRecord(0);
            assert.strictEqual(flow1._records[0].norrisRecordIsValid, false);
        });
    });

	describe('#updateBaseProperties', function() {
        it('returns 252 if there are no params specified', function() {
            var flow1=new FlowModel({ID: 'flow1'});
            var updates=flow1.updateBaseProperties();
            assert.strictEqual(updates, 252);
        });
		it('updates and returns the properties passed as param', function() {
            var properties={
                name: 'flow one',
                filters: 'temperature>2',
            };
            var flow1=new FlowModel({ID: 'flow1'});
            var updates=flow1.updateBaseProperties(properties);
            var instanceOfFilterModel=(flow1._filters instanceof FilterModel);
			assert.strictEqual(flow1._name, 'flow one');
			assert.strictEqual(instanceOfFilterModel, true);

            assert.strictEqual(updates.name, 'flow one');
            assert.strictEqual(updates.filters, 'temperature>2');
        });
        it('does not update the properties with wrong param', function() {
            var properties={
                name: 2,
                filters: 2,
            };
            var flow1=new FlowModel({ID: 'flow1'});
            flow1.updateBaseProperties(properties);
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

    describe('#getRecordByID', function() {
        it('returns 155 if ID is not valid', function() {
            var flow1=new FlowModel({ID: 'flow1'});
            flow1._records=[
                {temperature: 4, norrisRecordID: flow1.generateNorrisRecordID()},
                {pressure: 3, norrisRecordID: flow1.generateNorrisRecordID()}
            ];
            assert.strictEqual(flow1.getRecordByID(2), 155);
            assert.strictEqual(flow1.getRecordByID('flow2asd'), 155);
            assert.strictEqual(flow1.getRecordByID('flow1asd'), 155);
        });
        it('returns the record if ID is valid', function() {
            var flow1=new FlowModel({ID: 'flow1'});
            var ID=flow1.generateNorrisRecordID();
            var ID2=flow1.generateNorrisRecordID();
            flow1._records=[
                {temperature: 4, norrisRecordID: ID},
                {pressure: 3, norrisRecordID: ID2}
            ];
            assert.strictEqual(flow1.getRecordByID(ID).temperature, 4);
            assert.strictEqual(flow1.getRecordByID(ID2).pressure, 3);
        });
    });
});