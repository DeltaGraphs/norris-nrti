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
    var socketMock=function(){
        this.p1=null;
        this.p2=null;
        this._namespace='flow1';
        this.attachObject=function(p1, p2){
            this.p1=p1;
            this.p2=p2;
        };
    };
    it('returns null when there are no params', function() {
        assert.strictEqual((new MapChart()).hasOwnProperty('_dataMapChart'), false);
    });

    it('returns null when there is no valid page in params', function() {
        assert.strictEqual((new MapChart(2, 3)).hasOwnProperty('_dataMapChart'), false);
    });

    it('returns null when there is no valid graphsocket in params', function() {
        assert.strictEqual((new MapChart(2, {_page:2}, 3)).hasOwnProperty('_dataMapChart'), false);
    });

    it('returns null when params are not valid', function() {
        assert.strictEqual((new MapChart(2, {_page:2}, new socketMock())).hasOwnProperty('_dataMapChart'), false);
    });

    it('calls the parent constructor with the params specified', function() {
        var flow1=new MapChart({ID: 'map1'}, {_page:2}, new socketMock());
        assert.strictEqual(flow1._dataMapChartFlow._ID, 'flow1');
        assert.strictEqual(flow1._graphSocket._namespace, 'flow1');
    });

    describe('#createMapChartFlow', function() {
        it ('returns 232 if are passed no valid params', function(){
            var flow1=new MapChart({ID: 'map1'}, {_page:2}, new socketMock());
            assert.strictEqual(flow1.createMapChartFlow(0), 232);
        });
        it ('adds and returns a mapChartFlow', function(){
            var flow1=new MapChart({ID: 'map1'}, {_page:2}, new socketMock());
            assert.strictEqual(flow1.createMapChartFlow({ID: 'flow1'}).hasOwnProperty('_dataMapChartFlow'), true);
            assert.strictEqual(flow1._flows[0].hasOwnProperty('_dataMapChartFlow'), true);
        });
    });
    describe('#getFlowByID', function() {
        it('returns 282 if there is no valid ID', function(){
            var flow1=new MapChart({ID: 'map1'}, {_page:2}, new socketMock());
            assert.strictEqual(flow1.getFlowByID(0), 282);
        });
        ////////////////////////////
    });
});