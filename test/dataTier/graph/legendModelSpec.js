/*jshint node: true, -W106 */
'use strict';

/*
* Name : legendModelSpec.js
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

var LegendModel = require('../../../lib/dataTier/graph/legendModel.js');
var assert = require('assert');

describe('LegendModel', function() {

    it('set default values to property not specified', function() {
        var legend=new LegendModel({});
        assert.strictEqual(legend._position, 'NE');
        assert.strictEqual(legend._fontColor, '#000000');
        assert.strictEqual(legend._backgroundColor, '#FFFFFF');
    });

    it('set default values to wrong properties', function() {
        var legend=new LegendModel({
            position: 'NEE',
            fontColor: '#ZZZZZZ',
            backgoundColor: '#ZZZZZA'
        });
        assert.strictEqual(legend._position, 'NE');
        assert.strictEqual(legend._fontColor, '#000000');
        assert.strictEqual(legend._backgroundColor, '#FFFFFF');
    });

    it('set param values to properties', function() {
        var legend=new LegendModel({
            position: 'NW',
            fontColor: '#111111',
            backgoundColor: '#001122'
        });
        assert.strictEqual(legend._position, 'NW');
        assert.strictEqual(legend._fontColor, '#111111');
        assert.strictEqual(legend._backgroundColor, '#001122');
    });
    
    describe('#getProperties', function() {
        it('returns the JSON with the properties', function() {
            var legend=new LegendModel({
                position: 'NW',
                fontColor: '#111111',
                backgoundColor: '#001122'
            });
            var prop=legend.getProperties();
            assert.strictEqual(prop.position, 'NW');
            assert.strictEqual(prop.fontColor, '#111111');
            assert.strictEqual(prop.backgroundColor, '#001122');
        });
    });
    
});