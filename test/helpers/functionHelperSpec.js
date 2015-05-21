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
            assert.deepEqual(JSON.stringify(FH.converter({numb:'"-12.76"'},'numb','toInt')), '{"numb":-12}');
        });
        it('returns float from \'-14.26\'', function() {
            assert.deepEqual(JSON.stringify(FH.converter({numb:'\'-14.26\''},'numb','toFloat')), '{"numb":-14.26}');
        });
        it('returns null from -A4.26 toFloat', function() {
            assert.strictEqual(FH.converter({numb:'\'-A4.26\''},'numb','toFloat'), null);
        });
        it('returns null from -A4.26 toInt', function() {
            assert.strictEqual(FH.converter({numb:'\'-A4.26\''},'numb','toInt'), null);
        });
        it('returns null from toORARIO', function() {
            assert.strictEqual(FH.converter({numb:'\'-A4.26\''},'numb','toORARIO'), null);
        });
        it('returns null - not found record', function() {
            assert.strictEqual(FH.converter(null,'numb','toORARIO'), null);
        });
        it('returns null - not found record', function() {
            assert.strictEqual(FH.converter(undefined,'numb','toORARIO'), null);
        });
        it('returns null - not key record', function() {
            assert.strictEqual(FH.converter({numb:'\'-A4.26\''},'err','toORARIO'), null);
        });
    });
    describe('#isValidFormat', function() {
        it('returns true for toInt', function() {
            assert.strictEqual(FH.isValidFormat('toInt'),true);
        });
        it('returns true for toFloat', function() {
            assert.strictEqual(FH.isValidFormat('toFloat'), true);
        });
        it('returns false for toHour', function() {
            assert.strictEqual(FH.isValidFormat('toHour'), false);
        });
    });
    describe('#isValidMapFormat', function() {
        it('returns true for coordinates', function() {
            assert.strictEqual(FH.isValidMapFormat('coordinates'),true);
        });
        it('returns true for geographic', function() {
            assert.strictEqual(FH.isValidMapFormat('geographic'), true);
        });
        it('returns false for Hour', function() {
            assert.strictEqual(FH.isValidMapFormat('Hour'), false);
        });
    });
    describe('#isValidMarker', function() {
        it('returns true for none', function() {
            assert.strictEqual(FH.isValidMarker('none'),true);
        });
        it('returns true for square', function() {
            assert.strictEqual(FH.isValidMarker('square'), true);
        });
        it('returns true for triangle', function() {
            assert.strictEqual(FH.isValidMarker('triangle'), true);
        });
        it('returns true for circle', function() {
            assert.strictEqual(FH.isValidMarker('circle'), true);
        });
        it('returns true for diamond', function() {
            assert.strictEqual(FH.isValidMarker('diamond'), true);
        });
        it('returns false for line', function() {
            assert.strictEqual(FH.isValidMarker('line'), false);
        });
    });
    describe('#isValidMapMarker', function() {
        it('returns true for valid shape', function() {
            assert.strictEqual(FH.isValidMapMarker({type: 'shape', shape: 'square'}), true);
            assert.strictEqual(FH.isValidMapMarker({type: 'shape', shape: 'triangle'}), true);
            assert.strictEqual(FH.isValidMapMarker({type: 'shape', shape: 'circle'}), true);
            assert.strictEqual(FH.isValidMapMarker({type: 'shape', shape: 'diamond'}), true);
        });
        it('returns false for invalid shape', function() {
            assert.strictEqual(FH.isValidMapMarker({type: 'shape'}), false);
            assert.strictEqual(FH.isValidMapMarker({type: 'shape', shape: 'line'}), false);
        });
        it('returns true for valid icon', function() {
            assert.strictEqual(FH.isValidMapMarker({type: 'icon', icon: 'images/mark.png'}), true);
        });
        it('returns false for invalid icon', function() {
            assert.strictEqual(FH.isValidMapMarker({type: 'icon'}), false);
            assert.strictEqual(FH.isValidMapMarker({type: 'icon', icon: 2}), false);
        });
        it('returns true for valid text', function() {
            assert.strictEqual(FH.isValidMapMarker({type: 'text', text: 'flow1', color: '#000'}), true);
        });
        it('returns false for invalid text', function() {
            assert.strictEqual(FH.isValidMapMarker({type: 'text'}), false);
            assert.strictEqual(FH.isValidMapMarker({type: 'text', text: 2}), false);
            assert.strictEqual(FH.isValidMapMarker({type: 'text', text: 'flow1', color: 'a'}), false);
        });
        it('returns false for 2', function() {
            assert.strictEqual(FH.isValidMapMarker('2'), false);
        });
    });
    describe('#isValidInterpolation', function() {
        it('returns true for linear', function() {
            assert.strictEqual(FH.isValidInterpolation('linear'),true);
        });
        it('returns true for step', function() {
            assert.strictEqual(FH.isValidInterpolation('step'), true);
        });
        it('returns true for basis', function() {
            assert.strictEqual(FH.isValidInterpolation('basis'), true);
        });
        it('returns true for cardinal', function() {
            assert.strictEqual(FH.isValidInterpolation('cardinal'), true);
        });
        it('returns true for monotone', function() {
            assert.strictEqual(FH.isValidInterpolation('monotone'), true);
        });
        it('returns false for line', function() {
            assert.strictEqual(FH.isValidInterpolation('line'), false);
        });
    });
    describe('#isValidTrace', function() {
        it('returns true for none', function() {
            assert.strictEqual(FH.isValidTrace({type: 'none'}),true);
        });
        it('returns true for valid line', function() {
            assert.strictEqual(FH.isValidTrace({
                type: 'line',
                coordinates: [
                    [12.43, -2],
                    [1, 0],
                    [1, 2]
                ],
                strokeColor: '#FFF',
                fillColor: '#000'
            }), true);
        });
        it('returns true for valid poly', function() {
            assert.strictEqual(FH.isValidTrace({
                type: 'poly',
                coordinates: [
                    [12.43, -2],
                    [1, 0],
                    [1, 2]
                ],
                strokeColor: '#FFF',
                fillColor: '#000'
            }), true);
        });
        it('returns false for invalid line', function() {
            assert.strictEqual(FH.isValidTrace({
                type: 'line',
                coordinates: [
                    [12.43, -2]
                ]
            }), false);
            assert.strictEqual(FH.isValidTrace({
                type: 'line',
                coordinates: [
                    [12.43, -2]
                ],
                strokeColor: '#FFF',
                fillColor: '#000'
            }), false);
        });
        it('returns false for invalid line', function() {
            assert.strictEqual(FH.isValidTrace({
                type: 'line',
                coordinates: [
                    [12.43, -2],
                    [1, '2'],
                ],
                strokeColor: '#FFz',
                fillColor: '#000'
            }), false);
        });
        it('returns false for invalid line', function() {
            assert.strictEqual(FH.isValidTrace({
                type: 'line',
                coordinates: [
                    [12.43, -2],
                    [1, 2, 4],
                ]
            }), false);
        });
        it('returns false for square', function() {
            assert.strictEqual(FH.isValidTrace({type: 'square'}), false);
        });
    });
});