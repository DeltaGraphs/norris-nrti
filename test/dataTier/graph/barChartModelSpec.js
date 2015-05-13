/*jshint node: true, -W106 */
'use strict';

/*
* Name : barChartModelSpec.js
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

var BarChartModel = require('../../../lib/dataTier/graph/barChartModel.js');
var assert = require('assert');

describe('BarChartModel', function() {
    it('returns null when passed a non-valid string', function() {
        assert.strictEqual((new BarChartModel({ID:new Date()})).hasOwnProperty('_ID'), false);
        assert.strictEqual((new BarChartModel({ID:''})).hasOwnProperty('_ID'), false);
    });
    it('set default values when have wrong type', function() {
        assert.strictEqual((new BarChartModel({ID:'grafico'}))._title, '');
        assert.strictEqual((new BarChartModel({ID:'grafico'}))._enableLegend, '');
    });
});