/*jshint node: true, -W106 */
'use strict';

/*
* Name : mapChartFlowSpec.js
* Module : UnitTest
* Location : /test/businessTier/flow
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-05-14   Filippo Rampado    Initial code
* =========================================================
*/

var MapChartFlow = require('../../../lib/businessTier/flow/mapChartFlow.js');
var assert = require('assert');

describe('MapChartFlow', function() {
    
    it('returns null when there are no params', function() {
        assert.strictEqual((new MapChartFlow()).hasOwnProperty('_dataMapChartFlow'), false);
    });

    it('returns null when there is no valid graphsocket in params', function() {
        assert.strictEqual((new MapChartFlow(2, 3)).hasOwnProperty('_dataMapChartFlow'), false);
    });

    it('returns null when params are not valid', function() {
        assert.strictEqual((new MapChartFlow(2, {_namespace: 2})).hasOwnProperty('_dataMapChartFlow'), false);
    });

    it('calls the parent constructor with the params specified', function() {
        var flow1=new MapChartFlow({ID: 'flow1'},{_namespace: 'flow1'});
        assert.strictEqual(flow1._dataMapChartFlow._ID, 'flow1');
        assert.strictEqual(flow1._graphSocket._namespace, 'flow1');
    });
});