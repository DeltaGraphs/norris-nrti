/*jshint node: true, -W106 */
'use strict';

/*
* Name : barChartSpec.js
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

var socketMock=function(){
    this.p1=null;
    this.p2=null;
    this._namespace='flow1';
    this.sendMessage=function(p1, p2){
        this.p1=p1;
        this.p2=p2;
    };
    this.attachObject=function(p1, p2){
        this.p1=p1;
        this.p2=p2;
    };
};

describe('BarChart', function() {
    it('returns 361 when there are no params', function() {
        assert.strictEqual(new BarChart().hasOwnProperty('_dataBarChart'),false);
    });

    it('returns 362 when there is no valid graphsocket in params', function() {
        assert.strictEqual(new BarChart({is: 1}, {_page: 'dssada'}, {}).hasOwnProperty('_dataBarChart'),false);
    });

    it('returns 393 when page is not valid', function() {
        assert.strictEqual(new BarChart({is: 1}, {}, {_namespace:'bababa'}).hasOwnProperty('_dataBarChart'),false);
    });

    it('returns null if it does not create a BarChartModel', function() {
        assert.strictEqual(new BarChart({is: 1}, {_page: 'dssada'}, new socketMock()).hasOwnProperty('_dataBarChart'),false);
    });

    it('returns a correct BarChart', function() {
        assert.strictEqual(new BarChart({ID: 'dada'}, {_page: 'dssada'}, new socketMock()).hasOwnProperty('_dataBarChart'),true);
    });

    describe('#getFlowByID', function() {
        it('return 262 - no ID in flows', function() {
            var mock=new socketMock();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            barChart.createBarChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura'});
            assert.strictEqual(barChart.getFlowByID('fl1'),262);
        });
        it('return correct flow', function() {
            var mock=new socketMock();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            barChart.createBarChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura'});
            barChart.createBarChartFlow({ ID:'flow2', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura'});
            assert.deepEqual(barChart.getFlowByID('flow2')._dataBarChartFlow._ID, 'flow2');
        });
    });

    describe('#createBarChartFlow', function() {
        it('return 212 on creation of flow', function() {
            var mock=new socketMock();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            assert.strictEqual(barChart.createBarChartFlow(),212);
        });
        it('return correct object', function() {
            var mock = new socketMock();
            var barChart=new BarChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            var bc=barChart.createBarChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', indexKey: 'tempo', valueKey: 'temperatura'});
            assert.strictEqual(bc.hasOwnProperty('_dataBarChartFlow'),true);
            assert.strictEqual(mock.p1,'insertFlow');
            assert.strictEqual(mock.p2.ID, 'flow1');
            assert.strictEqual(mock.p2.name, 'grafico tempo-temperatura');
        });
    });
});