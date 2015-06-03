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
        assert.strictEqual(new BarChart({is: 1}, {}, {}).hasOwnProperty('_dataBarChart'),false);
    });

    it('returns null if it does not create a BarChartModel', function() {
        assert.strictEqual(new BarChart({is: 1}, {_page: 'dssada'}, new socketMock()).hasOwnProperty('_dataBarChart'),false);
    });

    it('returns a correct BarChart', function() {
        assert.strictEqual(new BarChart({ID: 'dada'}, {_page: 'dssada'}, new socketMock()).hasOwnProperty('_dataBarChart'),true);
    });

    /*describe('#getFlowByID', function() {
        it('return 272 - no ID in flows', function() {
            var barChart=new BarChart({_ID: 'dada'}, {_page: 'dssada'}, new socketMock());
            barChart.createBarChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            assert.strictEqual(barChart.getFlowByID('fl1'),272);
        });
        it('return correct flow', function() {
            var barChart=new BarChart({_ID: 'dada'}, {_page: 'dssada'}, new socketMock());
            barChart.createBarChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            console.log('SOSTITUIREgetFlowByIDgetFlowByID '+JSON.stringify(barChart.getFlowByID('flow1')));
            assert.deepEqual(barChart.getFlowByID('flow1'),{});
        });
    });*/
});