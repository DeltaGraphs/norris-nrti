/*jshint node: true, -W106 */
'use strict';

/*
* Name : lineChartSpec.js
* Module : UnitTest
* Location : /test/businessTier/graph
*
* History :
* 
* Version   Date         Programmer         Description
* =========================================================
* 0.0.1     2015-06-02   Matteo Furlan    Initial code
* =========================================================
*/

var LineChart = require('../../../lib/businessTier/graph/lineChart.js');
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

describe('LineChart', function() {
    it('returns 381 when there are no params', function() {
        assert.strictEqual((new LineChart()).hasOwnProperty('_dataLineChart'),false);
    });

    it('returns 382 when there is no valid graphsocket in params', function() {
        assert.strictEqual((new LineChart({is: 1}, {_page: 'dssada'}, {})).hasOwnProperty('_dataLineChart'),false);
    });

    it('returns 383 when page is not valid', function() {
        assert.strictEqual((new LineChart({is: 1}, {}, {})).hasOwnProperty('_dataLineChart'),false);
    });

    it('returns 322 - not create a LineChartModel', function() {
        var mock=new socketMock();
        assert.strictEqual((new LineChart({is: 1}, {_page: 'dssada'}, mock)).hasOwnProperty('_dataLineChart'),false);
    });

    it('returns a correct LineChart', function() {
        var mock=new socketMock();
        console.log('Piedino');
        var lc=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
        //console.log('PIEDONE '+JSON.stringify(lc));
        assert.strictEqual(lc.hasOwnProperty('_dataLineChart'),true);
    });

    describe('#getFlowByID', function() {
        it('return 272 - no ID in flows', function() {
            var mock=new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            assert.strictEqual(lineChart.getFlowByID('fl1'),272);
        });
        it('return correct flow', function() {
            var mock=new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            console.log('SOSTITUIREgetFlowByIDgetFlowByID '+JSON.stringify(lineChart.getFlowByID('flow1')));
            assert.deepEqual(lineChart.getFlowByID('flow1'),{});
        });
    });

    describe('#createLineChartFlow', function() {
        it('return 222 on creation of flow', function() {
            var mock=new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            assert.strictEqual(lineChart.createLineChartFlow(),222);
        });
        it('return correct object', function() {
            var mock = new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            var lc=lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            assert.strictEqual(lc.hasOwnProperty('_dataLineChartFlow'),true);
            assert.strictEqual(mock.p1,'insertFlow');
            console.log('SOSTITUIREcreateLineChartFlow '+JSON.stringify(mock.p2));
            assert.deepEqual(mock.p2,'insertFlow');
        });
    });
    describe('#deleteFlow', function() {
        it('return 273 - ID is not a string', function() {
            var mock=new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            assert.strictEqual(lineChart.deleteFlow(34),273);
        });
        it('return 273 - no ID in flows', function() {
            var mock=new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            assert.strictEqual(lineChart.deleteFlow('flow123'),273);
        });
        it('return true - deleted flow', function() {
            var mock = new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            assert.strictEqual(lineChart.deleteFlow('flow1'),true);
            assert.strictEqual(mock.p1,'deleteFlow');
            assert.strictEqual(mock.p2,'flow1');
        });
    });
    describe('#deleteAllFlows', function() {
        it('return true - deleted flow', function() {
            var mock = new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            assert.strictEqual(lineChart.deleteFlow('flow1'),true);
            assert.strictEqual(mock.p1,'deleteFlow');
            assert.strictEqual(mock.p2,'flow1');
            assert.strictEqual(lineChart._flows.length,0);
        });
    });
    describe('#addRecord', function() {
        it('returned 123 - undefined record', function() {
            var mock=new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            assert.strictEqual( lineChart.addRecord(),123);
        });
        it('returned correct ID - record added correctly', function() {
            var mock=new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            assert.strictEqual(typeof lineChart.addRecord('flow1',{'tempo': 1, 'temperatura': 25}),'string');
        });
    });
    describe('#updateRecord', function() {
        it('returned error - undefined record', function() {
            var mock=new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            assert.strictEqual(typeof  lineChart.updateRecord(),'numeric');
        });
        it('returned true - correctly updated', function() {
            var mock=new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            var recID=lineChart.addRecord('flow1',{'tempo': 1, 'temperatura': 25});
            assert.strictEqual(lineChart.updateRecord('flow1',recID,{'tempo': 3, 'temperatura': 7}),true);
        });
    });
    describe('#updateProperties', function() {
        it('no update - invalid params', function() {
            var mock = new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.updateProperties();
            assert.strictEqual(mock.p1,null);
            assert.deepEqual(mock.p2,null);
        });
        it('updated properties', function() {
            var mock = new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.updateProperties({title: 'graph one', height: 200, width: 350, enableLegend: true, backgroundColor: '#EEEEEE', legendOnPoint: true, viewFinder: true, horizontalGrid: true, verticalGrid: true });
            assert.strictEqual(mock.p1,'updateGraphProp');
            console.log('SOSTITUIREupdateProperties '+JSON.stringify(mock.p2));
            assert.strictEqual(mock.p2,null);
        });
    });
    describe('#getProperties', function() {
        it('returned a correct JSON', function() {
            var mock=new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            console.log('SOSTITUIREgetProperties '+JSON.stringify(lineChart.getProperties()));
            assert.deepEqual(lineChart.getProperties(),{});
        });
    });
    describe('#getConfigJSON', function() {
        it('returned a correct JSON', function() {
            var mock=new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            console.log('SOSTITUIREgetConfigJSON '+JSON.stringify(lineChart.getConfigJSON()));
            assert.deepEqual(lineChart.getConfigJSON(),{});
        });
    });

});