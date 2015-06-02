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

var MapChart = require('../../../lib/businessTier/graph/mapChart.js');
var assert = require('assert');

describe('MapChart', function() {
    it('returns null when there are no params', function() {
        assert.strictEqual((new MapChart()).hasOwnProperty('_dataMapChart'), false);
    });

    it('returns null when there is no valid page in params', function() {
        assert.strictEqual((new MapChart(2, 3)).hasOwnProperty('_dataMapChart'), false);
    });

    it('returns null when there is no valid graphsocket in params', function() {
        assert.strictEqual((new MapChart(2, {_namespace: 2}, 3)).hasOwnProperty('_dataMapChart'), false);
    });

    it('returns null when params are not valid', function() {
        assert.strictEqual((new MapChart(2, {_namespace: 2})).hasOwnProperty('_dataMapChart'), false);
    });

    it('calls the parent constructor with the params specified', function() {
        var flow1=new MapChart({ID: 'flow1'},{_namespace: 'flow1'});
        assert.strictEqual(flow1._dataMapChartFlow._ID, 'flow1');
        assert.strictEqual(flow1._graphSocket._namespace, 'flow1');
    });
});