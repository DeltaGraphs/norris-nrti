/*jshint node: true, -W106 */
'use strict';

/*
* Name : graphModelSpec.js
* Module : UnitTest
* Location : /test/dataTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-13   Matteo Furlan    Initial code
* =========================================================
*/

var GraphModel = require('../../../lib/dataTier/graph/graphModel.js');
var assert = require('assert');

describe('GraphModel', function() {
    it('returns null when passed a non-valid string', function() {
        assert.strictEqual((new GraphModel({ID:new Date()})).hasOwnProperty('_ID'), false);
        assert.strictEqual((new GraphModel({ID:''})).hasOwnProperty('_ID'), false);
    });
    it('set default values when have wrong type', function() {
        assert.strictEqual((new GraphModel({ID:'grafico'}))._title, '');
        assert.strictEqual((new GraphModel({ID:'grafico'}))._enableLegend, '');
    });
});