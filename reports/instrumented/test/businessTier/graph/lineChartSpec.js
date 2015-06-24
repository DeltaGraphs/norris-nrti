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

var socketMockHistory=function(){
    this.p1=[];
    this.p2=[];
    this._namespace='flow1';
    this.sendMessage=function(p1, p2){
        this.p1.push(p1);
        this.p2.push(p2);
    };
    this.attachObject=function(p1, p2){
        this.p1.push(p1);
        this.p2.push(p2);
    };
};
var pageMock=function(){
    this._page='';
    this._p1 = '';
    this._p2 = '';

    this.graphChanged=function(params) {
        this._p1 = params.eventType;
        this._p2 = params.params;
    };
};

describe('LineChart', function() {
    it('returns 371 when there are no params', function() {
        assert.strictEqual((new LineChart()).hasOwnProperty('_dataLineChart'),false);
    });

    it('returns 372 when there is no valid graphsocket in params', function() {
        assert.strictEqual((new LineChart({is: 1}, {_page: 'dssada'}, {})).hasOwnProperty('_dataLineChart'),false);
    });

    it('returns 373 when page is not valid', function() {
        var mock=new socketMock();
        assert.strictEqual((new LineChart({is: 1}, {}, mock)).hasOwnProperty('_dataLineChart'),false);
    });

    it('returns 322 - not create a LineChartModel', function() {
        var mock=new socketMock();
        assert.strictEqual((new LineChart({is: 1}, {_page: 'dssada'}, mock)).hasOwnProperty('_dataLineChart'),false);
    });

    it('returns a correct LineChart', function() {
        var mock=new socketMock();
        var lc=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
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
            lineChart.createLineChartFlow({ ID:'flow2', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            assert.deepEqual(lineChart.getFlowByID('flow2')._dataLineChartFlow._ID, 'flow2');
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
            assert.strictEqual(mock.p2.properties.ID, 'flow1');
            assert.strictEqual(mock.p2.properties.name, 'grafico tempo-temperatura');
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
            assert.strictEqual(mock.p2.ID, 'flow1');
        });
    });
    describe('#deleteAllFlows', function() {
        it('deletes all flows and sends right message', function() {
            var mock = new socketMockHistory();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            lineChart.createLineChartFlow({ ID:'flow2', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            lineChart.deleteAllFlows();
            assert.strictEqual(mock.p1[mock.p1.length-2],'deleteFlow');
            assert.deepEqual(mock.p2[mock.p2.length-2], {ID: 'flow1'});
            assert.strictEqual(mock.p1[mock.p1.length-1],'deleteFlow');
            assert.deepEqual(mock.p2[mock.p2.length-1], {ID: 'flow2'});
            assert.strictEqual(lineChart._flows.length,0);
        });
    });
    describe('#addRecord', function() {
        it('returned 272 - undefined flowID', function() {
            var mock=new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            assert.strictEqual(lineChart.addRecord(),272);
        });
        it('returned 123 - undefined record', function() {
            var mock=new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            assert.strictEqual(lineChart.addRecord('flow1'),123);
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
            assert.strictEqual(typeof lineChart.updateRecord(),'number');
        });
        it('returned true - correctly updated', function() {
            var mock=new socketMock();
            var pMock = new pageMock();
            var lineChart=new LineChart({ID: 'dada'}, pMock, mock);
            lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            var recID=lineChart.addRecord('flow1',{'tempo': 1, 'temperatura': 25});
            assert.strictEqual(lineChart.updateRecord('flow1',recID,{'tempo': 3, 'temperatura': 7}),true);
        });
    });
    describe('#updateProperties', function() {
        it('no update - invalid params', function() {
            var mock = new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            mock.p1=null;
            mock.p2=null;
            lineChart.updateProperties();
            assert.strictEqual(mock.p1,null);
            assert.strictEqual(mock.p2,null);
        });
        it('updated properties', function() {
            var mock = new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.updateProperties({title: 'graph one', height: 200, width: 350, enableLegend: true, backgroundColor: '#EEEEEE', legendOnPoint: true, viewFinder: true, horizontalGrid: true, verticalGrid: true, interpolation:'step'});
            assert.strictEqual(mock.p1,'updateGraphProp');
            assert.deepEqual(mock.p2,{'title':'graph one','height':200,'width':350,'enableLegend':true,'backgroundColor':'#EEEEEE','horizontalGrid':true,'verticalGrid':true,'viewFinder':true,'legendOnPoint':true, 'interpolation':'step'});
        });
    });
    describe('#getProperties', function() {
        it('returned a correct JSON', function() {
            var mock=new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            assert.deepEqual(lineChart.getProperties(),{'ID':'dada','title':'','type':'LineChart','height':400,'width':500,'enableLegend':false,'legend':{'position':'NE','fontColor':'#000000','backgroundColor':'#FFFFFF'},'horizontalGrid':false,'verticalGrid':false,'viewFinder':false,'xAxis':{'name':'','color':'#000000','maxIndex':null,'minIndex':null,'ticks':10,'scale':'linear'},'yAxis':{'name':'','color':'#000000','maxIndex':null,'minIndex':null,'ticks':10,'scale':'linear'},interpolation: 'linear', backgroundColor:'#FFFFFF','legendOnPoint':false});
        });
    });
    describe('#getConfigJSON', function() {
        it('returned a correct JSON', function() {
            var mock=new socketMock();
            var lineChart=new LineChart({ID: 'dada'}, {_page: 'dssada'}, mock);
            lineChart.createLineChartFlow({ ID:'flow1', name: 'grafico tempo-temperatura', xKey: 'tempo', yKey: 'temperatura'});
            var ID=lineChart.addRecord('flow1',{'tempo': 1, 'temperatura': 25});
            assert.deepEqual(lineChart.getConfigJSON(),{'properties':{'ID':'dada','title':'','type':'LineChart','height':400,'width':500,'enableLegend':false,'legend':{'position':'NE','fontColor':'#000000','backgroundColor':'#FFFFFF'},'horizontalGrid':false,'verticalGrid':false,'viewFinder':false,'xAxis':{'name':'','color':'#000000','maxIndex':null,'minIndex':null,'ticks':10,'scale':'linear'},'yAxis':{'name':'','color':'#000000','maxIndex':null,'minIndex':null,'ticks':10,'scale':'linear'},'backgroundColor':'#FFFFFF','legendOnPoint':false,'flows':[{'ID':'flow1','name':'grafico tempo-temperatura','filters':null,'xKey':'tempo','yKey':'temperatura','xFormat':null,'yFormat':null,'flowColor':null,'marker':'none','area':false,'maxItems':50,'maxItemsSaved':500}]},'data':[{'ID':'flow1','records':[{norrisRecordID: ID, value: [1,25]}]}]});
        });
    });

});