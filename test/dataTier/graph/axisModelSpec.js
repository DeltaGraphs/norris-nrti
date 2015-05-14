/*jshint node: true, -W106 */
'use strict';

/*
* Name : axisModelSpec.js
* Module : UnitTest
* Location : /test/dataTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-13   Filippo Rampado    Initial code
* =========================================================
*/

var AxisModel = require('../../../lib/dataTier/graph/axisModel.js');
var assert = require('assert');

describe('AxisModel', function() {

    it('set default values to property not specified', function() {
        var axis=new AxisModel({});
        assert.strictEqual(axis._name, '');
        assert.strictEqual(axis._color, '#000000');
        assert.strictEqual(axis._minIndex, null);
        assert.strictEqual(axis._maxIndex, null);
        assert.strictEqual(axis._ticks, 10);
        assert.strictEqual(axis._scale, 'linear');
    });

    it('set default values to wrong properties', function() {
        var axis=new AxisModel({
            name: 1,
            color: 'asd',
            minIndex: 'asd',
            maxIndex: '',
            ticks: -2,
            scale: 'asd'
        });
        assert.strictEqual(axis._name, '');
        assert.strictEqual(axis._color, '#000000');
        assert.strictEqual(axis._minIndex, null);
        assert.strictEqual(axis._maxIndex, null);
        assert.strictEqual(axis._ticks, 10);
        assert.strictEqual(axis._scale, 'linear');
    });

    it('set param values to properties', function() {
        var axis=new AxisModel({
            name: 'xAxis',
            color: '#123456',
            minIndex: 12.5,
            maxIndex: -10,
            ticks: 12,
            scale: 'logarithmic'
        });
        assert.strictEqual(axis._name, 'xAxis');
        assert.strictEqual(axis._color, '#123456');
        assert.strictEqual(axis._minIndex, 12.5);
        assert.strictEqual(axis._maxIndex, -10);
        assert.strictEqual(axis._ticks, 12);
        assert.strictEqual(axis._scale, 'logarithmic');
    });
    
    describe('#getProperties', function() {
        it('returns the JSON with the properties', function() {
            var axis=new AxisModel({
                name: 'xAxis',
                color: '#123456',
                minIndex: 12.5,
                maxIndex: -10,
                ticks: 12,
                scale: 'logarithmic'
            });
            var prop=axis.getProperties();
            assert.strictEqual(prop.name, 'xAxis');
            assert.strictEqual(prop.color, '#123456');
            assert.strictEqual(prop.minIndex, 12.5);
            assert.strictEqual(prop.maxIndex, -10);
            assert.strictEqual(prop.ticks, 12);
            assert.strictEqual(prop.scale, 'logarithmic');
        });
    });
    
});