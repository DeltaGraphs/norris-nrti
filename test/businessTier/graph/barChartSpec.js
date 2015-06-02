/*jshint node: true, -W106 */
'use strict';

/*
* Name : mapChartSpec.js
* Module : UnitTest
* Location : /test/businessTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-29   Filippo Rampado    Initial code
* =========================================================
*/

var BarChart = require('../../../lib/businessTier/graph/barChart.js');
var assert = require('assert');

describe('BarChart', function() {
    it('returns null when there are no params', function() {
        assert.strictEqual((new BarChart()).hasOwnProperty('_dataMapChart'), false);
    });

    it('returns null when there is no valid page in params', function() {
        assert.strictEqual((new BarChart(2, 3)).hasOwnProperty('_dataMapChart'), false);
    });

    it('returns null when there is no valid graphsocket in params', function() {
        assert.strictEqual((new BarChart(2, {_namespace: 2}, 3)).hasOwnProperty('_dataMapChart'), false);
    });

    it('returns null when params are not valid', function() {
        assert.strictEqual((new BarChart(2, {_namespace: 2})).hasOwnProperty('_dataMapChart'), false);
    });

    it('calls the parent constructor with the params specified', function() {
        var bar1=new BarChart({ID: 'bar1'},{_namespace: 'bar1'});
        assert.strictEqual(bar1._dataMapChartFlow._ID, 'bar1');
        assert.strictEqual(bar1._graphSocket._namespace, 'bar1');
    });

    describe('#getFlowByID', function() {
        it('returns 262 when params are not valid', function() {
        assert.strictEqual((new BarChart(2, {_namespace: 2})).hasOwnProperty('_dataBarChart'), 262);
    });
});