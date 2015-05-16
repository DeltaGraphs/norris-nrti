/*jshint node: true, -W106 */
'use strict';

/*
* Name : functionHelperSpec.js
* Module : UnitTest
* Location : /test/helpers
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-14   Matteo Furlan    Initial code
* =========================================================
*/

var FH = require('../../lib/helpers/functionHelper.js');
var assert = require('assert');

describe('FunctionHelper', function() {
    describe('#isHEX', function() {
        it('returns false when passed a non-string', function() {
            assert.strictEqual(FH.isHEX(12), false);
        });
        it('returns false when passed a non-string', function() {
            assert.strictEqual(FH.isHEX(true), false);
        });
        it('returns false when passed AbA9A0 without #', function() {
            assert.strictEqual(FH.isHEX('AbA9A0'), false);
        });
        it('returns TRUE when passed #AbA9A0', function() {
            assert.strictEqual(FH.isHEX('#AbA9A0'), true);
        });
        it('returns TRUE when passed #FFF', function() {
            assert.strictEqual(FH.isHEX('#FFF'), true);
        });
        it('returns FALSE when passed #AbA9AG', function() {
            assert.strictEqual(FH.isHEX('#AbA9AG'), false);
        });
        it('returns FALSE when passed #FGF', function() {
            assert.strictEqual(FH.isHEX('#FGF'), false);
        });
    });
    describe('#getCorrectType', function() {
        it('returns a string from string notation', function() {
            assert.strictEqual(FH.getCorrectType('\'hello\''), 'hello');
        });
        it('returns a string from malformed string notation', function() {
            assert.strictEqual(FH.getCorrectType('\'hello'), 'hello');
        });
        it('returns a string from string notation', function() {
            assert.strictEqual(FH.getCorrectType('-3.98'), -3.98);
        });
    });
    describe('#parseCondition', function() {
        it('returns 701 when passed a non-condition', function() {
            assert.strictEqual(FH.parseCondition(''), 701);
        });
        it('returns 701 when passed a semi-condition', function() {
            assert.strictEqual(FH.parseCondition('temperatura>'), 701);
        });
        it('returns correct object when passed temp>=0', function() {
            assert.deepEqual(JSON.stringify(FH.parseCondition('temp>=0')),'{"key":"temp","operator":">=","value":0}');
        });
        it('returns correct object when passed temp>=\'0\'', function() {
            assert.deepEqual(JSON.stringify(FH.parseCondition('temp>=0')),'{"key":"temp","operator":">=","value":0}');
        });
        it('returns correct object when passed temp>-1', function() {
            assert.deepEqual(JSON.stringify(FH.parseCondition('temp>-1')),'{"key":"temp","operator":">","value":-1}');
        });
        it('returns correct object when passed temp>=0', function() {
            assert.deepEqual(JSON.stringify(FH.parseCondition('temp<=0')),'{"key":"temp","operator":"<=","value":0}');
        });
        it('returns correct object when passed temp>=\'56\'', function() {
            assert.deepEqual(JSON.stringify(FH.parseCondition('temp<\'56\'')),'{"key":"temp","operator":"<","value":"56"}');
        });
        it('returns correct object when passed temp==10', function() {
            assert.deepEqual(JSON.stringify(FH.parseCondition('temp==10')),'{"key":"temp","operator":"==","value":10}');
        });
        it('returns correct object when passed temp!=100', function() {
            assert.deepEqual(JSON.stringify(FH.parseCondition('temp!=100')),'{"key":"temp","operator":"!=","value":100}');
        });
    });
    describe('#converter', function() {
        it('returns int from \'-12.76\'', function() {
            assert.strictEqual(FH.converter({numb:'"-12.76"'},'numb','toInt'), -12);
        });
        it('returns float from \'-14.26\'', function() {
            assert.strictEqual(FH.converter({numb:'\'-14.26\''},'numb','toFloat'), -14.26);
        });
        it('returns null from -A4.26', function() {
            assert.strictEqual(FH.converter({numb:'\'-A4.26\''},'numb','toFloat'), null);
        });
        it('returns null from toORARIO', function() {
            assert.strictEqual(FH.converter({numb:'\'-A4.26\''},'numb','toORARIO'), null);
        });
    });
    describe('#isValidFormat', function() {
        it('returns true for toInt', function() {
            assert.strictEqual(FH.converter('toInt'),true);
        });
        it('returns true for toFloat', function() {
            assert.strictEqual(FH.converter('toFloat'), true);
        });
        it('returns false for toORARIO', function() {
            assert.strictEqual(FH.converter('toORARIO'), false);
        });
    });
});