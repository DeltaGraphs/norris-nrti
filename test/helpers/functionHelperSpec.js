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
});