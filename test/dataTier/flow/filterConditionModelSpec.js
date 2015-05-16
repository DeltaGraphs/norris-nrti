/*jshint node: true, -W106 */
'use strict';

/*
* Name : filterConditionModelSpec.js
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


var FilterConditionModel = require('../../../lib/dataTier/flow/filterConditionModel.js');
var assert = require('assert');

describe('FilterConditionModel', function() {
	it('test invalid condition 1', function() {
		var fcm1=new FilterConditionModel('');
        assert.deepEqual(fcm1.hasOwnProperty('_key'), false);
    });
	it('test invalid condition 2', function() {
		var fcm2=new FilterConditionModel('xs>');
        assert.deepEqual(fcm2.hasOwnProperty('_key'), false);
    });
    it('test invalid condition 3', function() {
		var fcm3=new FilterConditionModel(23);
        assert.deepEqual(fcm3.hasOwnProperty('_key'), false);
    });
    it('test correct condition', function() {
		var fcm2=new FilterConditionModel('xs>23');
        assert.deepEqual(JSON.stringify(fcm2),'{"_key":"xs","_operator":">","_value":23}');
    });
    describe('#validateRecord', function() {
		var fcm3=new FilterConditionModel('xs==23');
        it('test invalid record', function() {
            assert.deepEqual(fcm3.validateRecord({}), false);
        });
        it('test invalid key', function() {
            assert.deepEqual(fcm3.validateRecord({xd:23}), false);
        });
        it('test invalid value', function() {
            assert.deepEqual(fcm3.validateRecord({xs:4}), false);
        });
        it('test == valid', function() {
            assert.deepEqual(fcm3.validateRecord({xs:23}), true);
        });
        fcm3=new FilterConditionModel('xs!=23');
        it('test invalid !=', function() {
            assert.deepEqual(fcm3.validateRecord({xs:23}), false);
        });
        it('test valid !=', function() {
            assert.deepEqual(fcm3.validateRecord({xs:6}), true);
        });
        fcm3=new FilterConditionModel('xs>23');
        it('test invalid >', function() {
            assert.deepEqual(fcm3.validateRecord({xs:23}), false);
        });
        it('test valid >', function() {
            assert.deepEqual(fcm3.validateRecord({xs:25}), true);
        });
        fcm3=new FilterConditionModel('xs>=23');
        it('test invalid >=', function() {
            assert.deepEqual(fcm3.validateRecord({xs:22}), false);
        });
        it('test valid >=', function() {
            assert.deepEqual(fcm3.validateRecord({xs:25}), true);
        });
        fcm3=new FilterConditionModel('xs<23');
        it('test invalid <', function() {
            assert.deepEqual(fcm3.validateRecord({xs:28}), false);
        });
        it('test valid <', function() {
            assert.deepEqual(fcm3.validateRecord({xs:2}), true);
        });
        fcm3=new FilterConditionModel('xs<=23');
        it('test invalid <=', function() {
            assert.deepEqual(fcm3.validateRecord({xs:24}), false);
        });
        it('test valid <=', function() {
            assert.deepEqual(fcm3.validateRecord({xs:23}), true);
        });
    });
});